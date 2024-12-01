
# Teste técnico backend 🏔️

A aplicação é um backend com foco na manipulação de dados de usuários e deverá ser capaz de realizar as seguintes operações:

- criar um usuário na base de dados
- atualizar o perfil do usuário na base
- buscar e retornar usuários da base de dados
- filtrar usuários por qualquer atributo

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar a Aplicação](#como-rodar-a-aplicação)
- [Documentação da API](#documentação-da-api)
- [Endpoints](#endpoints)
- [Como Contribuir](#como-contribuir)
- [Próximos Passos](#possíveis-melhorias)

## Tecnologias Utilizadas

- **Linguagem de Programação**: Node.js (versão 18.X.X) + TypeScript
- **Serviços AWS**: Lambda / APIGateway / DynamoDB
- **Framework/Plataforma**: Middy / DynamoDB OneTable / Serverless Framework
- **Ferramentas de Build**: npm

## Como Rodar a Aplicação

### Pré-requisitos

Certifique-se de ter os seguintes programas instalados em sua máquina:

- [Node.js](https://nodejs.org) - Versão 18.X.X
- [npm](https://www.npmjs.com)
- [docker](https://www.docker.com/)


### Passo a Passo para Configuração Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/jeffsantoss/developertest.git
   ```

2. **Instale as dependências**:
   No diretório do projeto, execute:
   ```bash
   cd developertest
   npm install
   ```

3. **Rodar a aplicação**:
   Para rodar a aplicação localmente, execute:
   ```bash
   npm run start:all
   ```

4. **Acesse a aplicação**:
   A API estará em execução em [http://localhost:3000](http://localhost:3000)

5. **Visualize os Dados**:
   Abra seu navegador e vá para [Console DynamoDB](http://localhost:8001) para visualizar os dados persistidos.

## Documentação da API para testar a aplicação na nuvem (AWS)

A documentação completa da API está disponível no Postman. Você pode acessar as coleções de endpoints da API, incluindo detalhes sobre os métodos, parâmetros, e exemplos de respostas, no seguinte link:

- [Documentação da API no Postman](https://documenter.getpostman.com/view/2057801/2sAYBYepV5)

## Endpoints

Antes de utilizar os endpoints, configure o valor de `{{baseUrl}}` de acordo com o ambiente desejado:

- **Ambiente local:** `http://localhost:3000`
- **Ambiente dev:** `https://gjlytlxcv9.execute-api.us-east-1.amazonaws.com`

Basta substituir `{{baseUrl}}` pelo URL correspondente.

### 1. **Criar Usuário**
**Descrição:** Cria um novo usuário no sistema.

- **Método:** `POST`
- **URL:** `{{baseUrl}}/users`
- **Body:** 
  ```json
  {
      "name": "Jefferson",
      "email": "jefferson.npng1@gmail.com",
      "role": "admin",
      "password": "abcD/123"
  }
  ```

---

### 2. **Atualizar Usuário (PATCH)**
**Descrição:** Atualiza informações de um usuário específico.

- **Método:** `PATCH`
- **URL:** `{{baseUrl}}/users/4416f353-aa7a-4ee4-b467-bfb976ba6539`
- **Body:**
  ```json
  {
      "role": "client",
      "name": "Jefferson Updated"
  }
  ```
---

### 3. **Buscar Usuário por ID**
**Descrição:** Recupera as informações de um usuário específico pelo ID.

- **Método:** `GET`
- **URL:** `{{baseUrl}}/users/4416f353-aa7a-4ee4-b467-bfb976ba6539`

---

### 4. **Listar Todos os Usuários**
**Descrição:** Recupera uma lista de usuários com base em critérios de filtro.

- **Método:** `GET`
- **URL:** `{{baseUrl}}/users?name=Jefferson&role=admin`

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch com a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -am 'Adicionando nova feature'
   ```
4. Envie para o repositório:
   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request.

## Próximos Passos

- [**WIP**] Implementar testes unitários e integrados com [exemplo: Jest, Mocha]
- [ ] Adicionar autenticação de usuários (exemplo: OAuth2 com JWT - Cognito?)
- [ ] Paginação na rota para filtrar os usuários
- [ ] Adicionar correlation id e estruturar logs para troubleshooting mais eficiente
- [ ] Observabilidade
- [ ] Criar domínio customizado para associar ao API Gateway
- [ ] Implementar deploy contínuo com análise estática de código e execução dos testes automatizados [exemplo: GitHub Actions]