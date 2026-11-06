
// ==============================
// CH UMAIR - PREMIUM INTERACTIVE WEBSITE
// ==============================


// 1. TYPING EFFECT

const words = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Creative Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const typing = document.getElementById("typing");
    if (!typing) return;

    const currentWord = words[wordIndex];

    charIndex += deleting ? -1 : 1;
    typing.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 55 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1300;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// 2. PREMIUM SCROLL REVEAL - FIXED

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .service-card, .project-card, .contact-content"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    revealElements.forEach((element, index) => {
        element.classList.add("reveal-item");

        if (
            element.classList.contains("skill-card") ||
            element.classList.contains("service-card") ||
            element.classList.contains("project-card")
        ) {
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 3) * 120}ms`
            );
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


// 3. ACTIVE NAVIGATION

const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");

        if (navbarNavigation && navToggle) {
            navbarNavigation.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
});

const navToggle = document.querySelector(".nav-toggle");
const navbarNavigation = document.getElementById("primary-navigation");

if (navToggle && navbarNavigation) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );
        navbarNavigation.classList.toggle("is-open", !isOpen);
    });
}


// 4. NAVBAR SCROLL EFFECT

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// 5. FOOTER YEAR

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} CH UMAIR. All Rights Reserved.`;
}


// 6. SUBTLE NEON MOUSE PARTICLES

let lastParticleTime = 0;

document.addEventListener("mousemove", (event) => {
    if (reducedMotion) return;

    const now = Date.now();

    if (now - lastParticleTime > 80) {
        lastParticleTime = now;

        const particle = document.createElement("div");
        particle.className = "mouse-particle";
        particle.style.left = event.clientX + "px";
        particle.style.top = event.clientY + "px";

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 700);
    }
});


// 3D Card Tilt Effect
const tiltCards = document.querySelectorAll(
  ".skill-card, .service-card, .project-card"
);

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// Keep concept-site navigation inside its own scrollable preview.
document.querySelectorAll(".concept-site").forEach((site) => {
    site.addEventListener("click", (event) => {
        const link = event.target instanceof Element
            ? event.target.closest("a[href^='#']")
            : null;

        if (!link) return;

        const target = document.getElementById(link.getAttribute("href").slice(1));

        if (!target || !site.contains(target)) return;

        event.preventDefault();

        const header = site.querySelector(".concept-header");
        const targetTop =
            target.getBoundingClientRect().top -
            site.getBoundingClientRect().top +
            site.scrollTop -
            (header ? header.offsetHeight : 0);

        site.scrollTo({
            top: Math.max(0, targetTop),
            behavior: reducedMotion ? "auto" : "smooth"
        });

        site.querySelectorAll(".concept-mobile-menu[open]").forEach((menu) => {
            menu.open = false;
        });
    });
});

// 8. CONSOLE MESSAGE

console.log("CH UMAIR Portfolio Loaded Successfully!");
