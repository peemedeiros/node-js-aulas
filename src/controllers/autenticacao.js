const { validationResult } = require('express-validator')
const usuarioDao = new (require('../models/Usuarios'))()
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const bcrypt = require('bcryptjs')

gerarToken = (params) => {
    return jwt.sign( params, authConfig.secret, {
        expiresIn:900,
    })
}

module.exports = {

    async registra(req, res){

        const errors = validationResult(req)

            if(!errors.isEmpty())
                return res.status(400).send(errors)
            
        let usuario = req.body

        try{
            usuario.senha = await bcrypt.hash(usuario.senha, 10)

            const resultado = await usuarioDao.insere(usuario)

            usuario = {id:resultado.InsertId, ...usuario}

            res.status(201).send({
                usuario,
                token:gerarToken({id:usuario.id})
            })
        }catch(erro){
            res.status(500).send(erro)
        }

    },
    async autentica(req, res){
        const {email, senha} = req.body

        try{

            let usuario = await usuarioDao.buscarPorEmail(email)
            usuario = usuario[0]

            if(!usuario)
                return res.status(400).send({erro: 'Usuário não cadastrado'})
            
            console.log(senha)
            console.log(usuario.senha)

            if(! await bcrypt.compare(senha, usuario.senha))
                return res.status(400).send({erro:'Email ou senha inválido'})

            console.log('asdasdas')

            delete usuario.senha;
            
            res.send({
                usuario,
                token: gerarToken({ id:usuario.id })
            })

        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}