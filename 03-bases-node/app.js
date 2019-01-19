// const fs = require('fs');
// const fs = require('express'); //no nativos de node
// const fs = require('./ path'); //archivos nuestros (onpremise) 


// Importamos multiplicar.js
// const multiplicar = require('./multiplicar/multiplicar');

// multiplicar.crearArchivo(6);

// console.log(multiplicar);


// importamos desestructurando el multiplicar.js
const {
    crearArchivo,
    listar
} = require('./multiplicar/multiplicar');

// let base = 'as';

// crearArchivo(base)
//     .then(archivo => console.log(`Archivo creado ${archivo}`))
//     .catch(e => console.log(e));

// Obetenemos el parametro "base" por parametro
// node app.js --base=10
// node app.js --loquesea=10 
// ambos funcionan igual.
// let args = process.argv[2];
// let base = args.split('=')[1];


// const { argv } = require('yargs')
//     .command('listar', 'Imprime en consola la tabla de multiplicar', {
//         base: {
//             demand: true,
//             alias: 'b'
//         },
//         limite: {
//             alias: 'l',
//             default: 10
//         }
//     })
//     .command('crear', 'Genera un archivo con la tabla de multiplicar', {
//         base: {
//             demand: true,
//             alias: 'b'
//         },
//         limite: {
//             alias: 'l',
//             default: 10
//         }
//     })
//     .help();

const { argv } = require('./config/yargs');
const colors = require('colors');

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'listar':
        listar(argv.base, argv.limite)
            .then()
            .catch(e => console.log(e));
        break;
    case 'crear':
        crearArchivo(argv.base)
            .then(archivo => console.log('Archivo creado',
                colors.green(archivo), archivo.red))
            .catch(e => console.log(e));
        break;
    default:
        console.log('Commando no reconocido');
}

// const { argv } = require('yargs');