let deadpoll = {
    nombre: 'wade',
    apellido: 'winston',
    poder: 'regeneracion',
    getNombre: function() {
        return `${this.nombre} ${this.apellido}`;
    }
};

//console.log(deadpoll.getNombre());

//let nombre = deadpoll.nombre;
//let apellido = deadpoll.apellido;
//let poder = deadpoll.poder;

let { nombre: primernombre, apellido, poder } = deadpoll;

console.log(primernombre, apellido, poder);