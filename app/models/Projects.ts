import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  locations: {
    type: [
      {
        title: { type: String },
      },
    ],
    default: [],
  },
  statuses: {
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
        featured: { type: Boolean, default: false },
        status: { type: mongoose.Schema.Types.ObjectId },
        location: { type: mongoose.Schema.Types.ObjectId },
        division: { type: mongoose.Schema.Types.ObjectId },
        sector: { type: mongoose.Schema.Types.ObjectId },
        thumbImage: { type: String },
        thumbImageAlt: { type: String },
        images: {
          type: [
            {
              url: { type: String },
              alt: { type: String },
            },
          ],
          default: [],
        },
        client: { type: String },
        consultant: { type: String },
        duration: { type: String },
        projectValue: { type: String },
        content: { type: String },
        scopeOfWorks: {
          items: {
            type: [
              {
                title: { type: String },
              },
            ],
            default: [],
          },
        },
      },
    ],
    default: [],
  },
});

export default mongoose.models.project ||
  mongoose.model("project", projectSchema);
