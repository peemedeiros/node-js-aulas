const conexao = require('../infra/conexao')

class Usuarios {

    insere(usuario){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO usuarios SET ?";

            conexao.query(sql, usuario, (erro, retorno) =>{

                if(erro)
                    reject('Erro ao inserir'+erro)
                else
                    resolve(retorno)
            })
        })
    }
    buscarPorEmail(email){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuarios WHERE email = ?"

            conexao.query(sql, email, (erro, retorno) =>{

                if(erro)
                    reject("erro ao buscar"+erro)
                else
                    resolve(retorno)
            })
        })
    }
}

module.exports = new Usuarios()