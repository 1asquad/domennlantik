/* ============================================================
   DOMENN LANTIK — Shared Scripts
   Navigation, animations, form handling, marquee
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky header --- */
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (!currentPath && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Mobile menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Hero search + language toggle --- */
  const siteTranslations = {
    "Passer au contenu": "Skip to content",
    "Accueil": "Home",
    "Le Domaine": "The Estate",
    "Nos Offres": "Our Offers",
    "Notre Vision": "Our Vision",
    "Actualités": "News",
    "Nous Contacter": "Contact Us",
    "Domaine": "Estate",
    "Offres": "Offers",
    "Vision": "Vision",
    "Contact": "Contact",
    "Accès rapides": "Quick links",
    "Recherche": "Search",
    "Repères du domaine": "Estate highlights",
    "Changer la langue": "Change language",
    "Rechercher une page ou une ressource": "Search for a page or resource",
    "Aucun résultat trouvé.": "No results found.",
    "Souveraineté alimentaire": "Food sovereignty",
    "Le domaine vivant": "The living estate",
    "Un laboratoire écologique et thérapeutique au Vauclin, pensé pour produire, transmettre et manger sain en Martinique.": "An ecological and therapeutic laboratory in Le Vauclin, designed to grow, share knowledge and eat well in Martinique.",
    "Surface": "Area",
    "Lieu": "Location",
    "Mission": "Mission",
    "Le Vauclin · Martinique": "Le Vauclin · Martinique",
    "Un Site": "A Remarkable",
    "Remarquable": "Site",
    "Au cœur de la Martinique, un domaine où la nature dicte sa loi : source vive, chapelle séculaire, ruines familiales et sous-bois de zamanas centenaires.": "In the heart of Martinique, an estate where nature sets the pace: a living spring, a centuries-old chapel, family ruins and groves of ancestral saman trees.",
    "Un domaine vivant au cœur de la forêt": "A living estate in the heart of the forest",
    "Entre jardin nourricier, sous-bois, espaces de transmission et lieux de ressourcement, Domenn Lantik cultive une relation simple et profonde à la terre.": "Between food gardens, woodland, learning spaces and places of renewal, Domenn Lantik cultivates a simple and profound relationship with the land.",
    "Le site réunit production, accueil, mémoire familiale et expérimentation écologique pour accompagner une souveraineté alimentaire concrète en Martinique.": "The site brings together production, hospitality, family memory and ecological experimentation to support concrete food sovereignty in Martinique.",
    "Découvrir tout le domaine": "Discover the whole estate",
    "de nature": "of nature",
    "Forêt": "Forest",
    "préservée": "preserved",
    "La Source": "The Spring",
    "Eau vive au cœur du domaine": "Living water at the heart of the estate",
    "La Chapelle": "The Chapel",
    "Recueillement et connexion": "Reflection and connection",
    "Ruines Familiales": "Family Ruins",
    "Mémoire des générations passées": "Memory of past generations",
    "Découvrir le domaine": "Discover the estate",
    "Un Modèle": "A Self-Sufficient",
    "Autosuffisant": "Model",
    "Développer un système autonome, résilient et engagé écologiquement. Un laboratoire vivant pour la souveraineté alimentaire de la Martinique.": "Developing an autonomous, resilient and environmentally committed system. A living laboratory for Martinique's food sovereignty.",
    "Autosuffisance": "Self-sufficiency",
    "Thérapeutique": "Therapeutic",
    "Transmission": "Transmission",
    "Actualités": "News",
    "Ressources": "Resources",
    "Toutes les actualités": "All news",
    "Lire l'article": "Read article",
    "Voir l'événement": "View event",
    "Consulter": "View",
    "À voir": "Watch",
    "soutenir": "support",
    "Produire et manger sain": "Grow and eat well",
    "Un domaine autosuffisant, écologique et thérapeutique, pensé pour cultiver la souveraineté alimentaire et le bien-être en Martinique.": "A self-sufficient, ecological and therapeutic estate designed to cultivate food sovereignty and well-being in Martinique.",
    "Une lecture essentielle sur l'exposition et les défis sanitaires persistants aux Antilles.": "Essential reading on exposure and ongoing health challenges in the French Caribbean.",
    "Un rendez-vous autour des solutions locales dans les Caraïbes et l'océan Indien.": "A gathering around local solutions in the Caribbean and Indian Ocean.",
    "Une ressource partagée pour nourrir la réflexion autour des initiatives citoyennes.": "A shared resource to feed reflection around citizen initiatives.",
    "Revenez à la terre, c'est là qu'il y a à boire et à manger.": "Return to the land; that is where there is food and water.",
    "Fondatrice de Domenn Lantik & An Lot Jaden Pou Limanité": "Founder of Domenn Lantik & An Lot Jaden Pou Limanité",
    "Le cacao fait partie de nous et c'est une fierté de transmettre mes connaissances à ces femmes.": "Cacao is part of who we are, and I am proud to share my knowledge with these women.",
    "Présidente de la filière Cacao, collaboratrice des ateliers": "President of the cacao sector, workshop collaborator",
    "Ainsi pourrons-nous proposer une agriculture plus respectueuse du vivant et sans pesticides.": "This is how we can offer farming that respects living systems and avoids pesticides.",
    "Cultivatrice et formatrice sur l'igname": "Yam grower and trainer"
  };

  const languageToggle = document.getElementById('languageToggle');
  const translatableTextNodes = [];
  const originalAttrs = new Map();
  let activeLang = localStorage.getItem('domennLang') || 'fr';

  const normalizeText = text => text.replace(/\s+/g, ' ').trim();

  const collectTextNodes = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, svg, [data-no-translate]')) {
          return NodeFilter.FILTER_REJECT;
        }
        const key = normalizeText(node.textContent);
        return siteTranslations[key] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      translatableTextNodes.push({ node, fr: node.textContent });
    }
  };

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    activeLang = lang;
    localStorage.setItem('domennLang', lang);
    if (languageToggle) {
      languageToggle.textContent = lang === 'en' ? 'EN' : 'FR';
      languageToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to French' : 'Changer la langue');
    }

    translatableTextNodes.forEach(({ node, fr }) => {
      const key = normalizeText(fr);
      const replacement = lang === 'en' ? siteTranslations[key] : key;
      const leading = fr.match(/^\s*/)?.[0] || '';
      const trailing = fr.match(/\s*$/)?.[0] || '';
      node.textContent = `${leading}${replacement}${trailing}`;
    });

    originalAttrs.forEach((value, element) => {
      ['placeholder', 'aria-label', 'title', 'alt'].forEach(attr => {
        const original = value[attr];
        if (!original) return;
        const key = normalizeText(original);
        if (siteTranslations[key]) {
          element.setAttribute(attr, lang === 'en' ? siteTranslations[key] : original);
        }
      });
    });

    if (searchPanel?.classList.contains('open')) {
      renderSearchResults();
    }
  };

  collectTextNodes(document.body);
  document.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach(element => {
    originalAttrs.set(element, {
      placeholder: element.getAttribute('placeholder'),
      'aria-label': element.getAttribute('aria-label'),
      title: element.getAttribute('title'),
      alt: element.getAttribute('alt')
    });
  });

  languageToggle?.addEventListener('click', () => {
    applyLanguage(activeLang === 'en' ? 'fr' : 'en');
  });

  const searchToggle = document.getElementById('homeSearchToggle');
  const searchPanel = document.getElementById('homeSearchPanel');
  const searchInput = document.getElementById('homeSearchInput');
  const searchResults = document.getElementById('homeSearchResults');
  const searchPages = [
    { url: 'index.html', fr: 'Accueil', en: 'Home', tags: 'domenn lantik accueil home souverainete alimentaire' },
    { url: 'domaine.html', fr: 'Le Domaine', en: 'The Estate', tags: 'source chapelle ruines zamana domaine estate' },
    { url: 'offres.html', fr: 'Nos Offres', en: 'Our Offers', tags: 'offres ateliers visites accompagnement offers' },
    { url: 'vision.html', fr: 'Notre Vision', en: 'Our Vision', tags: 'vision souverainete autosuffisance transmission' },
    { url: 'actualites.html', fr: 'Actualités & Ressources', en: 'News & Resources', tags: 'actualites ressources articles videos news' },
    { url: 'contact.html', fr: 'Contact', en: 'Contact', tags: 'contact message email telephone' }
  ];

  const renderSearchResults = () => {
    if (!searchResults || !searchInput) return;
    const query = searchInput.value.trim().toLowerCase();
    const matches = searchPages.filter(page => {
      const label = `${page.fr} ${page.en} ${page.tags}`.toLowerCase();
      return !query || label.includes(query);
    });

    searchResults.innerHTML = matches.length
      ? matches.map(page => `<a href="${page.url}">${activeLang === 'en' ? page.en : page.fr}</a>`).join('')
      : `<span class="home-search-empty">${activeLang === 'en' ? 'No results found.' : 'Aucun résultat trouvé.'}</span>`;
  };

  searchToggle?.addEventListener('click', () => {
    const isOpen = searchPanel?.classList.toggle('open');
    searchPanel?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      renderSearchResults();
      setTimeout(() => searchInput?.focus(), 80);
    }
  });

  searchInput?.addEventListener('input', renderSearchResults);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && searchPanel?.classList.contains('open')) {
      searchPanel.classList.remove('open');
      searchPanel.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('click', event => {
    if (!searchPanel?.classList.contains('open')) return;
    if (!searchPanel.contains(event.target) && !searchToggle?.contains(event.target)) {
      searchPanel.classList.remove('open');
      searchPanel.setAttribute('aria-hidden', 'true');
    }
  });

  applyLanguage(activeLang);

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* --- Smooth scroll for hash links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* --- Contact form (homepage/contact page) --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot
      if (form._honey && form._honey.value) return;

      // Clear errors
      form.querySelectorAll('.form-feedback').forEach(el => {
        el.className = 'form-feedback';
      });

      let valid = true;

      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        const feedback = document.getElementById(field.name + 'Feedback');
        if (!field.value.trim()) {
          if (feedback) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Ce champ est requis.';
          }
          valid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          if (feedback) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Veuillez entrer une adresse email valide.';
          }
          valid = false;
        }
      });

      if (!valid) return;

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '';
      btn.classList.add('btn-loading');
      btn.disabled = true;

      fetch('https://formsubmit.co/ajax/gestiondl.280@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then(r => r.json())
        .then(() => {
          form.reset();
          btn.classList.remove('btn-loading');
          btn.textContent = original;
          btn.disabled = false;
          showToast('✅ Message envoyé avec succès !');
        })
        .catch(() => {
          btn.classList.remove('btn-loading');
          btn.textContent = original;
          btn.disabled = false;
          showToast('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
        });
    });
  }

  /* --- Toast notification --- */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.innerHTML = '<p id="toastMsg"></p>';
      toast.style.cssText = `
        position:fixed; bottom:2rem; right:2rem; z-index:9999;
        background:var(--earth-900, #2A1F14); color:#fff;
        padding:1rem 1.5rem; font-size:0.85rem; font-weight:300;
        border:1px solid rgba(197,160,89,0.3); box-shadow:0 10px 40px rgba(0,0,0,0.3);
        transform:translateY(100px); opacity:0;
        transition:all 0.4s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.querySelector('#toastMsg').textContent = message;
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 4000);
  }

  /* --- Logo carousel: clone for seamless loop --- */
  document.querySelectorAll('.logo-track').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
  });

  /* --- News carousel: 3 visible desktop, 1 visible mobile --- */
  document.querySelectorAll('.news-shell').forEach(shell => {
    const track = shell.querySelector('.news-track');
    const slides = Array.from(shell.querySelectorAll('.news-slide'));
    const prev = shell.querySelector('.news-prev');
    const next = shell.querySelector('.news-next');
    if (!track || slides.length < 2) return;

    let index = 0;
    let startX = 0;

    const visibleCount = () => window.matchMedia('(max-width: 768px)').matches ? 1 : 3;

    const update = () => {
      const visible = visibleCount();
      const maxIndex = Math.max(0, slides.length - visible);
      index = Math.min(index, maxIndex);
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
      const step = slides[0].getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-index * step}px)`;
    };

    const go = (direction) => {
      const maxIndex = Math.max(0, slides.length - visibleCount());
      index = direction > 0
        ? (index >= maxIndex ? 0 : index + 1)
        : (index <= 0 ? maxIndex : index - 1);
      update();
    };

    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    window.addEventListener('resize', update, { passive: true });

    track.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (event) => {
      const deltaX = event.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 45) go(deltaX < 0 ? 1 : -1);
    }, { passive: true });

    update();
  });

  /* --- Resource modal --- */
  const resourceModal = document.getElementById('resourceModal');
  const resourceTitle = document.getElementById('resourceModalTitle');
  const resourceSource = document.getElementById('resourceModalSource');
  const resourceBody = document.getElementById('resourceModalBody');
  const resourceLink = document.getElementById('resourceModalLink');
  const resourceImage = document.getElementById('resourceModalImage');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (resourceModal && resourceTitle && resourceSource && resourceBody && resourceLink && resourceCards.length) {
    let lastResourceTrigger = null;

    const closeResourceModal = () => {
      resourceModal.classList.remove('active');
      resourceModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lastResourceTrigger?.focus();
    };

    const openResourceModal = (card) => {
      lastResourceTrigger = card;
      resourceTitle.textContent = card.dataset.resourceTitle || '';
      resourceSource.textContent = card.dataset.resourceSource || '';
      resourceBody.textContent = card.dataset.resourceBody || '';
      resourceLink.href = card.dataset.resourceLink || '#';
      resourceLink.textContent = card.dataset.resourceLabel || 'Ouvrir la ressource';
      if (resourceImage) {
        const image = card.dataset.resourceImage || '';
        resourceImage.style.setProperty('--resource-modal-image', image ? `url('${image}')` : '');
      }
      resourceModal.classList.add('active');
      resourceModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      resourceLink.focus();
    };

    resourceCards.forEach(card => {
      card.addEventListener('click', () => openResourceModal(card));
    });

    resourceModal.querySelectorAll('[data-modal-close]').forEach(close => {
      close.addEventListener('click', closeResourceModal);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && resourceModal.classList.contains('active')) {
        closeResourceModal();
      }
    });
  }

  /* --- Interactive domaine selector --- */
  const preview = document.getElementById('domainePreview');
  const previewLabel = document.getElementById('domaineLabel');
  const detailPanel = document.getElementById('domaineDetail');
  const selectorItems = document.querySelectorAll('.selector-item');
  if (preview && selectorItems.length) {
    selectorItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const img = item.dataset.img;
        const name = item.dataset.name;
        const desc = item.dataset.desc;
        if (img) {
          preview.style.opacity = '0';
          if (previewLabel) previewLabel.style.opacity = '0';
          setTimeout(() => {
            preview.src = img;
            preview.style.opacity = '1';
            if (previewLabel) {
              previewLabel.textContent = name;
              previewLabel.style.opacity = '1';
            }
          }, 150);
        }
        if (detailPanel && desc) {
          detailPanel.querySelector('p').style.opacity = '0';
          setTimeout(() => {
            detailPanel.querySelector('p').textContent = desc;
            detailPanel.querySelector('p').style.opacity = '1';
          }, 120);
        }
        selectorItems.forEach(s => s.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  /* --- Domaine full-screen slider --- */
  const dsSlides = document.querySelectorAll('.ds-slide');
  const dsProgress = document.getElementById('dsProgress');
  if (dsSlides.length && dsProgress) {
    let dsIdx = 0;
    let dsTimer;

    const goToSlide = (i) => {
      dsSlides[dsIdx].classList.remove('active');
      dsIdx = (i + dsSlides.length) % dsSlides.length;
      dsSlides[dsIdx].classList.add('active');
      dsProgress.style.width = ((dsIdx + 1) / dsSlides.length * 100) + '%';
    };

    const startAuto = () => { dsTimer = setInterval(() => goToSlide(dsIdx + 1), 8000); };
    startAuto();

    document.querySelector('.ds-next')?.addEventListener('click', () => { clearInterval(dsTimer); goToSlide(dsIdx + 1); startAuto(); });
    document.querySelector('.ds-prev')?.addEventListener('click', () => { clearInterval(dsTimer); goToSlide(dsIdx - 1); startAuto(); });

    // Init progress
    dsProgress.style.width = ((dsIdx + 1) / dsSlides.length * 100) + '%';
  }

  /* ═══════════ HERO CAROUSEL — Auto-cycle ═══════════ */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length && dots.length) {
    let current = 0;
    let interval;

    const goTo = (i) => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    };

    // Start cycling after entrance animations complete
    setTimeout(() => {
      interval = setInterval(() => goTo(current + 1), 6000);
    }, 4000);

    // Click dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(interval);
        goTo(i);
        interval = setInterval(() => goTo(current + 1), 6000);
      });
    });
  }

  /* --- Split-text hero title --- */
  const titleEl = document.querySelector('.hero-title-split');
  if (titleEl) {
    const text = titleEl.textContent.trim();
    titleEl.innerHTML = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = char === ' ' ? 'char space' : 'char';
      span.textContent = char;
      span.style.animationDelay = `${i * 0.04}s`;
      titleEl.appendChild(span);
    });
  }

  /* --- Gold sparkle burst --- */
  setTimeout(() => {
    const ht = document.querySelector('.hero-title-split');
    if (!ht) return;
    const rect = ht.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      const a = (Math.PI * 2 * i) / 20;
      const d = 40 + Math.random() * 80;
      s.style.cssText = `left:${cx}px;top:${cy}px;--sx:${Math.cos(a)*d}px;--sy:${Math.sin(a)*d - Math.random()*30}px;animation-delay:${Math.random()*0.3}s`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 2000);
    }
  }, 800);

});


  /* --- Testimonial pill selector --- */
  const testimonialData = [
    {
      quote: "Revenez à la terre, c'est là qu'il y a à boire et à manger.",
      quoteEn: "Return to the land; that is where there is food and water.",
      role: "Fondatrice de Domenn Lantik & An Lot Jaden Pou Limanité",
      roleEn: "Founder of Domenn Lantik & An Lot Jaden Pou Limanité"
    },
    {
      quote: "Le cacao fait partie de nous et c'est une fierté de transmettre mes connaissances à ces femmes.",
      quoteEn: "Cacao is part of who we are, and I am proud to share my knowledge with these women.",
      role: "Présidente de la filière Cacao, collaboratrice des ateliers",
      roleEn: "President of the cacao sector, workshop collaborator"
    },
    {
      quote: "Ainsi pourrons-nous proposer une agriculture plus respectueuse du vivant et sans pesticides.",
      quoteEn: "This is how we can offer farming that respects living systems and avoids pesticides.",
      role: "Cultivatrice et formatrice sur l'igname",
      roleEn: "Yam grower and trainer"
    }
  ];

  let testimonialActive = 0;
  let testimonialAnimating = false;
  const testimonialQuote = document.getElementById('testimonialQuote');
  const testimonialRole = document.getElementById('testimonialRole');
  const tpillBtns = document.querySelectorAll('.tpill');

  window.testimonialSelect = (index) => {
    if (index === testimonialActive || testimonialAnimating) return;
    testimonialAnimating = true;

    testimonialQuote.style.opacity = '0';
    testimonialQuote.style.filter = 'blur(4px)';
    testimonialQuote.style.transform = 'scale(0.98)';
    testimonialRole.style.opacity = '0';
    testimonialRole.style.transform = 'translateY(0.5rem)';

    setTimeout(() => {
      const lang = localStorage.getItem('domennLang') || 'fr';
      testimonialQuote.textContent = lang === 'en' ? testimonialData[index].quoteEn : testimonialData[index].quote;
      testimonialRole.textContent = lang === 'en' ? testimonialData[index].roleEn : testimonialData[index].role;

      tpillBtns[testimonialActive].classList.remove('active');
      tpillBtns[index].classList.add('active');
      testimonialActive = index;

      testimonialQuote.style.opacity = '';
      testimonialQuote.style.filter = '';
      testimonialQuote.style.transform = '';
      testimonialRole.style.opacity = '';
      testimonialRole.style.transform = '';

      setTimeout(() => { testimonialAnimating = false; }, 400);
    }, 200);
  };
