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
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

// Cambio automático cada 5 segundos
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}, 8000);
