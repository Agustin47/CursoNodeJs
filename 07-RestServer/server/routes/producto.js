const { verificaToken } = require('../middlewares/authentication');

const express = require('express');

let app = express();

const Producto = require('../models/producto');


function showError(res, err, model) {
    if (err)
        return res.status(500).json({
            ok: false,
            error: err
        });

    if (!model)
        return res.status(400).json({
            ok: false,
            error: err
        });
}

// =======================================
// Obtenemos los productos disponibles
// =======================================
app.get('/producto', (req, res) => {

    let desde = Number(req.body.skip) || 0;

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion usuario')
        .exec((err, productosDB) => {
            showError(res, err, productosDB);

            res.json({
                ok: true,
                productos: productosDB
            });


        });
});


// =======================================
// Obtenemos los productos disponibles
// =======================================
app.get('/producto/buscar/:termino', (req, res) => {

    let termino = RegExp(req.params.termino, 'i');

    Producto.find({ nombre: termino })
        .populate('categoria', 'descripcion usuario')
        .exec((err, productosDB) => {
            showError(res, err, productosDB);

            res.json({
                ok: true,
                productos: productosDB
            });


        });
});


// =======================================
// Obtenemos los productos disponibles
// =======================================
app.post('/producto', verificaToken, (req, res) => {

    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: req.body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        showError(res, err, productoDB);
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});


// =======================================
// Obtenemos los productos disponibles
// =======================================
app.put('/producto', verificaToken, (req, res) => {

    Producto.findOneAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, (err, productoDB) => {
        showError(res, err, productoDB);

        res.status(200).json({
            ok: true,
            producto: productoDB
        });
    });
});


// =======================================
// Obtenemos los productos disponibles
// =======================================
app.delete('/producto/:id', verificaToken, (req, res) => {

    Producto.findOneAndUpdate(req.params.id, { disponible: false }, { new: true, runValidators: true }, (err, productoDB) => {

        showError(res, err, productoDB);

        res.status(200).json({
            ok: true,
            producto: productoDB
        });

    });
});






module.exports = app;