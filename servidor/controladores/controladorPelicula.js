//Controlador donde se agrupan todas las rutas relacionadas 
//con películas
const modelo = require( '../modelos/pelicula' );
const bd = require( '../libs/conexionbd' );
const codigoHttp = require( '../libs/enumeraciones' ).httpStatusCode;
const pelicula = new modelo.Pelicula();


//Devuelve todos los generos existentes de 
//las películas en la tabla genero
function obtenerGeneros( req, res ) {
  try {
    pelicula.obtenerGeneros( bd, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devuelve todos los directores existentes de 
//las películas en la tabla director
function obtenerDirectores( req, res ) {
  try {
    pelicula.obtenerDirectores( bd, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devuelve todos los actores existentes de 
//las películas en la tabla actor
function obtenerActores( req, res ) {
  try {
    pelicula.obtenerActores( bd, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};


//Módulos a ser exportados 
module.exports = {
  obtenerGeneros,
  obtenerDirectores,
  obtenerActores
};