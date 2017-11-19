import { City } from '../db/models';
import { lodash as _ } from 'lodash';

const cityRoutes = (app) => {
  app.get('/api/cities', (req, res) => {
    City.find({}).then(cities => {
      res.send(JSON.stringify(cities));
    })
  });

  app.put('/api/cities/:id', (req, res) => {
    let newCity = new City(req.body);
    City.findOneAndUpdate({ _id: req.params.id }, newCity).then((city) => {
      res.send(city);
    }, () => {
      newCity.save().then((city) => {
        res.send(city);
      });
    })
  });

  app.delete('/api/cities/:id', (req, res) => {
    City.findOneAndRemove({ _id: req.params.id }).then((city) => {
      res.status(200).send(JSON.stringify(city));
    }).catch(() => {
      res.status(404).send();
    })
  });

  app.post('/api/cities', (req, res) => {
    let city = new City(req.body);

    city.save().then((city) => {
      res.send(city);
    })
  });
}

export default cityRoutes;