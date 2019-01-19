// setTimeout(
//     function() {
//         console.log('hola che');
//     }, 3000);


let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'fercho',
        id
    };

    if (id === 20) {
        callback(`el usu ${id}, no exitee`, null);
    } else {
        callback(null, usuario);
    }
}


getUsuarioById(20, (err, usuario) => {
    if (err) {
        return console.log(err);
    }
    console.log('Usuario de bd', usuario);
})