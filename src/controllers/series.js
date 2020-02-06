const serieDAO = new (require('../models/Series'))()

//aqui estamos exportando um objeto, sendo os seus atributos, funcoes para realizar
//consultas, insercoes, deletes, e atualizacoes no banco de dados.

module.exports = {

    //manda uma requisicao GET para buscar todas as series cadastradas
    async lista(req, res){
       
        //lista recebe a RESposta da requisicao GET e espera o retorno da funcao
        const lista = await serieDAO.lista()

        //caso retorne, mandaremos uma RESposta via send e um status code 200 ok
        if(lista)
            return res.status(200).send(lista)//adicionei o status code 200
        
        //caso a lista volte sem dados, apontaremos lista vazia e status code, not found 404
        return res.status(404).send({erro: "Lista vazia"})
            
    },

    //seguindo o mesmo padrao da anterior. mandaremos uma requisicao, porem nesse caso sera uma requisicao 
    //POST e enviaremos o JSON no corpo da requisicao.
    async insere(req, res){
        let serie = req.body;

        //com o try, tentaremos passar o JSON da serie como parametro da funcao de inserir series no banco de dados
        try{
            const resultado = await serieDAO.insere(serie)

            //guardaremos o retorno caso o conteudo do json for cadastrado corretamente no banco de dados
            //buscando por insertId(um atributo da resposta quando foi realizado uma insercao no BD)
            const insertId = resultado.insertId

            //Aqui estamos retornado o resultado da insercao, retornamos o que foi adicionado no banco de dados
            //adicionando no corpo da resposta o ID do registo(serie) que foi inserido, seguido do restante da estrutura
            //do json
            serie = {id:insertId, ...serie}
            return res.status(201).send(serie)

        }catch(erro){

            //caso nao seja inserido
            return res.status(500).send(erro)

        }
       
    },

    async buscaPorId(req, res){
        const id = req.params.id

        const serie = await serieDAO.buscaPorId(id)

        if(!serie)
             return res.status(404).send({erro: "Lista vazia"})
        res.send(serie)
    },

    async atualiza(req, res){

        const id = req.params.id
        const serie = req.body
        serie.id = id

        const retorno = await serieDAO.atualiza(serire)

        if(!retorno.affectedRows)
            return res.status(404).send({erro:'serie não encontrada'})

        res.send(serie);
    },

    //Método para deletar refatorado utilizando promesas
    async delete(req, res){
        const id = req.params.id

        const retorno = await serieDAO.delete(id)

        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'Serie nao atualizada'})
            
        res.status(204).send(serie) 
    }
}

//Nessa parte da aula, nos refatoramos os medotos da controller de 'series'.
//Metodos de um CRUD basico 
//Nessa refatoracao nos utilizamos Promisses EC6, para trabalhar de forma linear com o java script, que possui
    //caracteristicas assincronas.
    //os asyncs e awaits estao servindo justamente pra isso, eles forçam o codigo esperar o resultado de uma
    //funçao para dar continuidade ao processamento do codigo, sem a necessidade dos callbacks.

