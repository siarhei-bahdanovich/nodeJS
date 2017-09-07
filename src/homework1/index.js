import config from './config/config';
import User from './models/user';
import Product from './models/product';

console.log(config.name);
let user = new User();
let product = new Product();