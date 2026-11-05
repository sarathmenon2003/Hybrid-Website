(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0. Scroll Theme Engine (White ⇄ HYBRID Blue)
  const themedSections = document.querySelectorAll('[data-theme]');
  if (themedSections.length && 'IntersectionObserver' in window) {
    const themeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.toggle('theme-blue', entry.target.dataset.theme === 'blue');
          }
        });
      },
      // A section takes over once it crosses the middle of the viewport
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    themedSections.forEach((section) => themeObserver.observe(section));
  }

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

  // 2. Services Carousel Autoscroll Controls & Interactive Cards
  const servicesViewport = document.getElementById('services-carousel');
  const servicesTrack = document.getElementById('services-carousel-track');
  const servicesPauseBtn = document.getElementById('services-pause-btn');

  // For ultra-wide displays (>= 1800px), clone an extra track group so the seamless loop never runs out of cards
  if (servicesTrack && window.innerWidth >= 1800) {
    const firstGroup = servicesTrack.querySelector('.services-track-group');
    if (firstGroup) {
      const extraClone = firstGroup.cloneNode(true);
      extraClone.setAttribute('aria-hidden', 'true');
      extraClone.querySelectorAll('a, button, article').forEach((el) => el.setAttribute('tabindex', '-1'));
      servicesTrack.appendChild(extraClone);
    }
  }

  const allServiceCards = document.querySelectorAll('.service-cutout-card');

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
      if (e.target.closest('a') || e.target.closest('button')) return;
      const wasExpanded = card.classList.contains('is-expanded');
      allServiceCards.forEach((c) => c.classList.remove('is-expanded'));
      if (!wasExpanded) {
        card.classList.add('is-expanded');
      }
      syncCarouselPause();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a')) return;
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
    const pauseIcon = servicesPauseBtn.querySelector('.pause-icon');
    const playIcon = servicesPauseBtn.querySelector('.play-icon');
    const btnText = servicesPauseBtn.querySelector('.pause-btn-text');

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

  // 5. Project Details Modal Popup
  const projectData = {
    residential: {
      title: 'Residential Development Project',
      sector: 'Residential',
      status: 'UAE Sector Scope',
      summary: 'Turnkey electromechanical contracting for modern residential communities and high-end villas. Encompasses DEWA-compliant power distribution, smart living connectivity, and premium water distribution networks.',
      specs: [
        { label: 'Electrical & ELV', desc: 'MDB, SMDB & DB panels, interior architectural LED lighting, perimeter lighting, structured Cat6A data points, and smart home automation.' },
        { label: 'HVAC & Mechanical', desc: 'High-efficiency chilled water FCUs, duct insulated networks, fresh air handling, and smart digital thermostats.' },
        { label: 'Plumbing & Drainage', desc: 'Hot & cold PPR water distribution lines, centralized water heating, booster pump manifolds, and sanitary fittings fit-out.' },
        { label: 'Authority Handover', desc: 'Complete civil defence, DEWA, and municipality approvals with certified as-built documentation.' }
      ]
    },
    corporate: {
      title: 'Corporate Commercial Tower',
      sector: 'Corporate',
      status: 'UAE Sector Scope',
      summary: 'Full-scope MEP design, supply, installation, and commissioning for multi-story corporate headquarters and grade-A commercial office developments.',
      specs: [
        { label: 'Electrical & ELV', desc: 'LV switchgear assembly, busbar risers, essential UPS circuits, biometric access control, and enterprise CCTV monitoring.' },
        { label: 'HVAC & Mechanical', desc: 'Central chilled water plant connection, precision server room cooling, variable air volume (VAV) systems, and air balancing.' },
        { label: 'Plumbing & Sanitation', desc: 'High-rise water booster stations, storm drainage risers, dedicated washroom batteries, and water metering systems.' },
        { label: 'Authority Handover', desc: 'Consultant coordination, technical material approvals, third-party testing, and turnkey authority inspection.' }
      ]
    },
    retail: {
      title: 'Retail & Showroom Complex',
      sector: 'Retail',
      status: 'UAE Sector Scope',
      summary: 'Fast-track electromechanical installation tailored for luxury retail flagships, multi-brand showrooms, and shopping mall fit-outs in Dubai and the wider UAE.',
      specs: [
        { label: 'Electrical & ELV', desc: 'High-CRI accent lighting track systems, sub-metering boards, public address (PA) audio, and theft-prevention EAS cabling.' },
        { label: 'HVAC & Mechanical', desc: 'Mall chilled water tie-ins, rooftop package unit ducting, custom linear slot diffusers, and smoke extraction.' },
        { label: 'Plumbing & Safety', desc: 'Staff pantry water services, drainage connections, grease interceptor tie-ins, and fire hose reel/sprinkler coordination.' },
        { label: 'Authority Handover', desc: 'Mall facility management liaison, out-of-hours testing, load balance submittals, and fast-track permit closures.' }
      ]
    },
    hospitality: {
      title: 'Hospitality & Luxury Suites',
      sector: 'Hospitality',
      status: 'UAE Sector Scope',
      summary: 'Acoustically isolated, high-comfort MEP contracting designed for luxury hotel suites, resorts, and premium serviced residences.',
      specs: [
        { label: 'Electrical & ELV', desc: 'Guest Room Management System (GRMS), bespoke mood lighting controls, high-speed Wi-Fi access points, and IPTV network lines.' },
        { label: 'HVAC & Mechanical', desc: 'Ultra-low acoustic NC-25 chilled water FCUs, insulated sound attenuators, continuous bathroom extract, and fresh air supply.' },
        { label: 'Plumbing & Drainage', desc: 'Instantaneous hot water circulation loops, pressure-balanced thermostatic mixers, luxury concealed cisterns, and acoustic drainage pipes.' },
        { label: 'Authority Handover', desc: 'Comprehensive thermal performance commissioning, sound level verification, and turnkey hotel operator sign-off.' }
      ]
    },
    healthcare: {
      title: 'Healthcare & Clinic Facility',
      sector: 'Healthcare',
      status: 'UAE Sector Scope',
      summary: 'Stringent clinical-grade electromechanical installations compliant with UAE health authority and international hospital safety standards.',
      specs: [
        { label: 'Electrical & ELV', desc: 'Isolated power supplies (IPS), medical-grade grounding, uninterruptible power systems (UPS), and nurse call stations.' },
        { label: 'HVAC & Mechanical', desc: 'HEPA filtration air handling units, positive/negative pressure isolation rooms, laminar flow systems, and medical gas duct coordination.' },
        { label: 'Plumbing & Drainage', desc: 'Medical washbasin touchless fittings, chemical-resistant drainage piping, and pure water purification distribution.' },
        { label: 'Authority Handover', desc: 'DHA / MOH health regulations compliance, air particulate validation, and sterilisation testing certification.' }
      ]
    },
    education: {
      title: 'Educational Campus Facility',
      sector: 'Education',
      status: 'UAE Sector Scope',
      summary: 'High-durability, energy-efficient MEP infrastructure engineered for educational campuses, laboratories, sports complexes, and auditoriums.',
      specs: [
        { label: 'Electrical & ELV', desc: 'Outdoor feeder pillars, classroom presentation AV cabling, synchronized campus PA/emergency broadcast, and secure campus perimeter CCTV.' },
        { label: 'HVAC & Mechanical', desc: 'High-volume central chiller plant distribution, lab exhaust fume extraction, and energy-recovery ventilation (ERV).' },
        { label: 'Plumbing & Sanitation', desc: 'Heavy-traffic student washroom plumbing batteries, safety eyewash stations, centralized water storage reservoirs, and pump stations.' },
        { label: 'Authority Handover', desc: 'Ministry of Education compliance, utility sub-station energisation, and comprehensive preventive maintenance schedule.' }
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalSectorBadge = document.getElementById('modal-sector-badge');
  const modalStatusBadge = document.getElementById('modal-status-badge');
  const modalSpecsList = document.getElementById('modal-specs-list');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;
    modalSectorBadge.textContent = data.sector;
    modalStatusBadge.textContent = data.status;

    modalSpecsList.innerHTML = data.specs.map((item) => `
      <div class="modal-spec-item">
        <dt>${item.label}</dt>
        <dd>${item.desc}</dd>
      </div>
    `).join('');

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

  document.querySelectorAll('.project-card').forEach((card) => {
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

  // 6. Minimal Contact Form Validation & Submission State
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
