## Documentação do Teste Técnico - Digimons API

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
- **Swagger e Swagger-UI**: Ferramenta para doumentar e testar o projeto.

### #Pré requisitos

- Node v18 ou superior
- Docker
- Docker compose

### Para rodar a aplicação:

1. docker compose up -d --build

2. npm run build

3. npm run start

4. Acesse: http://localhost:3000