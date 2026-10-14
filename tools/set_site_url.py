#!/usr/bin/env python3
"""
Update the website address in one step (canonical tags, Open Graph URLs, share links,
sitemap.xml and robots.txt) once you know where the site is hosted.

Usage (run from the project folder):
  python tools/set_site_url.py https://your-site.netlify.app/
  python tools/set_site_url.py https://username.github.io/repository/
"""
import os, re, sys, urllib.parse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OLD = "https://ramabushac.github.io/st10502254wede5020/"

if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit("Usage: python tools/set_site_url.py https://your-site-address/")
new = sys.argv[1] if sys.argv[1].endswith("/") else sys.argv[1] + "/"

pairs = [(OLD, new), (urllib.parse.quote(OLD, safe=""), urllib.parse.quote(new, safe=""))]
changed = 0
for name in os.listdir(ROOT):
    if name.endswith((".html", ".xml", ".txt", ".md")):
        path = os.path.join(ROOT, name)
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
        updated = text
        for a, b in pairs:
            updated = updated.replace(a, b)
        if updated != text:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(updated)
            changed += 1
            print("updated", name)
print(f"Done: {changed} files now point to {new}")
