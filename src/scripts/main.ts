import { projectsData } from '../data/projects';

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0. Scroll Theme Engine (Light <-> Blue)
  const themedSections = document.querySelectorAll<HTMLElement>('[data-theme]');
  if (themedSections.length && 'IntersectionObserver' in window) {
    const themeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            document.body.classList.toggle('theme-blue', target.dataset.theme === 'blue');
          }
        });
      },
      // A section takes over once it crosses the middle of the viewport
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    themedSections.forEach((section) => themeObserver.observe(section));
  }

  // 1. Mobile Navigation Drawer
  const menuToggle = document.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer') as HTMLElement | null;

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.hidden = expanded;
    });

    mobileDrawer.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
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

  // 2. Services Carousel Autoscroll Controls & Interactive Cards
  const servicesViewport = document.getElementById('services-carousel');
  const servicesTrack = document.getElementById('services-carousel-track');
  const servicesPauseBtn = document.getElementById('services-pause-btn') as HTMLButtonElement | null;

  // For ultra-wide displays (>= 1800px), clone an extra track group so the seamless loop never runs out of cards
  if (servicesTrack && window.innerWidth >= 1800) {
    const firstGroup = servicesTrack.querySelector('.services-track-group');
    if (firstGroup) {
      const extraClone = firstGroup.cloneNode(true) as HTMLElement;
      extraClone.setAttribute('aria-hidden', 'true');
      extraClone.querySelectorAll('a, button, article').forEach((el) => el.setAttribute('tabindex', '-1'));
      servicesTrack.appendChild(extraClone);
    }
  }

  const allServiceCards = document.querySelectorAll<HTMLElement>('.service-cutout-card');

  const syncCarouselPause = () => {
    if (!servicesViewport) return;
    const hasExpanded = Boolean(servicesViewport.querySelector('.service-cutout-card.is-expanded'));
    if (hasExpanded) {
      servicesViewport.classList.add('is-paused');
    } else if (!servicesPauseBtn || servicesPauseBtn.getAttribute('aria-pressed') !== 'true') {
      servicesViewport.classList.remove('is-paused');
    }
  };

  allServiceCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) return;
      const wasExpanded = card.classList.contains('is-expanded');
      allServiceCards.forEach((c) => c.classList.remove('is-expanded'));
      if (!wasExpanded) {
        card.classList.add('is-expanded');
      }
      syncCarouselPause();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target as HTMLElement;
        if (target.closest('a')) return;
        e.preventDefault();
        const wasExpanded = card.classList.contains('is-expanded');
        allServiceCards.forEach((c) => c.classList.remove('is-expanded'));
        if (!wasExpanded) {
          card.classList.add('is-expanded');
        }
        syncCarouselPause();
      }
    });
  });

  // Pause / Resume Button
  if (servicesPauseBtn && servicesViewport) {
    const pauseIcon = servicesPauseBtn.querySelector<HTMLElement>('.pause-icon');
    const playIcon = servicesPauseBtn.querySelector<HTMLElement>('.play-icon');
    const btnText = servicesPauseBtn.querySelector<HTMLElement>('.pause-btn-text');

    servicesPauseBtn.addEventListener('click', () => {
      const isCurrentlyPressed = servicesPauseBtn.getAttribute('aria-pressed') === 'true';
      const willPause = !isCurrentlyPressed;

      servicesPauseBtn.setAttribute('aria-pressed', String(willPause));
      servicesViewport.classList.toggle('is-paused', willPause);

      if (willPause) {
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'inline-flex';
        if (btnText) btnText.textContent = 'Resume';
        servicesPauseBtn.setAttribute('aria-label', 'Resume autoscrolling services carousel');
      } else {
        if (pauseIcon) pauseIcon.style.display = 'inline-flex';
        if (playIcon) playIcon.style.display = 'none';
        if (btnText) btnText.textContent = 'Pause';
        servicesPauseBtn.setAttribute('aria-label', 'Pause autoscrolling services carousel');
        allServiceCards.forEach((c) => c.classList.remove('is-expanded'));
      }
    });
  }

  // Mobile Touch Pause Handler
  if (servicesViewport) {
    servicesViewport.addEventListener('touchstart', () => {
      servicesViewport.classList.add('is-touch-paused');
    }, { passive: true });

    servicesViewport.addEventListener('touchend', () => {
      setTimeout(() => {
        if (
          !servicesViewport.querySelector('.service-cutout-card.is-expanded') &&
          (!servicesPauseBtn || servicesPauseBtn.getAttribute('aria-pressed') !== 'true')
        ) {
          servicesViewport.classList.remove('is-touch-paused');
        }
      }, 1600);
    }, { passive: true });
  }

  // 3. Turnkey MEP Execution Lifecycle Filter Pills
  const cycleTabs = document.querySelectorAll<HTMLButtonElement>('.cycle-tab');
  const cycleCards = document.querySelectorAll<HTMLElement>('.cycle-step-card');

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

  // 4. Stats Numerical Counter Animation
  const counters = document.querySelectorAll<HTMLElement>('.js-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated || prefersReducedMotion || (navigator as unknown as { webdriver?: boolean }).webdriver) return;
    countersAnimated = true;

    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
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

  // 5. Projects Carousel Controls
  const projectsTrack = document.getElementById('projects-track');
  const prevBtn = document.getElementById('proj-prev');
  const nextBtn = document.getElementById('proj-next');

  if (projectsTrack && prevBtn && nextBtn) {
    const getScrollStep = () => {
      const firstCard = projectsTrack.querySelector<HTMLElement>('.project-card');
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

  // 6. Project Details Modal Popup
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalSectorBadge = document.getElementById('modal-sector-badge');
  const modalStatusBadge = document.getElementById('modal-status-badge');
  const modalSpecsList = document.getElementById('modal-specs-list');

  const openProjectModal = (projectId: string) => {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSummary) modalSummary.textContent = data.summary;
    if (modalSectorBadge) modalSectorBadge.textContent = data.sector;
    if (modalStatusBadge) modalStatusBadge.textContent = data.status;

    if (modalSpecsList) {
      modalSpecsList.innerHTML = data.specs.map((item) => `
        <div class="modal-spec-item">
          <dt>${item.label}</dt>
          <dd>${item.desc}</dd>
        </div>
      `).join('');
    }

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project-id');
      if (pId) openProjectModal(pId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pId = card.getAttribute('data-project-id');
        if (pId) openProjectModal(pId);
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('is-open')) {
      closeProjectModal();
    }
  });

  // 7. Contact Form Validation & Submission State
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  if (contactForm) {
    const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
    const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
    const errorName = document.getElementById('error-name') as HTMLElement | null;
    const errorEmail = document.getElementById('error-email') as HTMLElement | null;
    const errorMessage = document.getElementById('error-message') as HTMLElement | null;
    const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement | null;
    const submitText = submitBtn ? submitBtn.querySelector<HTMLElement>('.submit-text') : null;
    const formStatus = document.getElementById('form-status') as HTMLElement | null;

    const setFieldError = (input: HTMLElement | null, errorEl: HTMLElement | null, hasError: boolean) => {
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
        input.addEventListener('input', () => setFieldError(input as HTMLElement, errorEl as HTMLElement, false));
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
