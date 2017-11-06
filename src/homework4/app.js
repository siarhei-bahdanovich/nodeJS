import express from 'express';
import bodyParser from 'body-parser';
import queryStringParser from './middlewares/query-string-parser';
import cookieParser from './middlewares/cookie-parser';

import products from './models/products';
import users from './models/users';

var app = express();
app.use(queryStringParser);
app.use(cookieParser);
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
  res.send(JSON.stringify(products));
});

app.get('/api/products/:id', (req, res) => {
  let product = products.filter((product) => product.id === req.params.id)[0];
  if (product) {
    res.send(JSON.stringify(product));
  }
  else {
    res.writeHead(404, 'Resource not found');
    res.end();
  }
});

app.get('/api/products/:id/reviews', (req, res) => {
  let product = products.filter((product) => product.id === req.params.id)[0];
  if (product) {
    res.send(JSON.stringify(product.reviews));
  }
  else {
    res.writeHead(404, 'Resource not found');
    res.end();
  }
});

app.post('/api/products', (req, res) => {
  products.push(req.body);
  res.send(req.body);
});

app.get('/api/users', (req, res) => {
  res.send(JSON.stringify(users));
});

app.get('/', (req, res) => {
  res.send('hello world');
});

export default app;