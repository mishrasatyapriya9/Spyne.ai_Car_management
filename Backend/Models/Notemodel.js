import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the "users" collection where User model is stored
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", NoteSchema);
// 'users' we created in the mongodb database a collection where user model gonna store
