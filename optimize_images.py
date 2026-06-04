#!/usr/bin/env python3
"""One-shot image optimizer. Makes WebP variants in fotky/opt/.
- *.webp        : full view, max 1280px long edge, q80
- *.thumb.webp  : preview/list, max 720px long edge, q72
Logos: max 256px, q85.
"""
import os
from collections import deque
from PIL import Image


def remove_white_bg(im, tol=18):
    """Flood-fill from the 4 corners, making near-white background transparent.
    Only removes white connected to the edges, so white parts inside the
    product (logos, text) stay. tol = how close to pure white counts as bg."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    thr = 255 - tol

    def is_white(x, y):
        r, g, b, a = px[x, y]
        return a > 0 and r >= thr and g >= thr and b >= thr

    visited = bytearray(w * h)
    q = deque()
    for cx, cy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if is_white(cx, cy):
            q.append((cx, cy))
            visited[cy * w + cx] = 1

    cleared = 0
    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        # feather alpha near edges of the product for a clean cut
        px[x, y] = (r, g, b, 0)
        cleared += 1
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny * w + nx]:
                if is_white(nx, ny):
                    visited[ny * w + nx] = 1
                    q.append((nx, ny))

    # soft-feather: any kept pixel touching a transparent one gets slight alpha drop
    return im

SRC = "fotky"
OUT = os.path.join(SRC, "opt")
os.makedirs(OUT, exist_ok=True)

# filename(without ext) -> ("full"|"thumb"|"logo")
LOGOS = {
    "discord_logo", "roblox_logo", "tidal_logo", "steam_logo",
    "instagram_logo", "xbox_logo", "youtube_logo", "gmail_logo",
    "dinbot", "deconomy",
}
# big galleries + game covers -> need both full + thumb
GALLERY = {
    "deconomy1", "deconomy2", "deconomy3", "deconomy4",
    "fivem1", "fivem2", "fivem3", "fivem4",
    "brawlstars1", "brawlstars2", "brawlstars3", "brawlstars4",
}
COVERS = {"minecraft", "fivem", "brawlstars", "cyberpunk", "hub"}
SONGS = {"song1", "song2", "song3", "song4", "song5"}


def fit(im, longedge):
    w, h = im.size
    scale = min(1.0, longedge / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    return im


def save_webp(im, path, q):
    if im.mode in ("P", "LA"):
        im = im.convert("RGBA")
    if im.mode == "RGBA":
        # keep alpha for logos, flatten others handled by caller
        im.save(path, "WEBP", quality=q, method=6)
    else:
        im.convert("RGB").save(path, "WEBP", quality=q, method=6)


def process():
    saved = 0
    total_before = 0
    total_after = 0
    for fn in sorted(os.listdir(SRC)):
        p = os.path.join(SRC, fn)
        if not os.path.isfile(p):
            continue
        name, ext = os.path.splitext(fn)
        if ext.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
            continue
        before = os.path.getsize(p)
        total_before += before
        try:
            im = Image.open(p)
            im.load()
        except Exception as e:
            print("skip", fn, e)
            continue

        if name in LOGOS:
            out = os.path.join(OUT, name + ".webp")
            save_webp(fit(im, 256), out, 88)
            total_after += os.path.getsize(out)
            saved += 1
        elif name in GALLERY:
            full = os.path.join(OUT, name + ".webp")
            thumb = os.path.join(OUT, name + ".thumb.webp")
            save_webp(fit(im.copy(), 1280), full, 80)
            save_webp(fit(im.copy(), 720), thumb, 70)
            total_after += os.path.getsize(full) + os.path.getsize(thumb)
            saved += 2
        elif name in COVERS or name in SONGS:
            full = os.path.join(OUT, name + ".webp")
            thumb = os.path.join(OUT, name + ".thumb.webp")
            save_webp(fit(im.copy(), 900), full, 80)
            save_webp(fit(im.copy(), 480), thumb, 72)
            total_after += os.path.getsize(full) + os.path.getsize(thumb)
            saved += 2
        else:
            out = os.path.join(OUT, name + ".webp")
            save_webp(fit(im, 1000), out, 80)
            total_after += os.path.getsize(out)
            saved += 1
        print(f"  {fn:24} {before/1024:8.0f} KB -> done")

    print(f"\n{saved} files written.")
    print(f"source total : {total_before/1024/1024:.2f} MB")
    print(f"optimized tot: {total_after/1024/1024:.2f} MB")


def process_category(cat, longedge=640, q=82):
    """Optimize raw photos dropped in fotky/<cat>/ in place.
    - reads .png/.jpg/.jpeg source files
    - strips a trailing '-removebg-preview' / 'removebg-preview' from the name
    - writes <slug>.webp (alpha kept), max `longedge`px
    - deletes the source file afterwards, leaving only optimized .webp
    Source name (minus ext + removebg suffix) = slug."""
    folder = os.path.join("fotky", cat)
    if not os.path.isdir(folder):
        print(f"no fotky/{cat}/ dir")
        return
    n = 0
    for fn in sorted(os.listdir(folder)):
        p = os.path.join(folder, fn)
        if not os.path.isfile(p):
            continue
        name, ext = os.path.splitext(fn)
        if ext.lower() not in (".png", ".jpg", ".jpeg"):
            continue  # skip already-optimized .webp
        # normalize slug: drop removebg suffix (with or without dash)
        slug = name
        for suffix in ("-removebg-preview", "removebg-preview"):
            if slug.endswith(suffix):
                slug = slug[: -len(suffix)]
                break
        try:
            im = Image.open(p)
            im.load()
        except Exception as e:
            print("skip", fn, e)
            continue
        op = os.path.join(folder, slug + ".webp")
        save_webp(fit(im, longedge), op, q)
        os.remove(p)  # keep only the optimized webp
        n += 1
        print(f"  {cat}: {fn} -> {slug}.webp")
    print(f"{n} {cat} images optimized (sources removed).")


if __name__ == "__main__":
    import sys
    # usage:
    #   python optimize_images.py            -> legacy bulk (old fotky/ -> fotky/opt/)
    #   python optimize_images.py <category> -> optimize fotky/<category>/ in place
    #     e.g. `python optimize_images.py setup`  or  `... thumbnails`
    if len(sys.argv) > 1:
        process_category(sys.argv[1])
    else:
        process()
