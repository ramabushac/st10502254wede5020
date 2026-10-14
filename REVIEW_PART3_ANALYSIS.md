# Hope Connect Foundation - Part 3 Analysis and Improvements

**Student:** Calvin Ramabusha | **Module:** WEDE5020 | **Date:** 14 October 2026

## 1. How the project was analysed

All 10 HTML pages, the three scripts, the stylesheet, `_headers`, `robots.txt`, `sitemap.xml`, the images and the documentation were read. The existing unit tests were re-run (33 passed). A new dependency-free check suite, `tests/static.test.js`, was written and run against both the submitted version and the improved version.

| Version | Passed | Failed | Warnings |
|---|---|---|---|
| Submitted | 857 | 23 | 2 |
| Improved | 880 | 0 | 2 |

## 2. Findings and what was done

| # | Area | Finding | Action |
|---|---|---|---|
| 1 | SEO | Six pages used the same `h1` ("Hope Connect Foundation"), while About and Services used page titles. The README said this was by design, but it gives search engines no page-specific signal. | Every page now has a unique `h1`; the site name became a styled paragraph (same look). |
| 2 | SEO | No `og:image` on any page, so shared links had no preview picture. | Added `og:image`, `og:image:alt`, `twitter:image` and a large-image card. |
| 3 | SEO / consistency | `lang` was `en` on some pages and `en-ZA` on others; Font Awesome 6.5.0 and 6.5.2 were mixed. | One value and one version across all pages. |
| 4 | Documentation | README meta description lengths did not match the pages (for example 152 against an actual 154). | Table regenerated from the real pages. |
| 5 | Sitemap | `lastmod` dates were stale. | Updated to 14 October 2026. |
| 6 | Accessibility | The gallery viewer did not move focus into the dialog, did not trap Tab, did not return focus on close, and the page could scroll behind it. | Rewrote the viewer logic in `js/script.js` (focus, trap, scroll lock, `aria-modal`). |
| 7 | Accessibility | Decorative Font Awesome icons were not hidden from screen readers. | `aria-hidden="true"` added everywhere. |
| 8 | Code quality | A branch in `js/script.js` handled forms without `data-ajax-form`; every form already has it, so it was dead code. | Removed. |
| 9 | Performance | The `images/` folder was about 100 MB; originals are used by the lightbox and as image fallbacks. | 44 originals limited to 2400 px and recompressed: about 50 MB down to 27 MB (folder about 39 MB). |
| 10 | Security | No Content Security Policy; no caching rules. | Added a report-only CSP and cache headers to `_headers` (Netlify only). |
| 11 | Testing | No automated check for SEO, links or accessibility basics. | Added `tests/static.test.js` (880 checks). |

## 3. Still open (needs your input, not guessed)

1. **Phone number is invalid.** `contact.html` shows `+27 73 608 861`, which has 8 digits after the country code; South African numbers have 9. It also fails the site's own phone validation rule. Replace it with the real number (the static test will stop warning once it is correct).
2. **Forms are in demo mode.** `CONFIG.endpoint` in `js/forms.js` is still `YOUR_FORM_ID`. Create the Formspree form and paste the address in, then test delivery.
3. **Part 1 lecturer feedback** is still a `TODO (student)` in README section 12. The Part 2 rubric lost 3 / 10 on exactly this, so paste the real feedback and your response to each point.
4. **Manual test table (README 10.2)** is blank. Complete it from your own browser and device testing.
5. **Playwright browser tests** have still not been run (the package is not installed here). Run `npm i -D playwright`, `npx playwright install chromium`, then `node tests/e2e.test.js`. Do not report a result until it has run.
6. **Image licences and quality.** Watermarked stock photo, a UK health-campaign poster and a personal photo are still in the gallery. There are also 7 byte-identical pairs of original images (for example `painted-handprints-red-heart-them` and `-2`, `volunteers-packing-charity-boxes-van` and `...medicine-supplies...`). Confirm permission, then remove or replace; deleting them means editing the pages that reference them, so it was not done automatically.
7. **Duplicated business rules.** Costs and availability appear in both `js/data.js` and `enquiryResponse()` in `js/forms.js`. If you change one, change the other (a good refactor if time allows).
8. **Content Security Policy** is report-only and untested on a live host. Check the console after deploying, then switch it to enforcing.
9. **Lighthouse scores** have not been measured; run Lighthouse on the live site and record the real numbers.
10. **Subresource Integrity** for Font Awesome needs the hash from cdnjs (not available offline, so it was not invented).
11. **Image dimensions.** `width` and `height` attributes would reduce layout shift, but some images are sized by CSS and need checking in a browser first.
