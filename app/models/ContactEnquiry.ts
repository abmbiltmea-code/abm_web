import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }, 
);

export default mongoose.models.ContactEnquiry ||
  mongoose.model("ContactEnquiry", contactEnquirySchema);