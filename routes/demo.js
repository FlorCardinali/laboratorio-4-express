const {Router} = require("express");
const { getPelicula, getOrigenNombre, getActores, getPeliculas } = require("../controller/demo");
const rutas = Router();

rutas.get('/peliculas', getPeliculas)
rutas.get('/pelicula/:id', getPelicula)
rutas.get('/nombre/:id', getOrigenNombre)
rutas.get('/actores', getActores)

module.exports = rutas;