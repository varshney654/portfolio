// Import tsParticles (already loaded via CDN in index.html, but we will initialize it here)
// Also ScrollReveal is loaded via CDN

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Navbar Glassmorphism Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. tsParticles Initialization
  // Using the basic engine loaded via CDN
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
      color: {
        value: "#050505",
      },
    },
    particles: {
      color: {
        value: ["#00F0FF", "#8A2BE2", "#ffffff"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40, // Keeps it subtle and premium
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  });

  // 3. ScrollReveal Animations
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 200,
    reset: false // Plays only once
  });

  sr.reveal('.hero-content', { delay: 200, origin: 'left' });
  sr.reveal('.hero-image-col', { delay: 400, origin: 'right' });
  sr.reveal('.section-header', { delay: 200 });
  sr.reveal('.stat-item', { delay: 200, interval: 100 });
  sr.reveal('.about-text', { delay: 300, origin: 'left' });
  sr.reveal('.services-card', { delay: 400, origin: 'right' });
  sr.reveal('.skill-card', { delay: 200, interval: 100 });
  sr.reveal('.project-card', { delay: 300, interval: 200 });
  sr.reveal('.cert-gallery-card', { delay: 200, interval: 100, origin: 'bottom' });
  sr.reveal('.resume .glass-card', { delay: 300, origin: 'bottom', scale: 0.95 });
  sr.reveal('.profile-card', { delay: 300, interval: 200 });
  sr.reveal('.timeline-item', { delay: 200, interval: 150 });
  sr.reveal('.contact-info', { delay: 300, origin: 'left' });
  sr.reveal('.contact-form-card', { delay: 400, origin: 'right' });

  // 4. Animated Statistics Counter
  const counters = document.querySelectorAll('.counter');
  let started = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps approx
      
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // Observe when stats section is in view to trigger counter
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        startCounters();
        started = true;
      }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
});

// Certificate Lightbox Functionality
const BASE_URL = import.meta.env.BASE_URL || '/';
window.openCertificate = function(url, isPdf) {
  // Ensure the path is correctly appended to the base URL
  const cleanUrl = url.replace(/^\.?\//, '');
  const fullUrl = BASE_URL + cleanUrl;

  if (isPdf) {
      window.open(fullUrl, '_blank');
  } else {
      document.getElementById('certModalImg').src = fullUrl;
      // Use bootstrap modal
      const certModal = new bootstrap.Modal(document.getElementById('certModal'));
      certModal.show();
  }
};
