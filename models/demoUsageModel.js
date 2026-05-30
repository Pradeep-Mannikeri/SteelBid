import mongoose from "mongoose";

const demoUsageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, "Please provide mobile number"],
      trim: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// Indexes for quick lookups on block validations
demoUsageSchema.index({ email: 1 });
demoUsageSchema.index({ mobile: 1 });
demoUsageSchema.index({ ipAddress: 1 });

export default mongoose.model("DemoUsage", demoUsageSchema);
