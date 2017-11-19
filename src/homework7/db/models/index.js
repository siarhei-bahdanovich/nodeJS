import mongoose from 'mongoose';
import User from './user';
import Product from './product';
import City from './city';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/hw7');

module.exports = { User, Product, City };