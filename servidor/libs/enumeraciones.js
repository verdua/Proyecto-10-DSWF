//Archivo donde se almacenan todas las enumeraciones 
//necesarias para dar más coherencia a los diferentes 
//códigos usados en la app

//Códigos de error http
httpStatusCode = {
	ok					: 200,
	created				: 201,
	accepted			: 202,
	badRequest 			: 400,
	notFound 			: 404,
	unprocessableEntity : 422,
	internalServerError : 500
};

//Módulos exportados
module.exports = {
	httpStatusCode
}