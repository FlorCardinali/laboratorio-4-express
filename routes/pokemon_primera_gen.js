const {Router} = require("express");
const { getPokemonPorId, getPrimeraGeneracion, getPokemonsPorColorYGen } = require("../controller/pokemon_primera_gen");
const rutas = Router();

rutas.get('/pokemon/primer_gen/:id', getPokemonPorId)
rutas.get('/primera_generacion', getPrimeraGeneracion)
rutas.get("/pokemones/color", getPokemonsPorColorYGen)

module.exports = rutas;