import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    subTitle: { type: String },
    description: { type: String },
    items: {
      type: [
        {
          icon: { type: String },
          iconAlt: { type: String },
          value: { type: String },
          label: { type: String },
        },
      ],
      default: [],
    },
  },
  secondSection: {
    isHidden: { type: Boolean, default: false },
    video: { type: String },
    videoAlt: { type: String },
    poster: { type: String },
    posterAlt: { type: String },
  },
  thirdSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    items: {
      type: [
        {
          icon: { type: String },
          iconAlt: { type: String },
          title: { type: String },
          description: { type: String },
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
          image: { type: String },
          imageAlt: { type: String },
          title: { type: String },
          description: { type: String },
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
          image: { type: String },
          imageAlt: { type: String },
          year: { type: String },
          title: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
  },
  sixthSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    items: {
      type: [
        {
          icon: { type: String },
          iconAlt: { type: String },
          title: { type: String },
          description: { type: String },
          button: {
            text: { type: String },
            link: { type: String },
          },
        },
      ],
      default: [],
    },
  },
  seventhSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    items: {
      type: [
        {
          image: { type: String },
          imageAlt: { type: String },
          title: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
  },
  eighthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
});

export default mongoose.models.about || mongoose.model("about", aboutSchema);
