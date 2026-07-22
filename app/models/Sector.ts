import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
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
    sectors: {
      type: [
        {
          isHidden: { type: Boolean, default: false },
          title: { type: String },
          description: { type: String },
          thumbnail: { type: String },
          thumbnailAlt: { type: String },
          button: {
            text: { type: String },
            link: { type: String },
          },
          homePageImage: { type: String },
          homePageImageAlt: { type: String },
          homePageIcon: { type: String },
          homePageIconAlt: { type: String },
          homePageButton: {
            text: { type: String },
            link: { type: String },
          },
          homePageDescription: { type: String },
        },
      ],
      default: [],
    },
  },
  thirdSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    items: {
      type: [
        {
          title: { type: String },
        },
      ],
      default: [],
    },
  },
  fourthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
  fifthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
});

export default mongoose.models.sector || mongoose.model("sector", sectorSchema);
