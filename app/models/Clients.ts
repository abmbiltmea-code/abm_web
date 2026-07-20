import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
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
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
  },
  secondSection: {
    isHidden: { type: Boolean, default: false },
    items: {
      type: [
        {
          icon: { type: String },
          iconAlt: { type: String },
        },
      ],
      default: [],
    },
  },
  thirdSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
  },
  fourthSection: {
    isHidden: { type: Boolean, default: false },
    items: {
      type: [
        {
          icon: { type: String },
          iconAlt: { type: String },
        },
      ],
      default: [],
    },
  },
  fifthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
});

export default mongoose.models.Clients ||
  mongoose.model("clients", clientsSchema);
