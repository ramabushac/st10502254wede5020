# Hope Connect Foundation - Part 2 Enhancement Notes

The website was enhanced for WEDE5020 Part 2 with a stronger shared CSS system and responsive layout.

## CSS and responsive design

- Expanded the external shared stylesheet with variables, spacing, typography, cards, buttons, forms and image framing.
- Added explicit 960px responsive breakpoint together with 1000px, 800px and 560px refinements.
- Improved navigation wrapping and mobile spacing.
- Added responsive grids for teams, projects and gallery content.
- Added hover and focus-visible states for interactive elements.
- Added a visible keyboard Skip to main content link on all seven pages.
- Added reduced-motion and print styles.
- Added consistent service cards and form presentation.
- Added protection against accidental horizontal overflow.

## Images and wireframes

- The complete collection of 72 supplied images remains in the website.
- All 72 image files are used by the seven HTML pages, with the Gallery page providing a complete visual collection.
- Gallery and project images retain responsive object-fit framing and lazy loading.
- The seven individual wireframe PNGs were enlarged to 2x resolution and sharpened for improved readability.

## JavaScript

- Active navigation state is applied automatically.
- Back-to-top control is available after scrolling.
- Gallery lightbox supports previous/next navigation and keyboard controls.
- Form validation uses browser constraint validation before displaying confirmation messages.
- Image orientation is detected for project and gallery presentation.

## Technical cleanup

- All seven pages use the same external stylesheet and JavaScript file.
- Semantic main content containers were added to all seven pages.
- The obsolete `css/# mystyle.css` file was removed in the final cleanup pass.
- Local references were checked after the enhancement.
