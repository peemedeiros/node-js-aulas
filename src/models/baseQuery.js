const conexao = require('../infra/conexao')

module.exports = (sql, params) => {

    return new Promise((resolve, reject) => {

        //Mandando a query com seus parametros, caso houver.
        conexao.query(sql, params || "", ( erro, retorno ) => {

            //Caso possua algum erro na requisicao, o erro sera retornado
            if(erro) return reject(erro)
            
            //Caso contrario retornara o resultado vindo do banco
            resolve(retorno)

        })

    })
    
}

//Nesse arquivo estamos criando uma interacao generica com o banco de dados
//passamos a conexao, e exportamos uma funcao que tera como parametros a query que sera 
//executada no banco de dados e os parametros que forem necessarios para a execucao da query
//caso houver necessidade.