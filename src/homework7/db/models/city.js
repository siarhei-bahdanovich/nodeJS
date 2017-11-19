import mongoose from 'mongoose';

let CitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  country: {
    type: String
  },
  capital: {
    type: Boolean
  },
  location: {
    lat: {
      type: Number
    },
    long: {
      type: Number
    }
  },
  lastModifiedDate: {
    type: Date
  }
});

CitySchema.pre('save', function (next) {
  let city = this;
  city.lastModifiedDate = new Date();
  next();
});

let City = mongoose.model('City', CitySchema, 'Cities');

export default City;