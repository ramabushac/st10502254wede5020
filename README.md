# Hope Connect Foundation - WEDE5020 Part 3

**Student:** Calvin Ramabusha  
**Student Number:** ST10502254  
**Module:** WEDE5020  
**Project:** Hope Connect Foundation Website  

## Table of Contents

| No. | Section | Description |
|---|---|---|
| 1 | [Project Overview](#1-project-overview) | Purpose and Part 2 focus |
| 2 | [Website Pages](#2-website-pages) | Eight website pages |
| 3 | [Project Structure](#3-project-structure) | Main project folders and files |
| 4 | [External CSS Stylesheet](#4-external-css-stylesheet) | Shared stylesheet and CSS features |
| 5 | [Typography](#5-typography) | Typography and relative sizing |
| 6 | [Layout Design](#6-layout-design) | Flexbox and CSS Grid |
| 7 | [Visual Styling and Interaction](#7-visual-styling-and-interaction) | Colours, borders, shadows and states |
| 8 | [Responsive Design](#8-responsive-design) | Breakpoints and responsive layouts |
| 9 | [Responsive Images](#9-responsive-images) | `srcset`, `sizes` and image variants |
| 10 | [Accessibility and Usability](#10-accessibility-and-usability) | Accessibility and usability features |
| 11 | [Part 2 Feedback Implemented and Changelog](#11-part-2-feedback-implemented-and-changelog) | Part 2 feedback and development changes |
| 12 | [Browser Developer Tools Testing](#12-browser-developer-tools-testing) | Test devices and checks |
| 13 | [Screenshot Evidence](#13-screenshot-evidence) | Desktop, tablet and mobile evidence |
| 14 | [Reflection](#14-reflection) | Learning reflection |
| 15 | [References](#15-references) | Technical and accessibility sources |
| 16 | [Final Part 3 Checklist](#16-final-part-3-checklist) | Submission verification |

## 1. Project Overview

Hope Connect Foundation is a non-profit organisation website developed for the WEDE5020 module. Part 3 builds on the Part 2 website by adding dynamic content, search/filter/sort functionality, enquiry and contact form processing, SEO improvements, technical files and deployment-ready testing.

The Part 2 implementation focuses on a shared external stylesheet, consistent visual design, typography, Flexbox, CSS Grid, interactive states, responsive images, accessibility and testing across desktop, tablet and mobile screen sizes.

## 2. Website Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Gallery | `gallery.html` |
| Get Involved | `get-involved.html` |
| Contact | `contact.html` |
| Service Enquiry | `enquiry.html` |

## 3. Project Structure

```text
st10502254wede5020/
├── index.html
├── about.html
├── services.html
├── projects.html
├── gallery.html
├── get-involved.html
├── contact.html
├── enquiry.html
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── responsive/
│   ├── testing-desktop-home-1920x1080.png
│   ├── testing-desktop-about-1366x768.png
│   ├── testing-tablet-services-1024x768.png
│   ├── testing-tablet-projects-768x1024.png
│   ├── testing-mobile-gallery-390x844.png
│   └── testing-mobile-contact-375x667.png
└── wireframes/
```

## 4. External CSS Stylesheet

All eight website pages use the shared external stylesheet:

`css/style.css`

The stylesheet provides:

- CSS reset and base styling
- Consistent colour variables
- Font family, font size, font weight, line height and letter spacing
- Consistent margins, padding and spacing
- Flexbox layouts for navigation and content sections
- CSS Grid layouts for cards, projects and galleries
- Borders, shadows, gradients and other visual styling
- `:hover`, `:focus-visible` and `:active` states
- Responsive breakpoints and relative units
- Responsive typography using `clamp()`
- Reduced-motion support
- Print-friendly styling

## 5. Typography

Typography was styled using CSS properties including:

- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `letter-spacing`

Relative units such as `rem`, `em`, `%`, `vw` and `vh` are used for responsive sizing and spacing. `clamp()` is used where appropriate to allow text and spacing to scale between screen sizes (MDN Web Docs, n.d.-a).

## 6. Layout Design

The website uses both Flexbox and CSS Grid to create flexible desktop and responsive layouts.

**Flexbox** is used for areas such as:

- Main navigation
- Navigation controls
- Content alignment
- Flexible component layouts

**CSS Grid** is used for areas such as:

- Project cards
- Service cards
- Gallery layouts
- Multi-column content sections

Larger layouts reduce to fewer columns or a single column on smaller screens to improve readability and usability.

## 7. Visual Styling and Interaction

The visual design uses:

- Consistent colours and backgrounds
- Borders and rounded elements
- Box shadows
- Gradients
- Responsive spacing
- Hover effects
- Focus indicators
- Active states
- Transitions

These styles provide visual hierarchy and clear feedback when users interact with navigation links, buttons, forms and gallery elements.

## 8. Responsive Design

The website was designed to respond to desktop, tablet and mobile screen sizes.

### Breakpoints

| Device | Breakpoint |
|---|---|
| Mobile | Up to 767px |
| Tablet | 768px to 1023px |
| Desktop | 1024px and above |

Additional adjustments are used at smaller intermediate widths where required to improve navigation, typography, spacing and content layout.

Responsive design includes:

- Flexible widths using `%`
- Responsive spacing using `rem` and `em`
- Responsive viewport units such as `vw` and `vh`
- `clamp()` for scalable typography and spacing
- Multi-column layouts on larger screens
- Single-column layouts on smaller screens
- Responsive navigation
- Mobile-friendly cards, forms and gallery layouts
- Prevention of unnecessary horizontal scrolling

## 9. Responsive Images

Responsive image techniques were added using `srcset` and `sizes` attributes. Resized image variants are stored in:

`images/responsive/`

The browser is able to select a suitable image resource based on the available display size and device resolution. This improves responsive presentation and avoids loading a larger image than necessary where an appropriate alternative is available.

## 10. Accessibility and Usability

Accessibility and usability were considered throughout the website. Features include:

- Descriptive `alt` text for images
- Skip-to-main-content links
- Visible keyboard focus indicators
- `:focus-visible` styling
- Accessible form controls and labels
- Clear navigation states
- Mobile-friendly touch targets
- Reduced-motion support
- Responsive layouts for different devices

## 11. Part 2 Feedback Implemented and Changelog

Part 2 was awarded **87/100 (Level 4)**. The strongest areas were the shared external CSS, desktop styling, responsive breakpoints, responsive navigation and images, pseudo-classes and references. The Part 3 work keeps these successful areas rather than replacing the design.

The main Part 2 weaknesses were documentation and evidence: **3/10 for responding to Part 1 feedback**, **4/5 for README completeness**, and **0/5 for the changelog**. Part 3 addresses these points directly.

### Part 2 feedback implemented in Part 3

| Part 2 feedback area | Part 3 action | Evidence in this project |
|---|---|---|
| Feedback for Part 1: 3/10 | Added a clearer record of feedback, changes and reasons for changes. | This section and the dated Part 3 changelog below. |
| README: 4/5 | Corrected the page count, added the Part 3 page, dynamic-content details, form processing, SEO, security, testing and deployment notes. | `README.md` |
| Changelog: 0/5 | Added a detailed development record with dates, changes, reasons and affected files. | Part 3 Changelog section. |
| Strong CSS and responsive work from Part 2 | Retained the existing shared stylesheet, responsive breakpoints, typography, layout, navigation and image handling. | `css/style.css` and all HTML pages. |

The following changes were made during the Part 2 development and enhancement process.

### CSS and Visual Design

- Created and maintained the shared external `css/style.css` stylesheet.
- Linked the external stylesheet to all eight website pages.
- Added a consistent colour palette and typography system.
- Added consistent spacing, borders, shadows and visual hierarchy.
- Applied CSS Grid to project, service and gallery layouts.
- Applied Flexbox to navigation and responsive content structures.
- Added `:hover`, `:focus-visible` and `:active` interaction states.

### Responsive Design

- Added desktop, tablet and mobile breakpoints.
- Applied relative units including `rem`, `em`, `%`, `vw` and `vh`.
- Added `clamp()` for responsive typography and spacing.
- Improved navigation behaviour on smaller screens.
- Changed multi-column layouts to fewer columns or single-column layouts at smaller widths.
- Improved cards, forms, project sections and gallery layouts for smaller screens.

### Images and Accessibility

- Improved image presentation and responsive sizing.
- Added `srcset` and `sizes` attributes for responsive images.
- Added resized image variants in `images/responsive/`.
- Improved image framing and object fitting.
- Added skip navigation and keyboard focus indicators.
- Added reduced-motion support.
- Improved form control sizing, labels and usability.

### Project Maintenance

- Removed the obsolete `css/# mystyle.css` file.
- Corrected HTML structure and image markup issues identified during technical checking.
- Confirmed that all eight website pages are included, including the Part 3 service enquiry page.
- Confirmed that the project wireframes are included.
- Confirmed that the supplied project image collection is used throughout the website.
- Added desktop, tablet and mobile responsive-testing evidence to the `images/` folder.
- Linked all testing images directly from this README.
- Consolidated the Part 2 documentation into this README to avoid duplicate README files.

## 12. Browser Developer Tools Testing

The website was tested using browser Developer Tools with device emulation enabled. Testing confirms that the website remains usable and visually consistent at different viewport sizes.

### Required Test Viewports

| Device category | Viewport | Page used for evidence |
|---|---:|---|
| Desktop | 1920 × 1080 | Home |
| Desktop | 1366 × 768 | About |
| Tablet | 1024 × 768 | Services |
| Tablet | 768 × 1024 | Projects |
| Mobile | 390 × 844 | Gallery |
| Mobile | 375 × 667 | Contact |

During testing, the following were checked:

- Navigation and menu behaviour
- Text readability and wrapping
- Image responsiveness
- Card layouts
- Form usability
- Gallery behaviour
- Interactive elements
- Horizontal overflow
- Spacing and alignment
- Breakpoint transitions

## 13. Screenshot Evidence

The responsive testing screenshots are stored together in the main `images/` folder. They are linked directly below using relative paths so that they display when the README is viewed in the project repository or directly from the extracted project folder.

### Desktop Testing

**Figure 1: Home page tested at 1920 × 1080.**

<img src="./images/testing-desktop-home-1920x1080.png" alt="Hope Connect Foundation Home page tested at 1920 by 1080 desktop viewport" width="900">

**Figure 2: About page tested at 1366 × 768.**

<img src="./images/testing-desktop-about-1366x768.png" alt="Hope Connect Foundation About page tested at 1366 by 768 desktop viewport" width="900">

### Tablet Testing

**Figure 3: Services page tested at 1024 × 768.**

<img src="./images/testing-tablet-services-1024x768.png" alt="Hope Connect Foundation Services page tested at 1024 by 768 tablet viewport" width="900">

**Figure 4: Projects page tested at 768 × 1024.**

<img src="./images/testing-tablet-projects-768x1024.png" alt="Hope Connect Foundation Projects page tested at 768 by 1024 tablet viewport" width="700">

### Mobile Testing

**Figure 5: Gallery page tested at 390 × 844.**

<img src="./images/testing-mobile-gallery-390x844.png" alt="Hope Connect Foundation Gallery page tested at 390 by 844 mobile viewport" width="390">

**Figure 6: Contact page tested at 375 × 667.**

<img src="./images/testing-mobile-contact-375x667.png" alt="Hope Connect Foundation Contact page tested at 375 by 667 mobile viewport" width="375">

### Testing Checks

The responsive testing covered:

- Navigation and menu behaviour
- Text readability and wrapping
- Responsive image presentation
- Card and grid layouts
- Form usability
- Gallery layout and controls
- Interactive elements
- Horizontal overflow
- Spacing and alignment
- Breakpoint changes between desktop, tablet and mobile layouts

## 14. Reflection

Through this project, I gained practical experience in applying CSS styling principles and responsive web design techniques. I learned how Flexbox and CSS Grid can be used to create flexible layouts and how responsive design improves the user experience across different devices. I also developed a better understanding of accessibility considerations and how small design choices can make websites easier to use for a wider range of users.

The testing process also helped me identify layout and presentation issues at smaller screen sizes. I used the results to adjust navigation, spacing, typography, cards and image presentation so that the website remains usable across different viewport sizes.

## 15. References

MDN Web Docs. (n.d.-a) *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 9 October 2026).

MDN Web Docs. (n.d.-b) *<h1>–<h6>: The HTML section heading elements*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements (Accessed: 9 October 2026).

MDN Web Docs. (n.d.-c) *Responsive images*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Performance/Responsive_images (Accessed: 9 October 2026).

MDN Web Docs. (n.d.-d) *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 9 October 2026).

World Wide Web Consortium (W3C). (n.d.) *CSS Snapshot*. Available at: https://www.w3.org/TR/css/ (Accessed: 9 October 2026).

World Wide Web Consortium (W3C). (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: 9 October 2026).

**WEDE5020 - Hope Connect Foundation**  
**Student Number: ST10502254**

## 16. Final Part 3 Checklist

The final Part 3 submission should contain all eight HTML pages, the shared CSS and JavaScript, images, technical SEO files, README and supporting project folders. Before uploading or submitting the GitHub link, the following should be checked:

- All eight pages open and use the shared stylesheet.
- Every page has one clear primary H1 and a logical H2/H3 structure.
- Dynamic Services content, search, filtering and sorting work in the browser.
- Both required forms pass HTML and JavaScript validation.
- AJAX form processing is tested on the deployed HTTPS site.
- The actual deployment URL is added to `robots.txt` and `sitemap.xml`.
- Mobile, tablet and desktop layouts are checked using browser Developer Tools.
- Image `alt` text describes meaningful image content and decorative images are handled appropriately.
- GitHub contains descriptive commits and the README changelog is updated.
- Any off-page SEO claims are supported by real evidence rather than assumed activity.

## 17. Part 3 Dynamic Content

The Services page now loads service information from a JavaScript data array rather than hard-coding the service cards in the HTML. Users can:

- Search services by name, category or description.
- Filter services by category.
- Sort services from A-Z or Z-A.
- See the result count update without reloading the page.

The rendering code uses DOM methods such as `createElement()` and `textContent`, which avoids inserting untrusted search text as HTML.

## 18. Part 3 Forms

### Service Enquiry

`enquiry.html` allows visitors to enquire about:

- Services
- Products or resources
- Volunteering
- Sponsorship

The form collects contact details, enquiry type, preferred date, budget/cost information and a message. HTML constraints and JavaScript validation check required fields, email format, phone format, message length and the selected date.

### Contact Form

`contact.html` collects:

- Full name
- Email address
- Phone number
- Message type
- Full message

Both forms use asynchronous `fetch()` submission to an email-processing endpoint. The recipient is specified in `js/script.js` as `contact@hopeconnectfoundation.org`. If the email service is unavailable, the user receives an error message and an email fallback address instead of being shown a false success message.

## 19. Part 3 SEO

Each page has a unique:

- `<title>`
- Meta description
- Keyword set
- Author metadata

The website uses descriptive headings, internal links, descriptive image alternative text, responsive images, mobile-friendly layouts and clean `.html` page names (MDN Web Docs, n.d.-b; MDN Web Docs, n.d.-c).

Target keyword themes include community development, volunteering, youth mentorship, environmental projects, education support, sponsorship and community services in South Africa.

### Off-page SEO plan

The project does not claim backlinks or social-media promotion that have not been created or verified. For deployment, the organisation can promote the website through its verified social-media profiles, partner organisations, community directories and relevant non-profit networks. Any completed backlinks or social profiles should be recorded as evidence rather than listed as assumed results.

Local SEO should also only be claimed after the organisation's actual service location and a verified business/location profile have been confirmed.

## 20. Technical SEO and Performance

The project includes:

- `robots.txt`
- `sitemap.xml`
- Lazy loading for gallery/project images
- Asynchronous image decoding
- Responsive image `srcset` and `sizes` (MDN Web Docs, n.d.-c)
- Minimal client-side JavaScript
- Shared CSS and JavaScript files
- Keyboard-accessible controls
- HTTPS-ready external form processing when deployed on an HTTPS host

Before final deployment, replace `YOUR-DEPLOYED-DOMAIN.example` in `robots.txt` and `sitemap.xml` with the actual deployed website address. The placeholder is intentionally retained until the real hosting URL is known; no unverified domain is claimed in the submission.

## 21. Security Measures

The site applies basic static-site security practices:

- Client-side validation for user input.
- HTML constraints for field length and formats.
- Safe DOM rendering using `textContent` for dynamic service content.
- No passwords, API keys or other secrets stored in the project.
- HTTPS should be used for the deployed website.
- Hidden honeypot fields are included on the contact and enquiry forms to reduce simple automated spam.
- The external Google Maps link uses `noopener noreferrer`.
- Form errors are displayed without exposing technical details to visitors.

## 22. Part 3 Changelog

| Date | Change | Reason / feedback addressed | Files affected |
|---|---|---|---|
| 2026-10-08 | Added JavaScript-driven Services data, search, category filtering and A-Z/Z-A sorting. | Meets the Part 3 dynamic-content and search/filter/sort requirements. | `services.html`, `js/script.js`, `css/style.css` |
| 2026-10-08 | Added Service Enquiry page with cost, availability and next-step feedback. | Meets the Part 3 enquiry-form requirement. | `enquiry.html`, `js/script.js` |
| 2026-10-08 | Added AJAX processing for contact and enquiry forms with validation and fallback messaging. | Meets asynchronous form-processing requirements without displaying a false success message when the endpoint fails. | `contact.html`, `enquiry.html`, `js/script.js` |
| 2026-10-08 | Added SEO metadata, robots file and sitemap. | Addresses Part 3 on-page and technical SEO requirements. | All HTML pages, `robots.txt`, `sitemap.xml` |
| 2026-10-08 | Added responsive image handling, lazy loading and asynchronous decoding. | Supports performance and mobile-friendly requirements while preserving the Part 2 image work. | HTML pages, `js/script.js`, `images/` |
| 2026-10-09 | Corrected duplicate H1 headings on Home and Projects. | Improves heading hierarchy and directly addresses the on-page SEO requirement. | `index.html`, `projects.html` |
| 2026-10-09 | Corrected Gallery statistics from 7 to 8 website pages. | Keeps project documentation accurate after adding `enquiry.html`. | `gallery.html`, `README.md` |
| 2026-10-09 | Expanded the Part 2 feedback record and added a detailed Part 3 changelog. | Directly addresses the Part 2 scores of 3/10 for feedback implementation, 4/5 for README completeness and 0/5 for changelog evidence. | `README.md` |
| 2026-10-09 | Added hidden honeypot fields to the contact and enquiry forms. | Adds a basic anti-spam measure for the static-site forms. | `contact.html`, `enquiry.html`, `css/style.css` |

## 23. Part 3 Testing Checklist

Before submission, test:

1. All eight pages open without broken local links.
2. Services load dynamically.
3. Service search filters results without a page refresh.
4. Category filtering works.
5. A-Z and Z-A sorting works.
6. Enquiry validation rejects missing/invalid data.
7. Enquiry date cannot be in the past.
8. Contact validation rejects missing/invalid data.
9. AJAX form success and error states are visible.
10. Mobile and desktop layouts remain usable.
11. `robots.txt` and `sitemap.xml` use the real deployed domain.
12. The deployed site is available over HTTPS.
13. Git commits are descriptive and the README/changelog is updated.
14. Live AJAX email delivery is tested after deployment; static source inspection alone is not treated as proof of successful delivery.
15. Lighthouse/PageSpeed results are recorded after deployment if required as submission evidence.
16. The real deployed URL is inserted into `robots.txt` and `sitemap.xml` before final submission.
17. The final GitHub repository and deployed URL are tested before LMS submission.

## 24. Part 3 Submission Note

The project is based directly on the Part 2 source supplied for this submission. Part 2 functionality, pages, image collection, responsive CSS, accessibility features and gallery behaviour were retained while Part 3 functionality was added.

### About Page Image Correction
- Updated the Meet the Team image styling so the portrait photographs display at their natural aspect ratios instead of being forced into a 240px-high cropped frame.
- This prevents faces and other important parts of the team photographs from being cut off on the About page.
