# Final Review and Recommendations - WEDE5020 Part 3

## Review basis
This review used the supplied Part 3 project, the existing project review documentation and the Part 3 assessment/report recommendations. The aim was to improve the project without rebuilding working features.

## My input added to the project

### 1. Documentation consistency
The README contained a few statements that had become stale as new pages were added. The documentation was updated so the project distinguishes between:
- 9 indexable website pages
- 404.html as a recovery page that is not included in the sitemap
- the main interactive pages used for responsive testing

### 2. Font Awesome consistency
The pages previously used both Font Awesome 6.5.0 and 6.5.2. All HTML pages now reference 6.5.2 so the implementation matches the documented version.

### 3. Static automated testing
A dependency-free `tests/static.test.js` was added. It checks page language, titles, descriptions, one h1, canonical/OG metadata, favicon, Font Awesome version, image alt attributes, form labels, duplicate IDs, local references, srcset files, sitemap coverage and key README claims.

### 4. Honest testing evidence
The project does not claim Lighthouse scores or successful live form delivery without evidence. Playwright remains clearly identified as not executed where the package is unavailable. This is preferable to including invented results.

### 5. Git repository
The full project copy keeps the `.git` directory from the supplied project so the existing Git history is retained. The new improvements are working-tree changes until they are committed and pushed by the student.

## Final manual checks recommended before submission

1. Open the deployed site in Chrome, Edge and Firefox.
2. Test the main pages at desktop, tablet and mobile widths.
3. Test Services and Projects search, filter and sorting.
4. Test all three forms with valid and invalid data.
5. If live submission is required, configure the Formspree endpoint and confirm an email is actually received.
6. Check the gallery images and confirm that every image is licensed or otherwise permitted for use.
7. Run Lighthouse on the deployed site and save the real results if the rubric requires performance/accessibility evidence.
8. If Playwright is required, install the dependency, run the browser suite and record the actual result.
9. Commit the final changes with descriptive Git messages and push them to GitHub.
10. Verify that the GitHub repository README, project files and commit history are visible before submission.

## Overall opinion
The project is technically strong for a Part 3 submission. The biggest remaining risk is not the website functionality itself but evidence: the final submission should clearly prove what was tested, what is live, what is still demo-only, and how the Part 2 feedback was addressed.
