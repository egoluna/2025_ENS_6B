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

// --- CARRUSELES INDEPENDIENTES ---
document.querySelectorAll('.carousel-fade').forEach(carousel => {
  let slides = carousel.querySelectorAll('.slide');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === idx) slide.classList.add('active');
    });
  }

  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  }

  // Mostrar la primera slide al cargar

  showSlide(current);
});

// --- MODAL PARA AMPLIAR IMÁGENES DE CARRUSELES ---
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

// Abrir modal al hacer click en imágenes del carrusel
document.querySelectorAll('.carousel-img').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('active');
    modalImg.src = img.src;
  });
});

// Cerrar modal al hacer click en la X
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Cerrar modal al hacer click fuera de la imagen
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
  }
});