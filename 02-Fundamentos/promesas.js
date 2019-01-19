let empleados = [{
    id: 1,
    nombre: 'fercho'
}, {
    id: 2,
    nombre: 'juan'
}, {
    id: 3,
    nombre: 'sole'
}];

let salarios = [{
    id: 1,
    salario: 100
}, {
    id: 2,
    salario: 2000
}];


let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        let empleadoDb = empleados.find(empleado => empleado.id === id)

        if (!empleadoDb) {
            return reject(`no existe ${id}`);
        } else {
            return resolve(empleadoDb);
        }
    });

}



let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {
        let salario = salarios.find((salario) => salario.id === empleado.id);

        if (!salario) {
            reject(`No se encontró salario para ${empleado.nombre}`);
        } else {
            let empleadoSalario = {
                nombre: empleado.nombre,
                salario: salario.salario
            };
            resolve(empleadoSalario);
        }
    });
}


getEmpleado(3).then(
        empleado => {
            return getSalario(empleado);
        })
    .then(resp => {
        console.log(`el salario de ${empleado.nombre} es ${resp.salario}`);
    })
    .catch(err => {
        console.log(err);
    });