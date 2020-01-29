
//Trazendo o app configurando
const app = require('./config/custom-express')

app.listen(3000, () => {
    console.log('servidor rodando na porte 3000');
})

app.get('/', (req, res) => {
    res.send(
        `<h1>Minha primeira rota do express</h1>`
    )
})

//nodemon cria um web socket entre o projeto e o browser 
