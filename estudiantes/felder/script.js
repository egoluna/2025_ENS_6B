// Animación simple al cargar la página
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------
     FOTO PERFIL (hover suave)
  ---------------------------------- */
  const foto = document.querySelector('.foto-perfil');
  if (foto) {
    foto.style.transition = 'transform .2s ease';
    foto.addEventListener('mouseenter', () => {
      foto.style.transform = 'scale(1.05)';
    });
    foto.addEventListener('mouseleave', () => {
      foto.style.transform = 'scale(1)';
    });
  }

  /* ----------------------------------
     CAROUSEL GENÉRICO (fade)
  ---------------------------------- */
  document.querySelectorAll('.carousel-fade').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.slide')];
    if (!slides.length) return;

    let idx = slides.findIndex(s => s.classList.contains('active'));
    if (idx < 0) idx = 0;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, j) => {
        const active = j === idx;
        s.classList.toggle('active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    }

    // prev/next fallback
    let prev = carousel.querySelector('.prev');
    let next = carousel.querySelector('.next');

    if (!prev) {
      prev = document.createElement('button');
      prev.className = 'prev';
      prev.type = 'button';
      prev.textContent = '❮';
      carousel.appendChild(prev);
    }
    if (!next) {
      next = document.createElement('button');
      next.className = 'next';
      next.type = 'button';
      next.textContent = '❯';
      carousel.appendChild(next);
    }

    prev.addEventListener('click', () => show(idx - 1));
    next.addEventListener('click', () => show(idx + 1));

    // autoplay
    const autoplay = carousel.dataset.autoplay !== 'false';
    const intervalMs = Number.parseInt(carousel.dataset.interval, 10) || 4500;

    let timer;
    function start() {
      if (!autoplay || slides.length <= 1) return;
      clearInterval(timer);
      timer = setInterval(() => show(idx + 1), intervalMs);
    }
    function stop() {
      clearInterval(timer);
    }

    carousel.addEventListener('pointerenter', stop);
    carousel.addEventListener('pointerleave', start);

    // asegurar carga de img
    slides.forEach(s => {
      const img = s.querySelector('img');
      if (img && !img.complete) {
        img.addEventListener('load', () => {});
      }
    });

    // igualar captions
    function equalizeCaptionHeights() {
      const captions = [...carousel.querySelectorAll('.caption')];
      if (!captions.length) return;

      captions.forEach(c => (c.style.height = 'auto'));
      const max = Math.max(...captions.map(c => c.scrollHeight));
      captions.forEach(c => (c.style.height = `${max}px`));
    }

    // ejecución inicial
    show(idx);
    start();
    setTimeout(equalizeCaptionHeights, 50);

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(equalizeCaptionHeights, 120);
    });
  });

  /* ----------------------------------
     ACORDEÓN ACCESIBLE
  ---------------------------------- */
  document.querySelectorAll('.acordeon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      if (!panel) return;

      const opened = panel.classList.toggle('activo');
      btn.setAttribute('aria-expanded', opened);
      panel.setAttribute('aria-hidden', !opened);
    });
  });

  /* ----------------------------------
     LIGHTBOX / IMAGEN LATERAL
  ---------------------------------- */
  const imagen = document.querySelector('.imagen-lateral');
  if (imagen) {
    imagen.style.cursor = 'zoom-in';

    imagen.addEventListener('click', () => {
      const modalRoot = document.getElementById('image-modal');
      const src = imagen.currentSrc || imagen.src || '';
      const alt = imagen.alt || '';
      const caption = imagen.dataset.caption || alt || '';

      // Caso con modal ya existente
      if (modalRoot) {
        const overlay = modalRoot.querySelector('.image-modal__overlay');
        const closeBtn = modalRoot.querySelector('.image-modal__close');
        const modalImg = modalRoot.querySelector('.image-modal__img');
        const modalCaption = modalRoot.querySelector('.image-modal__caption');

        modalImg.src = src;
        modalImg.alt = alt;
        modalCaption.textContent = caption;
        modalRoot.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (closeBtn) closeBtn.focus();

        const escKey = e => {
          if (e.key === 'Escape') closeHandler();
        };

        const overlayClose = e => {
          if (e.target === overlay) closeHandler();
        };

        function closeHandler() {
          modalRoot.setAttribute('aria-hidden', 'true');
          modalImg.src = '';
          modalCaption.textContent = '';
          document.body.style.overflow = '';
          document.removeEventListener('keydown', escKey);
          overlay.removeEventListener('click', overlayClose);
        }

        overlay.addEventListener('click', overlayClose);
        document.addEventListener('keydown', escKey);

        if (closeBtn) closeBtn.addEventListener('click', closeHandler, { once: true });
      }

      // Modal fallback creado dinámicamente
      else {
        const overlay = document.createElement('div');
        overlay.className = 'img-overlay';
        Object.assign(overlay.style, {
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 9999
        });

        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');

        const modalImg = document.createElement('img');
        modalImg.src = src;
        modalImg.alt = alt;
        Object.assign(modalImg.style, {
          maxWidth: '95%',
          maxHeight: '95%'
        });

        overlay.addEventListener('click', e => {
          if (e.target === overlay) overlay.remove();
        });

        const escKey = e => {
          if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escKey);
          }
        };

        document.addEventListener('keydown', escKey);

        overlay.appendChild(modalImg);
        document.body.appendChild(overlay);
        modalImg.focus();
      }
    });

    // Accesibilidad con teclado
    imagen.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        imagen.click();
      }
    });
  }

  /* ----------------------------------
     AUDIO PLAYER
  ---------------------------------- */
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const muteBtn = document.getElementById('mute');
  const seek = document.getElementById('seek');
  const audioStatus = document.getElementById('audio-status');

  if (audio) {
    // play/pause
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play()
            .then(() => {
              playBtn.textContent = '⏸';
              if (audioStatus) audioStatus.textContent = 'Reproduciendo';
            })
            .catch(err => {
              console.error('play() failed:', err);
              if (audioStatus) audioStatus.textContent = 'Error al reproducir';
            });
        } else {
          audio.pause();
          playBtn.textContent = '►';
          if (audioStatus) audioStatus.textContent = 'Pausado';
        }
      });
    }

    // mute
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? '🔈' : '🔊';
      });
    }

    // barra de progreso
    function updateSeekBg() {
      if (!seek || !audio.duration) return;

      const pct = (audio.currentTime / audio.duration) * 100;
      seek.value = Math.floor(audio.currentTime);
      seek.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--seek-unfilled) ${pct}%)`;
    }

    if (seek) {
      audio.addEventListener('loadedmetadata', () => {
        seek.max = Math.floor(audio.duration) || 0;
        updateSeekBg();
      });

      audio.addEventListener('timeupdate', updateSeekBg);

      seek.addEventListener('input', () => {
        audio.currentTime = seek.value;
        updateSeekBg();
      });

      updateSeekBg();
    }
  }
});
