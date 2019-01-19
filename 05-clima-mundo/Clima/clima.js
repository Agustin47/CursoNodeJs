const axios = require('axios');


const ObtenerClima = async(lat, lng) => {

    let temp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=5d6d72925d3ace6cc226952135e9e88b`);
    return temp.data.main.temp;
}



module.exports = {
    ObtenerClima
}