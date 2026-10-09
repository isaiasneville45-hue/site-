#!/usr/bin/env python3
"""
Baixa e otimiza as imagens do site a partir de apag/scripts/assets/manifest.json.

- Produtos  → apag/public/produtos/{categoria}/{id}.webp   (lado maior até 800px)
- Fotos     → apag/public/fotos/{id}-{largura}.webp        (larguras do manifest)
- Créditos  → apag/public/produtos/CREDITOS.md
- Relatório → apag/scripts/assets/research/download-report.json

Também pode recortar imagens de páginas de PDF (catálogos), quando o manifest
indicar "pdf" + "pdf_page" + "crop" (frações 0..1 da página: [x0, y0, x1, y1]).

Uso local (precisa de internet e de `pip install pillow`; poppler para PDFs):
    python3 apag/scripts/assets/download.py
"""
import io
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
APAG = os.path.abspath(os.path.join(HERE, "..", ".."))
PUBLIC = os.path.join(APAG, "public")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
MAX_PRODUCT = 800
_pdf_cache = {}


def fetch(url, referer=None, timeout=60):
    headers = {"User-Agent": UA, "Accept": "image/avif,image/webp,image/*,*/*;q=0.8"}
    if "wikimedia.org" in url:
        # a Wikimedia pede um User-Agent identificável e limita a taxa (HTTP 429)
        headers["User-Agent"] = "apag-site-build/1.0 (github.com/isaiasneville45-hue/site-)"
    if referer:
        headers["Referer"] = referer
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read()
            if "wikimedia.org" in url:
                time.sleep(3)
            return data
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == 4:
                raise
            time.sleep(15 * (attempt + 1))


def open_image(data):
    im = Image.open(io.BytesIO(data))
    im = ImageOps.exif_transpose(im)
    if im.mode in ("P", "LA", "PA"):
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    return im


def trim_white(im, tolerance=12, pad=0.04):
    """Corta bordas brancas/transparentes excessivas (fotos de catálogo) mantendo uma folga."""
    rgb = im.convert("RGB")
    # caixa do conteúdo: pixels que não são (quase) brancos e não são transparentes
    gray = ImageOps.grayscale(rgb)
    mask = gray.point(lambda p: 255 if p < 255 - tolerance else 0)
    if im.mode == "RGBA":
        alpha = im.getchannel("A").point(lambda a: 255 if a > 16 else 0)
        mask = Image.composite(mask, Image.new("L", im.size, 0), alpha)
    box = mask.getbbox()
    if not box:
        return im
    w, h = im.size
    px, py = int(w * pad), int(h * pad)
    box = (max(0, box[0] - px), max(0, box[1] - py), min(w, box[2] + px), min(h, box[3] + py))
    return im.crop(box)


def crop_43(im, fx=0.5, fy=0.5):
    """Maior recorte 4:3 da imagem, centrado o mais perto possível de (fx, fy)."""
    w, h = im.size
    cw, ch = (w, round(w * 3 / 4)) if w * 3 / 4 <= h else (round(h * 4 / 3), h)
    x0 = min(max(0, round(fx * w - cw / 2)), w - cw)
    y0 = min(max(0, round(fy * h - ch / 2)), h - ch)
    return im.crop((x0, y0, x0 + cw, y0 + ch))


def save_webp(im, path, max_side=None, width=None, quality=82):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if max_side and max(im.size) > max_side:
        im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)
    return {"w": im.width, "h": im.height, "bytes": os.path.getsize(path)}


def pdf_page_image(pdf_url, page, dpi=150):
    if pdf_url not in _pdf_cache:
        data = fetch(pdf_url, timeout=180)
        tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
        tmp.write(data)
        tmp.close()
        _pdf_cache[pdf_url] = tmp.name
    out = tempfile.mktemp()
    subprocess.run(["pdftoppm", "-r", str(dpi), "-f", str(page), "-l", str(page), "-png", "-singlefile", _pdf_cache[pdf_url], out], check=True)
    return Image.open(out + ".png").convert("RGB")


def main():
    manifest_path = os.path.join(HERE, "manifest.json")
    with open(manifest_path) as f:
        manifest = json.load(f)
    report = {"products": [], "photos": []}

    only_photos = "photos" in sys.argv[1:]  # não baixa de novo os produtos já salvos
    for item in manifest.get("products", []):
        dest = os.path.join(PUBLIC, "produtos", item["category"], f"{item['id']}.webp")
        entry = {"category": item["category"], "id": item["id"], "dest": os.path.relpath(dest, APAG)}
        try:
            if item.get("local") or (only_photos and os.path.exists(dest)):
                # gerada localmente (ex.: recortes do catálogo da Scala por scala_crops.py)
                if not os.path.exists(dest):
                    raise FileNotFoundError(dest)
                entry["ok"] = True
                report["products"].append(entry)
                print(f"OK   produto {item['category']}/{item['id']} (local)", flush=True)
                continue
            if item.get("pdf"):
                im = pdf_page_image(item["pdf"], item["pdf_page"])
                x0, y0, x1, y1 = item["crop"]
                im = im.crop((int(x0 * im.width), int(y0 * im.height), int(x1 * im.width), int(y1 * im.height)))
            else:
                last_err = None
                for url in [item["url"], *item.get("fallbacks", [])]:
                    try:
                        im = open_image(fetch(url, referer=item.get("page")))
                        entry["used_url"] = url
                        break
                    except Exception as e:  # noqa: BLE001
                        last_err = e
                else:
                    raise last_err or RuntimeError("sem URL")
            if item.get("cover"):
                # foto com fundo: recorte 4:3 em torno do produto (foco x, y em 0..1)
                im = crop_43(im.convert("RGB"), *item["cover"])
            elif item.get("trim", True):
                im = trim_white(im)
            entry.update(save_webp(im, dest, max_side=MAX_PRODUCT))
            entry["ok"] = True
        except Exception as e:  # noqa: BLE001
            entry["ok"] = False
            entry["error"] = f"{type(e).__name__}: {e}"
        report["products"].append(entry)
        print(("OK  " if entry["ok"] else "ERRO") + f" produto {item['category']}/{item['id']} {entry.get('error', '')}", flush=True)

    for item in manifest.get("photos", []):
        entry = {"id": item["id"], "files": []}
        try:
            source = None
            for width in item.get("widths", [800, 1600]):
                url = item["url"]
                if "images.unsplash.com" in url:
                    parts = urllib.parse.urlsplit(url)
                    query = urllib.parse.urlencode({"w": width, "q": 80, "fm": "jpg", "fit": "max"})
                    url = urllib.parse.urlunsplit((parts.scheme, parts.netloc, parts.path, query, ""))
                    im = open_image(fetch(url, referer=item.get("page")))
                else:
                    # mesma imagem para todas as larguras: baixa uma vez só
                    source = source or open_image(fetch(url, referer=item.get("page")))
                    im = source.copy()
                if im.mode == "RGBA":
                    im = im.convert("RGB")
                dest = os.path.join(PUBLIC, "fotos", f"{item['id']}-{width}.webp")
                info = save_webp(im, dest, width=width, quality=78)
                entry["files"].append({"dest": os.path.relpath(dest, APAG), **info})
            entry["ok"] = True
        except Exception as e:  # noqa: BLE001
            entry["ok"] = False
            entry["error"] = f"{type(e).__name__}: {e}"
        report["photos"].append(entry)
        print(("OK  " if entry["ok"] else "ERRO") + f" foto {item['id']} {entry.get('error', '')}", flush=True)

    write_credits(manifest, report)
    os.makedirs(os.path.join(HERE, "research"), exist_ok=True)
    with open(os.path.join(HERE, "research", "download-report.json"), "w") as f:
        json.dump(report, f, ensure_ascii=False, indent=1)
    failed = [p for p in report["products"] + report["photos"] if not p["ok"]]
    print(f"\n{len(report['products'])} produtos, {len(report['photos'])} fotos, {len(failed)} falhas")


def write_credits(manifest, report):
    ok_products = {(p["category"], p["id"]) for p in report["products"] if p["ok"]}
    ok_photos = {p["id"] for p in report["photos"] if p["ok"]}
    lines = [
        "# Créditos das imagens",
        "",
        "Imagens otimizadas (WebP) e servidas pelo próprio site — nenhuma é carregada direto do site de origem.",
        "",
        "## Fotos de produtos",
        "",
        "Imagens dos catálogos e sites dos fabricantes/fornecedores, cujos produtos a APAG revende,",
        "e fotos de bancos de imagem livres (Wikimedia Commons / Openverse) quando o fornecedor não",
        "foi informado — nesse caso com autor e licença.",
        "",
        "| Arquivo | Produto | Fabricante | Origem | Autor / licença |",
        "| --- | --- | --- | --- | --- |",
    ]
    for item in manifest.get("products", []):
        if (item["category"], item["id"]) not in ok_products:
            continue
        origin = item.get("pdf") or item.get("page") or item.get("url")
        extra = f" (pág. {item['pdf_page']} do catálogo)" if item.get("pdf_page") else ""
        license_ = " — ".join(x for x in (item.get("author", ""), item.get("license", "")) if x) or "imagem do fabricante"
        lines.append(f"| `produtos/{item['category']}/{item['id']}.webp` | {item.get('name', item['id'])} | {item.get('brand', '')} | {origin}{extra} | {license_} |")
    lines += [
        "",
        "## Fotos humanizadas",
        "",
        "Fotos de bancos de imagem gratuitos, usadas conforme a licença de cada um.",
        "",
        "| Arquivos | Onde aparece | Autor | Origem | Licença |",
        "| --- | --- | --- | --- | --- |",
    ]
    for item in manifest.get("photos", []):
        if item["id"] not in ok_photos:
            continue
        files = ", ".join(f"`fotos/{item['id']}-{w}.webp`" for w in item.get("widths", [800, 1600]))
        lines.append(f"| {files} | {item.get('usage', '')} | {item.get('author', '')} | {item.get('page', item['url'])} | {item.get('license', 'Unsplash License (https://unsplash.com/license)')} |")
    lines.append("")
    dest = os.path.join(PUBLIC, "produtos", "CREDITOS.md")
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    sys.exit(main())
