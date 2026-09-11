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
      if (e.target === box) box.classList.remove("show");
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

  // Client-side validation and confirmation for project forms.
  document.querySelectorAll("form").forEach(form => {
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
});
