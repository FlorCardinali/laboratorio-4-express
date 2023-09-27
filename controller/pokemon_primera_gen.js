const axios = require("axios");
const {request, response} = require("express");


const getPokemonPorId = (req = request, res = response) => {
    const {id} = req.params;
    console.log(typeof id);
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



module.exports = {
    getPokemonPorId
};