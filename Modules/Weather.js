const axios = require('axios');
module.exports = wetherHandler;

function wetherHandler(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let key = process.env.WEATHER_API_KEY;
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;
  //https://api.weatherbit.io/v2.0/forecast/daily?lat=31.5126057&lon=34.42573776
  // console.log(lat);
  // console.log(lon);
  // console.log(key);
  // console.log('result');

  axios
    .get(weatherUrl)
    .then((result) => {
      console.log(result);
      const weatherArray = result.data.data.map((item) => {
        return new Forcast(item);
      });
      res.send(weatherArray);
    })
    .catch((err) => {
      res.send(`there is an error in getting the data => ${err}`);
    });
}
class Forcast {
  constructor(item) {
    this.description = `🌨️Low :${item.min_temp}, 🔆high : ${item.max_temp} with ${item.weather.description}`;
    this.date = item.valid_date;
  }
}
