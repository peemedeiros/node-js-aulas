series = (app) => {

    //
    app.get('/series', (req, res) => {
        var seriesDao = app.models.Series

        seriesDao.lista()
            .then(resultado => {
                res.send(resultado)
            })
            .catch(erro => {
                console.log('erro ao consultar' + erro)
                res.status(500).send(erro)
            })
    })

    app.post('/series', (req, res) => {

        const seriesDao = app.models.Series
        let serie = req.body

        seriesDao.insere(serie)
            .then(resultado => {
                const insertId = resultado.insertId;
                //criamos um objeto adicionando o atributo id e todos os outros
                serie = {id:insertId, ...serie}
                res.send(serie)
            })
            .catch(erro => {
                console.log('erro ao consultar'+erro)
                res.status(500).send(erro)
            })
    })

    app.get('/series/:id', (req, res) => {

        const id = req.params.id

        const seriesDao = app.models.Series;

        seriesDao.buscaPorId(id)
            .then(serie => {

                if(!serie){
                    
                    res.status(404).send({erro:'série não encontrada'})
                    return
                }

                res.send(serie)
                
            })
            .catch(erro => {
                console.log("erro ao buscar serie")
                res.status(500).send({erro:'erro ao buscar'})
            })
    })

    app.put('/series/:id', (req, res) => {

        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        seriesDao = app.models.Series;

        seriesDao.atualiza(serie)
            .then(retorno => {
                if(!retorno[0].affectedRows){
                    res.status(404).send({erro: 'Serie nao atualizada'})
                    return
                }
                res.send(serie) 
            })
            .catch(erro => res.status(500).send(erro)) 
    })

    app.delete('/series/:id', (req, res) => {
        const id = req.params.id
        const seriesDao = app.models.Series

        seriesDao.deletar(id)
            .then(retorno => {

                if(!retorno.affectedRows){
                    res.status(404).send({erro: 'Serie não encontrada'})
                    return
                }

                res.status(204).send(retorno)
            })
            .catch(erro => {
                console.log('Erro ao deletar' + erro)
                res.status(500).send({erro:'erro ao remover'})
            })
    })

}

module.exports = series