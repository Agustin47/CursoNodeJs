// const axios = require('axios');

const { argv } = require('yargs').option({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad',
        demand: true
    }
});

// console.log(argv.direccion);

// let encodeUrls = encodeURI(argv.direccion);

// axios.get(`https://maps.googleapis.com/maps/api/geocode/json?adress=${encodeUrls}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)
//     .then(respuesta => {

//         console.log(JSON.stringify(respuesta.data, undefined, 2));

//         let location = respuesta.data.results[0];
//         let coors = location.geometry.location;
//         console.log('Direccion: ', location.formatted_address);
//         console.log('lat: ', coors.lat);
//         console.log('lng: ', coors.lng);

//     })
//     .catch(e => console.log(`Erro Fuerte:   ${e}`));

const lugar = require('./Lugar/lugar');
const clima = require('./Clima/clima');


// lugar.getLugarLatLng("argv.direccion")
//     .then(resp => {

//         console.log(clima.ObtenerClima(resp.lat, resp.lng));

//     })
//     .catch(e => console.log(c));


// clima.ObtenerClima(9.9280694, -84.0907246)
//     .then(temp => console.log(temp));


let getInfo = async(direccion) => {

    try {

        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.ObtenerClima(coors.lat, coors.lng);

        return `El clima en ${coors.direccion} es de ${temp}`;
    } catch (e) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }

}

getInfo(argv.direccion)
    .then(msj => console.log(msj))
    .catch(e => console.log(e));