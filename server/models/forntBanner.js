import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  company: {
    type: String, // ✅ should be text
    required: true,
  },
  bannerImg: {
    type: String,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1, // 1 = active, 0 = inactive
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("forntBanner", bannerSchema);
