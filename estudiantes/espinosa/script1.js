document.addEventListener("DOMContentLoaded", () => {

    //ANIMACIÓN AL CARGAR 
    const contenedor = document.querySelector(".contenedor");
    if (contenedor) contenedor.classList.add("animar");


    // --- EFECTO AL PASAR POR LA FOTO ---
    const foto = document.querySelector(".foto-perfil");
    if (foto) {
        foto.addEventListener("mouseenter", () => {
            foto.style.transform = "scale(1.05)";
        });
        foto.addEventListener("mouseleave", () => {
            foto.style.transform = "scale(1)";
        });
    }


    //INTERACTIVIDAD DEL ACORDEÓN
    const botones = document.querySelectorAll(".acordeon-btn");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const contenido = btn.nextElementSibling;

            // Cerrar los demás
            document.querySelectorAll(".acordeon-contenido").forEach(c => {
                if (c !== contenido) {
                    c.classList.remove("activo");
                    c.style.maxHeight = null;
                }
            });

            // Abrir/cerrar AL APRETAR
            if (contenido.classList.contains("activo")) {
                contenido.classList.remove("activo");
                contenido.style.maxHeight = null;
            } else {
                contenido.classList.add("activo");
                contenido.style.maxHeight = contenido.scrollHeight + "px";
            }
        });
    });


    //CAMBIO DE IMAGEN 
    const imagen = document.querySelector(".foto-perfil");
    const botonCambiar = document.querySelector("#cambiar-foto");

    if (imagen && botonCambiar) {

        const imagenes = [
            "perfil1.jpg",
            "perfil2.jpg"
        ];

        let indice = 0;

        botonCambiar.addEventListener("click", () => {
            indice = (indice + 1) % imagenes.length;
            imagen.src = imagenes[indice];
        });
    }

});





  
    document.addEventListener("DOMContentLoaded", () => {
      let slides = document.querySelectorAll(".slide");
      let currentIndex = 0;

      const prevBtn = document.querySelector(".prev");
      const nextBtn = document.querySelector(".next");

      function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
      }

      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });

      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });

      // Auto-slide
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }, 8000);

      // ACORDEÓN
      const botones = document.querySelectorAll(".acordeon-btn");

      botones.forEach(btn => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("activo");

          let contenido = btn.nextElementSibling;

          if (btn.classList.contains("activo")) {
            contenido.style.maxHeight = contenido.scrollHeight + "px";
          } else {
            contenido.style.maxHeight = 0;
          }
        });
      });
    });
  
