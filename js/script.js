// Hope Connect Foundation - Part 3 JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a[data-page]").forEach(link => {
    if (link.dataset.page === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  let top = document.querySelector("#backToTop");
  if (!top) {
    top = document.createElement("button");
    top.id = "backToTop";
    top.type = "button";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(top);
  }
  window.addEventListener("scroll", () => {
    top.style.display = window.scrollY > 350 ? "block" : "none";
  }, {passive: true});
  top.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

  // Gallery lightbox with previous/next controls.
  const links = [...document.querySelectorAll(".gallery-link")];
  const box = document.querySelector("#lightbox");
  if (links.length && box) {
    const image = box.querySelector("img");
    const close = box.querySelector(".lightbox-close, .close");
    const prev = box.querySelector(".prev");
    const next = box.querySelector(".next");
    const caption = box.querySelector("#lightboxCaption");
    let index = 0;

    const show = i => {
      index = (i + links.length) % links.length;
      image.src = links[index].getAttribute("href");
      image.alt = links[index].querySelector("img")?.alt || "Gallery image";
      if (caption) caption.textContent = links[index].dataset.caption || image.alt;
      box.classList.add("show");
      box.setAttribute("aria-hidden", "false");
    };
    links.forEach((link, i) => link.addEventListener("click", e => {
      e.preventDefault();
      show(i);
    }));
    close?.addEventListener("click", () => {
      box.classList.remove("show");
      box.setAttribute("aria-hidden", "true");
    });
    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));
    box.addEventListener("click", e => {
      if (e.target === box) {
        box.classList.remove("show");
        box.setAttribute("aria-hidden", "true");
      }
    });
    document.addEventListener("keydown", e => {
      if (!box.classList.contains("show")) return;
      if (e.key === "Escape") {
        box.classList.remove("show");
        box.setAttribute("aria-hidden", "true");
      }
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  // Dynamic services content with search, filtering and sorting.
  const serviceList = document.querySelector("#serviceList");
  if (serviceList) {
    const services = [
      {name:"Educational Workshops", category:"education", icon:"fa-chalkboard-teacher", description:"Interactive sessions and seminars that raise awareness, build leadership skills and support learning around social equity, sustainable practices and civic engagement."},
      {name:"Environmental Consulting", category:"environment", icon:"fa-seedling", description:"Support for greener spaces, waste management and community environmental activities such as gardens, clean-ups and tree planting."},
      {name:"Community Organising Support", category:"community", icon:"fa-users-cog", description:"Mentorship and practical support for community leaders who want to organise activities, build alliances and strengthen local participation."},
      {name:"Fundraising Assistance", category:"fundraising", icon:"fa-hand-holding-usd", description:"Guidance with crowdfunding strategies, grant writing and donor outreach to help grassroots initiatives build sustainable funding."}
    ];
    const search = document.querySelector("#serviceSearch");
    const category = document.querySelector("#serviceCategory");
    const sort = document.querySelector("#serviceSort");
    const status = document.querySelector("#serviceResultsStatus");

    const render = () => {
      const term = (search?.value || "").trim().toLowerCase();
      const cat = category?.value || "all";
      let results = services.filter(item => {
        const matchesText = !term || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(term);
        const matchesCategory = cat === "all" || item.category === cat;
        return matchesText && matchesCategory;
      });
      if (sort?.value === "az") results.sort((a,b) => a.name.localeCompare(b.name));
      if (sort?.value === "za") results.sort((a,b) => b.name.localeCompare(a.name));

      serviceList.innerHTML = "";
      results.forEach(item => {
        const article = document.createElement("article");
        article.className = "dynamic-card";
        const icon = document.createElement("i");
        icon.className = `fas ${item.icon}`;
        icon.setAttribute("aria-hidden", "true");
        const h3 = document.createElement("h3");
        h3.textContent = item.name;
        const tag = document.createElement("span");
        tag.className = "service-tag";
        tag.textContent = item.category;
        const p = document.createElement("p");
        p.textContent = item.description;
        article.append(icon, h3, tag, p);
        serviceList.appendChild(article);
      });
      if (status) status.textContent = `${results.length} service${results.length === 1 ? "" : "s"} shown.`;
      if (!results.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "No services matched your search. Try another keyword or category.";
        serviceList.appendChild(empty);
      }
    };
    [search, category, sort].forEach(control => control?.addEventListener("input", render));
    [category, sort].forEach(control => control?.addEventListener("change", render));
    render();
  }

  // Shared secure client-side validation helper.
  const validateForm = form => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    const message = form.querySelector('textarea[name="message"]');
    if (message && message.value.trim().length < 20) {
      message.setCustomValidity("Please provide at least 20 characters.");
      form.reportValidity();
      message.setCustomValidity("");
      return false;
    }
    return true;
  };

  // AJAX helper. FormSubmit provides email delivery for a static site.
  const sendAjaxForm = async (form, statusElement, successText) => {
    const recipient = "contact@hopeconnectfoundation.org";
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`;
    const formData = new FormData(form);
    formData.append("_subject", `Hope Connect Foundation - ${form.id === "enquiryForm" ? "Service Enquiry" : "Website Contact"}`);
    formData.append("_captcha", "true");
    formData.append("_template", "table");

    statusElement.className = "form-message";
    statusElement.textContent = "Sending your message...";
    statusElement.style.display = "block";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {"Accept": "application/json"}
      });
      if (!response.ok) throw new Error("The email service returned an error.");
      const result = await response.json().catch(() => ({}));
      if (result.success === false) throw new Error("The email service rejected the request.");
      statusElement.className = "form-message success";
      statusElement.textContent = successText;
      form.reset();
    } catch (error) {
      console.error("AJAX form submission failed:", error);
      statusElement.className = "form-message error";
      statusElement.textContent = "We could not send the form right now. Please email contact@hopeconnectfoundation.org directly.";
    }
  };

  document.querySelector("#contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validateForm(form)) return;
    sendAjaxForm(form, document.querySelector("#contactStatus"),
      "Thank you. Your message was sent successfully. We will respond as soon as possible.");
  });

  document.querySelector("#enquiryForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validateForm(form)) return;
    const date = document.querySelector("#enquiryDate");
    if (date && date.value && date.value < new Date().toISOString().split("T")[0]) {
      date.setCustomValidity("Please choose today or a future date.");
      form.reportValidity();
      date.setCustomValidity("");
      return;
    }
    sendAjaxForm(form, document.querySelector("#enquiryStatus"),
      "Thank you. Your enquiry was sent. We will review availability, next steps and any applicable costs.");
  });

  // Existing volunteer form: validate and give an immediate acknowledgement.
  document.querySelector("#volunteerForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validateForm(form)) return;
    let message = form.querySelector(".form-message");
    if (!message) {
      message = document.createElement("p");
      message.className = "form-message";
      form.appendChild(message);
    }
    message.textContent = "Thank you for registering as a volunteer. We will contact you with the next steps.";
    message.style.display = "block";
    form.reset();
  });

  // Image quality/performance enhancement.
  document.querySelectorAll(".gallery img, .project-images img").forEach(img => {
    img.loading = img.loading || "lazy";
    img.decoding = "async";
    const markOrientation = () => {
      const figure = img.closest("figure");
      if (!figure || !img.naturalWidth || !img.naturalHeight) return;
      figure.dataset.orientation = img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
    };
    if (img.complete) markOrientation();
    else img.addEventListener("load", markOrientation, {once: true});
  });
});
