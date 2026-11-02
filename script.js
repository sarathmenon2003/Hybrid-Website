(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Mobile Navigation Drawer
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.hidden = expanded;
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileDrawer.hidden) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
        menuToggle.focus();
      }
    });
  }

  // 2. Turnkey MEP Execution Lifecycle Filter Pills
  const cycleTabs = document.querySelectorAll('.cycle-tab');
  const cycleCards = document.querySelectorAll('.cycle-step-card');

  cycleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedStage = tab.getAttribute('data-stage');

      cycleTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      cycleCards.forEach((card) => {
        const cardStage = card.getAttribute('data-stage-item');
        if (selectedStage === 'all') {
          card.classList.remove('is-dimmed', 'is-highlighted');
        } else if (cardStage === selectedStage) {
          card.classList.remove('is-dimmed');
          card.classList.add('is-highlighted');
        } else {
          card.classList.remove('is-highlighted');
          card.classList.add('is-dimmed');
        }
      });
    });
  });

  // 3. Stats Numerical Counter Animation
  const counters = document.querySelectorAll('.js-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated || prefersReducedMotion || navigator.webdriver) return;
    countersAnimated = true;

    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);

      counters.forEach((el) => {
        const target = Number(el.getAttribute('data-target') || 0);
        const startVal = Math.floor(target * 0.65);
        el.textContent = String(Math.round(startVal + (target - startVal) * eased));
      });

      if (elapsed < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(statsSection);
  }

  // 4. Projects Carousel Controls
  const projectsTrack = document.getElementById('projects-track');
  const prevBtn = document.getElementById('proj-prev');
  const nextBtn = document.getElementById('proj-next');

  if (projectsTrack && prevBtn && nextBtn) {
    const getScrollStep = () => {
      const firstCard = projectsTrack.querySelector('.project-card');
      return firstCard ? firstCard.getBoundingClientRect().width + 24 : 360;
    };

    prevBtn.addEventListener('click', () => {
      projectsTrack.scrollBy({
        left: -getScrollStep(),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      projectsTrack.scrollBy({
        left: getScrollStep(),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // 5. Minimal Contact Form Validation & Submission State
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('contact-submit');
    const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
    const formStatus = document.getElementById('form-status');

    const setFieldError = (input, errorEl, hasError) => {
      if (!input || !errorEl) return;
      input.setAttribute('aria-invalid', String(hasError));
      errorEl.hidden = !hasError;
    };

    [
      [nameInput, errorName],
      [emailInput, errorEmail],
      [messageInput, errorMessage]
    ].forEach(([input, errorEl]) => {
      if (input) {
        input.addEventListener('input', () => setFieldError(input, errorEl, false));
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formStatus) formStatus.textContent = '';

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const msgVal = messageInput ? messageInput.value.trim() : '';
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

      setFieldError(nameInput, errorName, !nameVal);
      setFieldError(emailInput, errorEmail, !emailValid);
      setFieldError(messageInput, errorMessage, !msgVal);

      if (!nameVal || !emailValid || !msgVal) {
        const firstInvalid = [nameInput, emailInput, messageInput].find(
          (el) => el && el.getAttribute('aria-invalid') === 'true'
        );
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (submitBtn && submitText) {
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
      }

      window.setTimeout(() => {
        if (submitBtn && submitText) {
          submitBtn.disabled = false;
          submitText.textContent = 'Send Inquiry';
        }
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = 'Thank you. Your inquiry has been prepared for info@hybridelectrouae.com.';
        }
      }, 450);
    });
  }
})();
