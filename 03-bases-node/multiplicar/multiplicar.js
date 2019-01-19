const fs = require('fs');
const colors = require('colors');


let listar = async(base, limite) => {
    if (!Number(base)) throw new Error(`La base ${base} no es un numero`);
    if (!Number(limite)) throw new Error(`El limite ${limite} no es un numero`);

    console.log('================================='.green);
    console.log(`tabla del ${base}`.green)
    console.log('================================='.green);

    for (let i = 1; i <= limite; i++) {
        console.log(`${base} * ${i} = ${base * i}`);
    }
};


let crearArchivo = async(base, limite) => {

    if (!Number(base)) throw new Error(`La base ${base} no es un numero`);
    let data = '';

    for (let i = 1; i <= limite; i++) {
        data += `${base} * ${i} = ${base * i} \n`;
    }

    fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
        if (err) throw err;
    })
    return `tablas/tabla-${base}.txt`;
};


module.exports = {
    crearArchivo,
    listar
}