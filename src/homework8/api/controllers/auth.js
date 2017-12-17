const request = require('request');
const handleResponse = require('./handlers/response-handler');

const { authBaseUrl } = require('../config');

local = (req, res) => {
  console.log('Executing request: local ' + authBaseUrl);

  request.post(`${authBaseUrl}/local`, { form: req.body }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

facebook = (req, res) => {
  console.log('Executing request: facebook ' + authBaseUrl);

  request.get(`${authBaseUrl}/facebook`, null, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

twitter = (req, res) => {
  console.log('Executing request: twitter ' + authBaseUrl);

  request.get(`${authBaseUrl}/twitter`, null, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

google = (req, res) => {
  console.log('Executing request: google ' + authBaseUrl);

  request.get(`${authBaseUrl}/google`, null, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

module.exports = {
  local: local,
  facebook: facebook,
  twitter: twitter,
  google: google
};