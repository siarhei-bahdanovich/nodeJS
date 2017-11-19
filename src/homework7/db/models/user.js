import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

let UserSchema = new mongoose.Schema({
  googleProfileId: { type: String },
  facebookProfileId: { type: String },
  twitterProfileId: { type: String },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a vlid email`
    }
  },
  password: { type: String },
  tokens: [String]
});

UserSchema.methods.generateToken = function () {
  let user = this;
  let token = jwt.sign({ id: user._id.toString(), email: user.email }, 'SomeSecretKey').toString();
  user.tokens.push(token);
  return user.update({ _id: user._id }).then(() => {
    return token;
  });
};

UserSchema.statics.findByCredentials = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email, password: password }).then((user) => {
      user ? resolve(user.toObject()) : reject('User does not exist.');
    })
  })
}

UserSchema.statics.findByToken = (token) => {
  return new Promise((resolve, reject) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, 'SomeSecretKey');
    }
    catch (e) {
      return reject('Authorization failed.');
    }

    User.findById(decoded.id).then((user) => {
      user ? resolve(user.toObject()) : reject('Authorization failed.');
    });
  });
}

UserSchema.pre('save', function (next) {
  let user = this;
  user.lastModifiedDate = new Date();
  next();
});

let User = mongoose.model('User', UserSchema);

export default User;