import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  landingNo: String,
  mobile: Number,
  email: String,
  extension: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Create model
const ContactUs = mongoose.model("ContactUs", contactSchema);

// ✅ Default export
export default ContactUs;
