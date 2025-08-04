// DOM Elements
const carouselTrack = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modalOverlay = document.getElementById("modalOverlay");
const requestDishBtns = document.querySelectorAll(".request-dish-btn");
const closeButton = document.getElementById("closeButton");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const video = document.getElementById("restaurantVideo");
const playButton = document.getElementById("playButton");
const videoContainer = document.querySelector(".video-container");

// Carousel functionality
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".carousel-item").length;
const slideWidth = 380; // 350px width + 30px margin
let autoSlideInterval;

function updateCarousel() {
  const translateX = -currentSlide * slideWidth;
  carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners for carousel
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

// Pause auto-slide on hover
const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.addEventListener("mouseenter", stopAutoSlide);
carouselContainer.addEventListener("mouseleave", startAutoSlide);

// Keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  }
});

// Touch/swipe functionality for mobile
let startX = 0;
let endX = 0;

carouselTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  stopAutoSlide();
});

carouselTrack.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
  startAutoSlide();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// Modal functionality
function openModal() {
  modalOverlay.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.classList.remove("modal-open");
  // Reset form
  document.getElementById("requestForm").reset();
}

// Event listeners for modal
requestDishBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

closeButton.addEventListener("click", closeModal);
cancelButton.addEventListener("click", closeModal);

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Get form data
  const form = document.getElementById("requestForm");
  const formData = new FormData(form);

  // Validate form
  if (form.checkValidity()) {
    // In a real application, you would send this data to a server
    alert("Request submitted successfully! We will contact you soon.");
    closeModal();
  } else {
    // Show validation errors
    form.reportValidity();
  }
});

// Close modal when clicking outside
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// Video functionality
playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    videoContainer.classList.add("playing");
  } else {
    video.pause();
    videoContainer.classList.remove("playing");
  }
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    videoContainer.classList.add("playing");
  } else {
    video.pause();
    videoContainer.classList.remove("playing");
  }
});

video.addEventListener("pause", () => {
  videoContainer.classList.remove("playing");
});

video.addEventListener("ended", () => {
  videoContainer.classList.remove("playing");
});

// Initialize carousel
document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
  startAutoSlide();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});
