'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    productId: {
      type: DataTypes.INTEGER, references: {
        model: 'Product',
        key: 'id',
        as: 'productId',
      },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false }
  });

  return Review;
};