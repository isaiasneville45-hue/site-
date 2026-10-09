#!/usr/bin/env python3
"""
Recorta as fotos dos produtos de sinalização do catálogo em PDF do Grupo Scala
("Placas e adesivos de sinalização contra incêndio", catálogo 25 anos).

Cada página do PDF é uma imagem JPEG de 1025×1482 px. Os recortes usam
coordenadas na escala 713×1021 (a página renderizada a 90 dpi) e são feitos
na imagem original. Depois:
  - corta as bordas pela cor de fundo;
  - quando o selo com o código do catálogo ("E7", "S11"...) cobre o canto da
    placa, reconstrói esse canto com as cores da própria placa;
  - amplia 2× com nitidez e centraliza numa tela branca 4:3 (máx. 800×600).

Uso: python3 scala_crops.py caminho/do/catalogo.pdf pasta/de/saida
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter

SCALE = 1025 / 713  # página a 90 dpi → imagem original do PDF

# id: (página, (x0, y0, x1, y1), selo opcional (x0, y0, x1, y1), opções)
# Opções: "trim" (corta pelo fundo, padrão True), "debadge" (apaga o selo azul e o
# contorno cinza da chapa) e "donor": (página, janela, transformação) — o canto
# coberto pelo selo é copiado de outra placa espelhada ("mirror") ou girada
# ("rot180"); página None usa a própria placa (símbolos simétricos). "inset" corta
# alguns pixels da borda da placa.
CROPS = {
    # Orientação e salvamento (rota de fuga)
    "saida": (5, (585, 474, 685, 528), None, {}),
    "rota-de-fuga-seta": (5, (14, 104, 130, 166), (10, 98, 56, 134), {"donor": (5, (205, 104, 322, 166), "mirror")}),
    "escada-de-emergencia": (5, (390, 285, 510, 347), (388, 282, 438, 316), {"donor": (5, (205, 285, 322, 350), "mirror")}),
    "saida-acessivel": (5, (25, 746, 258, 800), None, {}),
    "porta-corta-fogo": (5, (205, 378, 322, 438), (205, 378, 243, 406), {}),
    "ponto-de-encontro": (10, (24, 244, 106, 356), None, {}),
    # Placas fotoluminescentes com laudo
    "fotoluminescente-laudo": (8, (24, 193, 528, 446), None, {"trim": False}),
    # Equipamentos de combate a incêndio
    "extintor": (7, (617, 107, 702, 173), None, {}),
    "hidrante": (7, (308, 100, 395, 173), (304, 98, 366, 134), {"donor": (None, None, "mirror")}),
    "mangotinho": (7, (206, 100, 292, 173), (202, 98, 264, 134), {"donor": (None, None, "mirror")}),
    "extintor-hidrante-coluna": (9, (40, 104, 306, 222), None, {}),
    "acionador-alarme": (7, (644, 507, 704, 584), None, {}),
    "bomba-de-incendio": (7, (538, 505, 598, 584), (530, 502, 568, 528), {"donor": (None, None, "mirror")}),
    "agente-extintor": (7, (274, 568, 388, 608), None, {}),
    "abrigo-hidrante": (10, (30, 648, 137, 679), None, {}),
    "hidrante-de-recalque": (10, (24, 874, 121, 952), None, {}),
    # Alerta (só o triângulo, sem o selo do catálogo)
    "alerta-inflamavel": (7, (133, 931, 186, 983), None, {"debadge": True}),
    "alerta-explosao": (7, (235, 931, 288, 983), None, {"debadge": True}),
    "alerta-choque-eletrico": (7, (438, 931, 491, 983), None, {"debadge": True}),
    # Proibição
    "proibido-fumar": (7, (35, 728, 97, 808), None, {"debadge": True}),
    "proibido-produzir-chama": (7, (185, 728, 247, 813), None, {"debadge": True}),
    "proibido-elevador": (7, (481, 728, 548, 810), None, {"debadge": True}),
    "proibido-obstruir": (7, (636, 728, 698, 809), None, {"debadge": True}),
    # Sinalização complementar e continuada
    "fita-antiderrapante": (4, (48, 84, 668, 318), None, {"trim": False}),
    "demarcacao-de-solo": (9, (469, 312, 664, 509), (460, 304, 500, 336), {"inset": 5}),
    "plano-de-fuga": (9, (315, 657, 692, 880), None, {"trim": False}),
}

# Faixas zebradas: duas faixas empilhadas numa imagem
STRIPES = {"faixas-zebradas": (4, [(22, 544, 370, 562), (22, 629, 370, 647)])}


def load_pages(pdf):
    tmp = tempfile.mkdtemp()
    subprocess.run(["pdfimages", "-j", "-p", pdf, os.path.join(tmp, "img")], check=True)
    pages = {}
    for name in os.listdir(tmp):
        page = int(name.split("-")[1])
        im = Image.open(os.path.join(tmp, name)).convert("RGB")
        if im.width > 900:  # a imagem de página inteira
            pages[page] = im
    return pages


def box(b):
    return tuple(int(round(v * SCALE)) for v in b)


def bg_color(arr):
    """Cor de fundo: mediana dos cantos inferiores (os de cima podem ter o selo)."""
    h, w, _ = arr.shape
    k = max(2, min(h, w) // 20)
    corners = np.concatenate([arr[h - k :, :k].reshape(-1, 3), arr[h - k :, w - k :].reshape(-1, 3)])
    return np.median(corners, axis=0)


def content_bbox(arr, bg, tol=38, ignore=None):
    diff = np.abs(arr.astype(int) - bg.astype(int)).sum(axis=2) > tol
    if ignore is not None:
        x0, y0, x1, y1 = ignore
        diff[y0:y1, x0:x1] = False
    rows = np.where(diff.sum(axis=1) > max(2, diff.shape[1] // 60))[0]
    cols = np.where(diff.sum(axis=0) > max(2, diff.shape[0] // 60))[0]
    if len(rows) == 0 or len(cols) == 0:
        return 0, 0, arr.shape[1], arr.shape[0]
    return cols[0], rows[0], cols[-1] + 1, rows[-1] + 1


def bluish(arr):
    a = arr.astype(int)
    return (a[:, :, 2] > a[:, :, 1] + 5) & (a[:, :, 2] > a[:, :, 0] + 25)


def longest_run(idx):
    """Maior sequência contígua de índices."""
    best, cur = (idx[0], idx[0]), (idx[0], idx[0])
    for i in idx[1:]:
        cur = (cur[0], i) if i == cur[1] + 1 else (i, i)
        if cur[1] - cur[0] > best[1] - best[0]:
            best = cur
    return best[0], best[1] + 1


def sign_rect(arr):
    """Retângulo da placa: linhas/colunas majoritariamente ocupadas por ela."""
    a = arr.astype(int)
    white = a.min(axis=2) > 232
    mask = ~bluish(arr) & ~white
    cols = mask.sum(axis=0)
    rows = mask.sum(axis=1)
    x0, x1 = longest_run(np.where(cols >= 0.35 * cols.max())[0])
    y0, y1 = longest_run(np.where(rows >= 0.35 * rows.max())[0])
    return x0, y0, x1, y1


def dominant(pixels):
    """Cor mais frequente (quantizada) de um conjunto de pixels."""
    q = (pixels // 24).astype(int)
    keys = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
    vals, counts = np.unique(keys, return_counts=True)
    top = vals[counts.argmax()]
    return pixels[keys == top].mean(axis=0)


def patch_badge(arr, badge):
    """Recorta a placa e reconstrói o canto coberto pelo selo do catálogo.

    A placa é um retângulo com moldura (largura medida na base) e fundo de uma
    cor só; o selo cobre o canto superior esquerdo. Dentro do selo, a moldura é
    repintada com a cor da moldura e o resto com a cor de fundo da placa,
    preservando os pixels creme do símbolo.
    """
    x0, y0, x1, y1 = sign_rect(arr)
    sign = arr[y0:y1, x0:x1].copy()
    h, w, _ = sign.shape
    a = sign.astype(int)
    frame = np.median(sign[h - 4 : h - 1, w // 4 : 3 * w // 4].reshape(-1, 3), axis=0)
    mid = w * 3 // 4
    band = 2  # a última linha costuma vir misturada com o fundo
    while band < h // 2 and np.abs(a[h - 1 - band, mid] - frame).sum() < 70:
        band += 1
    quad = sign[h // 2 : h - band, w // 2 : w - band].reshape(-1, 3)
    inner = dominant(quad)
    inner_is_cream = inner[0] > 200 and inner[1] > 180 and inner[2] < inner[1] - 25
    bx0, by0, bx1, by1 = badge
    bx0, by0 = max(0, bx0 - x0), max(0, by0 - y0)
    bx1, by1 = min(w, bx1 - x0 + 3), min(h, by1 - y0 + 3)
    for y in range(by0, by1):
        for x in range(bx0, bx1):
            r, g, b = (int(v) for v in sign[y, x])
            if min(x, y, w - 1 - x, h - 1 - y) < band:
                sign[y, x] = frame
            elif not inner_is_cream and r > 200 and g > 180 and b < g - 25:
                continue  # símbolo creme da placa: mantém
            else:
                sign[y, x] = inner
    if band > 8:  # moldura larga (demarcação): apaga traços do catálogo sobre ela
        edge = np.zeros((h, w), bool)
        edge[:band, :] = edge[-band:, :] = edge[:, :band] = edge[:, -band:] = True
        far = np.abs(sign.astype(int) - frame).sum(axis=2) > 60
        sign[edge & far] = frame
    return sign


def composite(arr, badge, donor_arr, transform):
    """Placa sem o selo: o canto coberto vem da placa doadora alinhada."""
    x0, y0, x1, y1 = sign_rect(arr)
    x0, y0, x1, y1 = x0 + 1, y0 + 1, x1 - 1, y1 - 1  # descarta a borda serrilhada
    sign = arr[y0:y1, x0:x1].copy()
    h, w, _ = sign.shape
    if donor_arr is None:  # a própria placa (símbolo simétrico)
        donor = Image.fromarray(sign)
    else:
        dx0, dy0, dx1, dy1 = sign_rect(donor_arr)
        donor = Image.fromarray(donor_arr[dy0 + 1 : dy1 - 1, dx0 + 1 : dx1 - 1])
    donor = donor.transpose(Image.FLIP_LEFT_RIGHT if transform == "mirror" else Image.ROTATE_180)
    donor = np.array(donor.resize((w, h), Image.LANCZOS))
    bx0, by0, bx1, by1 = badge
    bx0, by0 = max(0, bx0 - x0), max(0, by0 - y0)
    bx1, by1 = min(w, bx1 - x0 + 3), min(h, by1 - y0 + 3)
    sign[by0:by1, bx0:bx1] = donor[by0:by1, bx0:bx1]
    return sign


def finish(im, dest):
    """Amplia 2× com nitidez e centraliza numa tela branca 4:3 de até 800×600."""
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=90, threshold=2))
    canvas_w = 800
    canvas_h = 600
    fit = min(canvas_w * 0.84 / im.width, canvas_h * 0.84 / im.height, 1.6)
    im = im.resize((max(1, int(im.width * fit)), max(1, int(im.height * fit))), Image.LANCZOS)
    canvas = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
    canvas.paste(im, ((canvas_w - im.width) // 2, (canvas_h - im.height) // 2))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    canvas.save(dest, "WEBP", quality=86, method=6)


def main(pdf, out_dir):
    pages = load_pages(pdf)
    for pid, (page, window, badge, opts) in CROPS.items():
        im = pages[page].crop(box(window))
        arr = np.array(im)
        bg = bg_color(arr)
        if badge:
            bx0, by0, _, _ = box(window)
            b = box(badge)
            local = (b[0] - bx0, b[1] - by0, b[2] - bx0, b[3] - by0)
            if "donor" in opts:
                dpage, dwindow, transform = opts["donor"]
                donor_arr = np.array(pages[dpage].crop(box(dwindow))) if dpage else None
                arr = composite(arr, local, donor_arr, transform)
            else:
                arr = patch_badge(arr, local)
            k = opts.get("inset", 0)  # descarta traços do catálogo encostados na borda
            if k:
                arr = arr[k:-k, k:-k]
            finish(Image.fromarray(arr), os.path.join(out_dir, f"{pid}.webp"))
            print("ok", pid)
            continue
        if opts.get("debadge"):
            # selo do catálogo (azul) e contorno cinza da chapa viram branco
            a = arr.astype(int)
            gray = (a.min(axis=2) > 165) & (a.max(axis=2) - a.min(axis=2) < 25)
            cyan = a[:, :, 2] > a[:, :, 0] + 15  # estas placas não têm azul
            arr[bluish(arr) | cyan | gray] = 255
            bg = np.array([255, 255, 255])
        if opts.get("trim", True):
            x0, y0, x1, y1 = content_bbox(arr, bg)
            pad = 6
            arr = arr[max(0, y0 - pad) : y1 + pad, max(0, x0 - pad) : x1 + pad]
            # fundo colorido (azul do catálogo) vira branco nas bordas
            mask = np.abs(arr.astype(int) - bg.astype(int)).sum(axis=2) <= 38
            if bg.mean() < 245:
                edge = np.zeros_like(mask)
                edge[:pad + 1, :] = edge[-pad - 1 :, :] = True
                edge[:, :pad + 1] = edge[:, -pad - 1 :] = True
                arr[mask & edge] = 255
        finish(Image.fromarray(arr), os.path.join(out_dir, f"{pid}.webp"))
        print("ok", pid)
    for pid, (page, windows) in STRIPES.items():
        parts = [pages[page].crop(box(w)) for w in windows]
        gap = 18
        w = max(p.width for p in parts)
        stack = Image.new("RGB", (w, sum(p.height for p in parts) + gap * (len(parts) - 1)), (255, 255, 255))
        y = 0
        for p in parts:
            stack.paste(p, (0, y))
            y += p.height + gap
        finish(stack, os.path.join(out_dir, f"{pid}.webp"))
        print("ok", pid)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
