This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React Music - code challenge

### Flavio Santos de Andrade

#### [Live Version on Heroku](https://fsareactmusic.herokuapp.com/reactmusic)

#### Estrutura da aplicação

Folder: "./"
File: index.js

- Configuração para carregar versao de produção do react (build) no servidor Heroku

Folder: "./client"

- CRA folder, setupProxu para redirecionamento de request

#### Configuração da aplicação

- localStorage: armazenamento dos usuarios cadastrados (users) e historico de cada usuario cadastrado (userHistory).
- Novos usuários tem suas senhas criptografadas no momento da criação da conta
- sessionStorage: armanzena atual usuario logado e mantem acesso em reloads. Sessão é apagada quando o usuário desgola ou fecha tab.

#### Execução

Para executar a versão local, acese a pasta cliente no terminal e execute "npm start" como de padrão à aplicações CRA.

Rota inical "/" ou "/reactmusic"
