/* This file is the handler for the pokemons routes,
 it calls the controllers and send the response to the client*/
const { getAllPokemonsController, 
    getByIdPokemonController,
    getByNamePokemonsController,
    createPokemonController,
    updatePokemonController,
    deletePokemonController,
     } = require('../Controllers/pokemonsController');


//  it response to the client with the pokemons or an error message
const getAllPokemonsHandler = async (req, res) => {
    try {
        const pokemons = await getAllPokemonsController();
        res.status(200).send(pokemons);
    } catch (error) {
        res.status(500).send('Pokemons not found');
    }
}

//  it response to the client with the pokemon for id or an error message
const getByIdPokemonHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const origin = id.length < 7 ? "Api" : "BDD"
        const pokemon = await getByIdPokemonController(id, origin);
        if (!pokemon) throw new Error("Pokemon not found");
        res.status(200).send(pokemon);
    } catch (error) {
        res.status(500).send('Pokemon By Id Controller Error: ' + error.message);
    }
}

//  it response to the client with the pokemons for name or an error message
const getByNamePokemonsHandler = async (req, res) => {
    try{
    const { name } = req.params;
    if (!name) throw new Error("Missing data");
    const pokemons = await getByNamePokemonsController(name)
    console.log('pokemons:',pokemons)
    res.status(200).json(pokemons)
    }
    catch (error) {
     res.status(500).send('Pokemon By Name Controller Error: ' + error.message);
    }
}

//  it response to the client with the new pokemon or an error message
const createPokemonHandler = async (req, res) => {
    try {
        const { name, image, health, attack, defense, speed, height, weight, types } = req.body;
        if (!name || !image || !health || !attack || !defense || !speed || !height || !weight || !types) throw new Error("Missing data");
        const newPokemon = await createPokemonController(name, image, health, attack, defense, speed, height, weight, types);
        res.status(200).json(newPokemon);
    } catch (error) {
        res.status(500).send('Error creating pokemon');
    }
}

//  it response to the client with the updated pokemon or an error message
const updatePokemonHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, health, attack, defense, speed, height, weight, types } = req.body;
        const updatedPokemon = await updatePokemonController(id, name, image, health, attack, defense, speed, height, weight, types);
        console.log('updatedPokemon:',updatedPokemon)
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(500).send('Error Handler updating pokemon');
    }
}

//  it response to the client with the deleted pokemon or an error message
const deletePokemonHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPokemon = await deletePokemonController(id);
        res.status(200).json(deletedPokemon);
    } catch (error) {
        res.status(500).send('Error deleting pokemon');
    }
}


module.exports = {
    getAllPokemonsHandler,
    getByIdPokemonHandler,
    getByNamePokemonsHandler,
    createPokemonHandler,
    updatePokemonHandler,
    deletePokemonHandler,
}