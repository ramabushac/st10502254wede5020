# WEDE5020 Part 3 Technical Audit

**Student:** Calvin Ramabusha  
**Student number:** ST10502254  
**Project:** Hope Connect Foundation  
**Verification date:** 12 October 2026

## Package status

The Part 3 package has been merged with the retained Part 2 assets, including the image library, responsive image versions, wireframes and testing screenshots. The package contains eight website pages, shared CSS and JavaScript, testing scripts, SEO files and project documentation.

## Static verification completed

- 8 HTML pages present.
- Exactly one `h1` per page.
- No missing local HTML/CSS/JavaScript/link/image references detected.
- No HTML images without `alt` text detected.
- 33 unit tests passed and 0 failed.
- Dynamic Services and Projects scripts are included.
- Contact, Enquiry and Volunteer forms are included.
- `robots.txt` and `sitemap.xml` are included and use the documented GitHub Pages address.
- Part 2 wireframes and responsive testing screenshots are retained.

## E2E test status

The repository contains `tests/e2e.test.js`, which covers dynamic content, search, filtering, sorting, form validation, AJAX success/failure paths, honeypot protection, volunteer submission and 375px responsive overflow. However, the Playwright package is not installed in the current verification environment, so the E2E suite was **not claimed as passed**.

To run it locally:

```text
npm install playwright
python -m http.server 8765
node tests/e2e.test.js
```

## Live deployment status

The README and sitemap use the intended GitHub Pages address:
`https://ramabushac.github.io/st10502254wede5020/`

The live site should still be opened manually before submission. Email delivery must also be tested after the Formspree endpoint is configured. The current endpoint contains `YOUR_FORM_ID`, so the forms remain in documented demo mode until deployment configuration is completed.

## Remaining submission checks

1. Run the Playwright suite after installing the dependency.
2. Open all eight pages on the final live URL.
3. Test navigation and responsive layouts in Chrome/Edge/Firefox and on a phone/tablet.
4. Configure the Formspree endpoint and submit each form.
5. Confirm that submitted emails arrive at the intended mailbox.
6. Replace any sample organisation contact details, costs and availability with approved project information.
7. Confirm that all image licences/permissions are appropriate before public deployment.
