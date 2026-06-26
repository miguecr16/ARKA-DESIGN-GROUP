document.addEventListener('DOMContentLoaded', () => {
  // --- GLOBAL HEADER SCROLL ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- HIGHLIGHT ACTIVE PAGE LINK ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-header nav a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.style.color = 'var(--color-white)';
      if (link.classList.contains('btn-secondary')) {
        link.style.backgroundColor = 'rgba(var(--color-brass-rgb), 0.1)';
      }
    }
  });

  // --- PORTAL MODE SWITCHER (index.html spec inspector only) ---
  const portalBtns = document.querySelectorAll('.portal-btn');
  const views = document.querySelectorAll('.view-container');
  if (portalBtns.length > 0 && views.length > 0) {
    portalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;

        // Update button state
        portalBtns.forEach(b => {
          b.classList.remove('active');
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.color = 'var(--color-white)';

        // Update view state
        views.forEach(view => {
          view.classList.remove('active-view');
          if (view.id === targetView) {
            view.classList.add('active-view');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        });
      });
    });
  }

  // --- URL PARAMETER CHECK FOR PORTAL SWITCH ---
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'specs' || urlParams.get('specs') === 'true') {
    const specsBtn = document.getElementById('nav-specs');
    if (specsBtn) specsBtn.click();
  }


  // --- CLIPBOARD COPY UTILITY ---
  const toast = document.getElementById('toast');
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  };

  document.addEventListener('toast', (e) => {
    showToast(e.detail);
  });


  // Copy Color Hex
  const swatchCards = document.querySelectorAll('.swatch-card');
  const copyHex = (card) => {
    const hex = card.dataset.hex;
    navigator.clipboard.writeText(hex)
      .then(() => showToast(`Copied Hex: ${hex}`))
      .catch(err => console.error('Could not copy hex: ', err));
  };
  
  swatchCards.forEach(card => {
    card.addEventListener('click', () => copyHex(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyHex(card);
      }
    });
  });

  // Copy Icon HTML
  const iconBoxes = document.querySelectorAll('.icon-box');
  const copyIcon = (box) => {
    const name = box.dataset.icon;
    const svgCode = box.querySelector('svg').outerHTML;
    navigator.clipboard.writeText(svgCode)
      .then(() => showToast(`Copied SVG code for: ${name}`))
      .catch(err => console.error('Could not copy SVG: ', err));
  };

  iconBoxes.forEach(box => {
    box.addEventListener('click', () => copyIcon(box));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyIcon(box);
      }
    });
  });

  // --- LIVE TYPOGRAPHY TESTER ---
  const typoInput = document.getElementById('typo-input-tester');
  const typoDemos = document.querySelectorAll('.typo-demo');
  if (typoInput) {
    typoInput.addEventListener('input', (e) => {
      const text = e.target.value.trim() || 'Curating lifestyles of architectural precision.';
      typoDemos.forEach(demo => {
        demo.textContent = text;
      });
    });
  }

  // --- TOGGLE COMPONENT SOURCE CODE ---
  const codeBtns = document.querySelectorAll('.sandbox-code-btn');
  codeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.dataset.codeTarget;
      const codeBlock = document.getElementById(codeId);
      if (codeBlock) {
        codeBlock.classList.toggle('active');
        btn.textContent = codeBlock.classList.contains('active') ? 'Hide Source Code' : 'Show Source Code';
      }
    });
  });

  // --- THEME SWITCH LOGIC (DARK / LIGHT) ---
  const getTheme = () => localStorage.getItem('theme') || 'dark';
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const themeIconPath = document.querySelector('#theme-icon path');
    if (!themeIconPath) return;
    if (theme === 'light') {
      // Moon Icon
      themeIconPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
    } else {
      // Sun Icon
      themeIconPath.setAttribute('d', 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z');
    }
  };

  // Initialize Theme
  setTheme(getTheme());

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = getTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- PORTFOLIO FILTERING (gallery.html) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Button
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  // --- MULTI-STEP COMMISSION FORM INTAKE (commission.html) ---
  const form = document.getElementById('multi-step-form');
  const steps = document.querySelectorAll('.form-step');
  const indicators = document.querySelectorAll('.indicator-node');
  const prevBtn = document.getElementById('prev-step-btn');
  const nextBtn = document.getElementById('next-step-btn');
  const intakeCard = document.getElementById('intake-card');
  const indicatorContainer = document.querySelector('.step-indicator');
  
  const successQualified = document.getElementById('success-qualified');
  const successUnqualified = document.getElementById('success-unqualified');

  let currentStep = 0;

  if (form && steps.length > 0) {
    const updateFormState = () => {
      // Update Active Step View
      steps.forEach((step, idx) => {
        step.classList.toggle('active', idx === currentStep);
      });

      // Update Indicator Nodes
      indicators.forEach((node, idx) => {
        node.classList.toggle('active', idx === currentStep);
        node.classList.toggle('completed', idx < currentStep);
      });

      // Update Buttons
      prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
      nextBtn.textContent = currentStep === steps.length - 1 ? 'Initiate Commission' : 'Continue';
    };

    const validateStep = () => {
      const activeStep = steps[currentStep];
      const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
      
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim() || (input.tagName === 'SELECT' && input.selectedIndex === 0)) {
          isValid = false;
          input.style.borderBottomColor = 'red';
          setTimeout(() => {
            input.style.borderBottomColor = '';
          }, 3000);
        } else if (input.type === 'email') {
          // Simple email validation
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            input.style.borderBottomColor = 'red';
          }
        }
      });
      return isValid;
    };

    nextBtn.addEventListener('click', () => {
      if (!validateStep()) {
        showToast('Please fulfill the parameter to proceed');
        return;
      }

      if (currentStep < steps.length - 1) {
        currentStep++;
        updateFormState();
      } else {
        // Form Submission - Qualify Lead
        const budgetValue = document.getElementById('comm-budget').value;
        form.style.display = 'none';
        if (indicatorContainer) indicatorContainer.style.display = 'none';

        if (budgetValue === 'tier-1') {
          // Under $100k - Unqualified
          if (successUnqualified) {
            successUnqualified.style.display = 'block';
            const heading = successUnqualified.querySelector('h3');
            if (heading) heading.focus();
          }
        } else {
          // Over $100k - Qualified
          if (successQualified) {
            successQualified.style.display = 'block';
            const heading = successQualified.querySelector('h3');
            if (heading) heading.focus();
          }
        }
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateFormState();
      }
    });

    updateFormState();
  }

  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  const fadeElements = document.querySelectorAll('.section, .portfolio-card, .service-card, .process-step, .trust-box');
  
  const style = document.createElement('style');
  style.textContent = `
    .fade-prepare {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .fade-animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  fadeElements.forEach(el => {
    el.classList.add('fade-prepare');
  });

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
});
