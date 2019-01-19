const { argv } = require('./config/yargs');
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let commando = argv._[0];

switch (commando) {
    case 'crear':
        console.log(porHacer.crear(argv.d));
        break;
    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('===== Por hacer ====='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('====================='.green);
        }
        break;

    case 'actualizar':
        console.log(porHacer.actualizar(argv.d, argv.completado));
        break;

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(borrar);
        break;

    default:
        console.log('Commando no reconocido.');

}