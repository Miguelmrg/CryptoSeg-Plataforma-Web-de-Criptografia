// Config Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Verifica autenticação e se é PRO
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const nome = user.displayName || user.email.split('@')[0];

    // Atualiza cabeçalho com dropdown
    document.getElementById("user-info-header").innerHTML = `
      <div class="dropdown">
        <button class="dropdown-btn">Olá, ${nome} &#9662;</button>
        <div class="dropdown-content">
          <a href="#" onclick="abrirModal()">Excluir</a>
          <a href="#" onclick="logout()">Sair</a>
        </div>
      </div>
    `;

    // Verifica se conta é PRO
    const isPro = user.displayName && user.displayName.includes("(PRO)");

    if (isPro) {
      document.getElementById("api-container").style.display = "block";
      document.getElementById("pro-required").style.display = "none";
    } else {
      document.getElementById("api-container").style.display = "none";
      document.getElementById("pro-required").style.display = "block";
    }

  } else {
    window.location.href = "auth.html";
  }
});

function logout() {
  firebase.auth().signOut().then(() => window.location.href = "index.html");
}

// Alterna mostrar/ocultar chave
function toggleApiKey() {
  const input = document.getElementById("apiKey");
  input.type = input.type === "password" ? "text" : "password";
}

// Copiar chave com mensagem animada
function copyApiKey() {
  const input = document.getElementById("apiKey");
  input.select();
  input.setSelectionRange(0, 99999); // Para mobile
  document.execCommand("copy");

  // Mensagem "API copiada"
  const msg = document.createElement("div");
  msg.className = "api-copy-msg";
  msg.textContent = "✅ Chave API copiada!";
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

// Toggle sidebar menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

document.addEventListener("click", function(event) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});

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