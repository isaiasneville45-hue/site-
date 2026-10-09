#!/usr/bin/env python3
"""
Levantamento de conteúdo para a seção de Produtos (roda no GitHub Actions).

- Rastreia os sites dos fornecedores e registra páginas, títulos e imagens.
- Baixa os catálogos em PDF da Scala e extrai o texto (pdftotext).
- Busca fotos de licença livre no Unsplash (só fotos gratuitas, sem Unsplash+).
- Geocodifica o endereço da APAG (Nominatim / OpenStreetMap).

Saída: apag/scripts/assets/research/*.json|txt
"""
import heapq
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser

OUT = os.path.join(os.path.dirname(__file__), "research")
os.makedirs(OUT, exist_ok=True)

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
KEYWORDS = [
    "produto", "product", "categoria", "category", "loja", "shop", "linha", "catalogo",
    "incendio", "emergencia", "alarme", "detector", "sirene", "acionador", "central",
    "luminaria", "bloco", "placa", "sinaliz", "fotolumin", "hidrante", "mangueira",
    "modulo", "fonte", "bateria", "cabo", "wireless", "sem-fio", "audiovisual", "saida",
]
SKIP_EXT = re.compile(r"\.(jpe?g|png|gif|webp|svg|ico|css|js|pdf|zip|rar|mp4|mp3|woff2?|ttf|xml|json)(\?|$)", re.I)


def fetch(url, binary=False, timeout=25, accept="text/html,application/xhtml+xml,*/*"):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": accept, "Accept-Language": "pt-BR,pt;q=0.9"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = r.read()
        final = r.geturl()
        ctype = r.headers.get("Content-Type", "")
    if binary:
        return data, final, ctype
    charset = "utf-8"
    m = re.search(r"charset=([\w-]+)", ctype)
    if m:
        charset = m.group(1)
    return data.decode(charset, errors="replace"), final, ctype


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.images, self.meta = [], [], {}
        self.title, self.h1, self.h2 = "", [], []
        self._in = None
        self._buf = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag == "img":
            src = a.get("data-src") or a.get("data-lazy-src") or a.get("src") or ""
            srcset = a.get("data-srcset") or a.get("srcset") or ""
            if srcset:
                # pega a maior opção do srcset
                cands = [c.strip().split(" ")[0] for c in srcset.split(",") if c.strip()]
                if cands:
                    src = cands[-1]
            if src and not src.startswith("data:"):
                self.images.append({"src": src, "alt": (a.get("alt") or "").strip(), "w": a.get("width"), "h": a.get("height")})
        elif tag == "meta":
            k = a.get("property") or a.get("name")
            if k in ("og:image", "og:title", "og:description", "description", "twitter:image"):
                self.meta[k] = a.get("content", "")
        elif tag in ("title", "h1", "h2"):
            self._in, self._buf = tag, ""

    def handle_endtag(self, tag):
        if tag == self._in:
            text = re.sub(r"\s+", " ", self._buf).strip()
            if tag == "title":
                self.title = text
            elif tag == "h1" and text:
                self.h1.append(text)
            elif tag == "h2" and text and len(self.h2) < 12:
                self.h2.append(text)
            self._in = None

    def handle_data(self, data):
        if self._in:
            self._buf += data


def same_site(u, host):
    h = urllib.parse.urlparse(u).netloc.lower().removeprefix("www.")
    return h == host or h.endswith("." + host)


def priority(u):
    low = u.lower()
    score = sum(1 for k in KEYWORDS if k in low)
    return -score


def sitemap_urls(base, host, limit=4000):
    found, seen = [], set()
    queue = [urllib.parse.urljoin(base, p) for p in ("/sitemap.xml", "/sitemap_index.xml", "/wp-sitemap.xml", "/product-sitemap.xml")]
    while queue and len(found) < limit:
        sm = queue.pop(0)
        if sm in seen:
            continue
        seen.add(sm)
        try:
            text, _, _ = fetch(sm, accept="application/xml,text/xml,*/*")
        except Exception:
            continue
        for loc in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", text):
            loc = html.unescape(loc)
            if loc.endswith(".xml") or "sitemap" in loc.split("/")[-1]:
                if same_site(loc, host):
                    queue.append(loc)
            elif same_site(loc, host):
                found.append(loc)
    return found


def crawl(name, start_urls, max_pages=220, extra_hosts=(), url_filter=None):
    host = urllib.parse.urlparse(start_urls[0]).netloc.lower().removeprefix("www.")
    hosts = [host, *extra_hosts]
    result = {"site": name, "start": start_urls, "sitemap": [], "pages": [], "errors": []}
    sm = sitemap_urls(start_urls[0], host)
    result["sitemap"] = sm
    heap, seen = [], set()

    def push(u, depth):
        u = urllib.parse.urldefrag(u)[0]
        if u in seen or SKIP_EXT.search(u) or not any(same_site(u, h) for h in hosts):
            return
        if url_filter and depth > 0 and not re.search(url_filter, u.lower()):
            return
        if any(x in u.lower() for x in ("/wp-admin", "/carrinho", "/cart", "/checkout", "/minha-conta", "/login", "/account", "add-to-cart", "/feed", "/wp-json", "mailto:", "tel:", "whatsapp")):
            return
        seen.add(u)
        heapq.heappush(heap, (priority(u), depth, u))

    for u in start_urls:
        push(u, 0)
    for u in sm:
        if priority(u) < 0:
            push(u, 1)

    while heap and len(result["pages"]) < max_pages:
        _, depth, url = heapq.heappop(heap)
        try:
            text, final, ctype = fetch(url)
        except Exception as e:  # noqa: BLE001
            result["errors"].append(f"{url}: {e}")
            continue
        if "html" not in ctype:
            continue
        p = PageParser()
        try:
            p.feed(text)
        except Exception:  # noqa: BLE001
            pass
        imgs = []
        for im in p.images:
            src = urllib.parse.urljoin(final, im["src"])
            if any(x in src.lower() for x in ("logo", "icon", "sprite", "banner-topo", "whatsapp", "facebook", "instagram", "pixel", "loader", "placeholder")):
                continue
            imgs.append({"src": src, "alt": im["alt"]})
        pdfs = sorted({urllib.parse.urljoin(final, l) for l in p.links if ".pdf" in l.lower()})
        result["pages"].append({
            "url": final,
            "title": html.unescape(p.title),
            "h1": p.h1[:3],
            "h2": p.h2,
            "description": p.meta.get("og:description") or p.meta.get("description", ""),
            "og_image": urllib.parse.urljoin(final, p.meta.get("og:image", "")) if p.meta.get("og:image") else "",
            "images": imgs[:14],
            "pdfs": pdfs,
        })
        if depth < 3:
            for l in p.links:
                push(urllib.parse.urljoin(final, l), depth + 1)
        time.sleep(0.25)
    return result


def scala_catalogs():
    """Baixa os PDFs da página de catálogos da Scala e extrai o texto."""
    out = {"catalog_page": "https://gruposcala.com.br/catalogo/", "pdfs": [], "errors": []}
    try:
        text, final, _ = fetch(out["catalog_page"])
    except Exception as e:  # noqa: BLE001
        out["errors"].append(str(e))
        return out
    p = PageParser()
    p.feed(text)
    links = sorted({urllib.parse.urljoin(final, l) for l in p.links if ".pdf" in l.lower()})
    # também procura links de PDF soltos no HTML (botões em JS, iframes etc.)
    links += sorted({html.unescape(m) for m in re.findall(r"https?://[^\"'\s<>]+?\.pdf", text)} - set(links))
    out["all_pdf_links"] = links
    os.makedirs(os.path.join(OUT, "scala-pdf"), exist_ok=True)
    for link in links:
        name = urllib.parse.unquote(link.rsplit("/", 1)[-1])
        slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:80]
        entry = {"url": link, "file": slug}
        try:
            data, _, _ = fetch(link, binary=True, timeout=120, accept="application/pdf,*/*")
            entry["bytes"] = len(data)
            tmp = f"/tmp/{slug}.pdf"
            with open(tmp, "wb") as f:
                f.write(data)
            txt = subprocess.run(["pdftotext", "-layout", tmp, "-"], capture_output=True, text=True, timeout=180).stdout
            info = subprocess.run(["pdfinfo", tmp], capture_output=True, text=True, timeout=60).stdout
            entry["pdfinfo"] = info
            with open(os.path.join(OUT, "scala-pdf", f"{slug}.txt"), "w") as f:
                f.write(txt)
            imgs = subprocess.run(["pdfimages", "-list", tmp], capture_output=True, text=True, timeout=120).stdout
            entry["image_count"] = max(0, len(imgs.splitlines()) - 2)
        except Exception as e:  # noqa: BLE001
            entry["error"] = str(e)
        out["pdfs"].append(entry)
    return out


UNSPLASH_QUERIES = [
    "fire extinguisher", "fire extinguisher maintenance", "firefighter equipment inspection",
    "fire hydrant hose", "fire hose cabinet", "fire alarm", "smoke detector ceiling",
    "fire alarm control panel", "emergency exit sign", "exit sign corridor", "emergency light",
    "safety technician", "engineer inspection building", "industrial warehouse", "commercial building",
    "apartment building brazil", "office building lobby", "factory safety", "fire safety",
    "technician helmet", "evacuation sign", "sprinkler ceiling",
]


def unsplash():
    out = {}
    for q in UNSPLASH_QUERIES:
        url = "https://unsplash.com/napi/search/photos?" + urllib.parse.urlencode({"query": q, "per_page": 30})
        try:
            text, _, _ = fetch(url, accept="application/json")
            data = json.loads(text)
        except Exception as e:  # noqa: BLE001
            out[q] = {"error": str(e)}
            continue
        items = []
        for r in data.get("results", []):
            if r.get("premium") or r.get("plus") or "plus.unsplash.com" in (r.get("urls", {}).get("raw") or ""):
                continue
            items.append({
                "id": r.get("id"),
                "slug": r.get("slug"),
                "alt": r.get("alt_description"),
                "description": r.get("description"),
                "width": r.get("width"),
                "height": r.get("height"),
                "user": (r.get("user") or {}).get("name"),
                "username": (r.get("user") or {}).get("username"),
                "page": (r.get("links") or {}).get("html"),
                "raw": (r.get("urls") or {}).get("raw"),
                "small": (r.get("urls") or {}).get("small"),
            })
        out[q] = items
        time.sleep(0.5)
    return out


def geocode():
    out = {}
    queries = {
        "nominatim_structured": "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
            "street": "1300 Rua Guilherme", "city": "Joinville", "state": "SC", "postalcode": "89218-500",
            "country": "Brasil", "format": "jsonv2", "addressdetails": 1, "limit": 3}),
        "nominatim_free": "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
            "q": "Rua Guilherme, 1300, Costa e Silva, Joinville, SC, Brasil", "format": "jsonv2", "addressdetails": 1, "limit": 3}),
        "nominatim_street": "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
            "q": "Rua Guilherme, Costa e Silva, Joinville, SC", "format": "jsonv2", "addressdetails": 1, "limit": 5}),
        "photon": "https://photon.komoot.io/api/?" + urllib.parse.urlencode({"q": "Rua Guilherme 1300 Joinville", "limit": 5}),
        "viacep": "https://viacep.com.br/ws/89218500/json/",
    }
    for k, u in queries.items():
        try:
            req = urllib.request.Request(u, headers={"User-Agent": "apag-site-build/1.0 (github.com/isaiasneville45-hue/site-)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                out[k] = json.loads(r.read().decode("utf-8"))
        except Exception as e:  # noqa: BLE001
            out[k] = {"error": str(e)}
        time.sleep(1.2)
    return out


INTELBRAS_FILTER = r"incendio|alarme|detector|sirene|acionador|central|modulo|isolador|repetidor|fonte|bateria|cabo|sinaliz|emergencia|fumaca|termo|audiovisual"

SITES = {
    "scala": ["https://gruposcala.com.br/", "https://gruposcala.com.br/catalogo/"],
    "intelbras": ["https://www.intelbras.com/pt-br/seguranca-eletronica/incendio"],
    "tecnohold": ["https://www.tecnohold.com.br/"],
    "ilumac": ["https://www.ilumac.com.br/"],
    "luxpryme": ["https://www.luxpryme.com.br/"],
}


def save(name, data):
    with open(os.path.join(OUT, name), "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def main():
    only = sys.argv[1:] or ["sites", "scala_pdf", "unsplash", "geocode"]
    if "geocode" in only:
        save("geocode.json", geocode())
    if "unsplash" in only:
        save("unsplash.json", unsplash())
    if "scala_pdf" in only:
        save("scala-catalogs.json", scala_catalogs())
    if "sites" in only:
        for name, starts in SITES.items():
            flt = INTELBRAS_FILTER if name == "intelbras" else None
            data = crawl(name, starts, max_pages=260 if name == "intelbras" else 200, url_filter=flt)
            save(f"site-{name}.json", data)
            print(f"{name}: {len(data['pages'])} páginas, {len(data['sitemap'])} no sitemap, {len(data['errors'])} erros", flush=True)


if __name__ == "__main__":
    main()
