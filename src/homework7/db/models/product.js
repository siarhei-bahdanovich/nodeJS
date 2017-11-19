import mongoose from 'mongoose';

let ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  reviews: [{
    access: { title: String },
    author: { type: String },
    text: { type: String }
  }],
  lastModifiedDate: {
    type: Date
  }
});

ProductSchema.pre('save', function (next) {
  let product = this;
  product.lastModifiedDate = new Date();
  next();
});

let Product = mongoose.model('Product', ProductSchema);

export default Product;