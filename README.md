# Pet Finder

## COLLE
-> Na raiz do projeto o arquivo ('API ONG Animal Finder.postman_collection.json') é o JSON para realizar import no postman(https://www.postman.com/downloads/).<br>
Para poder validar end-point da API com mais facilidade.

## Como instalar - API (Laravel(Lumen))

-> Navegue até a pasta 'api-animal-finder'<br>
-> Execute : composer install<br>
-> Crie seu banco de dados MySQL<br>
-> Substituia em .env a variável DB_DATABASE=NomeDaBaseCriada<br>
-> php artisan migrate<br>
-> Caso queira popular as tabelas geradas com dados fake<br>
----> php artisan db:seed --class=NotificationTableSeeder<br>
-> Caso "reiniciar" as tabelas para que fique sem dados<br>
----> php artisan migrate:fresh<br>
-> PARA FINALIZAR PARA DAR START NA API COMANDO -> php -S localhost:8001 -t public<br>

## Como instalar - APP (ReactJS)

-> Navegue até a pasta 'app-animal-finder'<br>
-> yarn install<br>
-> yarn dev<br>
-> ** CASO VENHA TER ALGUM PROBLEMA LEIA O README NA PASTA DO APP (app-animal-finder) **

Pronto, ambos serviços já devem estar startados.<br>
Basta utilizar acessar a página aberta pelo APP ou acessar http://localhost:3000/<br>


## Outros

-> First API<br>
-> Utilizado Lumen para realizar a API (https://lumen.laravel.com/docs/8.x)<br>
-> Utilizado Material UI no front-end (https://material-ui.com/)<br>
-> Token de Login expira em 3hrs.<br>

## Alertas
-> Telas do "BackOffice" não se adaptão muito bem ao mobile com tela muito pequena.<br>
-> Tela de cadastro de animal campo de imagem não realiza o upload. Usando link para gera imagem de animais.<br>
-> Para maior segurança e evitar problemas, requests que retorne stats 401 e 405, realizo logout forçado e refresh na tela.<br>
-> Realizarei mais updates no projeto, de acordo com o tempo disponível.<br>



## Imagens PREVIEW (19-03-2021)
# 
![Alt text](/imgsApp/home-animal-finder.png "Home")

![Alt text](/imgsApp/Tela-Encontrei.png "Encontrei")

![Alt text](/imgsApp/Menu-Header-Sem-Login.png "Home Deslogado")

![Alt text](/imgsApp/Menu-Header-Com-Login.png "Home Logado")

![Alt text](/imgsApp/Login.png "Login")

![Alt text](/imgsApp/Cadastro.png "Cadastro dono do animal")

![Alt text](/imgsApp/BackOffice-Animais.png "Backoffice lista de animais do usúario")

![Alt text](/imgsApp/BackOffice-Notificacoes-Animais.png "Notificações do animal selecionado na img acima")