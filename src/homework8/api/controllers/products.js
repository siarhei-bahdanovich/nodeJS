const request = require('request');
const { apiBaseUrl } = require('../config');
const handleResponse = require('./handlers/response-handler');

const productsUrl = `${apiBaseUrl}/products`;

getAllProducts = (req, res) => {
  console.log('Executing request: getAllProducts ' + productsUrl);

  request.get(productsUrl, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

createProduct = (req, res) => {
  console.log('Executing request: createProduct ' + productsUrl);

  request.post(productsUrl, { form: req.body, headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

getProduct = (req, res) => {
  console.log('Executing request: getProduct ' + productsUrl);
  
    var id = req.swagger.params.id.value;
    request.get(`${productsUrl}/${id}`, { headers: req.headers }, (err, response, body) => {
      return handleResponse(err, response, body, res);
    });
};

deleteProduct = (req, res) => {
  console.log('Executing request: deleteProduct ' + productsUrl);

  var id = req.swagger.params.id.value;
  request.delete(`${productsUrl}/${id}`, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

getAllReviews = (req, res) => {
  console.log('Executing request: getAllReviews ' + productsUrl);

  var id = req.swagger.params.id.value;
  request.get(`${productsUrl}/${id}/reviews`, { headers: req.headers }, (err, response, body) => {
    return handleResponse(err, response, body, res);
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  getAllReviews: getAllReviews,
};