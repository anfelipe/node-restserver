/*Puertos*/
process.env.PORT = process.env.PORT || 3000;
process.env.DB = process.env.DB || 27017;

/*Entorno*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*Token
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 dias
 */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/*Seed desarrollo*/
process.env.SEED = process.env.SEED || 'seed-desarrollo';

/*Base de Datos */
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = `mongodb://localhost:${process.env.DB}/cafe`;
} else {
    urlDB = process.env.MONGO_URLDB;
}

process.env.URLDB = urlDB;