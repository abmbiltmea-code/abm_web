import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      script: { type: String },
    },
    homePageSection: {
      title: { type: String },
      description: { type: String },
      image: { type: String },
      imageAlt: { type: String },
      buttonLink: { type: String },
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
      title: { type: String },
      image: { type: String },
      imageAlt: { type: String },
      content: { type: String },
    },
    thirdSection: {
      isHidden: { type: Boolean, default: false },
      sectionLabel: { type: String },
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
    fourthSection: {
      isHidden: { type: Boolean, default: false },
      sectionLabel: { type: String },
      title: { type: String },
      items: {
        type: [
          {
            icon: { type: String },
            iconAlt: { type: String },
            title: { type: String },
          },
        ],
        default: [],
      },
    },
    fifthSection: {
      isHidden: { type: Boolean, default: false },
      sectionLabel: { type: String },
      title: { type: String },
      description: { type: String },
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
    sixthSection: {
      isHidden: { type: Boolean, default: false },
      title: { type: String },
      button: {
        text: { type: String },
        link: { type: String },
      },
    },
    seventhSection: {
      isHidden: { type: Boolean, default: false },
      title: { type: String },
      button: {
        text: { type: String },
        link: { type: String },
      },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Division ||
  mongoose.model("division", divisionSchema);
