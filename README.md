# CV Fácil API
Para finalizar as partes necessárias da API, primeiro deve-se configura-la, portanto siga os passos abaixo:

- Primeiro, com o projeto em sua máquina, instale as dependências usando:
```bash
yarn
# OU
npm i
```
- Segundo, crie uma conta no site [neon](https://console.neon.tech/sign_in), na parte de projetos, crie um projeto com o nome cv-facil-db (o neon tem opção para contas grátis poderem criar um banco limitado), com o projeto criado, na aba de "dashboard" desça até o card de "Connection Details" e copie o código no textarea com o título "psql"
- Terceiro, crie um arquivo .env na raiz do projeto, e dentro um variável com o nome: DATABASE_URL="código de conexão", substitua a parte "código de conexão" pelo código que foi copiado do neon, e adicione: ?sslmode=require no final, isso tudo deve estar entre aspas.
- Quarto, com isso, você poderá executar o seguinte comando: 
```bash
npx prisma migrate dev --name init
```
Isso irá criar as tabelas no banco de dados do neon, e com isso você já pode rodar o projeto com o comando ```npm run dev``` ou ```yarn dev``` e implementar as requisições com o banco.

Basta ir nos arquivos na pasta controllers e começar a implementar, na pasta /extra na raiz do projeto tem um arquivo com as rotas do insomnia configuradas, basta importar na ferramenta.
