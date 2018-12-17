//Controlador donde se agrupan todos los endpoints relacionados con competencias
const modelo = require( '../modelos/competencia' );
const bd = require( '../libs/conexionbd' );
const codigoHttp = require( '../libs/enumeraciones' ).httpStatusCode;
const modeloCompetencia = new modelo.Competencia();

//Devuelve todas las competencias existentes
const competencias = ( req, res ) => { 
  try {
    modeloCompetencia.obtenerTodas( bd, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devuelve dos películas aleatorias por competencia consultada
const obtenerPeliculas = ( req, res ) => {
  try {
    let id = parseInt( req.params.id );
    modeloCompetencia.obtenerPeliculas( bd, id, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };  
};

//Devuelve el nombre de una competencia por su id
const nombre = ( req, res ) => {
  try {
    let id = parseInt( req.params.id );
    modeloCompetencia.obtenerNombrePorId( bd, id, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devuelve 201 si se pudo guardar el voto 
//por id de competencia y id de película
const agregarVoto = ( req, res ) => {
  try {
    let idCompetencia = parseInt( req.params.id );
    let idPelicula = parseInt( req.body.idPelicula );
    modeloCompetencia.agregarVotoAPelicula( bd, idCompetencia, idPelicula, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devuelve los resultados por competencia
const resultados = ( req, res ) => {
  try {
    let idCompetencia = parseInt( req.params.id );
    modeloCompetencia.resultadosPorId( bd, idCompetencia, res );
  } catch {
    res.sendStatus( codigoHttp.internalServerError );
  };
};

//Devueve un 201 si se pudo crear una nueva 
//competencia en la tabla competencias
const crearNueva = ( req, res ) => {
  try {
    let nombreCompetencia = req.body.nombre;
    if ( nombreCompetencia !== '' ) {
      let idGenero = normalizarDato( req.body.genero );
      let idDirector = normalizarDato( req.body.director );
      let idActor = normalizarDato( req.body.actor );
      modeloCompetencia.crearNueva( bd, nombreCompetencia, idGenero, idDirector, idActor, res );
    } else {
      res.status( codigoHttp.unprocessableEntity )
         .send( 'El nombre de la competencia no puede estar vacio.' );
    };
  } catch {
    res.status( codigoHttp.internalServerError )
       .send( 'Ha ocurrido un error al procesar la solicitud.' );
  };
};

//devuelve un 202 si se  pudieron borrar los 
//votos de una competencia por su id
const borrarVotos = ( req, res ) => {
  try {
    let id = parseInt( req.params.id );
    modeloCompetencia.borrarVotosPorId( bd, id, res );
  } catch {
    res.status( codigoHttp.internalServerError )
       .send( 'Ha ocurrido un error al procesar la solicitud.' );
  };  
};

//Actualiza el nombre de una competencia por su id 
const actualizarNombre = ( req, res ) => {
  try {
    let nombreCompetencia = req.body.nombre;
    if ( nombreCompetencia !== '' ) {
      let idCompetencia = parseInt( req.params.id );
      modeloCompetencia.actualizarNombrePorId( bd, nombreCompetencia, idCompetencia, res );
    } else {
      res.status( codigoHttp.unprocessableEntity )
         .send( 'El nombre de la competencia no puede estar vacio.' );
    };
  } catch {
    res.status( codigoHttp.internalServerError )
       .send( 'Ha ocurrido un error al procesar la solicitud.' );
  };
};

//Elimina una competencia por su id
const eliminar = ( req, res ) => {
  try {
    let idCompetencia = parseInt( req.params.id );
    modeloCompetencia.eliminarPorId( bd, idCompetencia, res );
  } catch {
    res.status( codigoHttp.internalServerError )
       .send( 'Ha ocurrido un error al procesar la solicitud.' );
  };
};

//Funciones auxiliares 
//Esta función normaliza un dato antes de ser enviado a la consulta
function normalizarDato( dato ) {
  let datoNormalizado = null;
  
  if ( dato !== '0' ) {
    datoNormalizado = parseInt( dato );
  };
  return datoNormalizado;
};

//Módulos a ser exportados 
module.exports = {
    competencias,
    obtenerPeliculas,
    agregarVoto,
    resultados,
    crearNueva,
    nombre,
    borrarVotos,
    actualizarNombre,
    eliminar
};