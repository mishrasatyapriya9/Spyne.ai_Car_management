import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
      carType: String,
      company: String,
      dealer: String,
    },
    images: [{ type: String, required: true }],
  },
  { timeStamps: true }
);

export default mongoose.model("Car", carSchema);
