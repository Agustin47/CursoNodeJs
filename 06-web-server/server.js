const express = require('express');

const app = express();

const hbs = require('hbs');

require('./hbs/helpers');

const port = process.env.PORT || 3000;



app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');




app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'aGu'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

/// Salida ajax.
// app.get('/', (req, res) => {
//     // res.send('Hellow');
//     let salida = {
//         nombre: 'fernando',
//         edad: 32,
//         url: req.url
//     }
//     res.send(salida);
// });

/// Otra URL.
// app.get('/data', (req, res) => {
//     res.send('Hola data');
// })

app.listen(port, () => {
    console.log(`Escuchando en ${port}`);
});