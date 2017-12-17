const request = require('request');
const { apiBaseUrl } = require('../config');
const handleResponse = require('./handlers/response-handler');

const citiesUrl = `${apiBaseUrl}/cities`;

getAllCities = (req, res) => {
  console.log('Executing request: getAllCities ' + citiesUrl);

  request.get(citiesUrl, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

createCity = (req, res) => {
  console.log('Executing request: createCity ' + citiesUrl);

  request.post(citiesUrl, { form: req.body, headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

updateCity = (req, res) => {
  console.log('Executing request: updateCity ' + citiesUrl);

  var id = req.swagger.params.id.value;
  request.put(`${citiesUrl}/${id}`, { form: req.body, headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

deleteCity = (req, res) => {
  console.log('Executing request: delete ' + citiesUrl);

  var id = req.swagger.params.id.value;
  request.delete(`${citiesUrl}/${id}`, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

module.exports = {
  getAllCities: getAllCities,
  createCity: createCity,
  updateCity: updateCity,
  deleteCity: deleteCity
};