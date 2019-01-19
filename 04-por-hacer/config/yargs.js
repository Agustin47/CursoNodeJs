// const opt = {
//     descripcion: {
//         alias: 'd',
//         demand: true,
//         desc: 'Descripción de la tarea por hacer'
//     },
//     completado: {
//         alias: 'c',
//         default: true,
//         desc: 'Marca como completado o pendiente la tarea'
//     }
// };


// const { argv } = require('yargs')
//     .command(
//         'crear',
//         'Crear un elemento por hacer', { descripcion: opt.descripcion })
//     .command(
//         'actualizar',
//         'Actualiza el estado completado de una tarea',
//         opt)
//     .command(
//         'listar',
//         'Muestra el listado de tareas', {})
//     .command(
//         'borrar',
//         'Borra un elemento de la lista', { descripcion: opt.descripcion }
//     )
//     .help();

// module.exports = {
//     argv
// }



const descripcion = {
        alias: 'd',
        demand: true,
        desc: 'Descripción de la tarea por hacer'
    },
    completado = {
        alias: 'c',
        default: true,
        desc: 'Marca como completado o pendiente la tarea'
    };


const { argv } = require('yargs')
    .command(
        'crear',
        'Crear un elemento por hacer', { descripcion })
    .command(
        'actualizar',
        'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command(
        'listar',
        'Muestra el listado de tareas', {})
    .command(
        'borrar',
        'Borra un elemento de la lista', { descripcion }
    )
    .help();

module.exports = {
    argv
}