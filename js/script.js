// ======================
// Firebase Configuração
// ======================
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// ======================
// Verificar Autenticação
// ======================
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "dashboard.html";
  } else {
    console.log("Usuário não autenticado");
  }
});


function criptografar() {
    const texto = document.getElementById("inputText").value;
    const deslocamento = 5;
    const resultado = texto.replace(/[a-z]/gi, letra => {
      const base = letra === letra.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((letra.charCodeAt(0) - base + deslocamento) % 26) + base);
    });
    document.getElementById("outputText").value = resultado;
  }

  function descriptografar() {
    const texto = document.getElementById("inputText").value;
    const deslocamento = 5;
    const resultado = texto.replace(/[a-z]/gi, letra => {
      const base = letra === letra.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((letra.charCodeAt(0) - base - deslocamento + 26) % 26) + base);
    });
    document.getElementById("outputText").value = resultado;
  }


  const carouselTrack = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-btn');
  const itemWidth = items[0].offsetWidth;
  const totalItems = items.length;

  // Duplicar os itens para efeito de carrossel contínuo
  items.forEach(item => {
    const clone = item.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  let position = 0;
  let scrollInterval;

  function updateCarouselPosition() {
    carouselTrack.style.transition = 'transform 0.5s ease';
    carouselTrack.style.transform = `translateX(-${position}px)`;

    const totalWidth = itemWidth * totalItems;

    // Se chegou ao fim da lista duplicada, reset para início
    if (position >= totalWidth) {
      setTimeout(() => {
        carouselTrack.style.transition = 'none';
        position = 0;
        carouselTrack.style.transform = `translateX(0px)`;
      }, 500);
    }
  }

  function scrollCarouselManual(direction) {
    stopAutoScroll();
    position += direction * itemWidth;

    if (position < 0) {
      position = itemWidth * (totalItems - 1);
    }

    updateCarouselPosition();
  }

  function scrollCarouselAuto() {
    position += itemWidth;
    updateCarouselPosition();
  }

  function startAutoScroll() {
    scrollInterval = setInterval(scrollCarouselAuto, 3000);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  document.querySelector('.carousel-btnscrol.left').addEventListener('click', () => {
    scrollCarouselManual(-1);
  });

  document.querySelector('.carousel-btnscrol.right').addEventListener('click', () => {
    scrollCarouselManual(1);
  });

  window.addEventListener('load', startAutoScroll);


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
  
