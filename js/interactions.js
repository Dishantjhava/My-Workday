/* ══════════════════════════════════════════════════════════════
   MY WORKDAY — MASCOT MOTION, EYE TRACKING & INTERACTIVE CARDS
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────────
     1. MOUSE CURSOR TRACKING FOR MASCOTS (EYES & FACES)
  ───────────────────────────────────────────────────────────── */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth RAF loop for 60fps tracking
  function updateMascots() {
    // 1. All eye pupil elements
    document.querySelectorAll('.mascot-pupil').forEach(pupil => {
      const rect = pupil.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
      const maxDistance = parseFloat(pupil.dataset.maxOffset || 4.5);
      const dist = Math.min(maxDistance, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 35);

      const offsetX = Math.cos(angle) * dist;
      const offsetY = Math.sin(angle) * dist;

      pupil.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`;
    });

    // 2. Entire mascot face tilt
    document.querySelectorAll('.mascot-face').forEach(face => {
      const rect = face.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(mouseY - faceCenterY, mouseX - faceCenterX);
      const maxDistance = parseFloat(face.dataset.maxOffset || 5);
      const dist = Math.min(maxDistance, Math.hypot(mouseX - faceCenterX, mouseY - faceCenterY) / 45);

      const offsetX = Math.cos(angle) * dist;
      const offsetY = Math.sin(angle) * dist;

      face.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`;
    });

    requestAnimationFrame(updateMascots);
  }
  requestAnimationFrame(updateMascots);

  /* ─────────────────────────────────────────────────────────────
     2. MASCOT CLICK PARTICLES & WOBBLE CELEBRATION
  ───────────────────────────────────────────────────────────── */
  const cuteEmojis = ['✨', '💖', '🌸', '☀️', '💛', '🎉', '🍀', '🍬'];

  document.querySelectorAll('.mascot-interactive').forEach(mascot => {
    mascot.addEventListener('click', (e) => {
      // Cheerful squash & stretch wobble
      mascot.animate([
        { transform: 'scale(0.85) rotate(-6deg)' },
        { transform: 'scale(1.22) rotate(6deg)' },
        { transform: 'scale(0.94) rotate(-3deg)' },
        { transform: 'scale(1.06) rotate(2deg)' },
        { transform: 'scale(1) rotate(0deg)' }
      ], {
        duration: 550,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      });

      // Spawn 5 burst particles
      const rect = mascot.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 3;

      for (let i = 0; i < 6; i++) {
        createParticle(originX, originY, cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)]);
      }
    });
  });

  function createParticle(x, y, emoji) {
    const p = document.createElement('span');
    p.className = 'cute-particle';
    p.textContent = emoji;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    const dx = (Math.random() - 0.5) * 120;
    const dy = -40 - Math.random() * 80;
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }

  /* ─────────────────────────────────────────────────────────────
     3. 3D TILT EFFECT ON CARDS AS CURSOR MOVES OVER THEM
  ───────────────────────────────────────────────────────────── */
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates for CSS variable
      card.style.setProperty('--mouse-x', `${x - rect.width}px`);
      card.style.setProperty('--mouse-y', `${y - rect.height}px`);

      // Gentle 3D tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ─────────────────────────────────────────────────────────────
     4. SCROLL REVEAL (CARDS GENTLY FLOAT IN AS YOU SCROLL)
  ───────────────────────────────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });


  /* ─────────────────────────────────────────────────────────────
     5. TRUE CARD DECK STACKING ENGINE
     - Card pins at its sticky top.
     - While scrolling down, ALL info on the card scrolls into view
       BEFORE the next card arrives.
     - Then the next card glides UP directly ON TOP of the previous card.
     - Scrolling up slowly peels cards off in reverse.
  ───────────────────────────────────────────────────────────── */
  const deckCards = Array.from(document.querySelectorAll('.deck-card'));

  function updateCardDeck() {
    if (!deckCards.length) return;

    deckCards.forEach((card, i) => {
      const viewport = card.querySelector('.deck-card-viewport');
      const content = card.querySelector('.deck-card-content');
      if (!viewport || !content) return;

      const cardRect = card.getBoundingClientRect();
      const stickyTop = parseInt(window.getComputedStyle(card).top, 10) || (76 + i * 12);
      const isPinned = cardRect.top <= stickyTop + 2;

      const nextCard = deckCards[i + 1];
      const maxTranslate = Math.max(0, content.offsetHeight - viewport.offsetHeight + 18);

      if (isPinned && maxTranslate > 0) {
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          // We want all info to appear before nextCard reaches the bottom of the current card!
          // Next card begins far below (e.g. window.innerHeight + 500px).
          // By the time nextCard hits window.innerHeight, current card's info should be 100% visible!
          const startDistance = window.innerHeight * 1.5;
          const endDistance = window.innerHeight * 0.85;
          const currentDistance = nextRect.top - stickyTop;

          // Map progress so it reaches 1.0 while nextCard is still at bottom
          const progress = Math.min(1, Math.max(0, (startDistance - currentDistance) / (startDistance - endDistance)));
          const translateY = progress * maxTranslate;
          content.style.transform = `translate3d(0, -${translateY.toFixed(1)}px, 0)`;
        } else {
          // Last card: scroll smoothly to end without requiring extra empty space
          const scrolled = Math.max(0, stickyTop - cardRect.top);
          const progress = Math.min(1, Math.max(0, scrolled / 160));
          const translateY = progress * maxTranslate;
          content.style.transform = `translate3d(0, -${translateY.toFixed(1)}px, 0)`;
        }
      } else if (!isPinned) {
        content.style.transform = 'translate3d(0, 0px, 0)';
      }

      // Stacking Dimming & Scale when next card slides directly OVER current card
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const overlap = cardRect.bottom - nextRect.top;

        if (overlap > 0 && nextRect.top < window.innerHeight) {
          const overlapProgress = Math.min(1, Math.max(0, overlap / (cardRect.height * 0.85)));
          const scale = 1 - (overlapProgress * 0.05);
          const translateY = -(overlapProgress * 12);
          const brightness = 1 - (overlapProgress * 0.09);

          card.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(1)}px)`;
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
        } else {
          card.style.transform = 'scale(1) translateY(0px)';
          card.style.filter = 'brightness(1)';
        }
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateCardDeck();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateCardDeck, { passive: true });
  updateCardDeck();

  /* ─────────────────────────────────────────────────────────────
     6. CONNECT CARDS & BENTO ITEMS TO DASHBOARD
  ───────────────────────────────────────────────────────────── */
  document.querySelectorAll('.deck-card').forEach((card) => {
    const isManagerCard = card.classList.contains('deck-card-2') || card.classList.contains('deck-card-5');
    const targetMode = isManagerCard ? 'manager' : 'employee';

    card.querySelectorAll('.bento-card, [data-purpose*="mockup"]').forEach((item) => {
      item.classList.add('bento-card-clickable');
      item.setAttribute('title', `Click to open in ${isManagerCard ? 'Manager' : 'Employee'} Dashboard`);
      item.addEventListener('click', (e) => {
        // Prevent if clicking an input
        if (e.target.tagName === 'INPUT') return;
        openDashboard(targetMode);
      });
    });
  });

});
