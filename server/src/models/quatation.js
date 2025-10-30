import mongoose from "mongoose";
const quateSchema = new mongoose.Schema({
  sealType: {
    type: String,
    required: true,
  },
  quantityRange: {
    type: String,
    required: true,
  },
  sealColour: {
    type: String,
    required: true,
  },
  customizationPrinting: {
    type: String,
    required: true,
  },
  deliveryLocation: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  whatsAppNo: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Quatation = mongoose.model('Quatation', quateSchema);

// ✅ Default export
export default Quatation;