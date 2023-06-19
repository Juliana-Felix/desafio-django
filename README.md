<h1 align="center">Desafio Snet</h1>

<p align="center"> Sistema Web utilizando o framework Django</p>

Desenvolvedora: Juliana Félix |  <link>julianafelix.dev@gmail.com</link>


## Requisitos para executar o projeto

 * Docker <ink>https://docs.docker.com/</link>
 ou apenas 
 Node.js e Python
 
 ## Como executar o projeto ?
 
 
 ### Comandos para iniciar o projeto com Docker
 
 * docker compose build --no-cache
 * docker compose run api-desafio python manage.py migrate
 * docker compose up -d

 ### Comandos para iniciar o projeto sem o Docker (Back-end)
 
 * Acesse o diretório core:

    `cd core`
 * Crie um virtual environment com o Python:

     `py -m venv .venv`

 * Ative o virtual environment:

      Linux: source `.venv/bin/active`
      Windows: `.venv\Scripts\activate.bat`

 * Instale os requirements.txt:

      `pip install -r requirements.txt`

 * Aplique as migrações:

      `python manage.py migrate`

 * Execute o servidor:

      `python manage.py runserver`


 ### Comandos para iniciar o projeto sem o Docker (Front-end)
 
  * Acesse o diretório frontend:

     `cd frontend`
 * Instale as dependências usando npm:

     `yarn install`
 * Inicie o servidor front:

     `yarn start`

 
 ## Rotas
 
 <p> Ao inicializar o projeto, estará rodando nas seguintes rotas: </p>
 
 http://localhost:3000/  (front-end)
 
 http://localhost:8000/api   (back-end)
 
## Tecnologias 

Este projeto foi desenvolvido utilizando as seguintes tecnologias

* Back-end: Django (Python)
* API: Django Rest Framework
* Banco de dados: SQLite (local)
* Infraestrutura em Docker
* Front-end: React (Node.js)
* Biblioteca CSS: TailwindCSS

### Endpoints

* Estabelecimento (Método POST)

Endpoint
`/api/home/`
- Formato do dado a ser enviado
`{ "name":"", "address":"", "phone":"", "business_type":"", "email_address":"", "state": "", "category":"" }`

Endpoint
Loja (Método POST)

Endpoint
`/api/store/`
- Formato do dado a ser enviado
`{ "name":"", "description":"", "service":"", "cod_establishment":# }`

Endpoint
- Login (Método GET)

Endpoint
`api/login/`
Formato do dado a ser enviado
`{ "name":"juliana", "username":"juliana", "email":"julianafelix.dev@gmail.com", "password":"servicenet" }`

