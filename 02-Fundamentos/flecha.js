// function sumar(a, b) {
//     return a + b;
// }


// let sumar = (a, b) => a + b

// function saludar() {
//     return 'hola mundo';
// }

// let sumar = () => 'hola mundo';

// console.log(sumar(10, 20));

// function saludar(nombre) {
//     return `hola ${nombre}`;
// }


// let saludar = (nombre) => `hola ${nombre}`;

// console.log(saludar('fercho'));



let deadpoll = {
    nombre: 'wade',
    apellido: 'winston',
    poder: 'regeneracion',
    getNombre() {
        return `${this.nombre} ${this.apellido}`;
    }
};




console.log(deadpoll.getNombre());