const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API";

// Configuración de middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Configuración de CORS
server.use((req, res, next) => {
  // Permitir solicitudes desde https://dogsproject.vercel.app
  res.header("Access-Control-Allow-Origin", "https://dogsproject.vercel.app"); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Rutas
server.use("/", routes);

// Manejador de errores
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
