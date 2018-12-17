//Archivo para el objeto película y sus diferentes métodos;
const consulta = require( '../libs/consultas' );

const Pelicula = function() {

  //Obtiene todos los generos
  this.obtenerGeneros = ( bd, res ) => {
    let sql = consulta.cargarIdNombreDeTabla;
    obtenerIdNombreDeTabla( bd, sql, "genero", res );
  };

  //Obtiene todos los directores
  this.obtenerDirectores = ( bd, res ) => {
    let sql = consulta.cargarIdNombreDeTabla;
    obtenerIdNombreDeTabla( bd, sql, "director", res );
  };

  //Obtiene todos los actores
  this.obtenerActores = ( bd, res ) => {
    let sql = consulta.cargarIdNombreDeTabla;
    obtenerIdNombreDeTabla( bd, sql, "actor", res );
  }
};

//Funcion que obtiene los datos, id y nombre de la tabla 
//genero, director o actor
function obtenerIdNombreDeTabla( bd, consulta, tabla, res ) {
  consulta += " " + tabla;            
  bd.conexion.query( consulta, ( error, resultados ) => {
    if ( bd.manejarError( error, res ) ) return;

    if (bd.existenResultados( resultados, res ) ) {
      res.send( resultados );
    };
  } );
};

//Modulos exportados
module.exports = { 
  Pelicula
};