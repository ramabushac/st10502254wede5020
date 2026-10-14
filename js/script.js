// Hope Connect Foundation - Shared JavaScript
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
  });
  top.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

  // Gallery lightbox with previous/next controls, focus management and keyboard support.
  const links = [...document.querySelectorAll(".gallery-link")];
  const box = document.querySelector("#lightbox");
  if (links.length && box) {
    const image = box.querySelector("img");
    const close = box.querySelector(".lightbox-close, .close");
    const prev = box.querySelector(".prev");
    const next = box.querySelector(".next");
    const caption = box.querySelector("#lightboxCaption");
    let index = 0;
    let opener = null;   // the thumbnail that opened the viewer, so focus can return to it

    box.setAttribute("aria-modal", "true");

    const show = i => {
      index = (i + links.length) % links.length;
      image.src = links[index].getAttribute("href");
      image.alt = links[index].querySelector("img")?.alt || "Gallery image";
      if (caption) caption.textContent = links[index].dataset.caption || image.alt;
      box.classList.add("show");
      box.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };
    const open = i => {
      opener = document.activeElement;
      show(i);
      close?.focus();
    };
    const closeBox = () => {
      box.classList.remove("show");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      if (opener && typeof opener.focus === "function") opener.focus();
      opener = null;
    };

    links.forEach((link, i) => link.addEventListener("click", e => {
      e.preventDefault();
      open(i);
    }));
    close?.addEventListener("click", closeBox);
    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));
    box.addEventListener("click", e => {
      if (e.target === box) closeBox();
    });
    document.addEventListener("keydown", e => {
      if (!box.classList.contains("show")) return;
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "Tab") {   // keep keyboard focus inside the open viewer
        const focusable = [...box.querySelectorAll("button")].filter(b => !b.disabled);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

<<<<<<< HEAD
  // Client-side validation and confirmation for project forms.
  document.querySelectorAll("form:not([data-ajax-form])").forEach(form => {
    form.addEventListener("submit", e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      if (form.id === "volunteerForm" || form.classList.contains("contact-form-element")) {
        e.preventDefault();
        let message = form.querySelector(".form-message");
        if (!message) {
          message = document.createElement("p");
          message.className = "form-message";
          form.appendChild(message);
        }
        message.textContent = form.id === "volunteerForm"
          ? "Thank you for registering as a volunteer. We will contact you with the next steps."
          : "Thank you for contacting Hope Connect Foundation. Your message has been prepared successfully.";
        message.style.display = "block";
        form.reset();
      }
    });
  });
=======
>>>>>>> 5e1bd94e84e505461bb43abfa16922a990e5192e
  // Image quality/performance enhancement: mark orientation and lazy-load
  // gallery images while keeping the original high-resolution files for lightbox.
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
