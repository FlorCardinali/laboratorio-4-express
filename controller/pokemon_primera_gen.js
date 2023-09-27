const axios = require("axios");
const {request, response} = require("express");


const getPokemonPorId = (req = request, res = response) => {
    const {id} = req.params;
    if ( id < 1 || id > 151){
        res.status(400).json({error:"Parametros incorrectos"});
    } else {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(({status, statusText, data}) => {
                let tipos = [];
                for (let i in data.types){
                    tipos.push(data.types[i].type.name);
                }
                res.json({
                    status,
                    statusText,
                    nombre: data.name,
                    tipos: tipos
                })
            })
            .catch((error) => {
                res.status(404).json({error: 'Pokemon no encontrado'}); 
            })
    }
}

const getPrimeraGeneracion = (req = request, res = response) =>{
   let generation = 1;
    axios.get(`https://pokeapi.co/api/v2/generation/${generation}`)
    .then(({status, statusText, data}) => {
        let pokemones = [];
        for (let i in data.pokemon_species){
            let numero = parseInt(data.pokemon_species[i].url.split('/').slice(-2, -1)[0])
            let nombre = data.pokemon_species[i].name;
            let pokemon = {};
            pokemon[numero] = nombre;
            pokemones.push(pokemon);
        }
        pokemones.sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0]);
        const nombreGen = data.main_region.name;
        res.json({
            nombreGen,
            pokemones
        })
    })
    .catch((error) => {
        res.status(400).json({error: 'error inesperado'}); 
    })
}

module.exports = {
    getPokemonPorId,
    getPrimeraGeneracion
};