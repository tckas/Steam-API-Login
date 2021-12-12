const express = require("express"); // Carrega o framework Express
const app = express(); // Construtor que inicializa uma aplicação Express
const axios = require("axios").default
const cheerio = require("cheerio")

app.use(express.json()); // Faz o parse (validação e interpretação) de solicitações do tipo application/json
app.use(express.urlencoded({ extended: true })); // Faz o parse do conteúdo tipo application/x-www-form-urlencoded
require("./rotas/rotas")(app);
const PORTA = process.env.PORT || 9090; // Estabelece a porta do servidor
app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta ${PORTA}`);
});
app.use(express.static('public'));

app.get('/maisvendidos', (req, res) =>{   // subpagina /maisvendidos
    axios.get('https://store.steampowered.com/search/?filter=topsellers')  //vai buscar a informação à página steam
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const jogos = []
        $(".search_result_row",html).each(function(){                   // identifica de onde retirar a informação na página html
            const nome = $(this).find(".title").text()
            const desconto = $(this).find(".search_discount").text().trim()  // o trim() serve para retirar o espaço extra que haveria caso se retirasse logo a informação da página html
            var preco = "" 
            if(desconto != ""){  // só realiza o if se houver desconto
                var content = $(this).find(".search_price").clone()   //vai buscar apenas a coluna do search_price, e faz com que trabalhe-mos apenas com essa coluna(desaparece tudo o resto)
                content.find("span").remove()   // vai à coluna já especificada e dá remove a tudo dentro do <span> (que neste caso é o preço inicial)
                preco = content.text().trim()           // apresenta agora tudo o que sobrou depois do remove sendo isto apenas o preço já descontado
            } else {
                preco = $(this).find(".search_price").text().trim()   // caso não haja desconto o preço é apresentado normalmente
            }
            
            const data = $(this).find(".search_released").text()    //vai buscar a data dos jogos 
            
            var review = ""
            if($(this).find(".search_review_summary").attr('data-tooltip-html') != undefined){                  //a informação está na "data-tooltip-html" logo temos que usar attr
                review = $(this).find(".search_review_summary").attr('data-tooltip-html').replace("<br>", ", ") // serve apenas para retirar o <br> que estava no texto e susbstituir por ", "
            }
            

            jogos.push({ // vai buscar toda a informação recolhida acima a partir do cheerio e fica contida em jogos
                "Nome" : nome,
                "Preço" : preco,
                "Desconto(aplicado)" : desconto,
                "Data de lançamento" : data,
                "Reviews" : review
                
            })
        })
        res.json(jogos) // apresenta a informação contida em jogos na página html 
    })
})

app.get('/novidades', (req, res) =>{        // subpágina /novidades
    axios.get('https://store.steampowered.com/explore/new/') // vai buscar informação à página steam
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const jogos = []
        $('.tab_item', html).each(function(){  //vai buscar toda a informação que contem tab_item a pagina html
            const nome = $(this).find(".tab_item_name").text()
            const desconto = $(this).find(".discount_pct").text()
            const preco = $(this).find(".discount_final_price").text()
            const genero = $(this).find(".tab_item_top_tags").text()            
            jogos.push({
                "Nome" : nome,
                "Preço" : preco,
                "Desconto(aplicado)" : desconto,
                "Genero" : genero   
            })
        })
        res.json(jogos)
    })
})

app.get('/promocoes', (req, res) =>{            // subpagina promocoes
    axios.get('https://store.steampowered.com/specials/')
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const jogos = []
        $('.tab_item', html).each(function(){
            const nome = $(this).find(".tab_item_name").text()
            const desconto = $(this).find(".discount_pct").text()
            const preco = $(this).find(".discount_final_price").text()
            const genero = $(this).find(".tab_item_top_tags").text()            
            jogos.push({
                "Nome" : nome,
                "Preço" : preco,
                "Desconto(aplicado)" : desconto,
                "Genero" : genero   
            })
        })
        res.json(jogos)
    })
})