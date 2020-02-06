
//Trazendo o app configurando
const app = require('./src/server')

app.listen(3000, () => {
    console.log('servidor rodando na porte 3000');
})

app.get('/', (req, res) => {
    res.send(
        `<h1>Minha primeira rota do express</h1>`
    )
})

//nodemon cria um web socket entre o projeto e o browser

// Na aula do dia 05, refatoramos os codigos, para um melhor desenpenho e um melhor
//padrao de codigo

//Primeiro passo foi criar uma pasta './src'

    //para essa pasta movemos todos os diretorios e arquivos referentes a aplicacao
    //pastas movidas 'controllers', 'infra', 'models', 'validators'
    //Bem como a criacao de uma pasta para armazenar as rotas separadamente
    //e um arquivo para guardar as configuracoes de nosso servidor, o 'server.js'
    
    