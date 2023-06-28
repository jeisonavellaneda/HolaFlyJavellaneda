
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
            res.status(200).send(tets);
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const options = ['name', 'gravity'];
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', options, true);
        res.send(data);

        // res.sendStatus(501);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;