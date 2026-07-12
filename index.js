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

  // --- THEME INITIALIZATION ---
  document.documentElement.setAttribute('data-theme', 'dark');

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
