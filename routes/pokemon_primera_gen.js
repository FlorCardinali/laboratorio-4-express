const {Router} = require("express");
const { getPokemonPorId } = require("../controller/pokemon_primera_gen");
const rutas = Router();

rutas.get('/pokemon/primer_gen/:id', getPokemonPorId)

module.exports = rutas;