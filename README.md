# Steam-API-Login

Este projeto consiste num API do site da steam https://store.steampowered.com/.
Atenção que para aceder a qualquer informação do API é necessário fazer o registo de uma conta a partir do Ethereal Mail descrito na página do API.

Para iniciar o API deve-se primeiro ir para o path onde está o programa (por exemplo se estiver no Ambiente de Trabalho: "cd Desktop/Steam-API-Login")
depois fazer o comando "npm i" que irá instalar todas as depêndencias utilizadas para fazer o API, depois disto é necessário fazer o comando "npm run start" 
para iniciar o API e depois é só ir para a página referida abaixo!

O link para a página do API é:

    http://localhost:9090/

O API dá scrape de 3 subpáginas diferentes:

    Jogos mais vendidos - https://store.steampowered.com/search/?filter=topsellers
    Novidades - https://store.steampowered.com/explore/new/
    Promoções - https://store.steampowered.com/specials/

O API várias dependências diferentes para melhorar a sua performance. O script do API foi feito utilizando javascript. E HTML5 e CSS para o frontend. 
A divisão da informação está feita por 3 subpáginas diferentes:

    http://localhost:9090/maisvendidos
    http://localhost:9090/novidades
    http://localhost:9090/promocoes

O API dá scrape a várias informações de cada página sendo elas:

    Nome dos jogos
    Preço dos jogos(podendo este ser com ou sem desconto)
    Desconto aplicado nos jogos
    Data de lançamento dos jogos
    Reviews feitos pelos jogadores
    Genero dos jogos(Pode ser mais do que 1)

Este API foi realizado para a disciplina de WebDevelopment ensinada pelo Professor.Laércio Cruvinel, como projeto bi-semanal para treinar javascript 
Como suporte a este API foram utilizadas várias ferramentas uma das principais, o tutorial feito por Ania Kubów: https://www.youtube.com/watch?v=GK4Pl-GmPHk&t=2s

O API utiliza EthrealMail de modo a que para se fazer o registo de um novo utilizador é necessário aceder pelo link contido no API ou pela terminal.

Normalmente o ficheiro .env não estaria no github, devido à  sua informação crítica, mas como sendo um trabalho académico e não com valor económico para nenhuma empresa, 
dei upload para o github na mesma.
