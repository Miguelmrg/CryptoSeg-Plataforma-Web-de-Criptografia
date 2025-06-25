<div align="center">
  <h1>
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" alt="Cadeado com Chave" width="45" height="45" />
    CryptoSeg - Plataforma Web de Criptografia
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Key.png" alt="Chave" width="45" height="45" />
  </h1>
</div>

<p align="center">
  <img alt="Linguagem Principal" src="https://img.shields.io/github/languages/top/vrsmarcos26/CryptoSeg-Plataforma-Web-de-Criptografia?style=for-the-badge&color=563D7C">
  <img alt="Licença" src="https://img.shields.io/github/license/vrsmarcos26/CryptoSeg-Plataforma-Web-de-Criptografia?style=for-the-badge&color=blue">
  <img alt="Último Commit" src="https://img.shields.io/github/last-commit/vrsmarcos26/CryptoSeg-Plataforma-Web-de-Criptografia?style=for-the-badge&color=green">
</p>

<p align="center">
  Uma plataforma web completa para criptografia, com autenticação de usuários via Firebase e uma API dedicada em FastAPI. Inspirado em plataformas como ChatGPT e VirusTotal, o projeto une design moderno e funcionalidades robustas.
</p>

<p align="center">
  <a href="#-visão-geral">Visão Geral</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-como-executar-localmente">Como Executar</a> •
  <a href="#-créditos-e-agradecimentos">Créditos</a>
</p>

---

### ✨ Visão Geral

O **CryptoSeg** é uma plataforma web criada para a matéria de Desenvolvimento Web, com o objetivo de oferecer um ambiente intuitivo e seguro para a utilização de diversos algoritmos criptográficos. O sistema conta com uma interface de usuário moderna, autenticação gerenciada pelo Firebase e uma API RESTful de backend construída com FastAPI para processar as operações criptográficas.

---

### 🚀 Funcionalidades

#### Autenticação de Usuário
-   **Cadastro e Login Seguros:** Autenticação completa com e-mail e senha, gerenciada pelo **Firebase Authentication**.
-   **Recuperação de Senha:** Funcionalidade "Esqueci minha senha" com envio de link de redefinição por e-mail.

#### Ferramentas de Criptografia e Codificação
-   **Cifras Clássicas:** Cifra de César (disponível para todos) e Cifra de Vigenère.
-   **Cifras Simétricas Modernas:** AES (Advanced Encryption Standard).
-   **Cifras Assimétricas:** RSA, com geração de par de chaves diretamente no navegador.
-   **Algoritmos de Hash:** MD5, SHA-1, SHA-256 e SHA-512.
-   **Esquemas de Codificação:** Base64, Base32, Binário e Hexadecimal.

#### Versão PRO e Acesso via API
-   **Assinatura PRO:** Sistema de upgrade para uma versão PRO, desbloqueando acesso à API.
-   **API RESTful:** Usuários PRO recebem uma chave de API para consumir as funcionalidades de forma programática. A API é documentada via Swagger UI.

---

### 🛠️ Tecnologias Utilizadas

O projeto é dividido em Frontend, Backend e Serviços, utilizando um ecossistema de tecnologias moderno.

#### **Frontend**
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript">
</p>

#### **Backend (API)**
<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/PyCryptodome-a1a1a1?style=for-the-badge" alt="PyCryptodome">
</p>

#### **Infraestrutura e Serviços**
<p>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Railway-0B0D12?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
</p>

---

### 🏗️ Arquitetura

O sistema foi projetado com uma arquitetura desacoplada:

-   **Frontend (Client-Side):** Uma aplicação estática (HTML, CSS, JS) que roda no navegador do usuário. Comunica-se com o Firebase para autenticação e com a API de backend para operações criptográficas.
-   **Backend (API RESTful):** Uma API construída com FastAPI e hospedada no Railway. Lida com a lógica criptográfica e é protegida por autenticação via chave de API.

> A documentação completa do projeto, incluindo diagramas de caso de uso, diagramas de fluxo e wireframes, está disponível na pasta `/pdfs`.

---

### ⚙️ Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

#### **Pré-requisitos**
* Navegador web moderno (Chrome, Firefox, etc.).
* Python 3.8+ e `pip`.
* Uma conta e um projeto configurado no **Firebase**.

#### **🖥️ Configuração do Frontend**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/vrsmarcos26/CryptoSeg-Plataforma-Web-de-Criptografia.git](https://github.com/vrsmarcos26/CryptoSeg-Plataforma-Web-de-Criptografia.git)
    cd CryptoSeg-Plataforma-Web-de-Criptografia
    ```
2.  **Configure o Firebase:**
    Nos arquivos do diretório `js/` (como `auth.js`, `api.js`), substitua o objeto `firebaseConfig` pelas credenciais do seu projeto:
    ```javascript
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_AUTH_DOMAIN",
      projectId: "SEU_PROJECT_ID",
      // ... outras chaves
    };
    ```
3.  **Execute a Aplicação:**
    Abra o arquivo `index.html` diretamente em seu navegador.

#### **🚀 Configuração da API de Backend**

1.  **Navegue até o diretório da API:**
    ```bash
    cd crypto_api
    ```
2.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Execute o servidor da API:**
    ```bash
    uvicorn main:app --reload
    ```
    A API estará rodando em `http://127.0.0.1:8000`. A documentação interativa (Swagger UI) pode ser acessada em `http://127.0.0.1:8000/docs`.

---

### 📂 Estrutura do Projeto

```
├── css/
│   └── (Arquivos de estilo)
├── js/
│   ├── auth.js         # Lógica de autenticação com Firebase
│   ├── api.js          # Lógica de chamada para a API
│   └── ...
├── pdfs/
│   └── (Documentação e diagramas do projeto)
├── crypto_api/
│   ├── utils/          # Módulos com algoritmos criptográficos
│   ├── main.py         # Arquivo principal da API FastAPI
│   └── requirements.txt
└── *.html              # Páginas principais do site
```

---

### 🙌 Créditos e Agradecimentos

-   Projeto desenvolvido para a disciplina de **Desenvolvimento Web**.
-   UI/UX inspirado em plataformas de tecnologia de ponta como **ChatGPT**, **VirusTotal** e **Cryptohack**.
-   Agradecimentos aos professores e colegas que apoiaram o desenvolvimento.

<hr>

<p align="center">
  Desenvolvido por <b>vrsmarcos26</b>
</p>
