import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { User } from '../db/models';

const passportStrategies = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
    User.findByCredentials(username, password)
      .then((user) => { done(null, user); })
      .catch(() => { done(null, false, 'Bad email/password combination'); })
  }));

  passport.use(new GoogleStrategy({
    clientID: '684378724118-pfg8d4r1l288fhj8scb06rgtk5lp4j4p.apps.googleusercontent.com',
    clientSecret: 'ExOpBuIuZntMtQfP9fEOpwFX',
    callbackURL: "http://localhost:3000/auth/google"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleProfileId: profile.id }).then((user) => {
      let error = user === null ? "Authentication failed." : false;
      return done(error, user ? user.toObject() : null);
    });
  }));

  passport.use(new TwitterStrategy({
    consumerKey: 'ErgtUePGhVSJV390PF7vBoOw8',
    consumerSecret: 'mlf9w3kIvj46nKYaPhspycjb0oTan3uXw02fjoq5NnGFXLluIy',
    callbackURL: "http://localhost:3000/auth/twitter"
  }, (token, tokenSecret, profile, done) => {
    User.findOne({ twitterProfileId: profile.id }).then((user) => {
      let error = user === null ? "Authentication failed." : false;
      return done(error, user ? user.toObject() : null);
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: '1958400274481090',
    clientSecret: 'adddf568c8f87add97197974af6f8fde',
    callbackURL: "http://localhost:3000/auth/facebook"
  }, (token, tokenSecret, profile, done) => {
    User.findOne({ facebookProfileId: profile.id }).then((user) => {
      let error = user === null ? "Authentication failed." : false;
      return done(error, user ? user.toObject() : null);
    });
  }));
}

export default passportStrategies;