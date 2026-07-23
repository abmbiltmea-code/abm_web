import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    script: { type: String },
  },
  bannerSection: {
    isHidden: { type: Boolean, default: false },
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
    sectionLabel: { type: String },
  },
  categories: {
    type: [
      {
        title: { type: String },
      },
    ],
    default: [],
  },
  items: {
    type: [
      {
        isHidden: { type: Boolean, default: false },
        title: { type: String },
        slug: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId },
        date: { type: Date },
        thumbImage: { type: String },
        thumbImageAlt: { type: String },
        content: { type: String },
        cta: {
          title: { type: String },
          image: { type: String },
          imageAlt: { type: String },
          description: { type: String },
        },
      },
    ],
    default: [],
  },
});

export default mongoose.models.news || mongoose.model("news", newsSchema);
