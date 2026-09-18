# Hope Connect Foundation - WEDE5020 Part 2

**Student:** Calvin Ramabusha  
**Student Number:** ST10502254  
**Module:** WEDE5020  
**Project:** Hope Connect Foundation Website  

## Table of Contents

| No. | Section | Description |
|---|---|---|
| 1 | [Project Overview](#1-project-overview) | Purpose and Part 2 focus |
| 2 | [Website Pages](#2-website-pages) | Seven website pages |
| 3 | [Project Structure](#3-project-structure) | Main project folders and files |
| 4 | [External CSS Stylesheet](#4-external-css-stylesheet) | Shared stylesheet and CSS features |
| 5 | [Typography](#5-typography) | Typography and relative sizing |
| 6 | [Layout Design](#6-layout-design) | Flexbox and CSS Grid |
| 7 | [Visual Styling and Interaction](#7-visual-styling-and-interaction) | Colours, borders, shadows and states |
| 8 | [Responsive Design](#8-responsive-design) | Breakpoints and responsive layouts |
| 9 | [Responsive Images](#9-responsive-images) | `srcset`, `sizes` and image variants |
| 10 | [Accessibility and Usability](#10-accessibility-and-usability) | Accessibility and usability features |
| 11 | [Part 1 Feedback and Part 2 Changelog](#11-part-1-feedback-and-part-2-changelog) | Development changes |
| 12 | [Browser Developer Tools Testing](#12-browser-developer-tools-testing) | Test devices and checks |
| 13 | [Screenshot Evidence](#13-screenshot-evidence) | Desktop, tablet and mobile evidence |
| 14 | [Reflection](#14-reflection) | Learning reflection |
| 15 | [References](#15-references) | Sources used for Part 2 |
| 16 | [Final Part 2 Submission Checklist](#16-final-part-2-submission-checklist) | Submission verification |

## 1. Project Overview

Hope Connect Foundation is a non-profit organisation website developed for the WEDE5020 module. Part 2 builds on the Part 1 website by applying CSS styling, responsive design and usability improvements.

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

All seven website pages use the shared external stylesheet:

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

Relative units such as `rem`, `em`, `%`, `vw` and `vh` are used for responsive sizing and spacing. `clamp()` is used where appropriate to allow text and spacing to scale between screen sizes.

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

## 11. Part 1 Feedback and Part 2 Changelog

The following changes were made during the Part 2 development and enhancement process.

### CSS and Visual Design

- Created and maintained the shared external `css/style.css` stylesheet.
- Linked the external stylesheet to all seven website pages.
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
- Confirmed that all seven website pages are included.
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

Mozilla Developer Network (MDN) Web Docs. (n.d.) *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout (Accessed: 18 September 2026).

Mozilla Developer Network (MDN) Web Docs. (n.d.) *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 18 September 2026).

Mozilla Developer Network (MDN) Web Docs. (n.d.) *Responsive images*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Performance/Responsive_images (Accessed: 18 September 2026).

World Wide Web Consortium (W3C). (n.d.) *CSS Snapshot*. Available at: https://www.w3.org/TR/css/ (Accessed: 18 September 2026).

World Wide Web Consortium (W3C). (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: 18 September 2026).

## 16. Final Part 2  Checklist

- [x] External `css/style.css` created and used.
- [x] All seven HTML pages linked to the external stylesheet.
- [x] CSS reset and base styling implemented.
- [x] Typography styling implemented.
- [x] Flexbox used for responsive layouts.
- [x] CSS Grid used for multi-column layouts.
- [x] Colours, borders, shadows and visual effects applied.
- [x] `:hover`, `:focus-visible` and `:active` states included.
- [x] Desktop, tablet and mobile breakpoints implemented.
- [x] Relative units including `%`, `rem`, `em`, `vw` and `vh` used.
- [x] `clamp()` used for responsive sizing.
- [x] Responsive images implemented with `srcset` and `sizes`.
- [x] Responsive image variants stored under `images/responsive/`.
- [x] Accessibility and usability features implemented.
- [x] Part 1 and Part 2 changes documented in the changelog.
- [x] Desktop, tablet and mobile testing screenshots included under `images/`.
- [x] Screenshot evidence linked directly from this README.
- [x] Table of contents included.
- [x] References included.
- [x] Wireframes included in the `wireframes/` folder.

---

**WEDE5020 Part 2 - Hope Connect Foundation**  
**Student Number: ST10502254**
