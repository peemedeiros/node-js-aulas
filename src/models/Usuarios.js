const baseQuery = require('./baseQuery')

class Usuarios {

    insere(usuario){

        return baseQuery("INSERT INTO usuarios SET ?", usuario)

    }
    buscarPorEmail(email){

        return baseQuery("SELECT * FROM usuarios WHERE email = ?", email)

    }
}

module.exports = Usuarios