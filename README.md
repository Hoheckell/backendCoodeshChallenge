# Fullstack Challenge 🏅 Space X API - Backend

Projeto de Backend elaborado como prova de conhecimentos para Coodesh, sendo complementado pelo projeto de frontend o qual requisita os dados deste.
- Disponibiliza dados para elaboração dos graficos e da tabela e recebe requisições de busca
- Possui um script que roda diariamente as 9 horas da manhã para atualizar o banco de dados, foi usado o plano gratuito do Atlas(mongoDB)
- Requisita dados da API da SPACE X conforme sugerido na expecificação da prova.
- Possui testes unitários e e2e
- documentação feita com swagger no endpoint http://localhost:5000/backend/docs
- Link da apresentação: https://www.loom.com/embed/10d9e7eecf6848aeb84f9e9248a8aac1
# Foram usados:
- NestJS https://nestjs.com/
- mongoose https://mongoosejs.com/
- swagger https://swagger.io/
- 
# instalação
- É necessário configurar a variável de ambiente MONGODB_URI no arquivo .env

Após clonar o repósitório utilizar o comando
```shell
npm install
npm run start:dev
```
Ou Utilizando o Docker, no diretório do Dockerfile executar os comandos
```shell
docker build . -t [nome da imagem que deseja criar]
docker run [nome da imagem que deseja criar]
```

Para executar os testes unitáriosno diretorio da aplicação execute o comando
```shell
npm run test
```
Para executar os testes e2e no diretorio da aplicação execute o comando
```shell
npm run test:e2e
```
