//En este archivo se administran las rutas del cliente
const express = require( 'express' );
const controlador = require( '../controladores/controladorCompetencia' );
const api = express.Router();

//Rutas para servir las diferentes peticiones de las competencias
//GET
api.get( '/competencias', controlador.competencias );
api.get( '/competencias/:id', controlador.nombre );
api.get( '/competencias/:id/peliculas', controlador.obtenerPeliculas );
api.get( '/competencias/:id/resultados', controlador.resultados );

//POST
api.post( '/competencias', controlador.crearNueva );
api.post( '/competencias/:id/voto', controlador.agregarVoto );

//DELETE
api.delete( '/competencias/:id/votos', controlador.borrarVotos );
api.delete( '/competencias/:id/', controlador.eliminar );

// //PUT
api.put( '/competencias/:id', controlador.actualizarNombre );

//Módulos a exportar
module.exports = api;