import { ObjectID } from 'mongodb';

const users = [{
  _id: new ObjectID(),
  googleProfileId: '',
  twitterProfileId: '',
  facebookProfileId: '',
  name: 'John Doe',
  email: 'john@doe.com',
  password: 'Welcome1',
  tokens: []
}, {
  _id: new ObjectID(),
  googleProfileId: '',
  twitterProfileId: '',
  facebookProfileId: '',
  name: 'Siarhei Bahdanovich',
  email: 'siarhei@bahdanovich.com',
  password: 'Welcome1'
}];

export default users;