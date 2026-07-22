import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    script: { type: String },
  },
  bannerSection: {
    isHidden: {
      type: Boolean,
      default: false,
    },
    image: { type: String },
    imageAlt: { type: String },
    title: { type: String },
  },
  firstSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
  },
  secondSection: {
    isHidden: { type: Boolean, default: false },
    image: { type: String },
    imageAlt: { type: String },
    title: { type: String },
    description: { type: String },
    name: { type: String },
    designation: { type: String },
  },
  thirdSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
    items: {
      type: [
        {
          image: { type: String },
          imageAlt: { type: String },
          name: { type: String },
          designation: { type: String },
        },
      ],
      default: [],
    },
  },
  fourthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
});

export default mongoose.models.team || mongoose.model("team", teamSchema);
