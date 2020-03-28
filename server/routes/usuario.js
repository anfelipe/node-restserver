const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    let options = {
        estado: req.query.estado || true
    }

    Usuario.find(options, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            error(err, res);

            Usuario.countDocuments(options, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });
        });
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        error(err, res);

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email,', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        error(err, res);

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let campos = {
        estado: false
    };

    // Usuario.findByIdAndRemove(id, (err, usuario) => {
    Usuario.findByIdAndUpdate(id, campos, { new: true }, (err, usuarioDB) => {
        error(err, res);

        if (usuarioDB === null) {
            error(err, res, 'Usuario no encontrado');
        }

        res.json({
            ok: true,
            usuarioDB
        });
    });
});

function error(err, res, mensaje = '') {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    } else if (mensaje != '') {
        return res.status(400).json({
            ok: false,
            err: {
                message: mensaje
            }
        });
    }
}

module.exports = app;