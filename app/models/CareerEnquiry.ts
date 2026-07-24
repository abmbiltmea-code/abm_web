import mongoose from "mongoose";

const careerEnquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    currentLocation: { type: String, required: true },
    appliedFor: { type: String, required: true },
    message: { type: String, default: "" },
    cvUrl: { type: String, required: true },
    cvFileName: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.CareerEnquiry ||
  mongoose.model("CareerEnquiry", careerEnquirySchema);