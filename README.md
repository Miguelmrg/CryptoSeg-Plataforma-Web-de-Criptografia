# CryptoSeg: Plataforma Web de Criptografia

O CryptoSeg é uma plataforma web completa para criptografia e descriptografia de textos, desenvolvida como um projeto para a matéria de Desenvolvimento Web. Inspirado pelo design e pelas paletas de cores de plataformas de tecnologia de ponta como ChatGPT, VirusTotal e Cryptohack, o CryptoSeg oferece uma interface intuitiva e amigável para explorar e utilizar diversos algoritmos criptográficos.

A plataforma é construída com um sistema de autenticação de usuários seguro, desenvolvido com Firebase, e conta com uma API dedicada, criada com FastAPI e hospedada no Railway.

## **Índice**

- [**Funcionalidades**](#funcionalidades)
- [**Tecnologias Utilizadas**](#tecnologias-utilizadas)
- [**Arquitetura do Sistema**](#arquitetura-do-sistema)
- [**Como Começar**](#como-começar)
- [**Estrutura do Projeto**](#estrutura-do-projeto)
- [**Agradecimentos**](#agradecimentos)

## **Funcionalidades**

### **Autenticação de Usuário**

* **Cadastro e Login Seguros:** Usuários podem criar uma conta ou fazer login usando e-mail e senha, com todos os processos de autenticação gerenciados de forma segura pelo Firebase Authentication.
* **Recuperação de Senha:** Uma funcionalidade de "Esqueci minha senha" permite que os usuários redefinam suas senhas por e-mail.

### **Ferramentas de Criptografia**

O CryptoSeg oferece uma vasta gama de ferramentas criptográficas disponíveis para usuários cadastrados, incluindo:

* **Cifras Simétricas:**
    * AES (Advanced Encryption Standard)
* **Cifras Assimétricas:**
    * RSA, com geração de par de chaves no navegador
* **Cifras Clássicas:**
    * Cifra de César (disponível para todos os usuários, incluindo visitantes)
    * Cifra de Vigenère
* **Algoritmos de Hash:**
    * MD5
    * SHA-1
    * SHA-256
    * SHA-512
* **Esquemas de Codificação:**
    * Base64 & Base32
    * Binário & Hexadecimal

### **Versão PRO e Acesso à API**

* **Assinatura PRO:** Usuários podem fazer um upgrade para a versão PRO para desbloquear funcionalidades premium.
* **API RESTful:** Usuários PRO recebem uma chave de API exclusiva para acessar as funcionalidades do CryptoSeg de forma programática. A API é documentada com Swagger UI.

## **Tecnologias Utilizadas**

### **Frontend**

* **HTML5**
* **CSS3:** Estilizado com uma interface moderna e de tema escuro.
* **JavaScript (ES6+):** Responsável por todas as interações dinâmicas e operações criptográficas no lado do cliente.

### **Backend (API)**

* **Python 3**
* **FastAPI:** Serve como o framework principal para a construção da API RESTful.
* **PyCryptodome:** A biblioteca que alimenta as funções criptográficas da API.
* **Uvicorn:** O servidor ASGI usado para rodar a aplicação FastAPI.

### **Serviços**

* **Firebase:**
    * **Authentication:** Gerencia todo o sistema de login e cadastro de usuários.
* **Railway:** A plataforma utilizada para o deploy e hospedagem da API de backend.

## **Arquitetura do Sistema**

O projeto foi arquitetado com uma separação entre o frontend e o backend:

* O **frontend** é uma aplicação do lado do cliente com a qual os usuários interagem em seus navegadores. Para visitantes, ele oferece acesso à Cifra de César. Após o login, ele se comunica com o Firebase para autenticação e com a API de backend para operações criptográficas avançadas.
* O **backend** é uma API RESTful construída com FastAPI. Ele lida com toda a lógica criptográfica complexa e é protegido por um middleware de autenticação por chave de API.

O design do projeto é detalhado nos documentos de desenvolvimento fornecidos:
* Diagrama de Caso de Uso
* Diagrama de Fluxo
* Wireframes e Protótipos

## **Como Começar**

Para obter uma cópia local e executá-la, siga estes passos.

### **Pré-requisitos**

* Um navegador web moderno.
* Python 3.8+ e `pip` para a API de backend.
* Um projeto Firebase para o sistema de autenticação.

### **Configuração do Frontend**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/CryptoSeg.git](https://github.com/SEU_USUARIO/CryptoSeg.git)
    cd CryptoSeg
    ```
2.  **Configure o Firebase:**
    Abra os arquivos JavaScript localizados no diretório `js/` (`api.js`, `auth.js`, etc.) e substitua o objeto `firebaseConfig` de placeholder pelas credenciais reais do seu projeto Firebase.
    ```javascript
    const firebaseConfig = {
        apiKey: "SUA_API_KEY",
        // ... outras chaves
    };
    ```
3.  **Execute a aplicação:**
    Abra o arquivo `index.html` em seu navegador.

### **Configuração da API de Backend**

1.  **Navegue até o diretório da API:**
    ```bash
    cd crypto_api
    ```
2.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Defina sua Chave de API:**
    Abra o arquivo `main.py` e substitua `"SUA_CHAVE_SECRETA_DA_API"` por uma chave segura e gerada aleatoriamente.
4.  **Execute o servidor da API:**
    ```bash
    uvicorn main:app --reload
    ```
    A API estará disponível em `http://127.0.0.1:8000`. Você pode acessar a documentação do Swagger em `http://127.0.0.1:8000/docs`.

## **Estrutura do Projeto**

O projeto está organizado nos seguintes diretórios principais:

* **`/`**: Contém todos os arquivos HTML das páginas do site.
* **`css/`**: Todos os arquivos CSS para a estilização das diferentes páginas.
* **`js/`**: Arquivos JavaScript responsáveis pela lógica do frontend.
* **`pdfs/`**: Documentação do projeto, incluindo diagramas e requisitos.
* **`crypto_api/`**: A aplicação de backend FastAPI.
    * **`utils/`**: Módulos Python com as implementações dos algoritmos criptográficos.
    * **`main.py`**: O arquivo principal da aplicação FastAPI, que define os endpoints da API.

## **Agradecimentos**

* Este projeto foi criado para a disciplina de Desenvolvimento Web.
* O design de UI/UX foi inspirado em plataformas líderes do setor, como **ChatGPT**, **VirusTotal** e **Cryptohack**.
* Agradecimentos especiais aos instrutores do curso e aos colaboradores que contribuíram para o desenvolvimento do projeto.
