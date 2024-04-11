const { Router } = require('express');

const { getAllTypesHandler} = require('../Handlers/typesHandler');

const typesRouter = Router();

typesRouter.get('/', getAllTypesHandler); // GET /types

module.exports = typesRouter;