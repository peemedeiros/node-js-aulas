const { check, validationResult } = require('express-validator')

autenticacao = (app) => {
    
    app.post('/registrar',
        [
            check('nome').isLength({min:3, max:50})
                .withMessage('Deve ter entre 3 e 50 caracteres')
        ],
        (req, res) => {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).send(errors)
                return
            }
        
        const usuario = req.body

        usuarioDao = app.models.Usuarios

        usuarioDao.insere(usuario)
            .then(usuario => res.status(201).send(usuario))
            .catch(erro => res.status(500).send(erro))

    })

}

module.exports = autenticacao