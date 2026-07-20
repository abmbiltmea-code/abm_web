import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    script: { type: String },
  },
  firstSection: {
    isHidden: {
      type: Boolean,
      default: false,
    },
    items: [
      {
        image: String,
        imageAlt: String,
        title: String,
        subTitle: String,
        subDescription: String,
      },
    ],
  },
  secondSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    iconAlt: { type: String },
    items: {
      type: [
        {
          value: { type: String },
          label: { type: String },
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
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
  },
  fifthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
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
  sixthSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
    button: {
      text: { type: String },
      link: { type: String },
    },
  },
  seventhSection: {
    isHidden: { type: Boolean, default: false },
    sectionLabel: { type: String },
    title: { type: String },
    description: { type: String },
    items: {
      type: [
        {
          image: { type: String },
          imageAlt: { type: String },
        },
      ],
      default: [],
    },
  },
  eighthSection: {
    isHidden: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
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
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);
