## Digimons API

### Introdução

Este documento descreve a aplicação que consome uma API externa para obter dados de Digimons, armazena esses dados em um banco de dados MongoDB e fornece endpoints para recuperar esses dados. A aplicação utiliza padrões de design como Strategy e MVC.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que facilita a criação de APIs RESTful.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP baseado em Promises para realizar requisições à API externa.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **Docker Compose**: Ferramenta para definir e gerenciar multi-containers Docker.
- **Swagger e Swagger-UI**: Ferramenta para documentar e testar o projeto.

### Pré-requisitos

- Node.js v18 ou superior
- Docker
- Docker Compose

### Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes informações de exemplo:

   ```env
   EXPRESS_PORT=3000
   MONGO_USER=root
   MONGO_PASSWORD=senhasecreta1234
   ```

### Para rodar a aplicação:

1. Construa e inicie os containers Docker:

   ```bash
   docker compose up -d --build
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Compile a aplicação:

   ```bash
   npm run build
   ```

4. Inicie a aplicação:

   ```bash
   npm run start
   ```

5. Acesse a aplicação no navegador: ( lembre-se da configuração do .env )

   ```
   http://localhost:3000
   ```

6. A documentação da API está disponível no Swagger:

   ```
   http://localhost:3000/api-docs
   ```
