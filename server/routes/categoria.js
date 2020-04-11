const express = require('express');
let Categoria = require('../models/categoria');
let { error } = require('./utils');
let { verificaToken, verificaAdmin_Role } = require('../midlewares/autenticacion');
let app = express();

/*Consulta todos */
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            error(err, res);

            res.json({
                ok: true,
                categorias
            });
        });
});

/*Consulta por Id */
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    Categoria.findById(id, (err, categoria) => {
        error(err, res);

        if (!categoria) {
            return error(err, res, 'El Id no es correcto', 500);
        }

        res.json({
            ok: true,
            categoria
        });
    });
});

/*Crea*/
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        error(err, res, mensaje = '', 500);

        if (!categoriaDB) {
            error(err, res);
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/*Actualiza */
app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let options = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, options, { new: true, runValidators: true }, (err, categoriaDB) => {

        error(err, res);

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/*Elimina */
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    //Usuario.findByIdAndUpdate(id, campos, { new: true }, (err, usuarioDB) => {
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        error(err, res);

        if (!categoriaDB) {
            error(err, res, 'El Id no existe');
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });
    });
});


module.exports = app;