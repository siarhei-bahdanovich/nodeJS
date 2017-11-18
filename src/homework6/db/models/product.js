'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING}
  });

  Product.associate = (models) => {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews',
    });
  }

  return Product;
};