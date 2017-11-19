import { ObjectID } from 'mongodb';

const products = [{
  _id: new ObjectID(),
  name: 'Super product 1',
  description: 'Description Description Description Description Description',
  reviews: [{
    title: 'Good product',
    author: 'John Doe',
    text: 'Really good product!'
  }]
}, {
  _id: new ObjectID(),
  name: 'Yet another product (2)',
  description: 'Description2 Description2 Description2 Description2'
}];

export default products;