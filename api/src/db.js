/* This file is the connection to the database,
 it creates the connection and injects the models to sequelize */

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;


// We create the connection to the database
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/pokemon`, {
      logging: false, 
      native: false, 
   }
);

// We read all the files in the models directory and load
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// We inject all the models to sequelize
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Pokemon, Type } = sequelize.models;


// Associations

Pokemon.belongsToMany(Type, { through: 'PokemonType' });
Type.belongsToMany(Pokemon, { through: 'PokemonType' });



module.exports = {
   ...sequelize.models, 
   conn: sequelize, 
};