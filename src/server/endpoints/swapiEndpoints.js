
const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        try {
            const data = await app.swapiFunctions.peopleRequest(`https://swapi.dev/api/people/${req.params.id}`, 'GET');
            res.status(200).send(data);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {       
        try {
            const options = 'getPlanet';
            const data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${req.params.id}`, 'GET', options, true);
            res.status(200).send(data);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            // 60 y 82 cantidad de personajes y plantenas que responde end point.
            const planetaAleatorio = Math.round(Math.random()*60);
            const personajeAleatorio= Math.round(Math.random()*82);
            const dataPersonaje = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${personajeAleatorio}`, 'GET', null, true);
            const dataPlaneta = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${planetaAleatorio}`, 'GET', null, true);
            const retorno = await app.swapiFunctions.getWeightOnPlanet(dataPersonaje.data.mass, dataPlaneta.data.gravity, dataPersonaje.data.name);

            res.status(200).send(retorno);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        try {
            const { page, quantity } = { pag: 0, canti: 25, ...req.query };

            const logs = await app.services.loggingService.findAll({ pag, canti });

            res.status(200).send({ docs: logs, page: +page, quantity: +quantity });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    });

}

module.exports = applySwapiEndpoints;