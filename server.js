'use strict';
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json');
const wetherHandler = require('./Modules/Weather');
const getMoviesHandler = require('./Modules/Movies');
const cors = require('cors');
server.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3060;
// let arr = [];
//localhost:3060/
server.get('/', rootHandler);
//localhost:3060/getCity?cityLan=31.9515694&cityLon=35.9239625
server.get('/getCity', cityHandler);

//localhost:3060/
function rootHandler(req, res) {
  res.send('Hello you are in the root , I\'m Roaa');
}
//localhost:3060/getCity?cityLan=31.9515694&cityLon=35.9239625
function cityHandler(req, res) {
  let lan = req.query.cityLan;
  let lon = req.query.cityLon;
  let getCity = weatherData.city.find((item) => {
    if (item.lat === lan && item.lon === lon) return item.city_name;
  });
  res.send(getCity);
}

//localhost:3060/forcast?lat=31.5126057&lon=34.42573776

server.get('/forcast', wetherHandler);


server.get('/movies', getMoviesHandler);

//localhost:3060 .....
server.get('*', (req, res) => {
  res.status(404).send('sorry, this page not found');
});
server.listen(process.env.PORT || 3060, () => {
  console.log(`Listening on PORT ${PORT}`);
});
