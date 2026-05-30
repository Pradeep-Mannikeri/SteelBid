import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    demoLimit: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
