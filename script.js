// GRUPO 8 - ARTHUR PALUDO, MARCOS ENGELMANN, IGOR THOMAS, MAURO LEITE

document.addEventListener("DOMContentLoaded", () => {
  const navbarScroll = document.querySelector(".navbar-scroll");
  const toggleTopo = document.querySelector(".toggle-topo");
  const toggleScroll = document.querySelector(".toggle-scroll");
  const menuTopo = document.querySelector(".menu-mobile-topo");
  const menuScroll = document.querySelector(".menu-mobile-scroll");

  // Mostrar navbar-scroll ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      navbarScroll.classList.add("active");
    } else {
      navbarScroll.classList.remove("active");
    }
  });

  // Menu hamburguer - topo
  toggleTopo?.addEventListener("click", () => {
    const visible = menuTopo.style.display === "flex";
    menuTopo.style.display = visible ? "none" : "flex";
    menuScroll.style.display = "none";
  });

  // Menu hamburguer - scroll
  toggleScroll?.addEventListener("click", () => {
    const visible = menuScroll.style.display === "flex";
    menuScroll.style.display = visible ? "none" : "flex";
    menuTopo.style.display = "none";
  });

  // Fechar ambos os menus ao clicar em link
  document.querySelectorAll(".menu-mobile a").forEach(link => {
    link.addEventListener("click", () => {
      menuTopo.style.display = "none";
      menuScroll.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const carrossel = document.getElementById("carrossel");

  let slides = document.querySelectorAll(".slide");
  let visibleSlides = getVisibleSlides();
  const totalSlides = slides.length;
  let currentIndex = visibleSlides;
  let isTransitioning = false;

  function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    return 3;
  }

  function setupClones() {
    for (let i = 0; i < visibleSlides; i++) {
      const firstClone = slides[i].cloneNode(true);
      const lastClone = slides[slides.length - 1 - i].cloneNode(true);

      firstClone.classList.add("clone");
      lastClone.classList.add("clone");

      carrossel.appendChild(firstClone);
      carrossel.insertBefore(lastClone, carrossel.firstChild);
    }

    slides = document.querySelectorAll(".slide");
  }

  function updateCarousel(instant = false) {
    const slideWidth = slides[0].offsetWidth + 20;
    carrossel.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
    carrossel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function autoSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();

    carrossel.addEventListener("transitionend", () => {
      if (slides[currentIndex]?.classList.contains("clone")) {
        currentIndex = visibleSlides;
        updateCarousel(true);
      }
      isTransitioning = false;
    }, { once: true });
  }

  setupClones();
  updateCarousel(true);
  setInterval(autoSlide, 5000);

  window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    currentIndex = visibleSlides;
    updateCarousel(true);
  });
});
