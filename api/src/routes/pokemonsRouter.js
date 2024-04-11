const { Router } = require('express');

const { getAllPokemonsHandler, 
    createPokemonHandler, 
    getByIdPokemonHandler, 
    getByNamePokemonsHandler,
    updatePokemonHandler,
    deletePokemonHandler,
    } = require('../Handlers/pokemonsHandler');


//Routes for pokemons

const pokemonsRouter = Router();

pokemonsRouter.get('/', getAllPokemonsHandler); // route to get all pokemons

pokemonsRouter.get('/:id', getByIdPokemonHandler); //  route to get a pokemon by id

pokemonsRouter.get('/name/:name', getByNamePokemonsHandler); // route to get a pokemon by name

pokemonsRouter.post('/', createPokemonHandler); // route to create a pokemon

pokemonsRouter.put('/:id', updatePokemonHandler); // route to update a pokemon

pokemonsRouter.delete('/:id', deletePokemonHandler ); // route to delete a pokemon

module.exports = pokemonsRouter;