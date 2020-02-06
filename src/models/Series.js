const baseQuery = require('./baseQuery')

class Series{

    //BaseQuery está retornando 
    lista(){

        return baseQuery("SELECT * FROM series")

    }
    //promesa para realizar inserção no banco de dados
    insere(serie){

        return baseQuery("INSERT INTO series SET ?", serie)
            
    }

    buscaPorId(id){

        return baseQuery("SELECT * FROM series WHERE id = ?", id)

    }

    deletar(id){

        return baseQuery("DELETE FROM series WHERE id = ?", id)

    }

    atualiza(serie){
        return baseQuery("UPDATE series SET ? WHERE id = ?", [serie, serie.id])
           
    }

}

module.exports = Series

