// Animación simple al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".contenedor");
    contenedor.classList.add("animar");
  
    // Ejemplo de pequeña interactividad:
    // mostrar un mensaje emergente al pasar por la foto
    const foto = document.querySelector(".foto-perfil");
    foto.addEventListener("mouseenter", () => {
      foto.style.transform = "scale(1.05)";
    });
    foto.addEventListener("mouseleave", () => {
      foto.style.transform = "scale(1)";
    });
  });
// Efecto de animación al cargar
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".contenedor");
    contenedor.classList.add("animar");
  
    // Efecto al pasar por la foto
    const foto = document.querySelector(".foto-perfil");
    foto.addEventListener("mouseenter", () => {
      foto.style.transform = "scale(1.05)";
    });
    foto.addEventListener("mouseleave", () => {
      foto.style.transform = "scale(1)";
    });
  
    // --- INTERACTIVIDAD DEL ACORDEÓN ---
    const botones = document.querySelectorAll(".acordeon-btn");
  
    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        const contenido = btn.nextElementSibling;
  
        // Cerrar los demás acordeones
        document.querySelectorAll(".acordeon-contenido").forEach(c => {
          if (c !== contenido) {
            c.classList.remove("activo");
          }
        });
  
        // Alternar visibilidad del actual
        contenido.classList.toggle("activo");
      });
    });
  });
    

   // --- Animación de aparición de las cards ---
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUpZoom 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  cards.forEach(card => observer.observe(card));
  
  // --- Interactividad: clic lleva a página del alumno ---
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-link');
      window.location.href = link;
    });
  });

  // --- CARRUSEL CON EFECTO FADE ---
document.querySelectorAll('.carousel-fade').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  if (slides.length === 0) return;

  const btnNext = carousel.querySelector('.next');
  const btnPrev = carousel.querySelector('.prev');
  let current = 0;
  let intervalId = null;
  const delay = 5000;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, delay);
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // handlers
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  }

  // iniciar
  showSlide(current);
  startAutoplay();

  // opcional: pausar autoplay cuando el mouse esté encima
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
});

// --- LIGHTBOX: ampliar imagen al hacer click ---
function createLightbox() {
  if (document.querySelector('.lightbox-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  const img = document.createElement('img');
  img.className = 'lightbox-img';
  overlay.appendChild(img);

  const btn = document.createElement('button');
  btn.className = 'lightbox-close';
  btn.innerHTML = '✕';
  overlay.appendChild(btn);

  // cerrar al hacer click fuera o en el botón
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === btn) closeLightbox();
  });

  // cerrar con Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  document.body.appendChild(overlay);
}

function openLightbox(src, alt) {
  createLightbox();
  const overlay = document.querySelector('.lightbox-overlay');
  const img = overlay.querySelector('.lightbox-img');
  img.src = src;
  img.alt = alt || '';
  overlay.classList.add('active');
}

function closeLightbox() {
  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  // limpiar src después de la transición para liberar memoria
  setTimeout(() => {
    const img = overlay.querySelector('.lightbox-img');
    if (img) img.src = '';
  }, 200);
}

// añadir listeners a las imágenes del carrusel
document.querySelectorAll('.carousel-fade .slide img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    openLightbox(e.currentTarget.src, e.currentTarget.alt);
  });
});
