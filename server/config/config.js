/*Puertos*/
process.env.PORT = process.env.PORT || 3000;
process.env.DB = process.env.DB || 27017;

/*Entorno*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*Base de Datos */
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = `mongodb://localhost:${process.env.DB}/cafe`;
} else {
    urlDB = process.env.MONGO_URLDB;
}

process.env.URLDB = urlDB;