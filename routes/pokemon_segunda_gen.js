const {Router} = require("express");
const { getSecondGeneretion, getPokemonIdGeneration, getPokemonType } = require("../controller/pokemon_segunda_gen");
const rutas = Router();


rutas.get('/pokemon-generation2', getSecondGeneretion)
rutas.get('/pokemon-generation2/:id', getPokemonIdGeneration)
rutas.get('/pokemon-type', getPokemonType)

module.exports = rutas;