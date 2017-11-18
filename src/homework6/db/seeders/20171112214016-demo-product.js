'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Super product 1',
      description: 'Description Description Description Description Description',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now')
    },
    {
      name: 'Yet another product (2)',
      description: 'Description2 Description2 Description2 Description2',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now')
    }], {});
  },

  down: (queryInterface, Sequelize) => { }
};
