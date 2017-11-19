import { Product } from '../db/models';

const productRoutes = (app) => {
  app.get('/api/products', (req, res) => {
    Product.find({}).then(products => {
      res.send(JSON.stringify(products));
    })
  });

  app.get('/api/products/:id', (req, res) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
      res.send(JSON.stringify(product));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.get('/api/products/:id/reviews', (req, res) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
      res.send(JSON.stringify(product.reviews));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.post('/api/products', (req, res) => {
    let product = new Product({
      name: req.body.name,
      description: req.body.description
    });

    product.save().then((product) => {
      res.send(product);
    })
  });

  app.delete('/api/products/:id', (req, res) => {
    Product.findOneAndRemove({ _id: req.params.id }).then((product) => {
      res.status(200).send(JSON.stringify(product));
    }).catch(() => {
      res.status(404).send();
    })
  });
}

export default productRoutes;