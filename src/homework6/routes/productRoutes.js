import { Product, Review } from '../db/models';

const productRoutes = (app) => {
  app.get('/api/products', (req, res) => {
    Product.findAll().then(products => {
      res.send(JSON.stringify(products));
    })
  });

  app.get('/api/products/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
      res.send(JSON.stringify(product));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.get('/api/products/:id/reviews', (req, res) => {
    Product.findById(req.params.id,
      {
        include: [{ model: Review, as: 'reviews' }]
      }).then((product) => {
        res.send(JSON.stringify(product.reviews));
      }).catch(() => {
        res.status(404).send();
      })
  });

  app.post('/api/products', (req, res) => {
    let product = Product.create(req.body);
    res.send(product);
  });
}

export default productRoutes;