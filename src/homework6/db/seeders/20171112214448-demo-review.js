'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      title: 'Good product',
      author: 'John Doe',
      productId: 1,
      text: 'Really good product!',
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now')
    }], {});
  },

  down: (queryInterface, Sequelize) => { }
};
