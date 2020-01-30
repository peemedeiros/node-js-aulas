const { check, body } = require('express-validator')
const usuarioDao = require('../models/Usuarios')

class UsuarioValidator {

    static validacoes(){
        return [
            check('nome').isLength({min:3, max:50})
                .withMessage('Deve ter entre 3 e 50 caracteres'),
            check('email').isEmail()
                .withMessage('Deve ser um email valido'),
            check('senha').isLength({ min:8, max:15 })
                .withMessage('A senha deve ter entre 8 e 15 caracteres'),
            body('email').custom(email => {
                return usuarioDao.buscarPorEmail(email)
                    .then(usuario => {
                        if(usuario)
                            return Promise.reject('E-mail já está em uso')
                        
                    })
            })
        ]
    }

}

module.exports = UsuarioValidator