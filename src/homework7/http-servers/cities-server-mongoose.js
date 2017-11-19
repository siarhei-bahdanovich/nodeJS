const http = require('http');
const mongoose = require('mongoose');
import City from '../db/models/city';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/hw7', { useMongoClient: true });

http.createServer((req, res) => {
  City.count({}, (err, totalNumOfCities) => {
    let nextCityNumber = Math.floor(Math.random() * totalNumOfCities);

    City.find({}).skip(nextCityNumber).limit(1).exec((err, cities) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cities[0]));
    });
  });

}).listen(3000);