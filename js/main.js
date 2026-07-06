/* =============================================================
   MY FIRST DRIVE — Main JavaScript
   ============================================================= */

/* --- GSAP --- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* --- Config ---
   TODO: Replace WHATSAPP_NUMBER with the actual number (digits only, no + or spaces)
   Format: country code + number, e.g. 447712345678
----------------------------------------------------------- */
const WHATSAPP_NUMBER  = '447700000000'; // ← TODO: replace
const WHATSAPP_MESSAGE = 'Hi, I%27d%20like%20to%20book%20a%20lesson%20with%20My%20First%20Drive';

/* --- Coverage area data ---
   testCentre: set to null until verified — see TODO below.
----------------------------------------------------------- */
const COVERAGE_AREAS = [
  {
    name: 'Hounslow',
    postcode: 'TW3',
    region: 'Central West London',
    description: 'We cover all of Hounslow town centre and the surrounding residential roads — a great area for building confidence on varied routes, from quieter suburban streets to busier A-roads.',
    testCentre: null,
  },
  {
    name: 'Feltham',
    postcode: 'TW13',
    region: 'West London',
    description: 'Lessons across Feltham, including the town centre, Feltham Hill Road, and the quieter roads towards Bedfont — ideal for new drivers looking to build up from low-traffic roads.',
    testCentre: null,
  },
  {
    name: 'Bedfont',
    postcode: 'TW14',
    region: 'West London',
    description: 'East and West Bedfont covered — including the residential roads near Bedfont Lakes and routes out towards Staines. Good mix of quiet residential and busier A-road practice.',
    testCentre: null,
  },
  {
    name: 'Hanworth',
    postcode: 'TW13',
    region: 'West London',
    description: "Lessons covering Hanworth village, Hampton Hill, and the surrounding roads — a quieter patch of West London that's great for earlier-stage learners.",
    testCentre: null,
  },
  {
    name: 'Hampton',
    postcode: 'TW12',
    region: 'Southwest London',
    description: 'We cover Hampton, Hampton Wick, and routes into Bushy Park — a calmer driving environment with some lovely routes suitable for building confidence.',
    testCentre: null,
  },
  {
    name: 'Teddington',
    postcode: 'TW11',
    region: 'Southwest London',
    description: 'Full coverage across Teddington — from the High Street to the quieter roads near the Thames. A well-rounded area for learners at all stages.',
    testCentre: null,
  },
  {
    name: 'Twickenham',
    postcode: 'TW1',
    region: 'Southwest London',
    description: 'Twickenham town centre and surrounding roads covered — including routes through St Margarets and towards Richmond Bridge. Mixed traffic conditions for progressive learning.',
    testCentre: null,
  },
  {
    name: 'Osterley',
    postcode: 'TW7',
    region: 'West London',
    description: 'Osterley, Northfields, and the roads around Osterley Park — including useful A-road and roundabout practice on routes towards the M4 corridor.',
    testCentre: null,
  },
  {
    name: 'Isleworth',
    postcode: 'TW7',
    region: 'West London',
    description: 'Isleworth and Spring Grove area fully covered — including routes along the A315 and quieter residential streets. Well-connected area for varied lesson routes.',
    testCentre: null,
  },
  {
    name: 'Ashford',
    postcode: 'TW15',
    region: 'Surrey / West London border',
    description: 'Ashford and the Staines Road area covered — including routes towards Staines-upon-Thames and the M25 corridor for more advanced lesson practice.',
    testCentre: null,
  },
];

/* -------------------------------------------------------
   Utility: set all WhatsApp links on the page
------------------------------------------------------- */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const town = el.dataset.whatsapp;
    let msg;
    if (town) {
      msg = encodeURIComponent(`Hi, I'd like to book a lesson in ${town} with My First Drive`);
    } else {
      msg = WHATSAPP_MESSAGE;
    }
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    el.rel  = 'noopener noreferrer';
    el.target = '_blank';
  });
}

/* -------------------------------------------------------
   Navigation: transparent over hero → solid on scroll
------------------------------------------------------- */
function initNav() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const isHeroPage = document.querySelector('.hero');

  function updateNav() {
    if (isHeroPage) {
      if (window.scrollY > 20) {
        header.classList.remove('site-header--transparent');
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.add('site-header--transparent');
        header.classList.remove('site-header--scrolled');
      }
    } else {
      header.classList.remove('site-header--transparent');
      header.classList.add('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* -------------------------------------------------------
   Mobile nav toggle
------------------------------------------------------- */
function initMobileNav() {
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  mobileNav.querySelectorAll('a, .mobile-nav__close').forEach(el => {
    el.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* -------------------------------------------------------
   Transmission toggle in hero (Automatic / Manual)
------------------------------------------------------- */
function initTransmissionToggle() {
  const radios = document.querySelectorAll('[name="transmission"]');
  const subCopy = document.getElementById('hero-sub');
  if (!radios.length || !subCopy) return;

  const copy = {
    automatic: 'Many learners find automatics easier and less stressful — no clutch, no stalling. Good for nervous drivers, or anyone who just wants to focus on the road.',
    manual:    'Manual lessons build full vehicle control and the flexibility to drive any car. We make the clutch feel natural from lesson one, not lesson five.',
  };

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) subCopy.textContent = copy[radio.value] || subCopy.textContent;
    });
  });
}

/* -------------------------------------------------------
   Coverage areas accordion
------------------------------------------------------- */
function renderCoverageAreas(containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { limit = null, showTestCentre = true } = options;
  const areas = limit ? COVERAGE_AREAS.slice(0, limit) : COVERAGE_AREAS;

  container.innerHTML = areas.map((area, i) => {
    const testCentreHTML = showTestCentre
      ? `<div class="area-card__testcentre">
          <span class="area-card__testcentre-label">Nearest test centre</span>
          ${area.testCentre ? area.testCentre : 'To be confirmed — verifying with DVSA'}
        </div>`
      : '';

    const townMsg = encodeURIComponent(`Hi, I'd like to book a lesson in ${area.name} with My First Drive`);
    const waLink  = `https://wa.me/${WHATSAPP_NUMBER}?text=${townMsg}`;
    const slug    = area.name.toLowerCase().replace(/\s+/g, '-');

    return `
      <div class="area-card" id="${slug}" data-area="${i}">
        <div class="area-card__header" role="button" tabindex="0"
             aria-expanded="false" aria-controls="area-body-${i}">
          <div class="area-card__meta">
            <span class="area-card__name">${area.name}</span>
            <span class="area-card__postcode">${area.postcode}</span>
            <span class="area-card__region">${area.region}</span>
          </div>
          <div class="area-card__toggle" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="area-card__body" id="area-body-${i}" role="region" aria-label="${area.name} details">
          <div class="area-card__body-inner">
            <div class="area-card__body-inner-pad">
              <p class="area-card__desc">${area.description}</p>
              ${testCentreHTML}
              <a href="${waLink}" class="btn-bracket btn-bracket--whatsapp btn-bracket--sm"
                 target="_blank" rel="noopener noreferrer"
                 aria-label="Book a lesson in ${area.name} via WhatsApp">Book in ${area.name}</a>
            </div>
          </div>
        </div>
      </div>
    `.trim();
  }).join('');

  container.querySelectorAll('.area-card__header').forEach(header => {
    function toggleArea() {
      const card = header.closest('.area-card');
      const isOpen = card.classList.contains('is-open');

      container.querySelectorAll('.area-card.is-open').forEach(open => {
        if (open !== card) {
          open.classList.remove('is-open');
          open.querySelector('.area-card__header').setAttribute('aria-expanded', 'false');
        }
      });

      card.classList.toggle('is-open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    }

    header.addEventListener('click', toggleArea);
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleArea();
      }
    });
  });
}

/* -------------------------------------------------------
   Hero interactive parallax + spotlight
------------------------------------------------------- */
function initHeroInteraction() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const inner = hero.querySelector('.hero__inner');
  let ticking = false;
  let cx = 0.5, cy = 0.5;
  let bgX = 0, bgY = 0;
  let returnRaf = null;

  function apply() {
    hero.style.setProperty('--mx', (cx * 100).toFixed(1) + '%');
    hero.style.setProperty('--my', (cy * 100).toFixed(1) + '%');
    bgX = (cx - 0.5) * -40;
    bgY = (cy - 0.5) * -20;
    hero.style.setProperty('--bg-x', bgX.toFixed(1) + 'px');
    hero.style.setProperty('--bg-y', bgY.toFixed(1) + 'px');
    if (inner) {
      const rx = ((cy - 0.5) * -3).toFixed(2);
      const ry = ((cx - 0.5) *  4).toFixed(2);
      inner.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    ticking = false;
  }

  function floatBack() {
    bgX += (0 - bgX) * 0.1;
    bgY += (0 - bgY) * 0.1;
    hero.style.setProperty('--bg-x', bgX.toFixed(2) + 'px');
    hero.style.setProperty('--bg-y', bgY.toFixed(2) + 'px');
    if (Math.abs(bgX) > 0.05 || Math.abs(bgY) > 0.05) {
      returnRaf = requestAnimationFrame(floatBack);
    } else {
      hero.style.setProperty('--bg-x', '0px');
      hero.style.setProperty('--bg-y', '0px');
    }
  }

  hero.addEventListener('mouseenter', () => {
    if (returnRaf) { cancelAnimationFrame(returnRaf); returnRaf = null; }
    hero.classList.add('hero--lit');
    if (inner) inner.style.transition = 'none';
  });

  hero.addEventListener('mouseleave', () => {
    hero.classList.remove('hero--lit');
    returnRaf = requestAnimationFrame(floatBack);
    if (inner) {
      inner.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      inner.style.transform = 'none';
      inner.addEventListener('transitionend', () => { inner.style.transition = ''; }, { once: true });
    }
  });

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    cx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    cy = Math.max(0, Math.min(1, (e.clientY - r.top)  / r.height));
    if (!ticking) { requestAnimationFrame(apply); ticking = true; }
  });
}

/* -------------------------------------------------------
   Hero dust particles — a few dozen slow-drifting motes over
   the hero photo, like dust catching light through a car
   window. Canvas rather than DOM nodes so animating ~35 of them
   doesn't touch layout. Paused via IntersectionObserver when
   the hero scrolls out of view, and skipped entirely under
   reduced motion.
------------------------------------------------------- */
function initHeroParticles() {
  const hero = document.querySelector('.hero');
  const canvas = hero && hero.querySelector('.hero__particles');
  if (!hero || !canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;
  let particles = [];
  let raf = null;
  let lastTs = null;
  let running = false;

  const PARTICLE_COUNT = 36;

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.6,
      speed: 6 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 8,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.35,
    };
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(dt, elapsed) {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y -= p.speed * dt;
      p.x += Math.sin(elapsed * 0.6 + p.phase) * p.drift * dt;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243,228,194,${p.alpha})`;
      ctx.fill();
    });
  }

  function loop(ts) {
    if (lastTs === null) lastTs = ts;
    const dt = Math.min((ts - lastTs) / 1000, 0.1);
    const elapsed = ts / 1000;
    lastTs = ts;
    draw(dt, elapsed);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    lastTs = null;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
  window.addEventListener('resize', resize, { passive: true });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) start(); else stop();
    });
  }, { threshold: 0 });
  observer.observe(hero);
}

/* -------------------------------------------------------
   Asymmetric photo settle-in + parallax drift — used by the
   About page's instructor feature and pass-certificate section
   ([data-parallax-el] wrapping a [data-parallax-inner]). Settles
   the whole block in from a steeper rotation on scroll-in, then
   (desktop + motion allowed) drifts the inner image slightly as
   the block scrolls past. No-JS/no-GSAP fallback just rests at
   the target rotation with no animation.
------------------------------------------------------- */
function initParallaxPhotos() {
  const els = document.querySelectorAll('[data-parallax-el]');
  if (!els.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  els.forEach(el => {
    const rotateTo = parseFloat(el.dataset.rotateTo || '0');

    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
      el.style.transform = `rotate(${rotateTo}deg)`;
      return;
    }

    const rotateFrom = parseFloat(el.dataset.rotateFrom || '0');
    const inner = el.querySelector('[data-parallax-inner]');

    gsap.fromTo(el,
      { opacity: 0, y: 30, rotate: rotateFrom },
      {
        opacity: 1, y: 0, rotate: rotateTo, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );

    if (inner && window.matchMedia('(min-width: 700px)').matches) {
      gsap.to(inner, {
        y: 40, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });
}

/* -------------------------------------------------------
   About — "How we teach" pinned horizontal scroll sequence.
   Desktop + motion-allowed only; mobile and reduced-motion keep
   the plain wrapping card grid defined in style.css. Pins the
   stage and drives the track's translateX directly off scroll
   progress rather than a separate tween, which is the standard
   GSAP pin-and-scrub pattern for this effect.
------------------------------------------------------- */
function initAboutTeachScroll() {
  const pinWrap = document.querySelector('[data-teach-pin]');
  const stage = document.querySelector('[data-teach-stage]');
  const track = document.querySelector('[data-teach-track]');
  const cards = document.querySelectorAll('[data-teach-card]');
  const progress = document.querySelector('[data-teach-progress]');
  if (!pinWrap || !stage || !track || !cards.length) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(min-width: 900px)').matches) return;

  stage.classList.add('about-teach__stage--active');
  pinWrap.classList.add('about-teach__pin--active');

  // Computed once and cached rather than re-measured live from inside
  // the ScrollTrigger's end/onUpdate callbacks — GSAP can call those
  // mid-pin (e.g. during its own refresh pass), and re-measuring a
  // pinned (position: fixed) element at that point corrupts the pin's
  // start/end range. A plain resize listener below handles the one
  // case that actually needs a fresh measurement.
  let distance = Math.max(0, track.scrollWidth - stage.clientWidth);

  if (distance < 40) {
    // Cards don't actually overflow the stage (e.g. very few cards on
    // a narrow-ish desktop) — a pin here would just eat scroll for no
    // visual payoff, so fall back to the plain wrapping grid instead.
    stage.classList.remove('about-teach__stage--active');
    pinWrap.classList.remove('about-teach__pin--active');
    return;
  }

  const st = ScrollTrigger.create({
    // Pin the heading + stage together (not just the stage) so the
    // "Calm, structured, patient..." heading stays on screen for the
    // whole card sequence instead of having already scrolled past by
    // the time the horizontal scroll kicks in.
    trigger: pinWrap,
    start: 'top 90px',
    end: () => '+=' + (distance + window.innerHeight * 0.4),
    pin: true,
    scrub: 0.6,
    onUpdate: self => {
      track.style.transform = `translate3d(${(-distance * self.progress).toFixed(1)}px, 0, 0)`;
      const active = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
      cards.forEach((card, i) => card.classList.toggle('is-active', i === active));
      if (progress) {
        progress.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
      }
    },
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      distance = Math.max(0, track.scrollWidth - stage.clientWidth);
      st.refresh();
    }, 200);
  });
}

/* -------------------------------------------------------
   About — side-rail scroll stepper. Highlights the chapter
   currently centred in the viewport and smooth-scrolls to a
   section on click. Plain IntersectionObserver rather than
   GSAP, so it still works if GSAP fails to load.
------------------------------------------------------- */
function initAboutRail() {
  const rail = document.querySelector('[data-about-rail]');
  if (!rail) return;

  const dots = Array.from(rail.querySelectorAll('.about-rail__dot'));
  const sections = dots
    .map(dot => document.getElementById(dot.dataset.railTarget))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      dots.forEach(dot => dot.classList.toggle('is-active', dot.dataset.railTarget === id));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.railTarget);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

/* -------------------------------------------------------
   Hero entrance — staggered GSAP timeline for the eyebrow,
   title, and sub/actions row on the homepage hero. Falls back
   to making everything visible immediately if GSAP didn't load
   or reduced motion is requested (see the .js .hero rules in
   style.css for the matching no-JS/no-GSAP fallback).
------------------------------------------------------- */
function initHeroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const eyebrow = hero.querySelector('.hero__eyebrow');
  const title   = hero.querySelector('.hero__title');
  const row     = hero.querySelector('.hero__row');
  const targets = [eyebrow, title, row].filter(Boolean);
  if (!targets.length) return;

  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => { el.style.opacity = '1'; });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 });
  if (title)   tl.fromTo(title,   { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');
  if (row)     tl.fromTo(row,     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
}

/* -------------------------------------------------------
   Page-to-page transitions — a fixed overlay fades out on
   load and fades in over internal same-tab link clicks before
   navigating. Skips WhatsApp/external/anchor/new-tab links and
   modified clicks so those keep their normal behaviour. Falls
   back to plain navigation if GSAP isn't available or reduced
   motion is requested.
------------------------------------------------------- */
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.gsap || reduceMotion) {
    overlay.style.display = 'none';
    return;
  }

  gsap.to(overlay, {
    opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.05,
    onComplete: () => { overlay.style.pointerEvents = 'none'; },
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (link.target === '_blank' || link.hasAttribute('data-whatsapp')) return;
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;

    link.addEventListener('click', e => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      overlay.style.pointerEvents = 'auto';
      gsap.to(overlay, {
        opacity: 1, duration: 0.35, ease: 'power2.in',
        onComplete: () => { window.location.href = href; },
      });
    });
  });
}

/* -------------------------------------------------------
   Announcement bar
------------------------------------------------------- */
function initAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  if (!bar) return;

  const h = bar.offsetHeight;
  document.documentElement.style.setProperty('--bar-h', h + 'px');

  if (sessionStorage.getItem('bar-dismissed')) {
    bar.style.display = 'none';
    document.documentElement.style.setProperty('--bar-h', '0px');
    return;
  }

  const closeBtn = document.getElementById('bar-close');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    bar.classList.add('is-dismissed');
    document.documentElement.style.setProperty('--bar-h', '0px');
    sessionStorage.setItem('bar-dismissed', '1');
  });
}

/* -------------------------------------------------------
   3D scroll-reveal card
------------------------------------------------------- */
function initScrollCard() {
  const stages = document.querySelectorAll('[data-scroll-stage]');
  if (!stages.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stages.forEach(stage => {
      const card = stage.querySelector('[data-scroll-card]');
      if (card) card.style.transform = 'rotateX(0deg) scale(1)';
    });
    return;
  }

  let ticking = false;

  function update() {
    stages.forEach(stage => {
      const card = stage.querySelector('[data-scroll-card]');
      if (!card) return;

      const rect = stage.getBoundingClientRect();
      const vh   = window.innerHeight;
      const raw  = (vh - rect.top) / (vh * 0.9);
      const progress = Math.max(0, Math.min(1, raw));

      const isMobile   = window.innerWidth <= 768;
      const startRot   = 18;
      const startScale = isMobile ? 1.0 : 1.04;
      const endScale   = isMobile ? 0.96 : 1;

      const rotate = startRot * (1 - progress);
      const scale  = startScale + (endScale - startScale) * progress;

      card.style.transform = `rotateX(${rotate}deg) scale(${scale})`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  update();
}

/* -------------------------------------------------------
   Scroll-triggered reveal — GSAP ScrollTrigger when
   available, falling back to the original IntersectionObserver
   + CSS-transition approach if GSAP didn't load or the visitor
   prefers reduced motion.
------------------------------------------------------- */
function initScrollReveal() {
  const singles = document.querySelectorAll('.reveal');
  const groups  = document.querySelectorAll('.reveal-group');
  if (!singles.length && !groups.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    singles.forEach(el => observer.observe(el));
    groups.forEach(el => observer.observe(el));
    return;
  }

  singles.forEach(el => {
    el.style.transition = 'none';
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  groups.forEach(group => {
    const items = Array.from(group.children);
    if (!items.length) return;
    items.forEach(item => { item.style.transition = 'none'; });
    gsap.fromTo(items,
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
      }
    );
  });
}

/* -------------------------------------------------------
   Stats counter — counts up on scroll-into-view
------------------------------------------------------- */
function initStatsCounter() {
  const items = document.querySelectorAll('.stat-item[data-count]');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const item = entry.target;
      const el   = item.querySelector('.stat-item__number');
      if (!el) return;

      const target   = parseInt(item.dataset.count, 10);
      const suffix   = item.dataset.suffix || '';
      const duration = 1400;
      const startTs  = performance.now();

      function tick(now) {
        const elapsed  = now - startTs;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  items.forEach(item => observer.observe(item));
}

/* -------------------------------------------------------
   Active nav link highlighting
------------------------------------------------------- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === path || (path === '' && linkFile === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* -------------------------------------------------------
   Scroll progress bar — thin fixed bar filling as the page
   scrolls from top to bottom.
------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  let ticking = false;

  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = progress.toFixed(2) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* -------------------------------------------------------
   Hero scroll hint — fades out once the visitor has
   actually started scrolling.
------------------------------------------------------- */
function initHeroScrollHint() {
  const hint = document.querySelector('.hero__scroll-hint');
  if (!hint) return;

  function update() {
    hint.classList.toggle('is-hidden', window.scrollY > 80);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* -------------------------------------------------------
   Parallax on full-bleed "quiet section" images — subtle
   scroll-linked drift, capped by the CSS overscan margin.
------------------------------------------------------- */
function initParallaxImages() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const imgs = document.querySelectorAll('.quiet-section__img');
  if (!imgs.length) return;

  let ticking = false;

  function update() {
    imgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerOffset = (rect.top + rect.height / 2) - vh / 2;
      const shift = Math.max(-50, Math.min(50, centerOffset * -0.12));
      img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* -------------------------------------------------------
   Contextual custom cursor — scoped per [cursor-block],
   desktop pointer devices only. Text swaps via
   data-cursor-text on the hovered child.
------------------------------------------------------- */
function initCustomCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const blocks = document.querySelectorAll('[data-cursor-block]');
  if (!blocks.length) return;

  blocks.forEach(block => {
    const cursor = block.querySelector('[cursor]');
    if (!cursor) return;

    // Relocate to <body> rather than leaving it nested in the block.
    // .cursor is `position: fixed` and expects clientX/clientY to map
    // directly to the viewport — but a transformed ancestor (GSAP pins
    // move their target with a CSS transform, not position:fixed)
    // creates a new containing block for fixed descendants, which
    // throws that math off. Living at the body level sidesteps the
    // issue regardless of what any given block's ancestors do.
    document.body.appendChild(cursor);

    let tx = 0, ty = 0, x = 0, y = 0;
    let raf = null;

    function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.translate = `${x}px ${y}px`;
      raf = requestAnimationFrame(loop);
    }

    block.addEventListener('mouseenter', e => {
      tx = e.clientX; ty = e.clientY; x = tx; y = ty;
      cursor.classList.add('is-active');
      if (!raf) raf = requestAnimationFrame(loop);
    });

    block.addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
    });

    block.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    });

    block.querySelectorAll('[data-cursor-text]').forEach(child => {
      child.addEventListener('mouseenter', () => {
        cursor.textContent = child.dataset.cursorText;
      });
      child.addEventListener('mouseleave', () => {
        cursor.textContent = block.dataset.cursorDefault || '';
      });
    });
  });
}

/* -------------------------------------------------------
   Tilt cards — subtle mouse-tracked perspective tilt on
   lesson/booking/review cards. Desktop pointer devices only.
   JS only sets rotation custom properties; CSS owns the
   transition/hover chrome (shadow, border).
------------------------------------------------------- */
function initTiltCards() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (py * -7).toFixed(2) + 'deg');
      card.style.setProperty('--ty', '-6px');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ty', '0px');
    });
  });
}

/* -------------------------------------------------------
   Magnetic bracket buttons — content nudges toward the
   cursor within the button's bounds. Desktop only.
------------------------------------------------------- */
function initMagneticButtons() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.btn-bracket').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.5;
      btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* -------------------------------------------------------
   Expandable lesson-card detail
------------------------------------------------------- */
function initLessonExpand() {
  document.querySelectorAll('.lesson-card__more').forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = document.getElementById(btn.getAttribute('aria-controls'));
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (detail) detail.classList.toggle('is-open', !isOpen);
    });
  });
}

/* -------------------------------------------------------
   Selectable Automatic / Manual comparison columns —
   choosing one reveals a matching WhatsApp CTA.
------------------------------------------------------- */
function initCompareSelect() {
  const cols = document.querySelectorAll('.compare__col[data-transmission]');
  const cta = document.getElementById('compare-cta');
  if (!cols.length || !cta) return;

  const ctaText = cta.querySelector('[data-compare-cta-text]');
  const ctaLink = cta.querySelector('[data-compare-cta-link]');

  cols.forEach(col => {
    function select() {
      cols.forEach(c => {
        c.classList.toggle('is-selected', c === col);
        c.querySelector('.compare__check').textContent = c === col ? '✓' : '';
      });
      const transmission = col.dataset.transmission;
      if (ctaText) ctaText.textContent = `Ask about ${transmission} lessons`;
      if (ctaLink) {
        const msg = encodeURIComponent(`Hi, I'd like to ask about ${transmission} lessons with My First Drive`);
        ctaLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
        ctaLink.rel = 'noopener noreferrer';
        ctaLink.target = '_blank';
      }
      cta.classList.add('is-open');
    }

    col.addEventListener('click', select);
    col.setAttribute('role', 'button');
    col.setAttribute('tabindex', '0');
    col.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
  });
}

/* -------------------------------------------------------
   Contact form — no backend yet (see TODO on contact.html),
   so submission is intercepted instead of reloading the page
   with an unhandled query string.
------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const original = button.textContent;
    button.textContent = 'Not connected yet — use WhatsApp above';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 3200);
  });
}

/* -------------------------------------------------------
   Init
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initAnnouncementBar();
  initHeroEntrance();
  initHeroInteraction();
  initHeroParticles();
  initHeroScrollHint();
  initWhatsAppLinks();
  initNav();
  initMobileNav();
  initTransmissionToggle();
  initScrollCard();

  if (document.querySelector('.areas-grid--home')) {
    renderCoverageAreas('.areas-grid--home', { limit: 4, showTestCentre: false });
  }
  if (document.querySelector('.areas-grid--full')) {
    renderCoverageAreas('.areas-grid--full', { limit: null, showTestCentre: true });
  }

  initScrollReveal();
  initScrollProgress();
  initParallaxImages();
  initActiveNav();
  initStatsCounter();
  initCustomCursor();
  initContactForm();
  initTiltCards();
  initMagneticButtons();
  initLessonExpand();
  initCompareSelect();
  initParallaxPhotos();
  initAboutTeachScroll();
  initAboutRail();
});
