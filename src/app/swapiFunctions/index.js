const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
    return mass * gravity;
}

const genericRequest = async (url, method, body, logging = false) => {
    let options = {
        method: method
    }
    if(body){
        options.body = body;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if(logging){
        console.log(data);
    }
    return data;
}

const peopleRequest = async (url, method) => {
    let options = {
        method: method
    }
    let objResponse = {};
    let objDatosCharacter = {};   
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status == 200) {
        const url2 = (data.homeworld).slice(0, -1);
        const idPlanet = url2.substr((url2.lastIndexOf("/") + 1),url2.length);

        const response2 = await fetch(url2, options);
        const data2 = await response2.json();

        if (response2.status == 200) {
            objDatosCharacter = {
                'name' : data.name,
                'height' : data.height,
                'mass' : data.mass,
                'homeworldName' : data2.name,
                'homeworldId' : idPlanet
            }

            objResponse = {
                "error": false,
                "msj" : 'Información correcta.',
                "data" : objDatosCharacter
            }
        } else {
            objResponse = {
                "error": true,
                "msj" : 'No se encontró id buscado.',
                "data" : {}
            }
        }
    } else {
        objResponse = {
            "error": true,
            "msj" : 'No se encontró id buscado.',
            "data" : {}
        }
    }
    return objResponse;
}

module.exports = {
    getWeightOnPlanet,
    genericRequest,
    peopleRequest
}