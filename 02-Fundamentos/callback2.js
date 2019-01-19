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


let getEmpleado = (id, callback) => {
    let empleadoDb = empleados.find(empleado => empleado.id === id)

    // console.log(empleadoDb);

    if (!empleadoDb) {
        return callback(`no existe ${id}`);
    } else {
        return callback(null, empleadoDb);
        // callback(null, empleadoDb);
    }
}

let callbackEmpleado = (err, empleado) => {
    if (err) {
        return console.log(err);
    }
    // console.log(empleado);
    return empleado;
};

let getSalario = (empleado, callback) => {

    let salario = salarios.find((salario) => salario.id === empleado.id);

    if (!salario) {
        callback(`No se encontró salario para ${empleado.nombre}`);
    } else {
        let empleadoSalario = {
            nombre: empleado.nombre,
            salario: salario.salario
        };
        callback(null, empleadoSalario);
    }

}

let callbackSalario = (err, salario) => {
    if (err) {
        return console.log(err);
    }
    console.log(salario);
}

let em = getEmpleado(1, callbackEmpleado);

getSalario(getEmpleado(3, callbackEmpleado), callbackSalario)