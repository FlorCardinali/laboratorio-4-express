const {Router} = require("express");
const { getPokemonPorId, getPrimeraGeneracion } = require("../controller/pokemon_primera_gen");
const rutas = Router();

rutas.get('/pokemon/primer_gen/:id', getPokemonPorId)
rutas.get('/primera_generacion', getPrimeraGeneracion)

module.exports = rutas;