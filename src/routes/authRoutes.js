const router = require('express').Router()
const authCtrl = require('../controllers/autenticacao')
const UsuariosValidator = require('../validators/Usuario')

router.post('/registrar', UsuariosValidator.validacoes(), authCtrl.registra)
router.post('/autenticar', UsuariosValidator.validacoes(), authCtrl.autentica)

module.exports = router