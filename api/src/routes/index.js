const { Router } = require("express");
const pokemonsRouter = require("./pokemonsRouter.js");
const typesRouter = require("./typesRouter.js");
const router = Router();

// Here we define the routes

  

router.use("/pokemons",pokemonsRouter);
router.use("/types", typesRouter);


module.exports = router;
