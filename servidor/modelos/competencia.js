//Archivo para el objeto competencia y sus diferentes métodos;
const consultas = require( '../libs/consultas' );
const codigoHttp = require( '../libs/enumeraciones' ).httpStatusCode;

const Competencia = function() {

  //Obtiene todas las competencias activas en la tabla
  this.obtenerTodas = ( bd, res ) => {
    let sql = consultas.cargarCompetencias;

    bd.conexion.query( sql, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
      
      res.send( resultados );
    } ); 
  };

  //Obtiene dos películas de forma aleatoria segun los filtros aplicados
  this.obtenerPeliculas = ( bd, idCompetencia, res ) =>{
    let sql = consultas.nombreCompetenciaPorId;

    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
  
      if ( bd.existenResultados( resultados, res ) ) {
        let respuesta = {};
        respuesta.competencia = resultados[0].nombre;
        sql = consultas.peliculasPorCompetencia;
        bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
          if ( bd.manejarError( error, res ) ) return;
  
          if ( bd.existenResultados( resultados, res ) ) {
            respuesta.peliculas = resultados;
            res.send( respuesta );
          };
        } );
      };
    });
  };

  //Agrega un voto a una película de una competencia
  this.agregarVotoAPelicula = ( bd, idCompetencia, idPelicula, res ) => {
    let sql = consultas.nombreCompetenciaPorId;
    
    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
      //Si existe la competencia se agrega el voto
      if ( bd.existenResultados( resultados, res ) ) {
        sql = consultas.agregarVotoCompetencia;
        
        bd.conexion.query( sql, [idCompetencia, idPelicula], ( error, resultados ) => {
          if ( bd.manejarError( error, res ) ) return;
          //Si no hay error respondo con un 201 (Created)
          res.sendStatus( codigoHttp.created );
        } );
      };
    } );
  };

  //Obtiene los resultados de una competencia por id
  this.resultadosPorId = ( bd, idCompetencia, res ) => {
    let sql = consultas.peliculasMasVotadas;

    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;

      if ( bd.existenResultados( resultados, res ) ) {
        let respuesta = {}; 
        respuesta.resultados = resultados;
        res.send( respuesta );
      };
    } );
  };

  //Crea una nueva competencia en la base de datos 
  this.crearNueva = ( bd, nombreCompetencia, idGenero, idDirector, idActor, res ) => {
    let sql = consultas.existePeliculaPorNombre;

    bd.conexion.query( sql, nombreCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
      
      if ( resultados.length == 0 ) {
        sql = consultas.totalPeliculasPorFiltros;
        let parametros = [idGenero, idGenero, idDirector, idDirector, idActor, idActor];

        bd.conexion.query( sql, parametros, ( error, resultados ) => {  
          if ( bd.manejarError( error, res ) ) return;

          if ( resultados[0].total > 1 ) {
            sql = consultas.crearCompetencia;
            parametros = [nombreCompetencia, idGenero, idDirector, idActor];
      
            bd.conexion.query( sql, parametros, ( error, resultados ) => {
              if ( bd.manejarError( error, res ) ) return;
          
              res.sendStatus( codigoHttp.created );
            } );
          } else {
            res.status( codigoHttp.unprocessableEntity )
               .send( 'No existen al menos 2 películas para los filtros aplicados.' );
          };
        } );
      } else {
        res.status( codigoHttp.unprocessableEntity )
           .send( 'Ya existe una competencia con este nombre.' );
      };
    } );
  };

  //Obtien el nombre de una competencia por su id
  this.obtenerNombrePorId = ( bd, idCompetencia, res ) => {
    let sql = consultas.nombreCompetenciaPorId;

    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
  
      if ( bd.existenResultados( resultados, res ) ) {
        let respuesta;
        respuesta = resultados[0];
        res.send( respuesta );
      };
    } );
  };

  //Borra todos los votos de una competencia (usa boorado lógico)
  this.borrarVotosPorId = ( bd, idCompetencia, res ) => {
    let sql = consultas.borrarVotosDeCompetencia;

    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
  
      res.sendStatus( codigoHttp.accepted );
    } );
  };

  //Actualiza el nombre de una competencia
  this.actualizarNombrePorId = ( bd, nombre, idCompetencia, res ) => {
    let sql = consultas.actualizarNombreCompetencia;

    bd.conexion.query( sql, [nombre, idCompetencia], ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
  
      res.sendStatus( codigoHttp.accepted );
    } );
  };

  //Elimina una competencia (usa boorado lógico)
  this.eliminarPorId = ( bd, idCompetencia, res ) => {
    let sql = consultas.eliminarCompetencia;

    bd.conexion.query( sql, idCompetencia, ( error, resultados ) => {
      if ( bd.manejarError( error, res ) ) return;
  
      res.sendStatus( codigoHttp.accepted );
    } );
  };
};


//Módulos exportados
module.exports = {
  Competencia
}