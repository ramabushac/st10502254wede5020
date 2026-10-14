# Hope Connect Foundation - Part 3 Review Improvements

**Student:** Calvin Ramabusha  
**Student Number:** ST10502254  
**Module:** WEDE5020

## Purpose

This note records the useful, low-risk improvements taken from the Part 3 review/report and added to the supplied Part 3 project. Existing Part 2 and Part 3 work was preserved rather than rebuilt.

## Improvements added

1. **Privacy Notice**
   - Added `privacy.html`.
   - Explains the form fields, intended use of submitted information and the current demo-mode limitation.
   - Notes that a real deployment should provide a fuller POPIA-aligned privacy notice.

2. **Custom 404 page**
   - Added `404.html`.
   - Gives visitors a clear link back to Home and Contact.
   - Uses `noindex` because a missing-page response should not be treated as normal search content.

3. **Favicon**
   - Added `favicon.svg`.
   - Linked it from the website pages.

4. **Dynamic-content loading feedback**
   - Services and Projects now display `Loading content...` before JavaScript renders the cards.
   - Added `aria-busy` to the dynamic results area and set it to false after rendering.

5. **Footer utility links**
   - Main pages now provide direct links to the Privacy Notice and Contact page.

6. **Sitemap update**
   - Added the Privacy Notice to `sitemap.xml`.
   - The 404 page is not included in the sitemap.

7. **Documentation**
   - Updated `README.md` with the review improvements and a new changelog entry.
   - The README clearly separates completed work from items that still require live deployment, external-service configuration or licence confirmation.

## Items deliberately not claimed as completed

- Lighthouse performance/accessibility scores were not invented. They should be captured from a real deployed or locally served site.
- Playwright browser tests were attempted in the available environment, but the `playwright` Node package was not installed, so no browser-test score is claimed.
- The Formspree endpoint remains a placeholder in the supplied project. Forms therefore remain in demo mode until a real endpoint is configured.
- Image licences/permissions have not been assumed. The supplied image collection should be reviewed before real public use, including the duplicated/sample images identified during the review.

## Validation performed after the changes

- Unit test suite: **33 passed, 0 failed**.
- Static HTML check: **10 HTML pages present** including the new privacy and 404 support pages.
- Local-reference check: **no missing local HTML, image, stylesheet, script or favicon references found**.
- Main-page footer check: Privacy Notice links were added successfully.
