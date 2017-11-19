import mongoose from 'mongoose';
import Product from '../models/product'
import products from './demo-product';
import User from '../models/user'
import users from './demo-user';

mongoose.Promise = global.Promise;

const populateProducts = () => {
  console.log('Inserting products');
  Product.remove({}).then(() => {
    Product.insertMany(products).then(() => {
      console.log('Products inserted successfully..');
    }, () => {
      console.log('Error occured while insering products..');
    });
  });
};

const populateUsers = () => {
  console.log('Inserting users');
  User.remove({}).then(() => {
    User.insertMany(users).then(() => {
      console.log('Users inserted successfully..');
    }, () => {
      console.log('Error occured while insering users..');
    });
  });
};

console.log('Connecting to db..');
mongoose.connect('mongodb://localhost:27017/hw7', { useMongoClient: true });

populateProducts();
populateUsers();