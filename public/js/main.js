// main.js – Interatividade premium para Ritzel New Concept Salon

// Helper: debounce to limit scroll events
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Navigation toggle for mobile
function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const nav = document.getElementById('navbar');

  function openMenu() {
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    navOverlay.classList.add('active');
  }
  function closeMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
  }

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  // Change nav style on scroll
  const onScroll = debounce(() => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, 50);

  window.addEventListener('scroll', onScroll);
}

// IntersectionObserver for reveal animations
function initReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const options = {
    threshold: 0.15,
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, options);
  revealElements.forEach(el => observer.observe(el));
}

// Counter animation for About stats
function initCounters() {
  const counters = document.querySelectorAll('.about__stat-number');
  const options = { threshold: 0.6 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const start = performance.now();
        const startValue = 0;
        function step(timestamp) {
          const progress = Math.min((timestamp - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, options);
  counters.forEach(c => observer.observe(c));
}

// Hero particle generation (soft gold particles)
function initHeroParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;
  const particleCount = 30;
  const createParticle = () => {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1; // 1-4px
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    const delay = Math.random() * 5; // seconds
    p.style.animationDelay = `${delay}s`;
    container.appendChild(p);
  };
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
}

// Tooltip for floating WhatsApp button (show on hover via CSS already, but ensure accessibility)
function initWhatsAppFloat() {
  const btn = document.getElementById('whatsapp-float-btn');
  if (!btn) return;
  btn.addEventListener('focus', () => {
    btn.parentElement.classList.add('show-tooltip');
  });
  btn.addEventListener('blur', () => {
    btn.parentElement.classList.remove('show-tooltip');
  });
}

// Rastreamento de conversão de WhatsApp para Google Ads
function initWhatsAppConversion() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (typeof window.gtag_report_conversion === 'function') {
        e.preventDefault();
        window.gtag_report_conversion(this.href);
      }
    });
  });
}

// Initialize all when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveals();
  initCounters();
  initHeroParticles();
  initWhatsAppFloat();
  initWhatsAppConversion();
});
