import authorize from '../middlewares/authorize';
import { users } from '../models/users';

const userRoutes = (app) => {

  app.get('/api/users', authorize, (req, res) => {
    res.send(JSON.stringify(users));
  });
}

export default userRoutes;