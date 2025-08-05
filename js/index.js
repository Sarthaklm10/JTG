const modalOverlay = document.getElementById("modalOverlay");
const requestDishBtns = document.querySelectorAll(".request-dish-btn");
const closeButton = document.getElementById("closeButton");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const video = document.getElementById("restaurantVideo");
const videoContainer = document.getElementById("videoContainer");
const videoOverlay = document.getElementById("videoOverlay");
const carouselTrack = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// === Carousel ===
let currentSlide = 0;
let totalSlides = 0;
let slideWidth = 0;
let autoSlideInterval;

function initializeCarousel() {
  if (!carouselTrack || !prevBtn || !nextBtn) return;

  const slides = carouselTrack.querySelectorAll(".carousel-item");
  totalSlides = slides.length;

  if (totalSlides > 3) {
    const slideStyle = window.getComputedStyle(slides[0]);
    const gap = parseInt(slideStyle.marginRight, 10) || 30;
    slideWidth = slides[0].offsetWidth + gap;

    // Infinite loop effect
    for (let i = 0; i < 3; i++) {
      carouselTrack.appendChild(slides[i].cloneNode(true));
    }
    startAutoSlide();
  } else {
    // Not enough items to slide
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}

function updateCarousel(transition = true) {
  if (!carouselTrack) return;
  const translateX = -currentSlide * slideWidth;
  carouselTrack.style.transition = transition ? "transform 0.5s ease" : "none";
  carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function nextSlide() {
  currentSlide++;
  updateCarousel();

  if (currentSlide >= totalSlides) {
    setTimeout(() => {
      currentSlide = 0;
      updateCarousel(false);
    }, 500);
  }
}

function prevSlide() {
  if (currentSlide <= 0) {
    currentSlide = totalSlides;
    updateCarousel(false);
    // Timeout
    setTimeout(() => {
      currentSlide--;
      updateCarousel(true);
    }, 20);
  } else {
    currentSlide--;
    updateCarousel();
  }
}

function startAutoSlide() {
  stopAutoSlide(); // Clear any existing interval
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
  });
}

const carouselContainer = document.querySelector(".carousel-container");
if (carouselContainer) {
  carouselContainer.addEventListener("mouseenter", stopAutoSlide);
  carouselContainer.addEventListener("mouseleave", startAutoSlide);
}

// === Modal ===
function openModal() {
  if (modalOverlay) {
    modalOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    const form = document.getElementById("requestForm");
    if (form) form.reset();
  }
}

if (requestDishBtns.length > 0)
  requestDishBtns.forEach((btn) => btn.addEventListener("click", openModal));
if (closeButton) closeButton.addEventListener("click", closeModal);
if (cancelButton) cancelButton.addEventListener("click", closeModal);
if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("requestForm");
    if (form.checkValidity()) {
      alert("Request submitted successfully!");
      closeModal();
    } else {
      form.reportValidity();
    }
  });
}
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// === Video Player ===
if (videoContainer && video && videoOverlay) {
  const playVideo = () => {
    video.controls = true;
    video.play();
  };
  videoOverlay.addEventListener("click", playVideo);
  video.addEventListener("play", () => videoContainer.classList.add("playing"));
  video.addEventListener("pause", () =>
    videoContainer.classList.remove("playing")
  );
  video.addEventListener("ended", () => {
    videoContainer.classList.remove("playing");
    video.controls = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCarousel();
});
