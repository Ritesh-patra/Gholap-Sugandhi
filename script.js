// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Preloader Logic
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // Hide preloader
  tl.to("#preloader", {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut",
    delay: 0.5,
  });

  // Hero Elements Load Animation
  tl.fromTo(
    ".hero-badge",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.2",
  )
    .fromTo(
      ".hero-title",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.6",
    )
    .fromTo(
      ".hero-tagline",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6",
    )
    .fromTo(
      ".hero-buttons a",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" },
      "-=0.4",
    )
    .fromTo(
      ".nav-links a, .logo-container, .nav-icons a",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=1",
    );
});

// Parallax Effect for Hero Background
gsap.to("#hero-bg", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Navbar Sticky Shrink Effect
ScrollTrigger.create({
  start: "top -50",
  end: 99999,
  toggleClass: { className: "navbar-scrolled", targets: "#navbar" },
  onUpdate: (self) => {
    if (self.direction === 1) {
      // Scrolling down
      gsap.to(".top-bar", { yPercent: -100, duration: 0.3 });
      gsap.to("#navbar", {
        top: 0,
        height: "80px",
        backgroundColor: "rgba(255, 248, 231, 0.95)",
        duration: 0.3,
      });
    } else {
      // Scrolling up
      if (window.scrollY < 50) {
        gsap.to(".top-bar", { yPercent: 0, duration: 0.3 });
        gsap.to("#navbar", {
          top: "32px",
          height: "96px",
          backgroundColor: "rgba(255, 248, 231, 0.85)",
          duration: 0.3,
        });
      }
    }
  },
});

// ScrollTrigger for Products Section
gsap.from(".section-header", {
  scrollTrigger: {
    trigger: ".section-header",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".product-card", {
  scrollTrigger: {
    trigger: ".product-card",
    start: "top 85%",
  },
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Mobile Menu Logic with GSAP
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const menuLinks = document.querySelectorAll("#mobile-menu a");

let isMenuOpen = false;

const menuTl = gsap.timeline({ paused: true });

// OPEN animation
menuTl
  .to(mobileMenu, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.4,
    ease: "power2.inOut",
  })
  .fromTo(
    ".menu-items a",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
    "-=0.2",
  )
  .fromTo(
    ".mobile-socials",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
    "-=0.2",
  );

// CLOSE function (important 🔥)
function closeMenu() {
  isMenuOpen = false;

  menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>`;
  menuIcon.classList.replace("text-cream", "text-maroon");

  menuTl.reverse();
}

// Button toggle
mobileBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
    menuIcon.classList.replace("text-maroon", "text-cream");

    menuTl.play();
  } else {
    closeMenu();
  }
});

// ✅ Link click → menu close
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// ✅ ESC key → close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) {
    closeMenu();
  }
});

// ✅ Outside click → close
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

// ✅ FIX: reverse hone ke baad pointer-events disable
menuTl.eventCallback("onReverseComplete", () => {
  gsap.set(mobileMenu, { pointerEvents: "none" });
});

// about section java script
// --- 1. Interactive Tabs Logic (Vanilla JS) ---
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active styling from all buttons
    tabBtns.forEach((b) => {
      b.classList.remove("text-maroon");
      b.classList.add("text-maroon/40");
      b.querySelector(".tab-indicator").style.width = "0";
    });

    // Hide all content panes
    tabPanes.forEach((p) => {
      p.classList.remove("opacity-100", "z-10", "translate-y-0");
      p.classList.add(
        "opacity-0",
        "z-0",
        "pointer-events-none",
        "translate-y-4",
      );
    });

    // Add active styling to the clicked button
    btn.classList.remove("text-maroon/40");
    btn.classList.add("text-maroon");
    btn.querySelector(".tab-indicator").style.width = "100%";

    // Show the corresponding content pane
    const targetId = btn.getAttribute("data-target");
    const targetPane = document.getElementById(targetId);
    targetPane.classList.remove(
      "opacity-0",
      "z-0",
      "pointer-events-none",
      "translate-y-4",
    );
    targetPane.classList.add("opacity-100", "z-10", "translate-y-0");
  });
});

// --- 2. GSAP Scroll Animation for About Section ---
// Animates the image and text when you scroll down to them
gsap.from(".about-image-wrapper", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%", // Triggers when the top of the section hits 75% down the screen
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".about-text-wrapper", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
  },
  x: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

//why choose us code

//contact secton js
// --- 5. GSAP Animation for Contact Section ---

// Header Text Fade In
gsap.from(".contact-header", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Contact Info Items Slide In from Left
gsap.from(".contact-info-item", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 70%",
  },
  x: -40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2, // Pop in one by one
  ease: "power2.out",
});

// Form Wrapper Slide In from Right
gsap.from(".contact-form-wrapper", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 70%",
  },
  x: 40,
  opacity: 0,
  duration: 1,
  delay: 0.3, // Wait slightly after the left side starts
  ease: "power3.out",
});

//customer testimonal
// --- 6. GSAP Animation for Testimonials Header ---
gsap.from(".testimonial-header", {
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

//footer section code
// --- 7. GSAP Animation for Footer ---
gsap.from(".footer-col", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15, // Cascade effect for each column
  ease: "power2.out",
});

gsap.from(".footer-bottom", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 95%",
  },
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
});

// --- 8. Scroll to Top Button Logic ---
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  // Show button after scrolling down 500px
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.remove("translate-y-20", "opacity-0");
    scrollToTopBtn.classList.add("translate-y-0", "opacity-100");
  } else {
    scrollToTopBtn.classList.add("translate-y-20", "opacity-0");
    scrollToTopBtn.classList.remove("translate-y-0", "opacity-100");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  // Smooth scroll back to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//contact form data
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const text = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0AMessage: ${message}`;

  const whatsappUrl = `https://wa.me/919823216445?text=${text}`;

  window.open(whatsappUrl, "_blank");
});
