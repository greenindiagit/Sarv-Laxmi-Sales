// models/productAdd.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: [String], required: true },
});

const productAdd = mongoose.model('Product', productSchema);

export default productAdd;
