// ======================
// Firebase Config
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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const nome = user.displayName || user.email.split('@')[0];

    // Atualiza cabeçalho
    document.getElementById("user-info-header").innerHTML = `
      <div class="dropdown">
        <button class="dropdown-btn">Olá, ${nome} &#9662;</button>
        <div class="dropdown-content">
          <a href="#" onclick="abrirModal()">Excluir</a>
          <a href="#" onclick="logout()">Sair</a>
        </div>
      </div>
    `;

    // Verifica se é PRO
    if (user.displayName && user.displayName.includes("(PRO)")) {
        // Mostra a mensagem de que já é PRO
        const msgPro = document.getElementById("mensagem-pro");
        if (msgPro) msgPro.style.display = "block";

        // Desativa botão de Assinar PRO
        const btnPro = document.getElementById("btnAssinarPro");
        if (btnPro) {
            btnPro.disabled = true;
            btnPro.textContent = "Já é PRO";
            btnPro.style.backgroundColor = "#444";
            btnPro.style.color = "#ccc";
            btnPro.style.cursor = "not-allowed";
        }
    }

  } else {
    window.location.href = "auth.html";
  }
});


function logout() {
  firebase.auth().signOut().then(() => window.location.href = "index.html");
}

// ======================
// SIDEBAR
// ======================
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});

// ======================
// Assinar PRO
// ======================
function assinarPro() {
  const pagamentoDiv = document.getElementById("metodos-pagamento");
  if (pagamentoDiv.style.display === "none") {
    pagamentoDiv.style.display = "block";
  } else {
    pagamentoDiv.style.display = "none"; // permite esconder novamente, se quiser
  }
}

// Simulação de pagamento aceito
function pagamentoAceito() {
  const user = firebase.auth().currentUser;
  if (user) {
    const novoNome = user.displayName && !user.displayName.includes("(PRO)")
      ? `${user.displayName} (PRO)`
      : user.email.split('@')[0] + " (PRO)";

    user.updateProfile({ displayName: novoNome })
      .then(() => {
        // Força recarregar os dados do usuário para pegar o novo displayName atualizado
        return user.reload();
      })
      .then(() => {
        // Atualiza o cabeçalho com o novo nome
        const nomeAtualizado = firebase.auth().currentUser.displayName;
        document.getElementById("user-info-header").innerHTML = `
          <div class="dropdown">
            <button class="dropdown-btn">
              Olá, ${nomeAtualizado} &#9662;
            </button>
            <div class="dropdown-content">
              <a href="#" onclick="logout()">Sair</a>
            </div>
          </div>
        `;

        // Opcional: Esconde métodos de pagamento e botão de assinar
        document.getElementById("metodos-pagamento").style.display = "none";
        showPopup();
      })
      .catch(error => {
        console.error("Erro ao atualizar perfil:", error);
        alert("Erro ao ativar a conta PRO. Tente novamente.");
      });
  } else {
    alert("Usuário não autenticado.");
  }
}

function cancelarPro() {
  const user = firebase.auth().currentUser;
  if (user && user.displayName && user.displayName.includes("(PRO)")) {
    const novoNome = user.displayName.replace(" (PRO)", "");

    user.updateProfile({ displayName: novoNome })
      .then(() => user.reload())
      .then(() => {
        const nomeAtualizado = firebase.auth().currentUser.displayName;
        document.getElementById("user-info-header").innerHTML = `
          <div class="dropdown">
            <button class="dropdown-btn">
              Olá, ${nomeAtualizado} &#9662;
            </button>
            <div class="dropdown-content">
              <a href="#" onclick="logout()">Sair</a>
            </div>
          </div>
        `;

        document.getElementById("mensagem-pro").style.display = "none";

        const btnPro = document.getElementById("btnAssinarPro");
        if (btnPro) {
          btnPro.disabled = false;
          btnPro.textContent = "Assinar PRO";
          btnPro.style.backgroundColor = "#feb32b";
          btnPro.style.color = "#0c1221";
          btnPro.style.cursor = "pointer";
        }

        showCancelProPopup();
      })
      .catch(error => {
        console.error("Erro ao cancelar PRO:", error);
        alert("Erro ao cancelar a conta PRO. Tente novamente.");
      });
  } else {
    alert("Você não está na versão PRO.");
  }
}


function showPopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.style.display = "flex";
}

function hidePopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.style.display = "none";
  location.reload();
}

function showCancelProPopup() {
  const overlay = document.getElementById("popupCancelProOverlay");
  overlay.style.display = "flex";
}

function hideCancelProPopup() {
  const overlay = document.getElementById("popupCancelProOverlay");
  overlay.style.display = "none";
}

// ======================
// Função de Excluir conta
// ======================

function abrirModal() {
  document.getElementById('deleteAccountModal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('deleteAccountModal').style.display = 'none';
  document.getElementById('confirmDeleteCheckbox').checked = false;
  document.getElementById('confirmText').value = '';
}

function confirmarExclusaoConta() {
  const checkbox = document.getElementById('confirmDeleteCheckbox').checked;
  const texto = document.getElementById('confirmText').value.trim();

  if (!checkbox || texto !== "Eu tenho certeza e quero excluir a conta") {
    alert("Por favor, marque a caixa e digite a frase corretamente.");
    return;
  }

  const user = firebase.auth().currentUser;
  if (user) {
    user.delete()
      .then(() => {
        alert("Conta excluída com sucesso. Obrigado e volte sempre!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          alert("Você precisa fazer login novamente para excluir sua conta.");
          firebase.auth().signOut().then(() => window.location.href = "auth.html");
        } else {
          alert("Erro ao excluir conta: " + error.message);
        }
      });
  }
}