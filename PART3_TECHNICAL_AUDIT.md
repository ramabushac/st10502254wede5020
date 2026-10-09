# WEDE5020 Part 3 Technical Audit

Student: ST10502254  
Project: Hope Connect Foundation  
Part: Part 3

## Implemented
- Seven original Part 2 pages retained.
- New `enquiry.html` page added.
- Shared `css/style.css` retained and extended.
- Shared `js/script.js` retained and extended.
- Dynamic Services data loaded with JavaScript.
- Service search, category filtering and sorting added.
- Contact form upgraded with contact details, message type and message length validation.
- Enquiry form added with service/product/volunteer/sponsorship options.
- Client-side validation and user-friendly status messages added.
- AJAX email submission implemented with a static-site form-processing endpoint.
- Unique title and meta description added to all pages.
- Keyword metadata and descriptive SEO wording added.
- `robots.txt` and `sitemap.xml` added.
- Responsive images and lazy loading from Part 2 retained.
- Accessibility features from Part 2 retained.

## Deployment action still required
Replace `YOUR-DEPLOYED-DOMAIN.example` in `robots.txt` and `sitemap.xml` after the final hosting address is known.

## Email configuration
The JavaScript currently sends form data to:
`contact@hopeconnectfoundation.org`

The email-processing service must be verified during deployment/testing. If the endpoint cannot deliver the message, the forms show an error rather than falsely reporting success.
