//Archivo base de la aplicación web 
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const cors = require( 'cors' );
const rutasCompetencia = require( './rutas/competencia' );
const rutasPelicula = require( './rutas/pelicula' );
const app = express();

//Sirve todos los archivos de la app desde express
app.use( express.static( path.join( __dirname, '/../cliente' ) ) );

//Configuración de la app
app.use( cors() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

//Configuración de las rutas de la app
//usaré el método Route() de express para 
//configurar todas las rutas
app.use( '/', express.static( path.join( __dirname, '/../cliente/html' ) ) );
app.use( '/', rutasCompetencia );
app.use( '/', rutasPelicula );

//Módulos a ser exportados 
module.exports = app;