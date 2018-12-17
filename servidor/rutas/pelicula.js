//En este archivo se administran las rutas del cliente
const express = require( 'express' );
const controlador = require( '../controladores/controladorPelicula' );
const api = express.Router();

//Rutas para servir las diferentes peticiones de peliculas
//GET
api.get( '/generos', controlador.obtenerGeneros );
api.get( '/directores', controlador.obtenerDirectores );
api.get( '/actores', controlador.obtenerActores );

//Módulos exportados
module.exports = api;