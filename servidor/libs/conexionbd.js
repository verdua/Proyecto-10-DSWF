//Archivo donde establecemos los parametros de conexion con la base de datos
const mysql = require( 'mysql' );
const codigosEstado = require( './enumeraciones' ).httpStatusCode;

const conexion = mysql.createConnection( {
    host    : process.env.HOST || 'localhost',
    port    : process.env.PORT || 3306,
    user    : process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
} );

//Agrego estos métodos para el manejo de erroes y resultados
//obtenidos de la base de datos

//Manejador de errores 
function manejarError( error, res ) {
  var rta = false;
  
  if ( error ) {
    //Enviaré un Internal Server Error
    res.sendStatus( codigosEstado.internalServerError );
    console.error( error );
    rta = true;
  };
  return rta;
};

//Verifica si existen respuestas
function existenResultados( resultados, res ) {
  var rta = true;
  
  if ( resultados.length === 0 ) {
    //Si no hay resultados en la consulta, enviaré un 404 No Encontrado
    res.sendStatus( codigosEstado.notFound );
    rta = false;
  };
  return rta;
};

//Modulos a ser exportados 
module.exports = {
  conexion,
  manejarError,
  existenResultados
};