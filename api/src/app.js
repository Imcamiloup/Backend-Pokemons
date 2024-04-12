/* Here we are exporting the router object,
 which is an instance of the express. */

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

const server = express();


server.use(morgan("dev")); //midleware get
server.use(express.json()); //midleware post
server.use(cors());

// Configuración del proxy inverso
server.use('/api', createProxyMiddleware({
  target: 'https://backend-pokemons-production.up.railway.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/pokemons', // Redirige las solicitudes a /api/pokemons al servidor backend
  },
  // Opciones de CORS si es necesario
}));

server.use(router);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//here verify the server is running
server.get('/', (req, res) => {
    res.send('API is running');
  });

server.get("/ping",function(req, res){
    res.send("pong");
  });

module.exports = server;
