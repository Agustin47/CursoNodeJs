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


let getEmpleado = async(id) => {

    let empleadoDb = empleados.find(empleado => empleado.id === id)

    if (!empleadoDb) {
        throw new Error(`no existe ${id}`);
    } else {
        return empleadoDb;
    }

}



let getSalario = async(empleado) => {

    let salario = salarios.find((salario) => salario.id === empleado.id);

    if (!salario) {
        throw new Error(`No se encontró salario para ${empleado.nombre}`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salario.salario
        };
    }
}


let getInformacion = async(id) => {

    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);

    return `${empleado.nombre} tiene un sal ${salario.salario}`;
}

getInformacion(1)
    .then(mensaje => console.log(mensaje))
    .catch(er => console.log(er));