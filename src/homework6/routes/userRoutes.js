import { User } from '../db/models';

const userRoutes = (app) => {

  app.get('/api/users', (req, res) => {
    let users = User.findAll().then((users) => {
      res.send(JSON.stringify(users));
    })
      .catch(() => { res.status(404).send() });
  });
}

export default userRoutes;