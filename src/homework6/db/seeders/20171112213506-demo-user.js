'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'Welcome1',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now')
    },
  {
    name: 'Siarhei Bahdanovich',
    googleProfileId: '',
    twitterProfileId: '',
    facebookProfileId: '',
    email: 'siarhei@bahdanovich.com',
    password: 'Welcome1',
    createdAt: Sequelize.fn('now'),
    updatedAt: Sequelize.fn('now')
  }
  ], { });
  },

  down: (queryInterface, Sequelize) => { }
};
