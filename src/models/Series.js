//importamos a funcao que executa as querys no banco de acordo com os paramentros
//que sao passados na funcao

const baseQuery = require('./baseQuery')

class Series{

    //metodo para listar as series (GET)
    lista(){

        //baseQuery(sql, params), aqui estamos passando a query e como nao ha necessidade
        //de passarmos algum parametro,ele sera vazio.
        return baseQuery("SELECT * FROM series")

    }

    //metodo para inserir series(POST)
    insere(serie){

        //baseQuery(sql, params), aqui estamos passando a query e a serie que sera cadastrada
        //no banco de dados, via API.
        return baseQuery("INSERT INTO series SET ?", serie)
            
    }
    
    //metodo para buscar uma serie especifica pelo ID (GET/:id)
    buscaPorId(id){
        //baseQuery(sql, params), aqui estamos passando a query e o id da seria que sera
        //consultada no banco de dados, via API.
        return baseQuery("SELECT * FROM series WHERE id = ?", id)

    }

    //metodo para deletar uma serie (DELETE/:id)
    deletar(id){
        //baseQuery(sql, params), aqui estamos passando a query e o ID para deletarmos 
        //uma serie do banco de dados
        return baseQuery("DELETE FROM series WHERE id = ?", id)

    }

    //medoto para atualizar uma serie (PUT/:id)
    atualiza(serie){
        //baseQuery(sql, params), aqui estamos passando a query e o id da seria que sera
        //atualizada no banco de dados, via API.
        return baseQuery("UPDATE series SET ? WHERE ?", [serie, serie.id])
           
    }

}

module.exports = Series

