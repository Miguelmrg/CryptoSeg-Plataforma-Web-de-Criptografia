document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("active");
  });

  document.addEventListener("click", function(event) {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
  
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
  
    if (!isClickInsideSidebar && !isClickOnToggle) {
      sidebar.classList.remove("active");
    }
  });  

  function showPopup() {
    const overlay = document.getElementById("popupOverlay");
    overlay.style.display = "flex";
  
    // Adiciona o ouvinte só quando o popup abre
    setTimeout(() => {
      overlay.addEventListener("click", outsidePopupClick);
    }, 10); // pequeno delay para não fechar imediatamente após o clique
  }
  
  function hidePopup() {
    const overlay = document.getElementById("popupOverlay");
    overlay.style.display = "none";
    overlay.removeEventListener("click", outsidePopupClick);
  }
  
  function outsidePopupClick(event) {
    const popup = document.querySelector(".popup");
    if (!popup.contains(event.target)) {
      hidePopup();
    }
  }

    // Ativar item do sumário com base no scroll
    const sections = document.querySelectorAll(".box");
    const menuLinks = document.querySelectorAll(".sumario a");

    window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
        }
    });

    menuLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
        }
    });
    });
