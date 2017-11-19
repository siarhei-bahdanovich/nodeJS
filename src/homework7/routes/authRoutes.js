import passport from 'passport';
import passportStrategies from '../middlewares/passport-strategies';
import authorize from '../middlewares/authorize';
import { User } from '../db/models';

const authRoutes = (app) => {
  const authenticate = (req, res) => {
    let user = new User(req.user);
    let token = user.generateToken().then((token) => {
      let response = {
        data: {
          user: { email: req.user.email, username: req.user.name }
        },
        token: token
      };

      res.send(JSON.stringify(response));
    }, (err) => {
      res.status(404).send();
    });
  }

  // Local passport strategy
  // app.post('/auth/local', passport.authenticate('local', { session: false }), (req, res) => {
  //   authenticate(req, res);
  // });

  // Google passport strategy
  app.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read']
  }), (req, res) => {
    authenticate(req, res);
  });

  // Twitter passport strategy
  app.get('/auth/twitter', passport.authenticate('twitter'), (req, res) => {
    authenticate(req, res);
  });


  // Facebook passport strategy
  app.get('/auth/facebook', passport.authenticate('facebook', { session: false }), (req, res) => {
    authenticate(req, res);
  });

  app.post('/auth/local', (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
      .then((user) => {
        req.user = user;
        authenticate(req, res);
      }).catch(() => {
        res.status(404).send();
      })
  });

  app.all('/api/*', authorize);
}

export default authRoutes;