import mongoose from "mongoose";

const careersSchema = new mongoose.Schema({
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
    title: { type: String },
    items: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: String },
          imageAlt: { type: String },
        },
      ],
      default: [],
    },
  },
  thirdSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    subTitle: { type: String },
    description: { type: String },
    mail: { type: String },
    jobs: {
      type: [
        {
          isHidden: { type: Boolean, default: false },
          title: { type: String },
          category: { type: String },
          slug: { type: String },
          specs: {
            location: { type: String },
            experience: { type: String },
            type: { type: String },
          },
          content: { type: String },
        },
      ],
      default: [],
    },
  },
});

export default mongoose.models.careers ||
  mongoose.model("careers", careersSchema);
