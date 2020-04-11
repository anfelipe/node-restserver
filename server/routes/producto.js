const express = require('express');
let Producto = require('../models/producto');
let { error } = require('./utils');
let { verificaToken } = require('../midlewares/autenticacion');
let app = express();

/*Consulta todos */
app.get('/producto', verificaToken, (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    let options = {
        disponible: req.query.estado || true
    }

    Producto.find(options)
        .skip(desde)
        .limit(limite)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            //error(err, res);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });
});

/*Consulta por Id */
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                //return error(err, res, 'El Id no es correcto', 500);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: mensaje
                    }
                });
            }

            res.json({
                ok: true,
                producto
            });
        });
});

/*Buscar Productos */
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            //error(err, res);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });

});

/*Crea*/
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        error(err, res, mensaje = '', 500);

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});

/*Actualiza */
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        //error(err, res, '', 500);

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
            //return error(err, res, 'El id no existe');
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save((err, prodcutoUpdate) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: prodcutoUpdate
            });
        });
    });
});

/*Elimina */
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let campos = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, campos, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            //error(err, res, 'El Id no existe');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'producto borrado'
        });
    });
});

module.exports = app;