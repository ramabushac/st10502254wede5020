// Unit tests for the pure logic in js/forms.js and js/dynamic.js (WEDE5020 Part 3).
// Run from the project folder:  node tests/unit.test.js
const f = require("../js/forms.js");
const d = require("../js/dynamic.js");
let passed = 0, failed = 0;
function check(name, condition) {
  if (condition) { passed++; console.log("PASS " + name); } else { failed++; console.log("FAIL " + name); }
}
const v = f.validateValue;

// Names
check("name accepts a normal name", v("name", "Thabo Mokoena", { required: true }) === "");
check("name rejects digits", v("name", "T4", { required: true, label: "Full name" }) !== "");
check("name accepts apostrophe and hyphen", v("name", "Sipho O'Neil-Dlamini", { required: true }) === "");
// Email
check("email accepts a@b.co", v("email", "a@b.co", { required: true }) === "");
check("email rejects a@b", v("email", "a@b", { required: true }) !== "");
// Phone numbers
["073 123 4567", "0731234567", "+27 73 123 4567", "+2773 123 4567", "011 123 4567"].forEach(function (p) {
  check("phone accepts " + p, v("phone", p, {}) === "");
});
["073 123 456", "12345", "+27 7 123 4567", "abc", "0731234567890"].forEach(function (p) {
  check("phone rejects " + p, v("phone", p, {}) !== "");
});
// Dates
const today = new Date(2026, 9, 9);
check("date in the past is rejected", v("date", "2026-10-08", { today: today }) !== "");
check("today is accepted", v("date", "2026-10-09", { today: today }) === "");
check("a date that does not exist is rejected", v("date", "2026-02-31", { today: today }) !== "");
check("wrong date format is rejected", v("date", "09/10/2026", { today: today }) !== "");
// Required and length rules
check("required message names the field", v("", "", { required: true, label: "Subject" }) === "Subject is required.");
check("minimum length message", v("", "short", { minLength: 20, label: "Message" }).indexOf("at least 20") !== -1);
check("maximum length message", v("", "x".repeat(11), { maxLength: 10, label: "Message" }).indexOf("10 characters or fewer") !== -1);

// Email compilation
const mail = f.compileEmail("contact", { name: "A B", email: "a@b.co", type: "feedback", subject: "Hello", message: "Nice", phone: "" }, new Date("2026-10-09T10:00:00Z"));
check("email goes to the configured recipient", mail.to === f.CONFIG.recipient);
check("email subject and body contain the details", mail.subject.indexOf("Feedback") !== -1 && mail.body.indexOf("Name: A B") !== -1 && mail.body.indexOf("Nice") !== -1);

// Enquiry responses (cost and availability)
const sunday = f.enquiryResponse({ name: "Thabo Mokoena", type: "services", date: "2026-10-11" });
check("services response shows cost and Sunday availability", sunday.lines.join(" ").indexOf("R350") !== -1 && sunday.lines.join(" ").indexOf("Sundays") !== -1);
check("sponsorship response shows the monthly amounts", f.enquiryResponse({ name: "Thabo", type: "sponsorship" }).lines[0].indexOf("R500") !== -1);

// Search, filter and sort
const items = [
  { title: "Green Future", category: "Environment", description: "tree planting" },
  { title: "Youth Mentorship", category: "Youth", description: "role models" },
  { title: "Education for All", category: "Education", description: "tutoring" }
];
check("filter by one word", d.filterItems(items, "tree", "all").length === 1);
check("filter by two words", d.filterItems(items, "role models", "all").length === 1);
check("filter by category", d.filterItems(items, "", "Youth").length === 1);
check("filter with no match", d.filterItems(items, "zzz", "all").length === 0);
check("sort A to Z", d.sortItems(items, "az")[0].title === "Education for All");
check("sort Z to A", d.sortItems(items, "za")[0].title === "Youth Mentorship");
check("sort by category", d.sortItems(items, "category")[0].category === "Education");

console.log("\n" + passed + " passed, " + failed + " failed");
process.exit(failed ? 1 : 0);
