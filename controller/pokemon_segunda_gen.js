 const axios = require("axios");
const {request, response} = require("express");

const url = 'https://pokeapi.co/api/v2'


const getSecondGeneretion = (req = request, res = response) => {    
    axios.get(`${url}/generation/2/`)

    .then(({status, statusText, data}) => {
        res.status(200).json({
            status,
            statusText,
            data
        })
    })
    .catch((error) => {
        res.status(404).json({msg: 'Pokemon Not Found'}) 
    })
}

const getPokemonIdGeneration = (req = request, res = response) => {
    const {name, id} = req.params;

    if (id < 151 && id > 251) {
        res.status(400).json({msn:'Pokemon bad request'})
    }

    axios.get(`${url}/pokemon/${id || name}/`)
    .then(({status, statusText, data}) => {
        let types = [];
        for (let i in data.types){
            types.push(data.types[i].type.name);
        }
        
        res.status(200).json({
            status,
            statusText,
            nombre: data.name,
            types: types
        })
    })
    .catch((error) => {
        res.status(404).json({msg: 'Pokemon Not Found or could be from another generation'}) 
    })
}

const getPokemonType = (req = request, res = response) => {    
    const {type} = req.query;
    console.log(type)

    axios.get(`${url}/type/${type}`)
    .then(({status, statusText, data}) => {

        let pokemon = []
        data.pokemon.forEach(i => {
            pokemon.push(i.pokemon.name)
        });

        res.status(200).json({
            status,
            statusText,
            pokemon
        })
    })
    .catch((error) => {
        res.status(404).json({msg: 'Pokemon Not Found'}) 
    })
}



module.exports = {
    getSecondGeneretion,
    getPokemonIdGeneration,
    getPokemonType
};