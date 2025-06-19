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
    document.getElementById("user-info-header").innerHTML = `
      <div class="dropdown">
        <button class="dropdown-btn">Olá, ${nome} &#9662;</button>
        <div class="dropdown-content">
          <a href="#" onclick="abrirModal()">Excluir</a>
          <a href="#" onclick="logout()">Sair</a>
        </div>
      </div>
    `;
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
// Criptografia dinâmica
// ======================
let algoritmoAtual = 'cesar';
let rsaKeys;

const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const titulo = document.getElementById("algoritmoTitulo");
const senhaCampo = document.getElementById("senhaCampo");
const rsaSection = document.getElementById("rsa-section");

const titulos = {
  cesar: "Cifra de César",
  base64: "Base64",
  base32: "Base32",
  vigenere: "Cifra de Vigenère",
  hash: "Hash (SHA-256)",
  aes: "AES (Simétrica)",
  rsa: "RSA (Assimétrica)",
  md5: "MD5",
  binario: "Binário",
  sha1: "SHA-1",
  sha512: "SHA-512",
  hex: "HEX"
};

function selecionarAlgoritmo(nome) {
  algoritmoAtual = nome;
  titulo.textContent = titulos[nome] || "Criptografia";
  input.value = "";
  output.value = "";

  const precisaSenha = ["aes", "vigenere"];
  senhaCampo.style.display = precisaSenha.includes(nome) ? "block" : "none";
  rsaSection.style.display = nome === "rsa" ? "block" : "none";
}

function criptografar() {
  const texto = input.value;
  const senha = senhaCampo.value || "segredo";

  switch (algoritmoAtual) {
    case "cesar": return criptografarCesar(texto);
    case "base64": return output.value = btoa(texto);
    case "base32": return output.value = criptografarBase32(texto);
    case "vigenere": return output.value = criptografarVigenere(texto, senha);
    case "hash": return gerarHash(texto);
    case "aes": return criptografarAES(texto, senha);
    case "rsa": return criptografarRSA(texto);
    case "binario": return output.value = textoParaBinario(texto);
    case "hex": return output.value = textoParaHexadecimal(texto);
    case "md5": return gerarMD5(texto);
    case "sha1": return gerarSHA1(texto);
    case "sha512": return gerarSHA512(texto);
    default: output.value = "Algoritmo não disponível.";
  }
}

function descriptografar() {
  const texto = input.value;
  const senha = senhaCampo.value || "segredo";

  switch (algoritmoAtual) {
    case "cesar": return descriptografarCesar(texto);
    case "base64": return output.value = safeAtob(texto);
    case "base32": return output.value = descriptografarBase32(texto);
    case "vigenere": return output.value = descriptografarVigenere(texto, senha);
    case "hash": return output.value = "Hashes não podem ser descriptografados.";
    case "aes": return descriptografarAES(texto, senha);
    case "rsa": return descriptografarRSA(texto);
    case "binario": return output.value = binarioParaTexto(texto);
    case "hex": return output.value = hexadecimalParaTexto(texto);
    case "md5":
    case "sha1":
    case "sha512":
      return output.value = "Este algoritmo não pode ser descriptografado.";
    default: output.value = "Algoritmo não disponível.";
  }
}

function safeAtob(texto) {
  try {
    return atob(texto);
  } catch {
    return "Texto inválido!";
  }
}

// ===== Utilitários
function textoParaBinario(texto) {
  return texto.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}
function binarioParaTexto(bin) {
  return bin.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
}
function textoParaHexadecimal(texto) {
  return texto.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}
function hexadecimalParaTexto(hex) {
  let r = '';
  for (let i = 0; i < hex.length; i += 2) r += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return r;
}

// ===== Cifra de César
function criptografarCesar(texto) {
  const deslocamento = 5;
  output.value = texto.replace(/[a-z]/gi, letra => {
    const base = letra === letra.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((letra.charCodeAt(0) - base + deslocamento) % 26) + base);
  });
}
function descriptografarCesar(texto) {
  const deslocamento = 5;
  output.value = texto.replace(/[a-z]/gi, letra => {
    const base = letra === letra.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((letra.charCodeAt(0) - base - deslocamento + 26) % 26) + base);
  });
}

// ===== Vigenère
function criptografarVigenere(texto, chave) {
  let r = "", j = 0;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (/[a-zA-Z]/.test(c)) {
      const base = c === c.toUpperCase() ? 65 : 97;
      const k = chave.charCodeAt(j % chave.length) - base;
      r += String.fromCharCode((c.charCodeAt(0) - base + k + 26) % 26 + base);
      j++;
    } else r += c;
  }
  return r;
}
function descriptografarVigenere(texto, chave) {
  let r = "", j = 0;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (/[a-zA-Z]/.test(c)) {
      const base = c === c.toUpperCase() ? 65 : 97;
      const k = chave.charCodeAt(j % chave.length) - base;
      r += String.fromCharCode((c.charCodeAt(0) - base - k + 26) % 26 + base);
      j++;
    } else r += c;
  }
  return r;
}

// ===== SHA-256
function gerarHash(texto) {
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto)).then(buf => {
    const arr = Array.from(new Uint8Array(buf));
    output.value = arr.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

// ===== Base32 (RFC 4648 com suporte UTF-8)
const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function encodeBase32(input) {
  const bytes = new TextEncoder().encode(input);
  let output = "";
  let buffer = 0;
  let bitsLeft = 0;

  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bitsLeft += 8;

    while (bitsLeft >= 5) {
      const index = (buffer >> (bitsLeft - 5)) & 31;
      output += base32Alphabet[index];
      bitsLeft -= 5;
    }
  }

  if (bitsLeft > 0) {
    const index = (buffer << (5 - bitsLeft)) & 31;
    output += base32Alphabet[index];
  }

  while (output.length % 8 !== 0) {
    output += '=';
  }

  return output;
}

function decodeBase32(base32) {
  const cleanInput = base32.replace(/=+$/, '').toUpperCase();
  const bytes = [];
  let buffer = 0;
  let bitsLeft = 0;

  for (const char of cleanInput) {
    const val = base32Alphabet.indexOf(char);
    if (val === -1) continue;

    buffer = (buffer << 5) | val;
    bitsLeft += 5;

    if (bitsLeft >= 8) {
      bytes.push((buffer >> (bitsLeft - 8)) & 0xff);
      bitsLeft -= 8;
    }
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

function criptografarBase32(texto) {
  return encodeBase32(texto);
}

function descriptografarBase32(texto) {
  try {
    return decodeBase32(texto);
  } catch {
    return "Base32 inválido!";
  }
}


// ===== AES
async function criptografarAES(texto, senha) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(senha.padEnd(16, "_")), { name: "AES-CBC" }, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, enc.encode(texto));
  output.value = btoa(String.fromCharCode(...iv) + String.fromCharCode(...new Uint8Array(encrypted)));
}
async function descriptografarAES(texto, senha) {
  try {
    const bin = atob(texto);
    const iv = new Uint8Array([...bin].slice(0, 16).map(c => c.charCodeAt(0)));
    const data = new Uint8Array([...bin].slice(16).map(c => c.charCodeAt(0)));
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(senha.padEnd(16, "_")), { name: "AES-CBC" }, false, ["decrypt"]);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
    output.value = new TextDecoder().decode(decrypted);
  } catch {
    output.value = "Erro ao descriptografar AES.";
  }
}

// ===== RSA
async function gerarChavesRSA() {
  rsaKeys = await crypto.subtle.generateKey({ name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["encrypt", "decrypt"]);
  const pubKey = await crypto.subtle.exportKey("spki", rsaKeys.publicKey);
  const privKey = await crypto.subtle.exportKey("pkcs8", rsaKeys.privateKey);
  document.getElementById("chavePublica").value = btoa(String.fromCharCode(...new Uint8Array(pubKey)));
  document.getElementById("chavePrivada").value = btoa(String.fromCharCode(...new Uint8Array(privKey)));
}

async function criptografarRSA(texto) {
  const chave = document.getElementById("chaveInput").value.trim();
  if (!chave) return output.value = "Chave pública necessária.";
  const binary = Uint8Array.from(atob(chave), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("spki", binary, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
  const cifrado = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, new TextEncoder().encode(texto));
  output.value = btoa(String.fromCharCode(...new Uint8Array(cifrado)));
}

async function descriptografarRSA(texto) {
  const chave = document.getElementById("chaveInput").value.trim();
  if (!chave) return output.value = "Chave privada necessária.";
  const binary = Uint8Array.from(atob(chave), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", binary, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);
  const bin = Uint8Array.from(atob(texto), c => c.charCodeAt(0));
  const decifrado = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, bin);
  output.value = new TextDecoder().decode(decifrado);
}

// ===== MD5 / SHA1 / SHA512 (CryptoJS)
function gerarMD5(texto) {
  output.value = CryptoJS.MD5(texto).toString(CryptoJS.enc.Hex);
}
function gerarSHA1(texto) {
  output.value = CryptoJS.SHA1(texto).toString(CryptoJS.enc.Hex);
}
function gerarSHA512(texto) {
  output.value = CryptoJS.SHA512(texto).toString(CryptoJS.enc.Hex);
}

// ======================
// Carrossel automático contínuo
// ======================
const carouselTrack = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-btn');
const itemWidth = items[0].offsetWidth;
const totalItems = items.length;

items.forEach(item => carouselTrack.appendChild(item.cloneNode(true)));

let position = 0;
let scrollInterval;

function updateCarouselPosition() {
  carouselTrack.style.transition = 'transform 0.5s ease';
  carouselTrack.style.transform = `translateX(-${position}px)`;
  const totalWidth = itemWidth * totalItems;
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
  if (position < 0) position = itemWidth * (totalItems - 1);
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

document.querySelector('.carousel-btnscrol.left').addEventListener('click', () => scrollCarouselManual(-1));
document.querySelector('.carousel-btnscrol.right').addEventListener('click', () => scrollCarouselManual(1));
window.addEventListener('load', startAutoScroll);

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

