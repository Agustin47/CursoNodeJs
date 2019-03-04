const http = require('http');


http.createServer((req, res) => {

    res.writeHead(200, { 'content-type': 'application/json' });
    let salida = {
        nombre: 'fernando',
        edad: 32,
        url: req.url
    }

    res.write(JSON.stringify(salida));
    // res.write('hola mundo');
    res.end();
}).listen(8080);

console.log('escuchando puesto 8080');