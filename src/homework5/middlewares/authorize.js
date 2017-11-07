import { User } from '../models/users'

const authorize = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    req.user = user;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

export default authorize;