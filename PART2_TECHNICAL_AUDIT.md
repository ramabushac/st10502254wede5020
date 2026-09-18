# WEDE5020 Part 2 Technical Audit

Final source-level audit of the Hope Connect Foundation website.

## Results

- 7 HTML pages checked
- External `css/style.css` linked on all 7 pages
- Viewport meta tag present on all 7 pages
- `js/script.js` linked on all 7 pages
- No inline `style` attributes
- No missing local HTML, CSS, JavaScript or image references
- CSS parsed without syntax errors
- Content images have alternative text
- Contact form controls have associated labels
- Responsive `srcset` and `sizes` references verified
- Flexbox and CSS Grid verified
- Hover, focus and active states verified
- Mobile, tablet and desktop breakpoints verified
- 72 gallery content images have responsive variants
- 7 wireframe pages included

## Corrections Made

1. Corrected the malformed `srcset` attribute in `services.html`.
2. Removed the duplicate closing `</main>` from `gallery.html`.
3. Added labels and IDs to Contact form fields.
4. Added `rel="noopener noreferrer"` to the external Google Maps link.
5. Added explicit Part 2 mobile, tablet and desktop breakpoints.
6. Consolidated duplicate responsive/reduced-motion CSS rules.
7. Updated the README with the required changelog, testing instructions and screenshot evidence placeholders.

## Screenshot Evidence

Actual browser screenshots must be captured using Developer Tools/device emulation and inserted into `README.md` before repository submission.
