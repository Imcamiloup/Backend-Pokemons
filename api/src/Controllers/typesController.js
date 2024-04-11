const { Type } = require('../db.js');
const axios = require('axios');

// Function to get all types from the API
const getTypesApi = async () => {
    const types = await axios.get('https://pokeapi.co/api/v2/type');
    const typesResults = types.data.results;
    const typesResultsArray = typesResults.map((type) => (type.name));
    return typesResultsArray;
}

// Function to get all types from the API and the saved in the database
const getAllTypesController = async () => {

    const typesApi = await getTypesApi();

    // here we check if the types are already in the database and if not, we create them
    typesApi.forEach(async (type) => {
        if (!await Type.findOne({where: {name: type}}))
        await Type.create({name: type});
    });
    
    responseDb = await Type.findAll();

    const typesDb = responseDb.map(t => {
        return {
            id: t.id,
            name: t.name
        }
    });

    return typesDb;
}

module.exports = {
    getAllTypesController
}