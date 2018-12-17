//Archivo servidor de la aplicación 
//Importamos dotenv para no exportar las variables de entorno
require('dotenv').config();
//Importamos el archivo base de la aplicación web
const app = require( './app' );
const port = 8080;

app.listen( port, () => {
	console.log( `Servidor corriendo en puerto: ${port}` );
	console.log( 'Endpoints:' )
	console.log( ` [GET] http://localhost:${port} \n`,
				 `[GET] http://localhost:${port}/administrar \n`);
} );
