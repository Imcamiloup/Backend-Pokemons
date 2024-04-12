const { Router } = require("express");
const pokemonsRouter = require("./pokemonsRouter.js");
const typesRouter = require("./typesRouter.js");
const router = Router();


// Deshabilitar CORS en este componente (SOLO PARA PRUEBAS LOCALES)
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });


// Here we define the routes
router.use("/pokemons",pokemonsRouter);
router.use("/types", typesRouter);


module.exports = router;
