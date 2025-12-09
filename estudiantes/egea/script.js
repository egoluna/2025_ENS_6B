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

// --- AMPLIAR IMAGEN DEL CARRUSEL EN MODAL ---
document.querySelectorAll('.carousel-fade .slide img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function() {
    const modal = document.getElementById('modal-imagen');
    const modalImg = document.getElementById('img-ampliada');
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    modal.classList.add('activo');
  });
});

document.querySelector('.cerrar-modal').addEventListener('click', function() {
  document.getElementById('modal-imagen').classList.remove('activo');
});

document.getElementById('modal-imagen').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('activo');
  }
});

// --- Descripciones para "Mis series favoritas" ---
document.addEventListener('DOMContentLoaded', () => {
  const textos = {
    arcane: 'Arcane: Orígenes y conflictos entre Piltover y Zaun a través de la relación entre Vi y Jinx. Animación cuidada y una historia emocional sobre poder y familia.',
    lastofus: 'The Last of Us: Adaptación posapocalíptica que sigue a Joel y Ellie en un viaje peligroso, explorando supervivencia, dolor y dilemas morales.',
    atypical: 'Atypical: La historia de Sam, un joven en el espectro autista, que busca independencia y amor; mezcla de humor y momentos emotivos sobre crecer.',
    stranger: 'Stranger Things: Ciencia ficción y terror ochentoso donde un grupo de chicos enfrenta fenómenos sobrenaturales y una niña con habilidades especiales.'
  };

  const imgs = document.querySelectorAll('.galeria-series img');
  const cont = document.querySelector('.descripcion-serie');
  if (!imgs.length || !cont) return;

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      // alternar visibilidad si se clickea la misma imagen
      const key = img.dataset.serie;
      const texto = textos[key] || 'Descripción no disponible.';
      const already = img.classList.contains('seleccionada');

      // limpiar selección previa
      imgs.forEach(i => i.classList.remove('seleccionada'));

      if (already) {
        cont.classList.remove('visible');
        cont.innerHTML = '';
      } else {
        img.classList.add('seleccionada');
        cont.innerHTML = `<p>${texto}</p>`;
        cont.classList.add('visible');
        // opcional: desplazar la vista para que se vea la descripción
        cont.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});