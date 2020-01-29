const conexao = require('../infra/conexao')

class Series{

    lista(){
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series"
            conexao.query(sql, (erro, retorno) => {

                if(erro) 
                    reject('erro ao consultar'+erro)
                else{
                    console.log('FOI!')
                    resolve(retorno)
                }

            })
        })
    }
    //promesa para realizar inserção no banco de dados
    insere(serie){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO series SET ?"
            console.log("aqui!")
            conexao.query(sql, serie, (erro, retorno) => {
                console.log(serie)
                if(erro)
                    reject('Erro ao inserir: '+erro)
                else{
                    resolve(retorno)
                }
            })
        })
    }

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM series WHERE id = ?";

            conexao.query(sql,id, (erro, retorno) => {
                if(erro){
                    //reject cai no catch
                    reject('erro ao buscar'+erro)
                }else{
                    //resolve cai no then
                    resolve(retorno[0])
                }
            })
        })
    }

    deletar(id){
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {
                
                if(erro)
                    reject('Erro ao apagar' + erro)
                else
                    resolve(retorno)
            })
        })
    }

    atualiza(serie){
        return new Promise((resolve, reject) => {
            const sql = "UPDATE series SET ? WHERE ?"

            
            conexao.query(sql, [serie, serie.id], (erro, retorno) => {
                console.log(serie)
                if(erro)
                    reject('Erro ao atualizar: '+erro)
                else{
                    resolve(retorno)
                }
            })
        })
    }

}

module.exports = new Series

