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
                res.status(200).json({
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
        res.status(200).json({
            nombreGen,
            pokemones
        })
    })
    .catch((error) => {
        res.status(400).json({error: 'error inesperado'}); 
    })
}

const getPokemonsPorColorYGen = (req = request, res = response) =>{
    const {color, gen} = req.query;
    if (color == undefined){
        res.status(412).json({error: "Faltan parametros"})
    } else {
        axios.get(`https://pokeapi.co/api/v2/pokemon-color/${color}/`)
            .then(({data}) => {
            
                let pokemones = [];
                for (let i in data.pokemon_species){
                    let numero = parseInt(data.pokemon_species[i].url.split('/').slice(-2, -1)[0])
                    let nombre = data.pokemon_species[i].name;
                    let pokemon = {};
                    pokemon["nro"] = numero;
                    pokemon["nombre"] = nombre;
                    pokemones.push(pokemon);
                }
                pokemones.sort((a, b) => a.nro - b.nro);

                if(gen == undefined){
                    res.status(200).json({
                        color : data.name,
                        pokemones
                    })
                } else {
                    const generaciones = {
                            0 : 0,
                            1 : 151,
                            2 : 251,
                            3 : 386,
                            4 : 493,
                            5 : 649,
                            6 : 721,
                            7 : 809,
                            8 : 902,
                            9 : 1017
                        };
                    const pokeGen = pokemones.filter((pokemon) => {
                        return (pokemon.nro < generaciones[gen]) && (pokemon.nro > generaciones[gen-1])
                      });
                    res.status(200).json({
                        color : data.name,
                        pokeGen
                    })
                }
            })
            .catch((error) => {
                res.status(404).json({error: 'Color no encontrado / no valido'}); 
            })
    }
                
}

module.exports = {
    getPokemonPorId,
    getPrimeraGeneracion,
    getPokemonsPorColorYGen
};