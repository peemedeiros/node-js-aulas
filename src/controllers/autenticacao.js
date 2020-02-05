const { validationResult } = require('express-validator')
const UsuariosValidator = require('../validators/Usuario')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

gerarToken = (params) => {
    return jwt.sign( params, authConfig.secret, {
        expiresIn:60,
    })
}


autenticacao = (app) => {
    
    app.post('/registrar',
        UsuariosValidator.validacoes(),
        (req, res) => {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).send(errors)
                return
            }
        
        const usuario = req.body

        usuarioDao = app.models.Usuarios

        usuarioDao.insere(usuario)
            .then(usuario => {

                const token = gerarToken({ id:usuario.id })

                res.status(201).send({usuario, token})

            })
            .catch(erro => res.status(500).send(erro))

    })

    app.post('/autenticar', async (req, res) =>{
        const {email, senha} = req.body

        try{
            usuarioDao = app.models.Usuarios
            const usuario = await usuarioDao.buscarPorEmail(email)

            if(!usuario)
                return res.status(400).send({erro: 'Usuário não cadastrado'})
            
            if( usuario.senha !== senha )
                return res.status(400).send({erro:'Email ou senha inválido'})

            const token = gerarToken({ id:usuario.id })

            console.log(token)
            res.send({usuario, token})

        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
        
    })

}

module.exports = autenticacao