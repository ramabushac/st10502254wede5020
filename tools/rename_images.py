#!/usr/bin/env python3
"""
Give the website images descriptive, SEO-friendly file names (WEDE5020 Part 3, 3.1 On-Page SEO).

What it does
  1. Renames each original image in images/ and its resized copies in images/responsive/
     (for example alexander-simonsen-44al1GlFVxo-unsplash.jpg becomes
     hope-connect-volunteer-loading-boxes-face-masks-car.jpg).
  2. Updates every reference in the .html, .css, .js, .md and .xml files so nothing breaks.
  3. Checks that every image referenced afterwards exists.

Usage (run from the project folder, the one that contains index.html):
  python tools/rename_images.py            dry run: shows what would change, changes nothing
  python tools/rename_images.py --apply    performs the renames (uses git mv when available)

Tip: commit your work first so the change can be reviewed or undone with git.
"""
import os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
APPLY = "--apply" in sys.argv
SIZES = ("480", "960", "1440")

MAPPING = {
  "logo.png": "hope-connect-title-slide-hope-connect-foundation-project.png",
  "alexander-simonsen-44al1GlFVxo-unsplash.jpg": "hope-connect-volunteer-loading-boxes-face-masks-car.jpg",
  "alvin-david-0AKPfr-xlCU-unsplash.jpg": "hope-connect-volunteers-sorting-donated-goods-boxes-large.jpg",
  "andrea-buccelli-9b87lrCpdOQ-unsplash.jpg": "hope-connect-woman-volunteer-painting-road-markings-city.jpg",
  "austin-kehmeier-lyiKExA4zQA-unsplash.jpg": "hope-connect-two-hands-reaching-towards-each-other.jpg",
  "back.webp": "hope-connect-open-road-leading-towards-snow-capped.webp",
  "back2.jpeg": "hope-connect-road-winding-through-autumn-forest.jpeg",
  "back3.webp": "hope-connect-glass-sphere-dark-rocks-reflecting-sunset.webp",
  "back4.jpeg": "hope-connect-straight-road-yellow-centre-line-tall.jpeg",
  "back5.jpeg": "hope-connect-glass-ball-resting-wet-sand-sunset.jpeg",
  "brian-yurasits-PzQNdXw2a6g-unsplash.jpg": "hope-connect-volunteers-cleaning-litter-beach.jpg",
  "camylla-battani-ABVE1cyT7hk-unsplash.jpg": "hope-connect-group-volunteers-placing-hands-together-circle.jpg",
  "centre-for-ageing-better-7FHjL_TJlA8-unsplash.jpg": "hope-connect-two-healthcare-workers-smiling-talking-clinic.jpg",
  "chaiyananuwatmongkolchai-volunteer-7788809_1920.jpg": "hope-connect-volunteer-holding-clear-plastic-bag-collecting.jpg",
  "com.webp": "hope-connect-audience-listening-speaker-community-event.webp",
  "community.jpeg": "hope-connect-volunteers-blue-shirts-serving-food-outdoor.jpeg",
  "cristi-tohatan-XIBIC21QeZQ-unsplash.jpg": "hope-connect-three-friends-sitting-laughing-together-park.jpg",
  "dakota-corbin-xh4mG4cqHGg-unsplash.jpg": "hope-connect-wall-mural-reading-best-gift-you.jpg",
  "dan-meyers-hluOJZjLVXc-unsplash.jpg": "hope-connect-fence-signs-reading-dont-give.jpg",
  "food.webp": "hope-connect-volunteers-cheering-hall-filled-boxes-donated.webp",
  "geralt-volunteer-2654000_1920.jpg": "hope-connect-three-raised-hands-green-world-map.jpg",
  "geralt-volunteer-2654003_1920.jpg": "hope-connect-illustration-two-raised-hands-warm-red.jpg",
  "geralt-volunteer-2654004_1920.jpg": "hope-connect-many-raised-hands-different-skin-tones.jpg",
  "geralt-volunteer-2729696_1920.png": "hope-connect-tree-whose-leaves-colourful-handprints-black.png",
  "geralt-volunteer-3874924_1920.png": "hope-connect-volunteers-needed-poster-colourful-raised-hands.png",
  "geralt-volunteer-601662_1920.jpg": "hope-connect-frame-colourful-hands-empty-white-space.jpg",
  "hannah-busing-Zyx1bK9mqmA-unsplash.jpg": "hope-connect-close-up-peoples-hands-stacked.jpg",
  "helena-lopes-PGnqT0rXWLs-unsplash.jpg": "hope-connect-four-friends-arms-each-other-watching.jpg",
  "help.jpg": "hope-connect-volunteers-handing-out-food-parcels-outdoor.jpg",
  "help3.webp": "hope-connect-rescuers-helping-stranded-whales-beach.webp",
  "helth.webp": "hope-connect-health-campaign-poster-slogan-simple-swaps.webp",
  "hul.webp": "hope-connect-health-campaign-poster-slogan-simple-swaps-2.webp",
  "jake-schumacher-FShcc4u-6bY-unsplash (1).jpg": "hope-connect-group-people-gathered-public-square-dusk.jpg",
  "jake-schumacher-FShcc4u-6bY-unsplash.jpg": "hope-connect-group-people-gathered-public-square-dusk-2.jpg",
  "joel-muniz-qvzjG2pF4bE-unsplash.jpg": "hope-connect-volunteers-packing-meals-bags-distribution.jpg",
  "jonathan-caliguire-eCvSi4E-AT8-unsplash.jpg": "hope-connect-volunteer-using-tool-dig-planting-tree.jpg",
  "ludiarin-candlelight-1121859_1920.jpg": "hope-connect-single-candle-burning-dark.jpg",
  "maky_orel-solidarity-5030921_1920.png": "hope-connect-heart-held-two-hands-inside-red.png",
  "manh-phung-FsrECS_i2Ms-unsplash.jpg": "hope-connect-group-smiling-young-volunteers-riding-farm.jpg",
  "ment.webp": "hope-connect-young-people-mentor-group-discussion-classroom.webp",
  "ocg-saving-the-ocean-_1j7_atc0z8-unsplash.jpg": "hope-connect-volunteers-blue-shirts-gathered-beach-litter.jpg",
  "ocg-saving-the-ocean-bWAArZ5M4Ag-unsplash.jpg": "hope-connect-volunteers-picking-up-litter-along-shoreline.jpg",
  "ocg-saving-the-ocean-cyxRGU7keTw-unsplash.jpg": "hope-connect-volunteers-collecting-rubbish-boats-waters.jpg",
  "pexels-cottonbro-6565761.jpg": "hope-connect-person-receiving-eco-volunteering-leaflet.jpg",
  "pexels-cottonbro-6590928.jpg": "hope-connect-volunteers-unpacking-boxes-food-donations-table.jpg",
  "pexels-cottonbro-6590932.jpg": "hope-connect-two-volunteers-checking-items-clipboard.jpg",
  "pexels-cottonbro-6591154.jpg": "hope-connect-four-volunteers-sorting-fresh-food-boxes.jpg",
  "pexels-deetalks-17727975.jpg": "hope-connect-two-children-sitting-dry-ground-rural.jpg",
  "pexels-gustavo-fring-7156163.jpg": "hope-connect-volunteers-sorting-clothing-supplies-donation-boxes.jpg",
  "pexels-gustavo-fring-7156167.jpg": "hope-connect-smiling-volunteer-packing-donations-box-colleagues.jpg",
  "pexels-gustavo-fring-7156168.jpg": "hope-connect-volunteers-wearing-gloves-sorting-items-donation.jpg",
  "pexels-julia-m-cameron-6995106.jpg": "hope-connect-team-volunteers-smiling-tables-donated-clothing.jpg",
  "pexels-mikhail-nilov-7475711.jpg": "hope-connect-volunteer-blue-tshirt-holding-two.jpg",
  "pexels-mikhail-nilov-8543101.jpg": "hope-connect-close-up-volunteer-tshirt-potted.jpg",
  "pexels-rdne-6646940 (1).jpg": "hope-connect-volunteers-packing-medicine-supplies-charity-boxes.jpg",
  "pexels-rdne-6646940.jpg": "hope-connect-volunteers-packing-charity-boxes-van.jpg",
  "pexels-rdne-6646948.jpg": "hope-connect-volunteer-wearing-mask-holding-box-food.jpg",
  "pexels-seyhmuskino-30616681.jpg": "hope-connect-women-child-receiving-bag-food-village.jpg",
  "pic.jpg": "hope-connect-young-man-standing-doorway-building.jpg",
  "pic2.jpg": "hope-connect-young-man-sitting-chair-outdoors.jpg",
  "plant.webp": "hope-connect-volunteers-planting-trees-shrubs-woodland.webp",
  "premium_photo-volunteer.avif": "hope-connect-volunteer-badge-hanging-jacket.avif",
  "ramcal.png": "hope-connect-fresh-salad-tomatoes-olives-basil.png",
  "ramcal1.png": "hope-connect-bundle-fresh-green-asparagus-tied-string.png",
  "ray-sangga-kusuma-7uSrOyY1U0I-unsplash.jpg": "hope-connect-volunteer-volunteer-shirt-taking-photograph-event.jpg",
  "rod-long-89bQBucvJdw-unsplash (1).jpg": "hope-connect-painted-handprints-red-heart-them.jpg",
  "rod-long-89bQBucvJdw-unsplash.jpg": "hope-connect-painted-handprints-red-heart-them-2.jpg",
  "steve-jewett-dxKQfMaZDVM-unsplash.jpg": "hope-connect-group-hikers-posing-trail-red-bucket.jpg",
  "tut.webp": "hope-connect-teacher-helping-children-schoolwork-table.webp",
  "vitaly-gariev-_RInM2eMgLQ-unsplash.jpg": "hope-connect-smiling-volunteer-holding-blue-bag-during.jpg",
  "youssef-naddam-iJ2IG8ckCpA-unsplash.jpg": "hope-connect-two-hands-reaching-each-other-sky.jpg",
  "pic3.jpg": "hope-connect-smiling-woman-sunglasses-outside-house.jpg"
}

TEXT_EXT = (".html", ".css", ".js", ".md", ".xml")


def in_git():
    try:
        return subprocess.run(["git", "-C", ROOT, "rev-parse", "--is-inside-work-tree"], capture_output=True).returncode == 0
    except OSError:
        return False


USE_GIT = in_git()


def move(src, dst):
    if not os.path.exists(src):
        return False
    print(("RENAME  " if APPLY else "WOULD RENAME  ") + os.path.relpath(src, ROOT) + "  ->  " + os.path.relpath(dst, ROOT))
    if APPLY:
        if USE_GIT and subprocess.run(["git", "-C", ROOT, "mv", src, dst], capture_output=True).returncode == 0:
            return True
        os.rename(src, dst)
    return True


def main():
    pairs = []   # (old reference prefix, new reference prefix)
    renamed = 0
    for old, new in MAPPING.items():
        stem_old, ext = os.path.splitext(old)
        stem_new = os.path.splitext(new)[0]
        if move(os.path.join(ROOT, "images", old), os.path.join(ROOT, "images", new)):
            renamed += 1
        for size in SIZES:
            move(os.path.join(ROOT, "images", "responsive", f"{stem_old}-{size}{ext}"),
                 os.path.join(ROOT, "images", "responsive", f"{stem_new}-{size}{ext}"))
        pairs.append(("images/" + old, "images/" + new))
        pairs.append(("images/responsive/" + stem_old + "-", "images/responsive/" + stem_new + "-"))
    pairs.sort(key=lambda p: -len(p[0]))   # longest first so similar names cannot clash

    changed_files = 0
    for folder, _dirs, files in os.walk(ROOT):
        if ".git" in folder.split(os.sep) or os.sep + "tools" in folder:
            continue
        for name in files:
            if not name.endswith(TEXT_EXT):
                continue
            path = os.path.join(folder, name)
            with open(path, encoding="utf-8") as fh:
                text = fh.read()
            updated = text
            for old, new in pairs:
                updated = updated.replace(old, new)
            if updated != text:
                changed_files += 1
                print(("UPDATE  " if APPLY else "WOULD UPDATE  ") + os.path.relpath(path, ROOT))
                if APPLY:
                    with open(path, "w", encoding="utf-8") as fh:
                        fh.write(updated)

    print(f"\n{renamed} original images {'renamed' if APPLY else 'would be renamed'}; {changed_files} files {'updated' if APPLY else 'would be updated'}.")
    if not APPLY:
        print("Dry run only. Run again with --apply to make the changes.")
        return

    missing = set()
    ref = re.compile(r"images/(?:responsive/)?[^\"'()<>,]+?\.(?:jpg|jpeg|png|webp|avif|gif|svg)")
    for folder, _dirs, files in os.walk(ROOT):
        if ".git" in folder.split(os.sep):
            continue
        for name in files:
            if name.endswith((".html", ".css")):
                with open(os.path.join(folder, name), encoding="utf-8") as fh:
                    for match in ref.findall(fh.read()):
                        target = os.path.normpath(os.path.join(ROOT if name.endswith(".html") else os.path.join(ROOT, "css"), match if name.endswith(".html") else "../" + match))
                        if not os.path.exists(target):
                            missing.add(match)
    if missing:
        print("WARNING: these referenced images were not found (check the names):")
        for m in sorted(missing):
            print("  " + m)
    else:
        print("Check passed: every referenced image exists.")


if __name__ == "__main__":
    main()
