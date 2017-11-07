import jwt from 'jsonwebtoken';

class User {

  static generateToken(user) {
    let token = jwt.sign({ id: user.id.toString(), email: user.email }, 'SomeSecretKey').toString();
    user.tokens.push(token);

    return token;
  }

  static findByCredentials(email, password) {
    return new Promise((resolve, reject) => {
      let user = users.filter((user) => user.email === email && user.password == password)[0];
      if (user) {
        resolve(user);
      }

      reject('User does not exist.');
    })
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      let user = users.filter((user) => user.id === id)[0];
      user ? resolve(user) : reject();
    });
  }

  static findByToken(token) {
    let decoded = null;
    try {
      decoded = jwt.verify(token, 'SomeSecretKey');
      console.log(decoded);
    }
    catch (e) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      console.log(decoded);
      let user = users.filter((user) => user.id === decoded.id)[0];
      user ? resolve(user) : reject('Authorization failed.');
    });
  }

  static create(id, name, email) {
    let user = {
      id: id,
      name: name,
      email: email,
      tokens: []
    };

    users.push(user);
    return user;
  }
}

const users =
  [
    {
      id: '1',
      name: 'user 1 name',
      email: 'bob@tut.by',
      password: '12345',
      tokens: []
    },
    {
      id: '2',
      name: 'user 2 name',
      email: 'alis@tut.by',
      password: '12345',
      tokens: []
    },

  ];

export { User, users };