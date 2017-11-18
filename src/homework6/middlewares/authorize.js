import { User } from '../db/models'

const authorize = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    req.user = user;
    next();
  }, () => {
    res.status(401).send();
  });
};

export default authorize;