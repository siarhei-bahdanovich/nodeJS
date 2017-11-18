'use strict';

import jwt from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    googleProfileId: { type: DataTypes.STRING, allowNull: true },
    facebookProfileId: { type: DataTypes.STRING, allowNull: true },
    twitterProfileId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING },
    tokens: { type: DataTypes.ARRAY(DataTypes.TEXT) }
  });

  User.generateToken = (user) => {
    let token = jwt.sign({ id: user.id.toString(), email: user.email }, 'SomeSecretKey').toString();
    User.update(
      { 'tokens': sequelize.fn('array_append', sequelize.col('tokens'), token) },
      { 'where': { 'id': user.id } }
    );

    return token;
  }

  User.findByCredentials = (email, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({where: { email: email, password: password }}).then((user) => {
        user ? resolve(user.dataValues) : reject('User does not exist.');
      })
    })
  }

  User.findByToken = (token) => {
    return new Promise((resolve, reject) => {
      let decoded = null;
      try {
        decoded = jwt.verify(token, 'SomeSecretKey');
      }
      catch (e) {
        return reject('Authorization failed.');
      }

      User.findById(decoded.id).then((user) => {
        user ? resolve(user.dataValues) : reject('Authorization failed.');
      });
    });
  }

  return User;
};