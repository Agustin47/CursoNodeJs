const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/usuarios');

const app = express();


const showError = (res, error, status) => {
    return res.status(status).json({
        ok: false,
        error
    });
}


// LogIN
app.post('/login', (req, res) => {

    let body = req.body;
    let email = null;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        if (!usuarioDB || !bcrypt.compareSync(body.password, usuarioDB.password))
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o Contraseña incorrectos'
                }
            });

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.JWT_Seed, { expiresIn: process.env.JWT_Expirate });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});

/// configuracion de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
}



app.post('/google', async(req, res) => {


    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(e => showError(res, 500, err));

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) return showError(res, err, 500);

        if (usuarioDB) {
            if (usuarioDB.google === false) return showError(res, { message: 'Debe autenticarse con credenciales normales' }, 400);


            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.JWT_Seed, { expiresIn: process.env.JWT_Expirate });


            return res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        } else {

            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {
                if (err) return showError(res, err, 500);

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.JWT_Seed, { expiresIn: process.env.JWT_Expirate });


                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });

            });
        }

    })


});


module.exports = app;