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
    urlDB = 'mongodb+srv://Ride:5aRnd1EqBvlAKOAQ@cluster0-qf7pm.mongodb.net/Cafe';
}

//urlDB = 'mongodb+srv://Ride:5aRnd1EqBvlAKOAQ@cluster0-qf7pm.mongodb.net/Cafe';

process.env.URLDB = urlDB;