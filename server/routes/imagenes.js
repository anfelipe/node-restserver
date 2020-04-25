const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificaTokenImg } = require('../midlewares/autenticacion');

let app = express();

app.get('/imagen/:tipo/:foto', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.foto;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let pathImg = path.resolve(__dirname, '../assets/original.jpg');
        res.sendFile(pathImg);
    }
});

module.exports = app;