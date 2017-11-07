import authorize from '../middlewares/authorize';
import { Product, products } from '../models/products';

const productRoutes = (app) => {
  app.get('/api/products', authorize, (req, res) => {
    res.send(JSON.stringify(products));
  });

  app.get('/api/products/:id', authorize, (req, res) => {
    Product.findById(req.params.id).then((product) => {
      res.send(JSON.stringify(product));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.get('/api/products/:id/reviews', authorize, (req, res) => {
    Product.findById(req.params.id).then((product) => {
      res.send(JSON.stringify(product.reviews));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.post('/api/products', authorize, (req, res) => {
    products.push(req.body);
    res.send(req.body);
  });
}

export default productRoutes;