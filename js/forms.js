/*
 * Hope Connect Foundation: form validation, AJAX submission and email compilation (WEDE5020 Part 3)
 *
 * Handles every <form data-ajax-form="...">: contact, enquiry and volunteer.
 *  1. Client-side validation with friendly messages next to each field.
 *  2. Compiles the details into an email (recipient set in CONFIG below).
 *  3. Sends the data asynchronously with fetch (AJAX), with no page reload.
 *
 * SETUP (see README): create a free form at https://formspree.io, copy your form URL into CONFIG.endpoint
 * and set CONFIG.recipient to the address that must receive the messages.
 * Until the endpoint is configured the script runs in DEMO mode: it validates, builds the email and shows
 * the success message, but nothing is delivered.
 */
(function () {
  "use strict";

  var CONFIG = {
    recipient: "contact@hopeconnectfoundation.org",   // who receives the messages
    endpoint: "https://formspree.io/f/YOUR_FORM_ID",   // replace YOUR_FORM_ID
    subjectPrefix: "[Hope Connect Website]",
    timeoutMs: 10000,
    demoDelayMs: 900
  };

  var PHONE_RE = /^(?:\+27|0)[ ]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/;     // 073 123 4567, +27 73 123 4567
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var NAME_RE = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F '\u2019-]{1,59}$/;
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  var TYPE_LABELS = {
    services: "Services", projects: "Projects", volunteering: "Volunteering",
    sponsorship: "Sponsorship", other: "Other",
    general: "General enquiry", feedback: "Feedback", media: "Media request",
    partnership: "Partnership", complaint: "Complaint"
  };

  /* ---------- Pure helpers (also used by the tests) ---------- */

  function isFutureOrToday(isoDate, today) {
    var d = new Date(isoDate + "T00:00:00");
    if (isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== isoDate) return null;   // not a real date
    var t = today || new Date();
    var start = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    return d >= start;
  }

  function cleanText(value) {
    // Trim, collapse stray control characters and limit length. Output is only ever shown with textContent.
    return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  }

  function validateValue(rule, value, opts) {
    value = cleanText(value);
    opts = opts || {};
    var label = opts.label || "This field";
    if (!value) return opts.required ? label + " is required." : "";
    if (rule === "name" && !NAME_RE.test(value)) return label + " must be 2 to 60 letters (spaces, hyphens and apostrophes are allowed).";
    if (rule === "email") {
      if (!EMAIL_RE.test(value)) return "Please enter a valid email address, for example name@example.com.";
      if (value.length > 100) return "Email address must be 100 characters or fewer.";
    }
    if (rule === "phone" && !PHONE_RE.test(value)) return "Please enter a South African number such as 073 123 4567 or +27 73 123 4567.";
    if (rule === "date") {
      if (!DATE_RE.test(value)) return "Please use the date format YYYY-MM-DD.";
      var ok = isFutureOrToday(value, opts.today);
      if (ok === null) return "That date does not exist. Please check the day and month.";
      if (!ok) return "Please choose today or a future date.";
    }
    if (opts.minLength && value.length < opts.minLength) return label + " must be at least " + opts.minLength + " characters (you have " + value.length + ").";
    if (opts.maxLength && value.length > opts.maxLength) return label + " must be " + opts.maxLength + " characters or fewer.";
    return "";
  }

  function compileEmail(formType, data, now) {
    var typeLabel = TYPE_LABELS[data.type] || data.type || formType;
    var subject = CONFIG.subjectPrefix + " " + (formType === "enquiry" ? "Enquiry" : formType === "volunteer" ? "Volunteer sign-up" : "Contact") +
      ": " + typeLabel + (data.subject ? " - " + data.subject : "");
    var lines = ["New message from the Hope Connect Foundation website", "----------------------------------------------------",
      "Form: " + formType, "Name: " + data.name, "Email: " + data.email];
    if (data.phone) lines.push("Phone: " + data.phone);
    if (data.type) lines.push("Type: " + typeLabel);
    if (data.date) lines.push("Preferred date: " + data.date);
    if (data.activity) lines.push("Volunteer activity: " + data.activity);
    if (data.subject) lines.push("Subject: " + data.subject);
    if (data.message) { lines.push("", "Message:", data.message); }
    lines.push("", "Submitted: " + (now || new Date()).toISOString());
    return { to: CONFIG.recipient, subject: subject, body: lines.join("\n") };
  }

  function enquiryResponse(data, today) {
    var t = data.type;
    var lines = [];
    var title = "Thank you, " + data.name.split(" ")[0] + ". Here is what you need to know:";
    if (t === "services") {
      lines.push("Cost: our services are free for community groups, schools and registered non-profits. Companies pay R350 per workshop session.");
      lines.push(dateAvailability(data.date, today));
    } else if (t === "projects") {
      lines.push("Cost: our community projects are free to attend.");
      lines.push("Availability: places are limited for each session, so we confirm your spot by email within 2 working days." + (data.date ? " " + dateAvailability(data.date, today) : ""));
    } else if (t === "volunteering") {
      lines.push("Cost: volunteering is free, and no experience is needed.");
      lines.push("Availability: orientation sessions run on the first Saturday of every month at 10:00. Places are currently available." + (data.date ? " " + dateAvailability(data.date, today) : ""));
    } else if (t === "sponsorship") {
      lines.push("Cost: sponsors can give R500 (Community Friend), R1 500 (Project Partner) or R5 000 (Programme Champion) per month, or make a once-off donation.");
      lines.push("Availability: we are accepting new sponsors now, and a team member will send the sponsorship pack within 2 working days.");
    } else {
      lines.push("We will reply to your enquiry within 2 working days.");
    }
    return { title: title, lines: lines };
  }

  function dateAvailability(isoDate, today) {
    if (!isoDate) return "Availability: weekday sessions (09:00 to 18:00) and Saturdays (10:00 to 16:00) are open for booking.";
    var day = new Date(isoDate + "T00:00:00").getDay();
    if (day === 0) return "Availability: we are closed on Sundays, so the nearest available day is the following Monday.";
    if (day === 6) return "Availability: Saturday sessions run from 10:00 to 16:00 by arrangement, and we will confirm your slot.";
    return "Availability: weekday slots between 09:00 and 18:00 are open on " + isoDate + ", subject to confirmation.";
  }

  /* ---------- DOM behaviour ---------- */

  function errorBox(control) {
    var id = control.id + "-error";
    var box = document.getElementById(id);
    if (!box) {
      box = document.createElement("span");
      box.id = id;
      box.className = "field-error";
      box.setAttribute("role", "alert");
      control.parentNode.insertBefore(box, control.nextSibling);
    }
    return box;
  }

  function fieldMessage(control) {
    var label = control.getAttribute("data-label") || "This field";
    var value = control.type === "checkbox" ? (control.checked ? "yes" : "") : control.value;
    var rule = control.getAttribute("data-rule") || (control.type === "email" ? "email" : "");
    var message = validateValue(rule, value, {
      required: control.required,
      label: label,
      minLength: control.getAttribute("minlength") ? Number(control.getAttribute("minlength")) : 0,
      maxLength: control.getAttribute("maxlength") ? Number(control.getAttribute("maxlength")) : 0
    });
    if (!message && control.tagName === "SELECT" && control.required && !control.value) message = "Please choose an option for " + label.toLowerCase() + ".";
    return message;
  }

  function showFieldState(control) {
    var message = fieldMessage(control);
    var box = errorBox(control);
    box.textContent = message;
    control.classList.toggle("is-invalid", !!message);
    if (message) { control.setAttribute("aria-invalid", "true"); control.setAttribute("aria-describedby", box.id); }
    else { control.removeAttribute("aria-invalid"); control.removeAttribute("aria-describedby"); }
    return message;
  }

  function controlsOf(form) {
    return Array.prototype.filter.call(form.elements, function (c) {
      return c.name && c.type !== "submit" && c.type !== "button" && !c.classList.contains("hp-input");
    });
  }

  function collect(form) {
    var data = {};
    controlsOf(form).forEach(function (c) {
      data[c.name] = c.type === "checkbox" ? (c.checked ? "yes" : "no") : cleanText(c.value);
    });
    return data;
  }

  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error("Request timed out")); }, ms);
      promise.then(function (v) { clearTimeout(timer); resolve(v); }, function (e) { clearTimeout(timer); reject(e); });
    });
  }

  function send(payload) {
    if (CONFIG.endpoint.indexOf("YOUR_FORM_ID") !== -1) {   // not configured yet: demo mode
      return new Promise(function (resolve) { setTimeout(function () { resolve({ demo: true }); }, CONFIG.demoDelayMs); });
    }
    return withTimeout(fetch(CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }), CONFIG.timeoutMs).then(function (response) {
      if (!response.ok) throw new Error("Server responded with status " + response.status);
      return { demo: false };
    });
  }

  function paragraph(text, className) {
    var p = document.createElement("p");
    if (className) p.className = className;
    p.textContent = text;
    return p;
  }

  function showStatus(box, kind, nodes) {
    box.className = "form-status form-status-" + kind;
    box.textContent = "";
    nodes.forEach(function (n) { box.appendChild(n); });
    box.hidden = false;
    box.setAttribute("tabindex", "-1");
    box.focus();
  }

  function initForm(form) {
    var formType = form.getAttribute("data-ajax-form");
    var status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "form-status";
      status.setAttribute("aria-live", "polite");
      status.hidden = true;
      form.appendChild(status);
    }
    var submit = form.querySelector("[type='submit']");

    // Today's date as the minimum for date fields.
    Array.prototype.forEach.call(form.querySelectorAll("input[type='date']"), function (d) {
      d.min = new Date().toISOString().slice(0, 10);
    });

    // Live character counters.
    Array.prototype.forEach.call(form.querySelectorAll("textarea[maxlength]"), function (area) {
      var counter = document.createElement("small");
      counter.className = "char-count";
      counter.setAttribute("aria-live", "off");
      area.parentNode.insertBefore(counter, area.nextSibling);
      var update = function () { counter.textContent = area.value.length + " / " + area.maxLength + " characters"; };
      area.addEventListener("input", update);
      update();
    });

    // Pre-select the enquiry type when the visitor arrives from a service or project card.
    var params = new URLSearchParams(window.location.search);
    var typeSelect = form.querySelector("select[name='type']");
    var wanted = params.get("type");
    if (typeSelect && wanted && Array.prototype.some.call(typeSelect.options, function (o) { return o.value === wanted; })) {
      typeSelect.value = wanted;
      var subject = form.querySelector("input[name='subject']");
      var item = params.get("item");
      if (subject && item && /^[a-z0-9-]{1,60}$/.test(item) && !subject.value) {
        subject.value = "Enquiry about " + item.replace(/-/g, " ");
      }
    }

    controlsOf(form).forEach(function (c) {
      var ev = (c.tagName === "SELECT" || c.type === "checkbox" || c.type === "date") ? "change" : "blur";
      c.addEventListener(ev, function () { showFieldState(c); });
      c.addEventListener("input", function () { if (c.classList.contains("is-invalid")) showFieldState(c); });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.hidden = true;

      var honeypot = form.querySelector(".hp-input");
      if (honeypot && honeypot.value) { form.reset(); return; }   // a bot filled the hidden field: ignore silently

      var firstInvalid = null, count = 0;
      controlsOf(form).forEach(function (c) {
        if (showFieldState(c)) { count++; if (!firstInvalid) firstInvalid = c; }
      });
      if (firstInvalid) {
        showStatus(status, "error", [paragraph("Please fix " + count + " highlighted " + (count === 1 ? "field" : "fields") + " and try again.")]);
        firstInvalid.focus();
        return;
      }

      var data = collect(form);
      var email = compileEmail(formType, data);
      var payload = {
        name: data.name, email: data.email, phone: data.phone || "", type: data.type || "", subject: data.subject || "",
        message: data.message || "", date: data.date || "", activity: data.activity || "",
        _subject: email.subject, _replyto: data.email, recipient: email.to, emailBody: email.body
      };

      submit.disabled = true;
      var originalLabel = submit.textContent;
      submit.textContent = "Sending...";

      send(payload).then(function (result) {
        var nodes = [paragraph("Thank you, " + data.name.split(" ")[0] + ". Your " + (formType === "enquiry" ? "enquiry" : formType === "volunteer" ? "volunteer sign-up" : "message") + " has been " + (result.demo ? "prepared." : "sent."), "status-title")];
        if (formType === "enquiry") {
          var reply = enquiryResponse(data);
          nodes.push(paragraph(reply.title, "status-sub"));
          reply.lines.forEach(function (l) { nodes.push(paragraph(l)); });
        }
        if (result.demo) nodes.push(paragraph("Demo mode: no form endpoint is configured yet, so this message was not delivered. See the README to connect a form service.", "status-note"));
        var details = document.createElement("details");
        var summary = document.createElement("summary");
        summary.textContent = "View the email that was prepared for " + email.to;
        var pre = document.createElement("pre");
        pre.textContent = "Subject: " + email.subject + "\n\n" + email.body;
        details.appendChild(summary);
        details.appendChild(pre);
        nodes.push(details);
        showStatus(status, "success", nodes);
        form.reset();
        controlsOf(form).forEach(function (c) { c.classList.remove("is-invalid"); errorBox(c).textContent = ""; });
      }).catch(function () {
        var link = document.createElement("a");
        link.href = "mailto:" + encodeURIComponent(email.to).replace("%40", "@") + "?subject=" + encodeURIComponent(email.subject) + "&body=" + encodeURIComponent(email.body);
        link.textContent = "send it from your email app instead";
        var p = paragraph("Sorry, we could not send your message just now. Your details are still in the form. Please try again, or ");
        p.appendChild(link);
        p.appendChild(document.createTextNode("."));
        showStatus(status, "error", [p]);
      }).then(function () {
        submit.disabled = false;
        submit.textContent = originalLabel;
      });
    });
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      Array.prototype.forEach.call(document.querySelectorAll("form[data-ajax-form]"), initForm);
    });
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateValue: validateValue, compileEmail: compileEmail, enquiryResponse: enquiryResponse, isFutureOrToday: isFutureOrToday, cleanText: cleanText, CONFIG: CONFIG };
  }
})();
