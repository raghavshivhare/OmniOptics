// Import GSAP from CDN (already loaded via HTML script tag)

// Safety check - ensure all content is visible if GSAP fails to load
if (typeof gsap === "undefined") {
  console.warn("GSAP not loaded, content will display without animations");
} else {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navLinks.classList.remove("mobile-active");
      mobileMenuToggle.classList.remove("active");
    }
  });
});

// Navbar Background on Scroll
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Only run GSAP animations if GSAP is loaded
if (typeof gsap !== "undefined") {
  // Hero Section Animations
  gsap.set(
    [
      ".hero-badge",
      ".hero-title",
      ".hero-description",
      ".hero-buttons .btn",
      ".stat",
    ],
    { opacity: 1, y: 0 }
  );

  gsap.from(".hero-badge", {
    duration: 0.8,
    opacity: 0,
    y: 30,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".hero-title", {
    duration: 1,
    opacity: 0,
    y: 50,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from(".hero-description", {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 0.6,
    ease: "power3.out",
  });

  gsap.from(".hero-buttons .btn", {
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.2,
    delay: 0.8,
    ease: "power3.out",
  });

  gsap.from(".stat", {
    duration: 0.8,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    delay: 1.2,
    ease: "power3.out",
  });

  // Animate gradient orbs
  gsap.to(".orb-1", {
    x: 100,
    y: -100,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-2", {
    x: -80,
    y: 80,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-3", {
    x: 60,
    y: 60,
    duration: 22,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Features Section Animation
  if (document.querySelectorAll(".feature-card").length > 0) {
    gsap.set(".feature-card", { opacity: 1, y: 0 });
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.15,
      ease: "power3.out",
    });
  }

  // Hover effect for feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".feature-icon"), {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".feature-icon"), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Google Technologies Section Animation
  if (document.querySelectorAll(".tech-card").length > 0) {
    gsap.set(".tech-card", { opacity: 1, y: 0 });
    gsap.from(".tech-card", {
      scrollTrigger: {
        trigger: ".google-tech",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.15,
      ease: "power3.out",
    });
  }

  // Hover effect for tech cards
  document.querySelectorAll(".tech-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".tech-logo"), {
        scale: 1.15,
        rotation: 8,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".tech-logo"), {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  // How It Works Section Animation
  document.querySelectorAll(".step").forEach((step, index) => {
    const isEven = index % 2 === 0;

    // Set default visible state
    gsap.set(step, { opacity: 1, x: 0 });

    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      opacity: 0,
      x: isEven ? -100 : 100,
      ease: "power3.out",
    });

    // Animate step number with counter
    const stepNumber = step.querySelector(".step-number");
    const targetNumber = parseInt(stepNumber.textContent);

    ScrollTrigger.create({
      trigger: step,
      start: "top 85%",
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: targetNumber,
            duration: 1,
            ease: "power2.out",
            onUpdate: function () {
              stepNumber.textContent = Math.round(this.targets()[0].val)
                .toString()
                .padStart(2, "0");
            },
          }
        );
      },
    });

    // Animate visual elements
    const visual = step.querySelector(".step-visual");
    if (visual) {
      gsap.set(visual, { opacity: 1, scale: 1 });
      gsap.from(visual, {
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        scale: 0.9,
        opacity: 0,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    }
  });

  // Processing dots animation
  gsap.to(".processing-dots span", {
    scale: 1.5,
    opacity: 0.3,
    duration: 0.6,
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  // Demo Section Animation
  if (document.querySelector(".video-placeholder")) {
    gsap.set(".video-placeholder", { opacity: 1, scale: 1 });
    gsap.from(".video-placeholder", {
      scrollTrigger: {
        trigger: ".demo",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      opacity: 0,
      scale: 0.95,
      ease: "power3.out",
    });
  }

  // Pulse animation for video placeholder icon
  gsap.to(".video-placeholder-icon", {
    scale: 1.2,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Download Section Animation
  if (document.querySelectorAll(".download-content > *").length > 0) {
    gsap.set(".download-content > *", { opacity: 1, y: 0 });
    gsap.from(".download-content > *", {
      scrollTrigger: {
        trigger: ".download",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
    });
  }

  // Animate installation steps
  if (document.querySelectorAll(".steps-list li").length > 0) {
    gsap.set(".steps-list li", { opacity: 1, x: 0 });
    gsap.from(".steps-list li", {
      scrollTrigger: {
        trigger: ".installation-steps",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      x: -30,
      stagger: 0.15,
      ease: "power2.out",
    });
  }

  // Upcoming Features Animation
  if (document.querySelectorAll(".upcoming-card").length > 0) {
    gsap.set(".upcoming-card", { opacity: 1, y: 0 });
    gsap.from(".upcoming-card", {
      scrollTrigger: {
        trigger: ".upcoming",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  // Hover effect for upcoming cards
  document.querySelectorAll(".upcoming-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".upcoming-icon"), {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".upcoming-icon"), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Team Section Animation
  if (document.querySelectorAll(".team-card").length > 0) {
    gsap.set(".team-card", { opacity: 1, y: 0 });
    gsap.from(".team-card", {
      scrollTrigger: {
        trigger: ".team",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.15,
      ease: "power3.out",
    });
  }

  // Hover effect for team cards
  document.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this.querySelector(".team-avatar"), {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this.querySelector(".team-avatar"), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Footer Animation
  if (document.querySelectorAll(".footer-column").length > 0) {
    gsap.set(".footer-column", { opacity: 1, y: 0 });
    gsap.from(".footer-column", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  // Parallax effect for section headers
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
      },
      y: 50,
      opacity: 0.5,
    });
  });

  // Stats counter animation
  function animateCounter(element, target, duration = 2) {
    gsap.to(
      { val: 0 },
      {
        val: target,
        duration: duration,
        ease: "power2.out",
        onUpdate: function () {
          const value = Math.round(this.targets()[0].val);
          if (element.dataset.suffix) {
            element.textContent = value + element.dataset.suffix;
          } else {
            element.textContent = value;
          }
        },
      }
    );
  }

  // Trigger stats animation when in view
  ScrollTrigger.create({
    trigger: ".hero-stats",
    start: "top 80%",
    once: true,
    onEnter: () => {
      document.querySelectorAll(".stat-number").forEach((stat) => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ""));
        const suffix = text.replace(/\d/g, "");
        stat.dataset.suffix = suffix;
        animateCounter(stat, number);
      });
    },
  });

  // Button hover effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Download button click effect
  const downloadBtn = document.querySelector(
    'a[href="./omni-optics-extension.zip"]'
  );
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      // Check if file exists, if not show message
      fetch("./omni-optics-extension.zip", { method: "HEAD" })
        .then((response) => {
          if (!response.ok) {
            e.preventDefault();
            alert(
              "Extension package is being prepared. Please check back soon or contact the team."
            );
          }
        })
        .catch(() => {
          e.preventDefault();
          alert(
            "Extension package is being prepared. Please check back soon or contact the team."
          );
        });

      // Animate button
      gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    });
  }

  // Cursor trail effect for hero section
  const hero = document.querySelector(".hero");
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    const orbs = document.querySelectorAll(".gradient-orb");
    orbs.forEach((orb, index) => {
      const speed = 0.02 + index * 0.01;
      gsap.to(orb, {
        x: cursorX * speed,
        y: cursorY * speed,
        duration: 1,
        ease: "power1.out",
      });
    });

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Scroll progress indicator
  const scrollProgress = document.createElement("div");
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.1s ease-out;
`;
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  });

  // Lazy loading for images (if any are added later)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Console message
  console.log(
    "%c OmniOptics - Focus Flow ",
    "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;"
  );
  console.log(
    "%c Built for ADHD-friendly browsing ",
    "color: #667eea; font-size: 12px;"
  );

  // Performance optimization: Reduce animations on low-end devices
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      ScrollTrigger.config({
        limitCallbacks: true,
      });
    }
  }
} // End of GSAP check
