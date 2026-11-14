import { projectsData } from '../data/projects';

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll Reveal Engine & Progressive Enhancement
  if (!prefersReducedMotion) {
    document.documentElement.classList.add('reveal-ready');

    const revealElements = document.querySelectorAll<HTMLElement>(
      '.reveal-fade-up, .reveal-stagger'
    );

    if (revealElements.length && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-inview');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
      );

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    }
  }

  // 2. Sticky Header & Kinetic Scroll-Up Engine
  const siteHeader = document.querySelector<HTMLElement>('.site-header');
  let lastScrollY = window.scrollY;
  let scrollRestTimeout: number | undefined;
  let scrollTicking = false;

  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          if (siteHeader) {
            siteHeader.classList.toggle('is-scrolled', currentScrollY > 24);
          }

          if (!prefersReducedMotion && Math.abs(delta) > 1) {
            const dir = delta > 0 ? 'down' : 'up';
            document.documentElement.setAttribute('data-scroll-dir', dir);

            // Kinetic momentum: upward scroll floats text up (-7px to -1px); downward scroll gives gentle weighted drag
            const momentum = Math.max(-7, Math.min(5, -delta * 0.1));
            document.documentElement.style.setProperty('--scroll-momentum', `${momentum}px`);

            // Clear any pending relaxation
            if (scrollRestTimeout) window.clearTimeout(scrollRestTimeout);

            // When scrolling halts, smoothly ease momentum back to resting 0px
            scrollRestTimeout = window.setTimeout(() => {
              document.documentElement.style.setProperty('--scroll-momentum', '0px');
            }, 120);
          }

          scrollTicking = false;
        });
        scrollTicking = true;
      }
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // 3. Header Magnetic Nav Hover Pill Indicator & Active Section Scroll-Spy
  const mainNav = document.getElementById('main-nav');
  const navHoverPill = document.getElementById('nav-hover-pill');
  const navTargetSections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
  let isClickScrolling = false;
  let clickScrollTimer: number | undefined;

  if (mainNav) {
    const navLinks = mainNav.querySelectorAll<HTMLAnchorElement>('.nav-link');

    const movePillToLink = (link: HTMLAnchorElement) => {
      if (!navHoverPill || prefersReducedMotion) return;
      const linkLeft = link.offsetLeft;
      const linkWidth = link.offsetWidth;
      navHoverPill.style.transform = `translate3d(${linkLeft}px, 0, 0)`;
      navHoverPill.style.width = `${linkWidth}px`;
      navHoverPill.style.opacity = '1';
    };

    const resetPill = () => {
      if (!navHoverPill || prefersReducedMotion) return;
      const currentLink = mainNav.querySelector<HTMLAnchorElement>('.nav-link.is-current');
      if (currentLink) {
        movePillToLink(currentLink);
      } else {
        navHoverPill.style.opacity = '0';
      }
    };

    const setActiveNav = (activeId: string) => {
      let activeLink: HTMLAnchorElement | null = null;
      navLinks.forEach((link) => {
        const matches = link.getAttribute('data-nav') === activeId;
        link.classList.toggle('is-current', matches);
        if (matches) activeLink = link;
      });

      document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('is-current', href === `#${activeId}`);
      });

      // Keep hover pill position in sync if user isn't hovering
      if (!mainNav.matches(':hover') && !prefersReducedMotion) {
        if (activeLink) {
          movePillToLink(activeLink);
        } else if (navHoverPill) {
          navHoverPill.style.opacity = '0';
        }
      }

      // When scrolling UP back into a section, give its heading a subtle settling breath
      if (!prefersReducedMotion && document.documentElement.getAttribute('data-scroll-dir') === 'up') {
        const activeSection = document.getElementById(activeId);
        const heading = activeSection?.querySelector<HTMLElement>('h2, h3');
        if (heading && !heading.classList.contains('text-scroll-up-active')) {
          heading.classList.add('text-scroll-up-active');
          window.setTimeout(() => heading.classList.remove('text-scroll-up-active'), 650);
        }
      }
    };

    const calculateActiveSection = () => {
      if (isClickScrolling || !navTargetSections.length) return;

      const scrollY = window.scrollY;
      const headerOffset = 90;

      // Bottom of page check -> highlight last section (contact)
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveNav('contact');
        return;
      }

      // Find section currently in view based on scroll position
      let currentSectionId = navTargetSections[0].id;
      for (let i = 0; i < navTargetSections.length; i++) {
        const section = navTargetSections[i];
        const sectionTop = section.offsetTop - headerOffset;
        if (scrollY >= sectionTop - 25) {
          currentSectionId = section.id;
        } else {
          break;
        }
      }

      setActiveNav(currentSectionId);
    };

    // Nav Links: Instant highlight, pill tracking, and smooth scroll with header offset
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-nav');
        if (!targetId) return;

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          e.preventDefault();

          // Immediately set current section and position pill
          isClickScrolling = true;
          setActiveNav(targetId);
          movePillToLink(link);

          const headerHeight = 78;
          const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, '', `#${targetId}`);
          } else {
            window.location.hash = targetId;
          }

          // Lock state during smooth scrolling
          window.clearTimeout(clickScrollTimer);
          clickScrollTimer = window.setTimeout(() => {
            isClickScrolling = false;
            setActiveNav(targetId);
            resetPill();
          }, 850);
        }
      });

      link.addEventListener('mouseenter', () => movePillToLink(link));
      link.addEventListener('focus', () => movePillToLink(link));
    });

    mainNav.addEventListener('mouseleave', resetPill);
    mainNav.addEventListener('focusout', (e) => {
      if (!mainNav.contains(e.relatedTarget as Node)) {
        resetPill();
      }
    });

    window.addEventListener('scroll', calculateActiveSection, { passive: true });
    window.addEventListener('resize', () => {
      resetPill();
      calculateActiveSection();
    }, { passive: true });

    // Initial state on page load
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (document.getElementById(hashId)) {
        setActiveNav(hashId);
        const activeLink = mainNav.querySelector<HTMLAnchorElement>(`.nav-link[data-nav="${hashId}"]`);
        if (activeLink) movePillToLink(activeLink);
      } else {
        calculateActiveSection();
      }
    } else {
      calculateActiveSection();
    }
  }

  // 5. Spotlight Cursor Effect on Architectural Bento Cards
  if (!prefersReducedMotion) {
    const spotlightCards = document.querySelectorAll<HTMLElement>('.spotlight-card');
    spotlightCards.forEach((card) => {
      card.addEventListener(
        'pointermove',
        (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        },
        { passive: true }
      );

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mouse-x', '-999px');
        card.style.setProperty('--mouse-y', '-999px');
      });
    });
  }

  // 6. Scroll Theme Engine (Light <-> Blue)
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
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    themedSections.forEach((section) => themeObserver.observe(section));
  }

  // 7. Mobile Navigation Drawer with Smooth Morph
  const menuToggle = document.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer') as HTMLElement | null;

  if (menuToggle && mobileDrawer) {
    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.hidden = false;
      requestAnimationFrame(() => {
        mobileDrawer.classList.add('is-open');
      });
    };

    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-open');
      window.setTimeout(() => {
        if (menuToggle.getAttribute('aria-expanded') === 'false') {
          mobileDrawer.hidden = true;
        }
      }, 400);
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileDrawer.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        closeMenu();
        if (href && href.startsWith('#')) {
          const targetId = href.slice(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            e.preventDefault();
            isClickScrolling = true;
            if (mainNav) {
              const navLinks = mainNav.querySelectorAll<HTMLAnchorElement>('.nav-link');
              navLinks.forEach((l) => l.classList.toggle('is-current', l.getAttribute('data-nav') === targetId));
            }
            document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link').forEach((l) => {
              l.classList.toggle('is-current', l.getAttribute('href') === href);
            });
            const headerHeight = 78;
            const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({
              top: targetTop,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            if (history.pushState) {
              history.pushState(null, '', `#${targetId}`);
            }
            window.clearTimeout(clickScrollTimer);
            clickScrollTimer = window.setTimeout(() => {
              isClickScrolling = false;
            }, 850);
          }
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // 8. Turnkey MEP Execution Lifecycle Filter Pills
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

  // 9. Stats Numerical Counter Animation
  const counters = document.querySelectorAll<HTMLElement>('.js-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated || prefersReducedMotion || (navigator as unknown as { webdriver?: boolean }).webdriver) return;
    countersAnimated = true;

    const duration = 1000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      // Natural 4th-order ease-out deceleration
      const eased = 1 - Math.pow(1 - elapsed, 4);

      counters.forEach((el) => {
        const target = Number(el.getAttribute('data-target') || 0);
        const startVal = Math.floor(target * 0.62);
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
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  // 10. Projects Infinite Auto-Scrolling Carousel & Controls
  const projectsTrack = document.getElementById('projects-track');
  const prevBtn = document.getElementById('proj-prev');
  const nextBtn = document.getElementById('proj-next');

  if (projectsTrack && prevBtn && nextBtn) {
    let scrollPos = 0;
    let isPaused = false;
    let isManualScrolling = false;
    let manualScrollTimer: number | undefined;
    const autoScrollSpeed = 0.7;

    const getHalfWidth = () => {
      const cards = projectsTrack.querySelectorAll<HTMLElement>('.project-card');
      const halfCount = Math.floor(cards.length / 2);
      if (halfCount > 0 && cards[halfCount]) {
        return cards[halfCount].offsetLeft - cards[0].offsetLeft;
      }
      return projectsTrack.scrollWidth / 2;
    };

    const getScrollStep = () => {
      const cards = projectsTrack.querySelectorAll<HTMLElement>('.project-card');
      if (cards.length > 1) {
        return cards[1].offsetLeft - cards[0].offsetLeft;
      }
      return cards[0] ? cards[0].getBoundingClientRect().width + 24 : 360;
    };

    const stepInfiniteCarousel = () => {
      const modalOpen = document.getElementById('project-modal')?.classList.contains('is-open');
      if (!prefersReducedMotion && !isPaused && !isManualScrolling && !modalOpen) {
        const halfWidth = getHalfWidth();
        if (halfWidth > 0) {
          scrollPos += autoScrollSpeed;
          if (scrollPos >= halfWidth) {
            scrollPos -= halfWidth;
          }
          projectsTrack.scrollLeft = scrollPos;
        }
      }
      requestAnimationFrame(stepInfiniteCarousel);
    };

    requestAnimationFrame(stepInfiniteCarousel);

    const pauseCarousel = () => {
      isPaused = true;
    };

    const resumeCarousel = () => {
      const halfWidth = getHalfWidth();
      if (halfWidth > 0) {
        scrollPos = projectsTrack.scrollLeft % halfWidth;
        projectsTrack.scrollLeft = scrollPos;
      }
      isPaused = false;
    };

    projectsTrack.addEventListener('mouseenter', pauseCarousel);
    projectsTrack.addEventListener('mouseleave', resumeCarousel);
    projectsTrack.addEventListener('focusin', pauseCarousel);
    projectsTrack.addEventListener('focusout', resumeCarousel);
    projectsTrack.addEventListener('touchstart', pauseCarousel, { passive: true });
    projectsTrack.addEventListener('touchend', () => {
      window.setTimeout(resumeCarousel, 600);
    }, { passive: true });

    prevBtn.addEventListener('mouseenter', pauseCarousel);
    prevBtn.addEventListener('mouseleave', resumeCarousel);
    nextBtn.addEventListener('mouseenter', pauseCarousel);
    nextBtn.addEventListener('mouseleave', resumeCarousel);

    prevBtn.addEventListener('click', () => {
      const halfWidth = getHalfWidth();
      const step = getScrollStep();
      if (halfWidth > 0 && projectsTrack.scrollLeft < step) {
        projectsTrack.scrollLeft += halfWidth;
      }
      isManualScrolling = true;
      projectsTrack.scrollBy({
        left: -step,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      window.clearTimeout(manualScrollTimer);
      manualScrollTimer = window.setTimeout(() => {
        if (halfWidth > 0) {
          scrollPos = ((projectsTrack.scrollLeft % halfWidth) + halfWidth) % halfWidth;
          projectsTrack.scrollLeft = scrollPos;
        }
        isManualScrolling = false;
      }, 550);
    });

    nextBtn.addEventListener('click', () => {
      const halfWidth = getHalfWidth();
      const step = getScrollStep();
      if (halfWidth > 0 && projectsTrack.scrollLeft >= halfWidth) {
        projectsTrack.scrollLeft -= halfWidth;
      }
      isManualScrolling = true;
      projectsTrack.scrollBy({
        left: step,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      window.clearTimeout(manualScrollTimer);
      manualScrollTimer = window.setTimeout(() => {
        if (halfWidth > 0) {
          scrollPos = projectsTrack.scrollLeft % halfWidth;
          projectsTrack.scrollLeft = scrollPos;
        }
        isManualScrolling = false;
      }, 550);
    });
  }

  // 11. Project Details Modal Popup
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalSectorBadge = document.getElementById('modal-sector-badge');
  const modalGallery = document.getElementById('modal-gallery');
  const modalGalleryActiveImg = document.getElementById('modal-gallery-active-img') as HTMLImageElement | null;
  const modalGalleryThumbs = document.getElementById('modal-gallery-thumbs');

  const openProjectModal = (projectId: string) => {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSectorBadge) modalSectorBadge.textContent = `Client: ${data.client}`;

    if (modalGallery && modalGalleryActiveImg && modalGalleryThumbs) {
      if (data.images && data.images.length > 0) {
        modalGallery.hidden = false;
        modalGalleryActiveImg.src = data.images[0];
        modalGalleryActiveImg.alt = `${data.title} - Photo 1`;

        modalGalleryThumbs.innerHTML = data.images
          .map(
            (imgSrc, idx) => `
          <button type="button" class="modal-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-img-src="${imgSrc}" data-img-idx="${idx + 1}" aria-label="View photo ${idx + 1} of ${data.title}">
            <img src="${imgSrc}" alt="${data.title} thumbnail ${idx + 1}" loading="lazy" />
          </button>
        `
          )
          .join('');

        modalGalleryThumbs.querySelectorAll<HTMLButtonElement>('.modal-thumb-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-img-src');
            const idx = btn.getAttribute('data-img-idx');
            if (src && modalGalleryActiveImg) {
              modalGalleryActiveImg.src = src;
              modalGalleryActiveImg.alt = `${data.title} - Photo ${idx}`;
              modalGalleryThumbs.querySelectorAll('.modal-thumb-btn').forEach((b) => b.classList.remove('is-active'));
              btn.classList.add('is-active');
            }
          });
        });
      } else {
        modalGallery.hidden = true;
        modalGalleryThumbs.innerHTML = '';
      }
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

  // 12. Contact Form Validation & Submission State
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
