const http = require('http');
const { MongoClient } = require('mongodb');

http.createServer((req, res) => {

  MongoClient.connect('mongodb://localhost:27017/hw7', (error, db) => {
    if (error) {
      return console.log('Unable to connect to mongo db server');
    }

    db.collection('Cities').count().then((totalNumOfCities) => {
      let nextCityNumber = Math.floor(Math.random() * totalNumOfCities);

      db.collection('Cities').find().skip(nextCityNumber).limit(1).toArray((err, cities) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cities[0]));
      });
    })
  });

}).listen(3000);