const axios = require("axios");
const {request, response} = require("express");


const getPeliculas = (req = request, res = response) => {
    res.json({name :'Peliculas'});
}
const getPelicula = (req = request, res = response) => {
    const param = req.params;
    res.json({name :'Peliculas'});
}
const getOrigenNombre = (req = request, res = response) => {
    const {id} = req.params;
    
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
        console.log(error)
        res.status(400).json({msg: 'Error inesperado'}) 
    })
    // res.json({name:`el nombre es ${name}`});
}
const getActores = (req = request, res = response) => {
    res.json({name:'Actores'});
}


module.exports = {
    getPeliculas,
    getOrigenNombre,
    getActores,
    getPelicula
};