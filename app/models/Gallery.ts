import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
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
        images: {
          type: [
            {
              url: { type: String },
              alt: { type: String },
            },
          ],
          default: [],
        },
        category: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    default: [],
  },
});

export default mongoose.models.gallery ||
  mongoose.model("gallery", gallerySchema);
