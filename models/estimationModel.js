import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  stepName: { type: String, required: true },
  hours: { type: Number, required: true },
  price: { type: Number, required: true },
});

const estimationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
      default: "Unnamed Project",
    },
    projectType: {
      type: String,
    },
    memberQuantity: {
      type: Number,
    },
    receivedDate: {
      type: String,
    },
    bidDate: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "In Progress", "Review", "Completed", "Under Bidding"],
      default: "Draft",
    },
    exclusions: {
      type: String,
      default: "",
    },
    inclusions: {
      type: String,
      default: "",
    },
    remarks: {
      type: String,
      default: "",
    },
    scopeOfWork: {
      type: String,
      default: "",
    },
    scopeSubmittals: {
      type: [String],
      default: [],
    },
    drawingRequirements: {
      type: [String],
      default: [],
    },
    sendingBys: {
      type: [String],
      default: [],
    },
    projectManager: {
      type: String,
      default: "",
    },
    contactDetails: {
      type: String,
      default: "",
    },
    steps: [stepSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Estimation", estimationSchema);
