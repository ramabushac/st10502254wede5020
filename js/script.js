// Hope Connect Foundation
// Shared JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
    // Highlight the current navigation page.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a, .nav a, header a").forEach(function (link) {
        const href = (link.getAttribute("href") || "").split("#")[0];
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    // Add a simple back-to-top button when the page is long.
    const topButton = document.createElement("button");
    topButton.type = "button";
    topButton.id = "backToTop";
    topButton.textContent = "↑";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.title = "Back to top";
    topButton.style.display = "none";
    topButton.style.position = "fixed";
    topButton.style.right = "20px";
    topButton.style.bottom = "20px";
    topButton.style.zIndex = "999";
    topButton.style.cursor = "pointer";
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(topButton);

    window.addEventListener("scroll", function () {
        topButton.style.display = window.scrollY > 350 ? "block" : "none";
    });

    // Basic contact/get-involved form validation.
    document.querySelectorAll("form").forEach(function (form) {
        form.addEventListener("submit", function (event) {
            const requiredFields = form.querySelectorAll("[required]");
            let valid = true;

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = "red";
                } else {
                    field.style.borderColor = "";
                }
            });

            if (!valid) {
                event.preventDefault();
                alert("Please complete all required fields before submitting.");
            }
        });
    });
});


// Previously inline scripts preserved from the original pages.

// --- get-involved.html ---
const form = document.getElementById('volunteerForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const activity = form.activity.value;

    if(name && email && activity) {
      alert(`Thank you, ${name}! You have signed up for ${activity.replace('_',' ')}.`);
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });

// --- gallery.html ---
const galleryImages = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  function closeLightbox() { lightbox.style.display = 'none'; }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  window.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
  });
