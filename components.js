/* --- ARKA DESIGN GROUP CUSTOM COMPONENTS REGISTER --- */

// Helper to determine active navigation links
const getActivePageName = () => {
  return window.location.pathname.split('/').pop() || 'index.html';
};

// 1. NAVBAR COMPONENT
class ArkaNavbar extends HTMLElement {
  connectedCallback() {
    const activePage = getActivePageName();
    const isContactActive = activePage === 'contact.html' ? 'style="color: var(--color-white); background-color: rgba(var(--color-brass-rgb), 0.1);"' : '';

    this.innerHTML = `
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <header class="site-header" id="main-header">
        <div class="container flex-between">
          <a href="index.html" class="logo" id="header-logo-link">
            <img src="assets/images/logo.png" alt="Arka Design Group Logo" style="height: 48px; width: auto; display: block; object-fit: contain;">
          </a>
          
          <!-- HAMBURGER BUTTON (Mobile only) -->
          <button class="nav-toggle-btn" id="nav-menu-toggle" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="main-nav">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" class="line-mid"></line>
              <line x1="3" y1="6" x2="21" y2="6" class="line-top"></line>
              <line x1="3" y1="18" x2="21" y2="18" class="line-bot"></line>
            </svg>
          </button>
          
          <nav class="flex site-nav" id="main-nav" aria-label="Main Navigation">
            <a href="index.html" class="btn-text ${activePage === 'index.html' ? 'active' : ''}" id="nav-home" style="${activePage === 'index.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'index.html' ? 'page' : 'false'}">Home</a>
            <a href="services.html" class="btn-text ${activePage === 'services.html' ? 'active' : ''}" id="nav-services" style="${activePage === 'services.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'services.html' ? 'page' : 'false'}">Services</a>
            <a href="portfolio.html" class="btn-text ${activePage === 'portfolio.html' ? 'active' : ''}" id="nav-portfolio" style="${activePage === 'portfolio.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'portfolio.html' ? 'page' : 'false'}">Portfolio</a>
            <a href="about.html" class="btn-text ${activePage === 'about.html' ? 'active' : ''}" id="nav-about" style="${activePage === 'about.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'about.html' ? 'page' : 'false'}">About</a>
            <a href="reviews.html" class="btn-text ${activePage === 'reviews.html' ? 'active' : ''}" id="nav-reviews" style="${activePage === 'reviews.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'reviews.html' ? 'page' : 'false'}">Reviews</a>
            <a href="service-areas.html" class="btn-text ${activePage === 'service-areas.html' ? 'active' : ''}" id="nav-service-areas" style="${activePage === 'service-areas.html' ? 'color: var(--color-white);' : ''}" aria-current="${activePage === 'service-areas.html' ? 'page' : 'false'}">Areas</a>
            <button class="btn-text portal-btn" id="nav-specs" data-view="design-system-view" style="display: none;">Specs</button>
            <a href="contact.html" class="btn btn-secondary" ${isContactActive} id="nav-contact" aria-current="${activePage === 'contact.html' ? 'page' : 'false'}">Contact</a>
            
            <!-- THEME SWITCHER -->
            <button class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle Light/Dark Theme">
              <svg id="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <!-- FLOATING ACTION BUTTON -->
      <a href="contact.html" class="floating-cta btn btn-primary" id="floating-intake-btn">
        <span>Initiate Commission</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    `;

    // Bind mobile menu toggle listeners
    const toggleBtn = this.querySelector('#nav-menu-toggle');
    const nav = this.querySelector('#main-nav');
    if (toggleBtn && nav) {
      const toggleMenu = (open) => {
        const shouldOpen = typeof open === 'boolean' ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
        toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', shouldOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
        nav.classList.toggle('nav-open', shouldOpen);
        document.body.classList.toggle('nav-lock', shouldOpen);
      };

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      // Close menu when a link inside is clicked
      nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          toggleMenu(false);
        }
      });

      // Close on Esc key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
          toggleMenu(false);
          toggleBtn.focus();
        }
      });

      // Close when clicking outside header container on mobile
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-open') && !this.contains(e.target)) {
          toggleMenu(false);
        }
      });
    }

    // Bind scroll listener
    const header = this.querySelector('.site-header');
    const fab = this.querySelector('#floating-intake-btn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      if (fab) {
        if (window.scrollY > 300) {
          fab.classList.add('visible');
        } else {
          fab.classList.remove('visible');
        }
      }
    }, { passive: true });

    // Bind Theme Toggle logic
    const themeBtn = this.querySelector('#theme-toggle-btn');
    const themeIconPath = this.querySelector('#theme-icon path');

    const getTheme = () => localStorage.getItem('theme') || 'dark';
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    };

    const updateThemeIcon = (theme) => {
      if (!themeIconPath) return;
      if (theme === 'light') {
        themeIconPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
      } else {
        themeIconPath.setAttribute('d', 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z');
      }
    };

    setTheme(getTheme());

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }
  }
}
customElements.define('arka-navbar', ArkaNavbar);


// 2. HERO COMPONENT
class ArkaHero extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const lead = this.getAttribute('lead') || '';
    const bgImage = (this.getAttribute('bg-image') || '').replace('.png', '.webp');
    const ctaText = this.getAttribute('cta-text') || '';
    const ctaLink = this.getAttribute('cta-link') || '';
    const secText = this.getAttribute('sec-text') || '';
    const secLink = this.getAttribute('sec-link') || '';
    const label = this.getAttribute('label') || 'Central Florida Design & Build';

    let actionsHtml = '';
    if (ctaText && ctaLink) {
      actionsHtml += `<a href="${ctaLink}" class="btn btn-primary">${ctaText}</a>`;
    }
    if (secText && secLink) {
      actionsHtml += `<a href="${secLink}" class="btn btn-secondary">${secText}</a>`;
    }
    actionsHtml += `<arka-whatsapp-button variant="secondary" size="md" position="hero"></arka-whatsapp-button>`;

    this.innerHTML = `
      <section class="hero-section" style="background: radial-gradient(circle at center, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.95) 100%), url('${bgImage}') center/cover no-repeat;">
        <div class="container">
          <div class="hero-content">
            <span class="section-label">${label}</span>
            <h1 class="h1">${title}</h1>
            <p class="lead">${lead}</p>
            <div class="hero-actions">
              ${actionsHtml}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('arka-hero', ArkaHero);


// 3. SERVICE CARD COMPONENT
class ArkaServiceCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const desc = this.getAttribute('desc') || '';
    const iconType = this.getAttribute('icon') || 'spatial';

    let svgPath = '';
    if (iconType === 'spatial') {
      svgPath = '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>';
    } else if (iconType === 'millwork') {
      svgPath = '<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 3v18M15 3v18M3 9h18M3 15h18"></path>';
    } else if (iconType === 'construction') {
      svgPath = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>';
    } else if (iconType === 'compass') {
      svgPath = '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>';
    }

    this.innerHTML = `
      <div class="service-card">
        <svg class="service-icon" viewBox="0 0 24 24" aria-hidden="true">
          ${svgPath}
        </svg>
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    `;
  }
}
customElements.define('arka-service-card', ArkaServiceCard);


// 4. PROJECT CARD COMPONENT
class ArkaProjectCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const image = (this.getAttribute('image') || '').replace('.png', '.webp');
    const category = this.getAttribute('category') || '';
    const desc = this.getAttribute('desc') || '';

    let descHtml = '';
    if (desc) {
      descHtml = `<p class="portfolio-desc" style="font-family: var(--font-display); font-size: var(--text-small); color: rgba(255, 255, 255, 0.7); margin-top: var(--space-xs); font-weight: 300; line-height: 1.4;">${desc}</p>`;
    }

    this.innerHTML = `
      <div class="portfolio-card gallery-item" data-category="${category}">
        <img src="${image}" class="portfolio-img" alt="${title}" width="600" height="450" loading="lazy">
        <div class="portfolio-overlay">
          <span class="portfolio-subtitle">${subtitle}</span>
          <h3 class="portfolio-title">${title}</h3>
          ${descHtml}
          <div class="portfolio-hover-indicator" style="display: flex; flex-direction: column; gap: var(--space-xs); align-items: flex-start; margin-top: var(--space-md);">
            <div class="flex" style="gap: var(--space-xs); align-items: center; margin-bottom: 4px;">
              <span class="caption" style="color: var(--color-white);">Inspect Space</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <arka-whatsapp-button variant="secondary" size="sm" page="portfolio" label="Request Similar Project" position="portfolio-card"></arka-whatsapp-button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('arka-project-card', ArkaProjectCard);


// 5. TESTIMONIAL CARD COMPONENT
class ArkaTestimonialCard extends HTMLElement {
  connectedCallback() {
    const quote = this.getAttribute('quote') || '';
    const author = this.getAttribute('author') || '';
    const location = this.getAttribute('location') || '';
    const stars = parseInt(this.getAttribute('stars') || '5', 10);
    const starsStr = '★'.repeat(stars) + '☆'.repeat(5 - stars);

    this.innerHTML = `
      <div class="review-card">
        <div class="review-stars" role="img" aria-label="${stars} out of 5 stars"><span aria-hidden="true">${starsStr}</span></div>
        <p class="review-quote">"${quote}"</p>
        <div class="review-meta">
          <span class="review-client">${author}</span>
          <span class="review-project">${location}</span>
        </div>
      </div>
    `;
  }
}
customElements.define('arka-testimonial-card', ArkaTestimonialCard);


// 6. TIMELINE COMPONENT
class ArkaTimeline extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="process-timeline">
        <div class="process-step">
          <span class="process-num">01</span>
          <h4>Conceptual Curation</h4>
          <p>Collaborative alignment workshops exploring architectural lifestyle mapping, structural constraints, and material palettes.</p>
        </div>
        <div class="process-step">
          <span class="process-num">02</span>
          <h4>Detail Engineering</h4>
          <p>Architectural space planning and millwork joinery mapped to the millimeter in precise, high-fidelity CAD/3D schematics.</p>
        </div>
        <div class="process-step">
          <span class="process-num">03</span>
          <h4>Material Artistry</h4>
          <p>Sourcing premium white oaks, walnut veneer stocks, Italian travertines, and architectural hardware finishes from global quarries and ateliers.</p>
        </div>
        <div class="process-step">
          <span class="process-num">04</span>
          <h4>Precision Assembly</h4>
          <p>Execution on site managed by our dedicated superintendents. Handcrafted alignment with zero tolerance for deviations.</p>
        </div>
      </div>
    `;
  }
}
customElements.define('arka-timeline', ArkaTimeline);


// 7. METRICS COMPONENT (Trust Credentials)
class ArkaMetrics extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="trust-grid">
        <div class="trust-box">
          <h4>Standards & Quality</h4>
          <p>Master Craftsmanship</p>
          <span class="caption" style="font-size: 10px; margin-top: 4px; display: block;">Zero Tolerance Construction</span>
        </div>

        <div class="trust-box">
          <h4>Project Delivery</h4>
          <p>Turnkey Service</p>
          <span class="caption" style="font-size: 10px; margin-top: 4px; display: block;">From Design to Handover</span>
        </div>

        <div class="trust-box">
          <h4>Work Comp & Bonding</h4>
          <p>Fully Bonded</p>
          <span class="caption" style="font-size: 10px; margin-top: 4px; display: block;">100% On-Site Compliance</span>
        </div>
      </div>
    `;
  }
}
customElements.define('arka-metrics', ArkaMetrics);


// 8. CTA SECTION COMPONENT
class ArkaCtaSection extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Entrust your vision to our studio.';
    const desc = this.getAttribute('desc') || 'We invite you to share details of your planned custom renovation or design-build project in Florida.';
    const btnText = this.getAttribute('btn-text') || 'Initiate Private Commission';
    const btnLink = this.getAttribute('btn-link') || 'contact.html';

    this.innerHTML = `
      <section class="section container text-center">
        <div style="max-width: 600px; margin: 0 auto;">
          <span class="section-label">Collaboration</span>
          <h2 class="h2" style="margin-bottom: var(--space-md);">${title}</h2>
          <p style="color: var(--color-muted); margin-bottom: var(--space-xl);">${desc}</p>
          <div class="flex" style="gap: var(--space-sm); justify-content: center; align-items: center; flex-wrap: wrap;">
            <a href="${btnLink}" class="btn btn-primary">${btnText}</a>
            <arka-whatsapp-button variant="secondary" size="md" position="final-cta"></arka-whatsapp-button>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('arka-cta-section', ArkaCtaSection);


// 9. GLOBAL FOOTER COMPONENT
class ArkaFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div style="margin-bottom: var(--space-md);">
                <img src="assets/images/logo.png" alt="Arka Design Group Logo" style="height: 52px; width: auto; display: block; object-fit: contain;">
              </div>
              <p>A premium Design & Build company crafting bespoke residential architecture and master woodwork installations in Central Florida.</p>
            </div>
            <div class="footer-links">
              <h5>Engage</h5>
              <ul>
                <li><a href="portfolio.html">Our Curation</a></li>
                <li><a href="services.html">Our Services</a></li>
                <li><a href="contact.html">Consultation</a></li>
                <li><a href="service-areas.html">Service Areas</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <h5>Locations</h5>
              <ul>
                <li><a href="orlando.html">Orlando</a></li>
                <li><a href="tampa.html">Tampa</a></li>
                <li><a href="miami.html">Miami</a></li>
                <li><a href="ocala.html">Ocala</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <h5>Contact</h5>
              <ul>
                <li><a href="tel:8136109309">(813) 610-9309</a></li>
                <li><a href="mailto:info@arkadg.com">info@arkadg.com</a></li>
                <li><a href="about.html">Ocala Studio & Workshop</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-copyright">
            <div>&copy; 2026 Arka Design Group LLC. All Rights Reserved.</div>
            <div class="flex" style="gap: var(--space-md); align-items: center; flex-wrap: wrap;">
              <a href="index.html?view=specs" style="color: var(--color-brass);">Design Specs Portal</a>
              <span>|</span>
              <span>Bespoke Florida Architecture & Cabinetry</span>
            </div>
          </div>
        </div>
      </footer>
      <arka-whatsapp-button floating="true"></arka-whatsapp-button>
    `;
  }
}
customElements.define('arka-footer', ArkaFooter);


class ArkaIntakeForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="consultation-card" id="intake-card">
        
        <!-- STEP INDICATORS -->
        <div class="step-indicator" aria-hidden="true">
          <div class="indicator-node active" id="node-1">1</div>
          <div class="indicator-node" id="node-2">2</div>
          <div class="indicator-node" id="node-3">3</div>
          <div class="indicator-node" id="node-4">4</div>
        </div>



        <form id="multi-step-form">
          <!-- STEP 1: IDENTITY -->
          <div class="form-step active" id="step-identity">
            <h3 style="text-align: left; font-size: 1.5rem; margin-bottom: var(--space-lg);">01. Contact Identity</h3>
            
            <div class="form-group">
              <input type="text" id="comm-name" class="form-input" placeholder=" " required>
              <label for="comm-name" class="form-label">Full Name</label>
            </div>
            
            <div class="form-group">
              <input type="email" id="comm-email" class="form-input" placeholder=" " required>
              <label for="comm-email" class="form-label">Email Address</label>
            </div>

            <div class="form-group">
              <input type="tel" id="comm-phone" class="form-input" placeholder=" " required>
              <label for="comm-phone" class="form-label">Phone Number</label>
            </div>
          </div>

          <!-- STEP 2: LOCATION -->
          <div class="form-step" id="step-location">
            <h3 style="text-align: left; font-size: 1.5rem; margin-bottom: var(--space-lg);">02. Project Geography</h3>
            <p style="color: var(--color-muted); font-size: var(--text-small); margin-bottom: var(--space-lg);">We prioritize enclaves in Central Florida. Please select your project neighborhood:</p>
            
            <div class="select-wrapper">
              <select id="comm-neighborhood" required aria-label="Select Neighborhood">
                <option value="" disabled selected>Select Neighborhood</option>
                <option value="winter-park">Winter Park, FL</option>
                <option value="windermere">Windermere, FL</option>
                <option value="golden-oak">Golden Oak / Disney Resort</option>
                <option value="lake-nona">Lake Nona, FL</option>
                <option value="coastal">Florida Coastal (Sarasota, Vero, Tampa)</option>
                <option value="other">Other Central Florida</option>
              </select>
            </div>
          </div>

          <!-- STEP 3: FINANCIAL BRACKET -->
          <div class="form-step" id="step-financial">
            <h3 style="text-align: left; font-size: 1.5rem; margin-bottom: var(--space-lg);">03. Investment Budget</h3>
            <p style="color: var(--color-muted); font-size: var(--text-small); margin-bottom: var(--space-lg);">Please select your planned design & construction investment level:</p>
            
            <div class="select-wrapper">
              <select id="comm-budget" required aria-label="Select Investment Range">
                <option value="" disabled selected>Select Investment Range</option>
                <option value="tier-1">Under $100,000</option>
                <option value="tier-2">$100,000 - $250,000</option>
                <option value="tier-3">$250,000 - $500,000</option>
                <option value="tier-4">$500,000 +</option>
              </select>
            </div>
          </div>

          <!-- STEP 4: VISION -->
          <div class="form-step" id="step-vision">
            <h3 style="text-align: left; font-size: 1.5rem; margin-bottom: var(--space-lg);">04. Spatial Vision</h3>
            
            <div class="form-group">
              <textarea id="comm-description" class="form-input" rows="4" placeholder=" " style="resize: none;" required></textarea>
              <label for="comm-description" class="form-label">Describe your project intent (e.g. kitchen remodel, custom wood ceiling panels, full construction)</label>
            </div>
          </div>

          <!-- STEP ACTIONS -->
          <div class="step-actions">
            <button type="button" class="btn btn-secondary" id="prev-step-btn" style="visibility: hidden;">Previous</button>
            <button type="button" class="btn btn-primary" id="next-step-btn">Continue</button>
          </div>
        </form>

        <!-- SUCCESS AND REDIRECT PANELS -->
        <div class="success-panel" id="success-qualified">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 48px; height: 48px; stroke: var(--color-brass); stroke-width: 1px; fill: none; margin-bottom: var(--space-md);">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 tabindex="-1">Commission Request Received</h3>
          <p>Your project qualifies for our bespoke consultation. Our Principal Architect will contact you directly within 24 hours to schedule a private studio tour or site consult.</p>
          <div class="flex" style="gap: var(--space-sm); justify-content: center; margin-top: var(--space-md); flex-wrap: wrap;">
            <a href="index.html" class="btn btn-secondary">Return to Studio</a>
            <arka-whatsapp-button variant="primary" page="thank-you" label="Continue on WhatsApp" position="thank-you-panel"></arka-whatsapp-button>
          </div>
        </div>

        <div class="success-panel" id="success-unqualified">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 48px; height: 48px; stroke: var(--color-muted); stroke-width: 1px; fill: none; margin-bottom: var(--space-md);">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <h3 tabindex="-1">Invitation Under Review</h3>
          <p>We appreciate your interest in Arka. Due to our current commitments, we are only onboarding project scopes matching our specialized design-build equipment. Our studio coordinator will review your request and reach out if booking permits.</p>
          <a href="index.html" class="btn btn-secondary">Return to Studio</a>
        </div>

      </div>
    `;

    // Bind form events
    const form = this.querySelector('#multi-step-form');
    const steps = this.querySelectorAll('.form-step');
    const indicators = this.querySelectorAll('.indicator-node');
    const prevBtn = this.querySelector('#prev-step-btn');
    const nextBtn = this.querySelector('#next-step-btn');
    const indicatorContainer = this.querySelector('.step-indicator');
    
    const successQualified = this.querySelector('#success-qualified');
    const successUnqualified = this.querySelector('#success-unqualified');

    let currentStep = 0;

    // Auto-fill intent from query parameters
    const params = new URLSearchParams(window.location.search);
    const intent = params.get('intent');
    const descField = this.querySelector('#comm-description');
    if (descField && intent) {
      if (intent === 'spatial') {
        descField.value = 'Interested in Interior Architecture & Space Planning commission.';
      } else if (intent === 'millwork') {
        descField.value = 'Interested in Bespoke Millwork & Cabinetry manufacture commission.';
      } else if (intent === 'construction') {
        descField.value = 'Interested in Master General Contracting build commission.';
      }
    }

    if (form && steps.length > 0) {
      const updateFormState = () => {
        steps.forEach((step, idx) => {
          step.classList.toggle('active', idx === currentStep);
        });

        indicators.forEach((node, idx) => {
          node.classList.toggle('active', idx === currentStep);
          node.classList.toggle('completed', idx < currentStep);
        });

        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        nextBtn.textContent = currentStep === steps.length - 1 ? 'Initiate Commission' : 'Continue';
      };

      const validateStep = () => {
        const activeStep = steps[currentStep];
        const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
        
        let isValid = true;
        inputs.forEach(input => {
          let fieldValid = true;
          if (!input.value.trim() || (input.tagName === 'SELECT' && input.selectedIndex === 0)) {
            fieldValid = false;
          } else if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
              fieldValid = false;
            }
          }
          
          if (!fieldValid) {
            isValid = false;
            input.classList.add('field-error');
            setTimeout(() => {
              input.classList.remove('field-error');
            }, 3000);
          }
        });
        return isValid;
      };

      nextBtn.addEventListener('click', () => {
        if (!validateStep()) {
          const toastEvt = new CustomEvent('toast', { detail: 'Please fulfill the parameter to proceed', bubbles: true });
          document.dispatchEvent(toastEvt);
          return;
        }

        if (currentStep < steps.length - 1) {
          currentStep++;
          updateFormState();
        } else {
          // Disable form elements and show loading state
          nextBtn.disabled = true;
          prevBtn.disabled = true;
          const originalText = nextBtn.textContent;
          nextBtn.textContent = 'Initiating Commission...';

          const payload = {
            name: this.querySelector('#comm-name').value,
            email: this.querySelector('#comm-email').value,
            phone: this.querySelector('#comm-phone').value,
            city: this.querySelector('#comm-neighborhood').value,
            budget: this.querySelector('#comm-budget').value,
            message: this.querySelector('#comm-description').value,
            page: window.location.pathname.split('/').pop() || 'contact.html'
          };

          fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })
          .then(res => {
            if (!res.ok) {
              return res.json().then(errData => {
                throw new Error(errData.error || 'Server error occurred');
              });
            }
            return res.json();
          })
          .then(data => {
            if (data.success) {
              // Redirect to thank-you page passing Lead ID and Budget tier
              window.location.href = `thank-you.html?leadId=${encodeURIComponent(data.leadId)}&budget=${encodeURIComponent(payload.budget)}`;
            } else {
              throw new Error(data.error || 'Submission failed');
            }
          })
          .catch(err => {
            console.error('Submission error:', err);
            const toastEvt = new CustomEvent('toast', { detail: err.message || 'Submission failed. Please try again.', bubbles: true });
            document.dispatchEvent(toastEvt);
            
            // Re-enable form elements and restore state
            nextBtn.disabled = false;
            prevBtn.disabled = false;
            nextBtn.textContent = originalText;
          });
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
  }
}
customElements.define('arka-intake-form', ArkaIntakeForm);


// 11. PREMIUM WHATSAPP BUTTON COMPONENT
function getWhatsAppContext(page, service) {
  const normPage = (page || '').toLowerCase();
  const normService = (service || '').toLowerCase();

  if (normPage === 'thank-you' || normService === 'thank-you') {
    return {
      label: 'Continue on WhatsApp',
      message: "Hello!\n\nI just submitted my request through your website. I'd like to continue the conversation."
    };
  }
  if (normService === 'kitchen' || normService === 'kitchens') {
    return {
      label: 'Ask about your kitchen project',
      message: "Hello!\n\nI'm interested in your Kitchen Remodeling service. I'd like to schedule a free consultation."
    };
  }
  if (normService === 'bathroom' || normService === 'bathrooms') {
    return {
      label: 'Start your bathroom project',
      message: "Hello!\n\nI'm interested in your Bathroom Remodeling service. I'd like more information."
    };
  }
  if (normService === 'cabinets' || normService === 'custom cabinets' || normService === 'wardrobes') {
    return {
      label: 'Discuss your custom cabinets',
      message: "Hello!\n\nI'm interested in your Custom Cabinet services. Could someone assist me?"
    };
  }
  if (normService === 'closets' || normService === 'walk-in closets') {
    return {
      label: 'Design my custom closet',
      message: "Hello!\n\nI'd like more information about your custom closets."
    };
  }
  if (normService === 'panels' || normService === 'wall panels') {
    return {
      label: 'Ask about wall panels',
      message: "Hello!\n\nI'd like more information about your wall panel solutions."
    };
  }
  if (normService === 'commercial' || normService === 'commercial spaces') {
    return {
      label: "Let's discuss your commercial project",
      message: "Hello!\n\nI'm interested in remodeling a commercial space. I'd like to receive a consultation."
    };
  }
  if (normPage === 'portfolio') {
    return {
      label: 'Request a similar project',
      message: "Hello!\n\nI saw one of your projects and I'd like something similar."
    };
  }
  if (normPage === 'contact') {
    return {
      label: 'Chat with our team',
      message: "Hello!\n\nI'd like to speak with your team regarding my remodeling project."
    };
  }

  return {
    label: 'Chat with us',
    message: "Hello!\n\nI'm interested in learning more about Arka Design Group. I'd like to request a free estimate."
  };
}

class ArkaWhatsAppButton extends HTMLElement {
  static get observedAttributes() {
    return ['phone', 'message', 'label', 'variant', 'size', 'icon', 'floating', 'service', 'page', 'position'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const phone = this.getAttribute('phone') || '18136109309';
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const icon = this.getAttribute('icon') !== 'false';
    const isFloating = this.getAttribute('floating') === 'true';
    const service = this.getAttribute('service') || '';
    const page = this.getAttribute('page') || '';
    const position = this.getAttribute('position') || (isFloating ? 'floating' : 'inline');
    
    let activePage = page;
    if (!activePage && typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('portfolio.html')) activePage = 'portfolio';
      else if (path.includes('contact.html')) activePage = 'contact';
      else if (path.includes('services.html')) activePage = 'services';
      else activePage = 'home';
    }

    const context = getWhatsAppContext(activePage, service);
    const label = this.getAttribute('label') || context.label;
    const message = this.getAttribute('message') || context.message;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const whatsappIconSvg = `
      <svg class="whatsapp-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" style="vertical-align: middle; margin-right: 4px;">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    `;

    const btnClasses = [
      'arka-wa-btn',
      `arka-wa-btn-${isFloating ? 'floating' : variant}`,
      `arka-wa-btn-${size}`
    ].filter(Boolean).join(' ');

    const customClass = this.getAttribute('class') || '';

    this.innerHTML = `
      <a href="${whatsappUrl}" 
         class="${btnClasses} ${customClass}" 
         target="_blank" 
         rel="noopener noreferrer" 
         aria-label="${isFloating ? `Chat on WhatsApp: ${label}` : label}"
         role="button"
         tabindex="0"
         style="text-decoration: none;">
        ${icon ? whatsappIconSvg : ''}
        <span class="arka-wa-btn-text">${label}</span>
      </a>
    `;

    const btnElement = this.querySelector('a');

    if (btnElement) {
      btnElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerTrackingEvent('WhatsApp Clicked', {
          page: activePage,
          service: service || 'none',
          position: position,
          url: whatsappUrl
        });
      });

      btnElement.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          btnElement.click();
        }
      });
    }

    if ('IntersectionObserver' in window && btnElement) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerTrackingEvent('WhatsApp Button Viewed', {
              page: activePage,
              service: service || 'none',
              position: position
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(btnElement);
    }
  }

  triggerTrackingEvent(eventName, eventData) {
    const trackingEvent = new CustomEvent('arka-analytics', {
      bubbles: true,
      detail: {
        event: eventName,
        data: eventData
      }
    });
    this.dispatchEvent(trackingEvent);

    const trackEventAttr = this.getAttribute('trackEvent');
    if (trackEventAttr && typeof window[trackEventAttr] === 'function') {
      window[trackEventAttr](eventName, eventData);
    } else if (typeof window.trackArkaWhatsAppEvent === 'function') {
      window.trackArkaWhatsAppEvent(eventName, eventData);
    }
  }
}

customElements.define('arka-whatsapp-button', ArkaWhatsAppButton);
