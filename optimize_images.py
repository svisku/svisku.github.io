#!/usr/bin/env python3
"""One-shot image optimizer. Makes WebP variants in fotky/opt/.
- *.webp        : full view, max 1280px long edge, q80
- *.thumb.webp  : preview/list, max 720px long edge, q72
Logos: max 256px, q85.
"""
import os
from PIL import Image

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


if __name__ == "__main__":
    process()
