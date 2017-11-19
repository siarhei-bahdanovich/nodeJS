import { User } from '../db/models';

const userRoutes = (app) => {

  app.get('/api/users', (req, res) => {
    let users = User.find({}).then((users) => {
      res.send(JSON.stringify(users));
    })
      .catch(() => { res.status(404).send() });
  });

  app.delete('/api/users/:id', (req, res) => {
    User.findOneAndRemove({ _id: req.params.id }).then((user) => {
      res.status(200).send(JSON.stringify(user));
    }).catch(() => {
      res.status(404).send();
    })
  });
}

export default userRoutes;