/*
 * Hope Connect Foundation: static site checks (WEDE5020 Part 3)
 * Runs with plain Node.js, no packages needed:   node tests/static.test.js
 * Checks every HTML page for SEO, accessibility and link problems.
 * FAIL = a real defect (exit code 1).  WARN = content to confirm before launch (exit code stays 0).
 */
"use strict";
var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "..");
var pages = fs.readdirSync(root).filter(function (f) { return /\.html$/.test(f); }).sort();
var pass = 0, fails = [], warns = [];

function ok(cond, label, level) {
  if (cond) { pass++; return; }
  (level === "warn" ? warns : fails).push(label);
}
function read(f) { return fs.readFileSync(path.join(root, f), "utf8"); }
function all(re, s) { var out = [], m; while ((m = re.exec(s))) out.push(m); return out; }

var titles = {}, descs = {}, h1s = {};
var sitemap = read("sitemap.xml");

pages.forEach(function (p) {
  var s = read(p);
  var indexable = !/name="robots" content="noindex/.test(s);
  var title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  var desc = (s.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  var h1 = all(/<h1[^>]*>([\s\S]*?)<\/h1>/g, s);

  ok(/<html lang="en-ZA">/.test(s), p + ": html lang should be en-ZA");
  ok(title.length > 10 && title.length <= 70, p + ": title length " + title.length + " should be 11 to 70");
  ok(!titles[title], p + ": duplicate title with " + titles[title]); titles[title] = p;
  ok(desc.length >= 70 && desc.length <= 160, p + ": meta description length " + desc.length + " should be 70 to 160");
  ok(!descs[desc], p + ": duplicate meta description with " + descs[desc]); descs[desc] = p;
  ok(h1.length === 1, p + ": needs exactly one h1 (found " + h1.length + ")");
  if (h1.length === 1) {
    var text = h1[0][1].replace(/<[^>]+>/g, "").trim();
    ok(!h1s[text], p + ": h1 \"" + text + "\" repeats the h1 of " + h1s[text]); h1s[text] = p;
  }
  ok(/<main[ >]/.test(s), p + ": missing <main>");
  ok(/class="skip-link"/.test(s), p + ": missing skip link");
  ok(!/style="/.test(s), p + ": inline style attribute found");
  ok(/rel="icon"/.test(s), p + ": missing favicon link");
  if (indexable) {
    ok(/rel="canonical"/.test(s), p + ": missing canonical link");
    ok(/property="og:image"/.test(s), p + ": missing og:image");
    ok(sitemap.indexOf("/" + p + "<") !== -1, p + ": indexable page missing from sitemap.xml");
  } else {
    ok(sitemap.indexOf("/" + p + "<") === -1, p + ": noindex page should not be in sitemap.xml");
  }

  // images
  all(/<img\b[^>]*>/g, s).forEach(function (m) {
    ok(/\salt="[^"]+"/.test(m[0]), p + ": image without alt text: " + m[0].slice(0, 70));
  });
  // ids unique
  var ids = all(/\sid="([^"]+)"/g, s).map(function (m) { return m[1]; });
  var dup = ids.filter(function (v, i) { return ids.indexOf(v) !== i; });
  ok(!dup.length, p + ": duplicate id(s) " + dup.join(", "));
  // local references exist
  var refs = all(/(?:src|href)="([^"#?:]+)"/g, s).map(function (m) { return m[1]; });
  all(/srcset="([^"]+)"/g, s).forEach(function (m) {
    m[1].split(",").forEach(function (c) { refs.push(c.trim().split(/\s+/)[0]); });
  });
  refs.filter(function (r) { return !/^(https?:|mailto|tel|data)/.test(r); }).forEach(function (r) {
    ok(fs.existsSync(path.join(root, r)), p + ": missing local file " + r);
  });
  // every visible form control has a label
  all(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/g, s).forEach(function (m) {
    if (/type="(hidden|submit|button)"|hp-input|tabindex="-1"/.test(m[0])) return;
    ok(new RegExp('for="' + m[1] + '"').test(s) || /aria-label=/.test(m[0]), p + ": control #" + m[1] + " has no label");
  });
  // content to confirm
  all(/tel:\+?(\d+)/g, s).forEach(function (m) {
    ok(/^27\d{9}$/.test(m[1]) || /^0\d{9}$/.test(m[1]), p + ": phone number tel:" + m[0].slice(4) + " is not a valid South African number (+27 plus 9 digits)", "warn");
  });
  ok(!/TODO|lorem ipsum|YOUR_FORM_ID/i.test(s), p + ": placeholder text found", "warn");
});

// sitemap points at real pages
all(/<loc>[^<]*\/([^/<]+)<\/loc>/g, sitemap).forEach(function (m) {
  ok(fs.existsSync(path.join(root, m[1])), "sitemap.xml lists a page that does not exist: " + m[1]);
});
// forms: placeholder endpoint means demo mode
ok(!/YOUR_FORM_ID/.test(read("js/forms.js")), "js/forms.js: Formspree endpoint is still a placeholder, so forms run in demo mode", "warn");
// images
var imgDir = path.join(root, "images");
var total = 0;
fs.readdirSync(imgDir).forEach(function (f) {
  var st = fs.statSync(path.join(imgDir, f));
  if (st.isFile()) { total += st.size; ok(st.size < 3 * 1024 * 1024, "images/" + f + " is " + Math.round(st.size / 1048576 * 10) / 10 + " MB (over 3 MB)", "warn"); }
});

console.log("Pages checked: " + pages.length + "   Original images folder: " + Math.round(total / 1048576) + " MB");
console.log("Passed checks: " + pass);
warns.forEach(function (w) { console.log("WARN " + w); });
fails.forEach(function (f) { console.log("FAIL " + f); });
console.log("\n" + pass + " passed, " + fails.length + " failed, " + warns.length + " warnings");
process.exit(fails.length ? 1 : 0);
