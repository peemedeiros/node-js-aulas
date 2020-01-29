const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');

const customExpress = () => {

    //para receber os dados de um formulario
    //app.use(bodyParser.urlencoded())

    app.use(bodyParser.json())

// Injeção de dependencias para o app
    consign()
        .include('controllers')
        .include('models')
        .into(app)

    return app

}

module.exports = customExpress();