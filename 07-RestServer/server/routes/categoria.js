const express = require('express')

const { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');

let app = express();

let Categoria = require('../models/categoria');

// =====================================
// Obtiene todas las categorias
// =====================================
app.get('/categoria', (req, res) => {
    Categoria.find({})
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            res.json({
                ok: true,
                categorias
            });
        });
});

// =====================================
// Obtiene la categoria por Id
// =====================================
app.get('/categoria/:id', (req, res) => {
    Categoria.findById(req.params.id, (err, categoria) => {
        if (err)
            return res.status(400).json({
                ok: false,
                error: err
            });
        res.json({
            ok: true,
            categoria
        });
    })

});

// =====================================
// Crea una categoria
// =====================================
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                error: err
            });

        if (!categoriaDB)
            return res.status(400).json({
                ok: false,
                error: err
            });

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// =====================================
// Actualiza las categorias
// =====================================
app.put('/categoria/:id', (req, res) => {

    let categoriaUpdate = { descripcion: req.body.descripcion };
    Categoria.findByIdAndUpdate(req.params.id, categoriaUpdate, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                error: err
            });

        if (!categoriaDB)
            return res.status(400).json({
                ok: false,
                error: err
            });

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// =====================================
// Elimina una categoria.
// =====================================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solamente un administrador puede eliminar una categoria

    Categoria.findByIdAndRemove(req.params.id, (err, categoriaDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                error: err
            });


        res.json({
            ok: true,
            categoria: categoriaDB,
            mensaje: 'Categoria borrada'
        });
    });

});






module.exports = app;