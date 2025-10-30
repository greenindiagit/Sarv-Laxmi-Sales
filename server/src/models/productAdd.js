// models/productAdd.js
import mongoose from "mongoose";
//product master
const productMasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  description: { type: String },
  createdBy: { type: String },
  createdDate: { type: Date, default: Date.now },
});

const productMasterAdd = mongoose.model("ProductMaster", productMasterSchema);
//product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  rating: { type: String, required: true },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  image: { type: String, required: true },
  description: { type: [String], required: true },
  createdBy: { type: String, required: false },
  createdDate: { type: Date, default: Date.now },
});

const productAdd = mongoose.model("Product", productSchema);
//product type
const productTypeSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  manufacturing: { type: String },
  application: { type: String },
  features: { type: String },
  material: { type: String },
  size: { type: String },
  printing: { type: String },
  colour: { type: String },
  serialNo: { type: String },
  packing: { type: String },
  customization: { type: String },
  security: { type: String },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  image: { type: String },
  createdBy: { type: String },
  createdDate: { type: Date, default: Date.now },
});

const productType = mongoose.model("ProductType", productTypeSchema);

export { productAdd, productType, productMasterAdd };
