
# Teste técnico backend 🏔️

A aplicação em uma aplicação backend com foco em manipulação de dados de usuários. A aplicação deverá ser capaz de realizar as seguintes operações essenciais:

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar a Aplicação](#como-rodar-a-aplicação)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Contribuir](#como-contribuir)
- [Possíveis Melhorias](#possíveis-melhorias)
- [Licença](#licença)

## Tecnologias Utilizadas

- **Linguagem de Programação**: Node.js (versão 18.X.X ou superior) + TypeScript
- **Framework/Plataforma**: Lambda / AWS / Middy / DynamoDB OneTable
- **Banco de Dados**: DynamoDB
- **Ferramentas de Build**: npm

## Como Rodar a Aplicação

### Pré-requisitos

Certifique-se de ter os seguintes programas instalados em sua máquina:

- [Node.js](https://nodejs.org) - Versão 18.X.X ou superior
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
   Abra seu navegador e vá para [http://localhost:3000](http://localhost:3000) ou o endereço configurado.

## Documentação da API para testar a aplicação na nuvem (AWS)

A documentação completa da API está disponível no Postman. Você pode acessar as coleções de endpoints da API, incluindo detalhes sobre os métodos, parâmetros, e exemplos de respostas, no seguinte link:

- [Documentação da API no Postman](https://documenter.getpostman.com/view/2057801/2sAYBYepV5)

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

## Possíveis Melhorias

- [ ] Adicionar autenticação de usuários (exemplo: OAuth2)
- [ ] Implementar testes automatizados com [exemplo: Jest, Mocha]
- [ ] Paginação na rota para filtrar os usuários
- [ ] Adicionar correlation id para tracking de requisição
- [ ] Implementar deploy contínuo com análise estática de código e execução dos testes automatizados [exemplo: GitHub Actions]