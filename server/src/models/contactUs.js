import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  contactMessage: String,
  termsAccepted: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Create model
const ContactUs = mongoose.model("ContactUs", contactSchema);

// ✅ Default export
export default ContactUs;
