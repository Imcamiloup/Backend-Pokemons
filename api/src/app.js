/* Here we are exporting the router object,
 which is an instance of the express. */

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev")); //midleware get
server.use(express.json()); //midleware post


server.use(router);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
});

//here verify the server is running
server.get('/', (req, res) => {
    res.send('API is running');
  });

server.get("/ping",function(req, res){
    res.send("pong");
  });

module.exports = server;
