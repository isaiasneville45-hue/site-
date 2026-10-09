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
    url = urllib.parse.quote(url, safe=":/?&=%#+,;@!$'()*[]~")  # URLs com acento
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
        self.base = None
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
        elif tag == "base" and a.get("href"):
            self.base = a["href"]
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
        base = urllib.parse.urljoin(final, p.base) if p.base else final
        imgs = []
        for im in p.images:
            src = urllib.parse.urljoin(base, im["src"])
            if any(x in src.lower() for x in ("logo", "icon", "sprite", "banner-topo", "whatsapp", "facebook", "instagram", "pixel", "loader", "placeholder")):
                continue
            imgs.append({"src": src, "alt": im["alt"]})
        pdfs = sorted({urllib.parse.urljoin(base, l) for l in p.links if ".pdf" in l.lower()})
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
                push(urllib.parse.urljoin(base, l), depth + 1)
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


UNSPLASH_QUERIES_EXTRA = [
    "fire hose", "fire hose nozzle", "fire hydrant cabinet", "extinguisher wall", "fire extinguishers row",
    "emergency exit", "exit sign green", "smoke alarm", "fire alarm button", "electrician panel",
    "technician working building", "maintenance worker", "construction worker safety", "warehouse interior",
    "modern office corridor", "stairwell", "condominium building", "industrial plant",
]

UNSPLASH_QUERIES = [
    "fire extinguisher", "fire extinguisher maintenance", "firefighter equipment inspection",
    "fire hydrant hose", "fire hose cabinet", "fire alarm", "smoke detector ceiling",
    "fire alarm control panel", "emergency exit sign", "exit sign corridor", "emergency light",
    "safety technician", "engineer inspection building", "industrial warehouse", "commercial building",
    "apartment building brazil", "office building lobby", "factory safety", "fire safety",
    "technician helmet", "evacuation sign", "sprinkler ceiling",
]


def unsplash(queries=None):
    out = {}
    for q in queries or UNSPLASH_QUERIES:
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


COMMONS_QUERIES = [
    "Storz coupling", "Storz fire hose coupling", "fire hose nozzle", "fire hose branch pipe", "fire hose reel",
    "fire hose cabinet", "fire hose rolled", "fire hydrant valve indoor", "landing valve fire", "fire department connection",
    "Storz spanner", "fire extinguisher CO2", "powder fire extinguisher", "water fire extinguisher",
    "foam fire extinguisher", "wet chemical fire extinguisher", "fire extinguisher stand", "fire extinguisher bracket",
    "fire extinguisher sign", "fire hydrant sign", "photoluminescent sign", "emergency exit sign", "assembly point sign",
    "fire alarm call point", "manual call point", "smoke detector", "heat detector", "beam smoke detector",
    "fire alarm sounder", "fire alarm control panel", "emergency light", "exit sign illuminated",
    "anti slip tape", "hazard warning tape", "evacuation plan you are here", "no smoking sign",
]


def commons(queries=None):
    """Busca no Wikimedia Commons (licenças livres, com autor e licença de cada arquivo)."""
    out = {}
    for q in queries or COMMONS_QUERIES:
        url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
            "action": "query", "format": "json", "generator": "search", "gsrnamespace": 6,
            "gsrsearch": f"{q} filetype:bitmap", "gsrlimit": 15, "prop": "imageinfo",
            "iiprop": "url|extmetadata|size|mime", "iiurlwidth": 800,
        })
        data = None
        for attempt in range(5):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "apag-site-build/1.0 (github.com/isaiasneville45-hue/site-)"})
                with urllib.request.urlopen(req, timeout=40) as r:
                    data = json.loads(r.read().decode("utf-8"))
                break
            except Exception as e:  # noqa: BLE001
                out[q] = {"error": str(e)}
                time.sleep(10 * (attempt + 1))
        if data is None:
            continue
        items = []
        for page in sorted((data.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 0)):
            ii = (page.get("imageinfo") or [{}])[0]
            meta = ii.get("extmetadata") or {}
            val = lambda k: re.sub(r"<[^>]+>", "", (meta.get(k) or {}).get("value", "")).strip()
            items.append({
                "title": page.get("title"),
                "page": ii.get("descriptionurl"),
                "thumb": ii.get("thumburl"),
                "url": ii.get("url"),
                "width": ii.get("width"),
                "height": ii.get("height"),
                "mime": ii.get("mime"),
                "license": val("LicenseShortName"),
                "license_url": val("LicenseUrl"),
                "artist": val("Artist")[:120],
                "description": val("ImageDescription")[:200],
            })
        out[q] = items
        time.sleep(3)
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

# ── Rodada 3: catálogo Scala em imagens, Unsplash (HTML), Openverse e folhas de contato ──

def contact_sheet(name, items, thumb_key="thumb", label_key="label", cols=4, cell=300):
    """Monta uma grade numerada de miniaturas (para escolher fotos olhando)."""
    from PIL import Image, ImageDraw
    os.makedirs(os.path.join(OUT, "sheets"), exist_ok=True)
    thumbs = []
    for i, it in enumerate(items):
        try:
            data, _, _ = fetch(it[thumb_key], binary=True, timeout=40, accept="image/*")
            im = Image.open(__import__("io").BytesIO(data)).convert("RGB")
            im.thumbnail((cell, cell))
            thumbs.append((i, im, it.get(label_key, "")))
        except Exception as e:  # noqa: BLE001
            thumbs.append((i, None, f"erro: {e}"))
        time.sleep(0.2)
    if not thumbs:
        return None
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 34)), (30, 30, 30))
    d = ImageDraw.Draw(sheet)
    for n, (i, im, label) in enumerate(thumbs):
        x, y = (n % cols) * cell, (n // cols) * (cell + 34)
        if im:
            sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
        d.rectangle((x, y + cell, x + cell, y + cell + 34), fill=(0, 0, 0))
        d.text((x + 6, y + cell + 4), f"#{i} {str(label)[:44]}", fill=(255, 255, 255))
    path = os.path.join(OUT, "sheets", f"{name}.jpg")
    sheet.save(path, "JPEG", quality=70)
    return os.path.relpath(path, OUT)


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def scala_pdf_pages():
    """Renderiza as páginas do catálogo da Scala e extrai imagens embutidas e links."""
    url = "https://gruposcala.com.br/wp-content/uploads/2024/10/SCALA-SERIGRAFIA-CATALOGO-25-Placas-e-adesivos-de-sinalizacao-contra-incendio-catalogo-completo-clicavel-compressed.pdf"
    out = {"pdf": url}
    data, _, _ = fetch(url, binary=True, timeout=180, accept="application/pdf,*/*")
    tmp = "/tmp/scala.pdf"
    with open(tmp, "wb") as f:
        f.write(data)
    pages_dir = os.path.join(OUT, "scala-pages")
    os.makedirs(pages_dir, exist_ok=True)
    subprocess.run(["pdftoppm", "-r", "90", "-jpeg", "-jpegopt", "quality=65", tmp, os.path.join(pages_dir, "p")], check=True)
    out["pages"] = sorted(os.listdir(pages_dir))
    out["urls"] = subprocess.run(["pdfinfo", "-url", tmp], capture_output=True, text=True).stdout
    out["images_list"] = subprocess.run(["pdfimages", "-list", tmp], capture_output=True, text=True).stdout
    img_dir = os.path.join(OUT, "scala-images")
    os.makedirs(img_dir, exist_ok=True)
    subprocess.run(["pdfimages", "-j", "-p", tmp, os.path.join(img_dir, "img")], check=True)
    # converte tudo para JPEG pequeno (para revisão)
    from PIL import Image
    for name in sorted(os.listdir(img_dir)):
        path = os.path.join(img_dir, name)
        try:
            im = Image.open(path).convert("RGB")
            if im.width < 60 or im.height < 60:
                os.remove(path)
                continue
            im.thumbnail((700, 700))
            new = os.path.splitext(path)[0] + ".jpg"
            im.save(new, "JPEG", quality=70)
            if new != path:
                os.remove(path)
        except Exception:  # noqa: BLE001
            os.remove(path)
    out["images"] = sorted(os.listdir(img_dir))
    # texto via OCR? (não disponível) — guarda também o texto bruto por página
    out["text"] = subprocess.run(["pdftotext", "-raw", tmp, "-"], capture_output=True, text=True).stdout[:4000]
    return out


UNSPLASH_HTML_QUERIES = [
    "fire-extinguisher", "fire-extinguisher-wall", "fire-safety", "firefighter-equipment", "fire-hose",
    "fire-hydrant-cabinet", "fire-alarm", "smoke-detector", "emergency-exit", "exit-sign", "emergency-light",
    "technician", "maintenance-technician", "engineer-inspection", "safety-inspection", "industrial-warehouse",
    "warehouse", "office-building", "commercial-building", "apartment-building", "corridor", "stairwell",
    "factory-workers", "construction-safety",
]


def unsplash_html(queries=None):
    """Busca pela página pública do Unsplash (só fotos gratuitas: images.unsplash.com/photo-...)."""
    out = {}
    for q in queries or UNSPLASH_HTML_QUERIES:
        url = f"https://unsplash.com/s/photos/{q}?license=free"
        try:
            text, _, _ = fetch(url)
        except Exception as e:  # noqa: BLE001
            out[q] = {"error": str(e)}
            continue
        items, seen = [], set()
        # <img ... alt="..." ... src="https://images.unsplash.com/photo-XXXX?..."
        for m in re.finditer(r"<img[^>]+>", text):
            tag = m.group(0)
            src = re.search(r'src="(https://images\.unsplash\.com/photo-[^"?]+)', tag)
            if not src or "plus.unsplash.com" in tag:
                continue
            base = html.unescape(src.group(1))
            if base in seen:
                continue
            seen.add(base)
            alt = re.search(r'alt="([^"]*)"', tag)
            items.append({"url": base, "alt": html.unescape(alt.group(1)) if alt else "", "thumb": base + "?w=400&q=60&fm=jpg"})
        # tenta também extrair autor/slug da página (links /photos/<slug>)
        out[q] = {"photo_pages": sorted(set(re.findall(r'href="(/photos/[a-zA-Z0-9_-]+)"', text)))[:40], "items": items[:16]}
        for it in out[q]["items"]:
            it["label"] = it["alt"]
        out[q]["sheet"] = contact_sheet(f"unsplash-{q}", out[q]["items"])
        time.sleep(1.5)
    return out


OPENVERSE_QUERIES = [
    "fire extinguisher", "fire extinguisher wall", "fire hose", "fire hose cabinet", "fire hose nozzle",
    "storz coupling", "fire alarm", "smoke detector", "fire alarm panel", "emergency exit sign",
    "emergency light", "technician maintenance", "safety inspection", "warehouse interior", "office corridor",
]


def openverse(queries=None):
    """Openverse (fotos com licença Creative Commons, com autor e licença)."""
    out = {}
    for q in queries or OPENVERSE_QUERIES:
        url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({
            "q": q, "license_type": "commercial,modification", "page_size": 16, "mature": "false"})
        try:
            text, _, _ = fetch(url, accept="application/json")
            data = json.loads(text)
        except Exception as e:  # noqa: BLE001
            out[q] = {"error": str(e)}
            time.sleep(5)
            continue
        items = []
        for r in data.get("results", []):
            items.append({
                "id": r.get("id"), "title": r.get("title"), "url": r.get("url"), "thumb": r.get("thumbnail") or r.get("url"),
                "page": r.get("foreign_landing_url"), "creator": r.get("creator"), "license": r.get("license"),
                "license_version": r.get("license_version"), "license_url": r.get("license_url"),
                "source": r.get("source"), "width": r.get("width"), "height": r.get("height"),
                "label": f"{r.get('license')} {r.get('title') or ''}",
            })
        out[q] = {"items": items, "sheet": contact_sheet(f"openverse-{slugify(q)}", items)}
        time.sleep(2)
    return out


def commons_sheets(data):
    """Folhas de contato para os resultados do Commons já levantados."""
    for q, items in data.items():
        if isinstance(items, list) and items:
            for it in items:
                it["label"] = f"{it.get('license', '')} {it.get('title', '')[5:]}"
            data[q] = {"items": items, "sheet": contact_sheet(f"commons-{slugify(q)}", items[:12])}
    return data


def fetch_files(list_file="fetch-files.txt"):
    """Baixa arquivos binários listados como "<nome> <url>" para research/files/."""
    out = {}
    os.makedirs(os.path.join(OUT, "files"), exist_ok=True)
    for line in open(os.path.join(OUT, list_file)):
        if not line.strip() or line.startswith("#"):
            continue
        name, url = line.split(None, 1)
        try:
            data, final, ctype = fetch(url.strip(), binary=True, timeout=180, accept="*/*")
            with open(os.path.join(OUT, "files", name), "wb") as f:
                f.write(data)
            out[name] = {"url": final, "bytes": len(data), "type": ctype}
        except Exception as e:  # noqa: BLE001
            out[name] = {"url": url.strip(), "error": str(e)}
    return out


def fetch_pages(list_file="fetch-list.txt"):
    """Busca uma lista de URLs (research/fetch-list.txt) e registra título, descrição,
    imagens (respeitando <base href>), og:image e imagens de JSON-LD de produto."""
    urls = [l.strip() for l in open(os.path.join(OUT, list_file)) if l.strip() and not l.startswith("#")]
    pages = []
    for url in urls:
        entry = {"requested": url}
        try:
            text, final, ctype = fetch(url)
            p = PageParser()
            p.feed(text)
            base = urllib.parse.urljoin(final, p.base) if p.base else final
            ld_images = []
            for block in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', text, re.S):
                for m in re.finditer(r'"image"\s*:\s*(\[[^\]]*\]|"[^"]+")', block):
                    ld_images += re.findall(r'"(https?://[^"]+)"', m.group(1))
            entry.update({
                "url": final,
                "title": html.unescape(p.title),
                "h1": p.h1[:3],
                "h2": p.h2,
                "description": p.meta.get("og:description") or p.meta.get("description", ""),
                "og_image": urllib.parse.urljoin(base, p.meta.get("og:image", "")) if p.meta.get("og:image") else "",
                "ld_images": ld_images[:8],
                "images": [{"src": urllib.parse.urljoin(base, i["src"]), "alt": i["alt"]} for i in p.images][:30],
                "text": re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", text, flags=re.S)))[:2500],
            })
        except Exception as e:  # noqa: BLE001
            entry["error"] = str(e)
        pages.append(entry)
        time.sleep(0.3)
    return pages


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
    if "files" in only:
        save("files.json", fetch_files())
    for arg in only:
        if arg.startswith("pages:"):
            name = arg.split(":", 1)[1]
            save(f"pages-{name}.json", fetch_pages(f"fetch-{name}.txt"))
    if "scala_pages" in only:
        save("scala-pages.json", scala_pdf_pages())
    if "unsplash_html" in only:
        save("unsplash-html.json", unsplash_html())
    if "openverse" in only:
        save("openverse.json", openverse())
    if "commons_retry" in only:
        prev = {}
        path = os.path.join(OUT, "commons.json")
        if os.path.exists(path):
            prev = json.load(open(path))
        todo = [q for q in COMMONS_QUERIES if not isinstance(prev.get(q), list)]
        prev.update(commons(todo))
        save("commons.json", commons_sheets(prev))
    if "commons" in only:
        save("commons.json", commons())
    if "unsplash_extra" in only:
        save("unsplash-extra.json", unsplash(UNSPLASH_QUERIES_EXTRA))
    if "geocode" in only:
        save("geocode.json", geocode())
    if "unsplash" in only:
        save("unsplash.json", unsplash())
    if "scala_pdf" in only:
        save("scala-catalogs.json", scala_catalogs())
    names = list(SITES) if "sites" in only else [a.split(":", 1)[1] for a in only if a.startswith("site:")]
    if names:
        for name, starts in ((n, SITES[n]) for n in names):
            flt = INTELBRAS_FILTER if name == "intelbras" else None
            data = crawl(name, starts, max_pages=260 if name == "intelbras" else 200, url_filter=flt)
            save(f"site-{name}.json", data)
            print(f"{name}: {len(data['pages'])} páginas, {len(data['sitemap'])} no sitemap, {len(data['errors'])} erros", flush=True)


if __name__ == "__main__":
    main()
