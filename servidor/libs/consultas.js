//Archivo donde se agrupan todas las consultas a la base de datos 

//Obtiene todas las competencias que esten activas
const cargarCompetencias = "SELECT id, nombre " +
                           "FROM competencia " + 
                           "WHERE activa = 'S'";

//Obtiene el nombre de una competencia según id                           
const nombreCompetenciaPorId = "SELECT com.nombre, " + 
                                      "gen.nombre as genero_nombre, " +
                                      "dir.nombre as director_nombre, " +
                                      "act.nombre as actor_nombre " +
                               "FROM competencia com " +
                               "LEFT JOIN genero gen " +
                               "ON com.genero_id = gen.id " +
                               "LEFT JOIN director dir " + 
                               "ON com.director_id = dir.id " +
                               "LEFT JOIN actor act " + 
                               "ON com.actor_id = act.id " +
                               "WHERE com.activa = 'S' AND " +
                               "com.id = ? ";                            
                                
//Obtiene dos películas de forma aleatoria de una competencia según id de la misma,
//así mismo los condicionales del inner join competencia se encargan de realizar
//los filtros por genero, director y actor solo en los casos en los que esos campos
//en la tabla competencia no son nulos                        
const peliculasPorCompetencia = "SELECT pel.id, pel.titulo, pel.poster " +
                                "FROM pelicula pel " +
                                "INNER JOIN actor_pelicula acp " +
                                "ON  pel.id = acp.pelicula_id " +
                                "INNER JOIN director_pelicula drp " +
                                "ON  pel.id = drp.pelicula_id " +
                                "INNER JOIN competencia com " +
                                "ON  (com.genero_id IS NULL OR pel.genero_id = com.genero_id) AND " +
                                "    (com.director_id IS NULL OR drp.director_id = com.director_id) AND " +
                                "    (com.actor_id IS NULL OR acp.actor_id = com.actor_id ) " +
                                "WHERE com.id = ? AND " +
                                "      com.activa = 'S' " +
                                "GROUP BY pel.id, pel.titulo, pel.poster " +
                                "ORDER BY RAND() " +
                                "LIMIT 2 ";

//Agrega un voto a la película seleccionada de una competencia
//la columna activa de la tabla, inicia con 'S' "competencia activa"
const agregarVotoCompetencia = "INSERT INTO voto(competencia_id, pelicula_id) " +
                               "VALUES( ?, ? )";

//Obtiene las tres películas más votadas por competencia
//junto con el total de votos de cada una 
const peliculasMasVotadas = "SELECT pel.id, pel.titulo, pel.poster, " +
                            "COUNT(vot.pelicula_id) as votos " +
                            "FROM pelicula pel " +
                            "INNER JOIN voto vot " +
                            "ON pel.id = vot.pelicula_id " + 
                            "INNER JOIN competencia com " + 
                            "ON vot.competencia_id = com.id " +
                            "WHERE com.activa = 'S' AND " +
                            "com.id = ? " + 
                            "GROUP BY pelicula_id " +
                            "ORDER BY votos DESC " + 
                            "LIMIT 3 ";

//Obtiene el total de películas por filtros genero, director, actor
//aplica los filtros en la clausula WHERE solo donde es aplica
const totalPeliculasPorFiltros = "SELECT COUNT(DISTINCT(pel.id)) AS total " +
                                 "FROM pelicula pel " +
                                 "INNER JOIN director_pelicula drp " +
                                 "ON  pel.id = drp.pelicula_id " +
                                 "INNER JOIN actor_pelicula acp " +
                                 "ON  pel.id = acp.pelicula_id " +
                                 "WHERE   ( ? IS NULL OR pel.genero_id = ?) AND " +
                                 "        ( ? IS NULL OR drp.director_id = ? ) AND " +
                                 "        ( ? IS NULL OR acp.actor_id = ? ) ";

//Verifica si existe una competencia por el nombre
const existePeliculaPorNombre = "SELECT id " +
                                "FROM competencia " +
                                "WHERE  nombre = ? AND " +
                                "       activa = 'S' ";

//Crea una nueva competencia en la tabla competencia
const crearCompetencia = "INSERT INTO competencia(nombre, genero_id, director_id, actor_id) " +
                         "VALUE( ?, ?, ?, ? ) ";

//Obtiene el nombre y el id de diferentes tablas
//genero, director, actor
const cargarIdNombreDeTabla = "SELECT id, nombre " +
                              "FROM ";

//Borra los votos de una competencia por id
//se usa borrado físico 
const borrarVotosDeCompetencia = "DELETE " +
                                 "FROM voto " +
                                 "WHERE competencia_id = ? ";

//actualiza solamente el nombre de una competencia por id
const actualizarNombreCompetencia = "UPDATE competencia " + 
                                    "SET nombre = ? " + 
                                    "WHERE id = ? ";  

//Elimina de forma lógica una competencia por id,   
//uso eliminación lógica debido a que en el momento del 
//borrado pueden existir datos asociados en la tabla voto
//que estan referenciados por medio de una clave foránea                                
const eliminarCompetencia = "UPDATE competencia " + 
                            "SET activa = 'N' " + 
                            "WHERE id = ? ";                                                        

//Modulos a ser exportados
module.exports = {
    cargarCompetencias,
    nombreCompetenciaPorId,
    peliculasPorCompetencia,
    agregarVotoCompetencia,
    peliculasMasVotadas,
    cargarIdNombreDeTabla,
    totalPeliculasPorFiltros,
    existePeliculaPorNombre,
    crearCompetencia,
    borrarVotosDeCompetencia,
    actualizarNombreCompetencia,
    eliminarCompetencia
};