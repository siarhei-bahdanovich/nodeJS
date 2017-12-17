const request = require('request');
const { apiBaseUrl } = require('../config');
const handleResponse = require('./handlers/response-handler');

const usersUrl = `${apiBaseUrl}/users`;

getAllUsers = (req, res) => {
  console.log('Executing request: getAllUsers ' + usersUrl);

  request.get(usersUrl, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

deleteUser = (req, res) => {
  console.log('Executing request: delete ' + usersUrl);

  var id = req.swagger.params.id.value;
  request.delete(`${usersUrl}/${id}`, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  deleteUser: deleteUser
};