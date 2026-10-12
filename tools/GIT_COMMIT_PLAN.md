# Suggested commit plan for Part 3

The assignment asks for regular commits with descriptive messages. Make each commit when that piece of work is
really finished and working, so the history shows the development. Replace the example messages with your own
wording if you change the order.

Run `git status` before each commit to check which files changed.

| Step | Work | Files | Example commit message |
|---|---|---|---|
| 1 | Add the content data and dynamic list code | `js/data.js`, `js/dynamic.js` | `Add services and projects data with dynamic card rendering` |
| 2 | Turn the Services and Projects pages into searchable lists | `services.html`, `projects.html`, `css/style.css` | `Add search, category filter and sorting to services and projects` |
| 3 | Add form validation and AJAX submission | `js/forms.js`, `js/script.js` | `Add form validation, AJAX submission and email compilation` |
| 4 | Add the enquiry page and upgrade the contact and volunteer forms | `enquiry.html`, `contact.html`, `get-involved.html` | `Add enquiry page and upgrade contact and volunteer forms` |
| 5 | SEO tags on every page and fix duplicate h1 | all `*.html` | `Add unique titles, meta descriptions, canonical and Open Graph tags` |
| 6 | Descriptive gallery alt text and image sizes | `gallery.html` | `Write descriptive gallery alt text and fix responsive image sizes` |
| 7 | Technical SEO and security files | `robots.txt`, `sitemap.xml`, `_headers` | `Add robots.txt, sitemap.xml and security headers` |
| 8 | Image file names (optional) | `images/`, all `*.html`, `css/style.css` | `Rename images with descriptive file names` |
| 9 | Tests | `tests/` | `Add unit and browser tests for forms and search` |
| 10 | Documentation | `README.md`, `tools/` | `Update README with Part 3 features, feedback log and changelog` |
| 11 | Deployment link and final checks | `README.md`, `sitemap.xml` | `Add live site link and finalise Part 3` |

After the last commit:

```bash
git push origin main
```

Then add the real commit messages for Part 3 to the Changelog section of the README if they differ from the
entries already listed there.
