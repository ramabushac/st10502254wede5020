# Hope Connect Foundation - WEDE5020 Part 2

Student: Calvin Ramabusha  
Student Number: ST10502254  
Module: WEDE5020  
Project: Hope Connect Foundation Website

## Part 2: CSS Styling and Responsive Design

This project implements the Part 2 requirements for CSS Styling and Responsive Design. The website uses one shared external stylesheet, responsive layouts, relative CSS units, Flexbox, CSS Grid, interactive states, responsive images and accessibility-focused styling.

## Website Pages

1. `index.html` - Home
2. `about.html` - About
3. `services.html` - Services
4. `projects.html` - Projects
5. `gallery.html` - Gallery
6. `get-involved.html` - Get Involved
7. `contact.html` - Contact

## CSS Implementation

The seven main pages are linked to the shared external stylesheet:

`css/style.css`

The stylesheet includes:

- CSS reset and base styles
- Shared colour variables
- Typography and spacing
- Flexbox navigation and content layouts
- CSS Grid card and gallery layouts
- Borders, shadows and gradients
- Hover, focus and active states
- Responsive breakpoints
- Relative units including `%`, `rem`, `em`, `vw`, `vh` and `clamp()`
- Reduced-motion support
- Print styling
- Responsive image sizing

## Responsive Design

The website uses responsive breakpoints to adapt the layout for different screen sizes.

- Mobile: up to 767px
- Tablet: 768px to 1023px
- Desktop: 1024px and above
- Additional refinement is applied at 900px, 800px and 560px where required by the content.

Desktop layouts use multiple columns where appropriate. Tablet and mobile layouts reduce gaps, card widths and navigation spacing. Gallery, team and project layouts collapse to a single column on smaller screens where required.

## Responsive Images

Content images use responsive image attributes including `srcset` and `sizes`. Resized image variants are stored in:

`images/responsive/`

This allows the browser to select a suitable image width for the available screen size instead of always loading the largest source.

## Accessibility and Usability

The website includes:

- Descriptive image `alt` text
- Skip-to-main-content links
- Visible keyboard focus states
- `:focus-visible` styling
- Accessible form controls
- Reduced-motion support
- Responsive touch targets
- Clear navigation states

## Browser Developer Tools Testing

The website should be tested using browser developer tools with device emulation enabled. The following viewport sizes were selected for Part 2 verification:

| Device category | Viewport | Page used for evidence |
|---|---:|---|
| Desktop | 1920 x 1080 | Home |
| Desktop | 1366 x 768 | About |
| Tablet | 1024 x 768 | Services |
| Tablet | 768 x 1024 | Projects |
| Mobile | 390 x 844 | Gallery |
| Mobile | 375 x 667 | Contact |

During testing, check navigation, text wrapping, images, cards, forms, gallery behaviour, horizontal overflow and interactive controls at each breakpoint.

## Screenshot Evidence

The lecturer requires screenshot evidence for desktop, tablet and mobile devices. Before final submission, add the actual screenshots captured from browser developer tools to this section.

Recommended evidence:

### Desktop

- 1920 x 1080 - Home page
- 1366 x 768 - About page

### Tablet

- 1024 x 768 - Services page
- 768 x 1024 - Projects page

### Mobile

- 390 x 844 - Gallery page
- 375 x 667 - Contact page

Screenshots should show the browser viewport/device emulation controls where possible. Add a short caption below each image identifying the page and viewport size.

## Part 1 Feedback and Part 2 Changelog

### Part 2 Enhancement Pass

- Created and maintained the shared external `css/style.css` stylesheet.
- Confirmed that all seven main HTML pages link to the shared stylesheet.
- Added a consistent colour palette, typography system, spacing and component styling.
- Applied CSS Grid to gallery, project and card layouts.
- Applied Flexbox to navigation and responsive content structures.
- Added decorative borders, shadows, gradients and visual hierarchy.
- Added `:hover`, `:focus-visible` and `:active` interaction states.
- Added responsive breakpoints for desktop, tablet and mobile layouts.
- Added relative units including `rem`, `em`, `%`, `vw` and `vh`.
- Added `clamp()` for responsive typography and spacing.
- Improved navigation behaviour on smaller screens.
- Improved card, gallery, project and service layouts for smaller screens.
- Improved image framing, object fitting and visual clarity.
- Added responsive image `srcset` and `sizes` attributes.
- Added resized image variants in `images/responsive/`.
- Added skip navigation and keyboard focus indicators.
- Added reduced-motion support for users who prefer less animation.
- Improved form control sizing and presentation.
- Removed the obsolete `css/# mystyle.css` file.
- Confirmed that the seven supplied wireframe pages are included in the project.
- Confirmed that the project image collection is used across the website.
- Prepared desktop, tablet and mobile viewport sizes for developer-tools testing.

## Final Submission Checks

- [x] External stylesheet created
- [x] CSS linked to all seven main pages
- [x] Typography styling applied
- [x] Flexbox used
- [x] CSS Grid used
- [x] Colours, borders and shadows applied
- [x] Hover, focus and active states included
- [x] Relative units used
- [x] Responsive breakpoints included
- [x] Mobile layout implemented
- [x] Responsive image attributes added
- [x] Wireframes included
- [x] Obsolete stylesheet removed
- [ ] Actual desktop screenshots inserted into this README
- [ ] Actual tablet screenshots inserted into this README
- [ ] Actual mobile screenshots inserted into this README
- [ ] Final browser developer-tools evidence reviewed before submission

## Project Structure

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
│   └── responsive/
└── wireframes/
```

## Final Note

The screenshot evidence is deliberately listed as a final manual testing step because screenshots should be captured from the student's browser developer tools and should show the actual browser/device emulation environment used during testing.
