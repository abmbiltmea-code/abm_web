export const bannerData = {
  title: "Projects",
  bannerImage: "/assets/images/projects/banner.jpg",
};

export const ctaData = {
  title: "Connect With Our Team ",
  description:
    "Ready to start your next project? Get in touch with our team of experts for a consultation or quote.",
  image: "/assets/images/about/cta.jpg",
};

export const sectionHeaderData = {
  label: "ABM  Projects",
  title: "Delivering Impactful Projects",
  description:
    "Explore our portfolio of completed and ongoing projects, showcasing our expertise in delivering quality, precision, and reliable execution.",
};




export type Sector =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Institutions"
  | "Infrastructure";

export type Division =
  | "Fit-out"
  | "Construction"
  | "Interior Design"
  | "MEP"
  | "Renovation";

export type Status = "Completed" | "Ongoing" | "Upcoming";

export interface Project {
  image: string;
  title: string;
  location: string;
  sector: Sector;
  division: Division;
  status: Status;
}

export const DIVISIONS: Division[] = [
  "Fit-out",
  "Construction",
  "Interior Design",
  "MEP",
  "Renovation",
];

export const SECTORS: Sector[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutions",
  "Infrastructure",
];

export const LOCATIONS: string[] = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Al Ain",
];

export const STATUSES: Status[] = ["Completed", "Ongoing", "Upcoming"];

export const PROJECTS: Project[] = [
  {
    image: "/assets/images/projects/1.jpg",
    title: "Jumeirah Living Business Bay",
    location: "Dubai",
    sector: "Residential",
    division: "Fit-out",
    status: "Completed",
  },
  {
    image: "/assets/images/projects/2.jpg",
    title: "Vida Residence Downtown",
    location: "Dubai",
    sector: "Residential",
    division: "Interior Design",
    status: "Completed",
  },
  {
    image: "/assets/images/projects/3.jpg",
    title: "Palace Beach",
    location: "Dubai",
    sector: "Residential",
    division: "Construction",
    status: "Ongoing",
  },
  {
    image: "/assets/images/projects/4.jpg",
    title: "The Peninsula Five",
    location: "Dubai",
    sector: "Residential",
    division: "Fit-out",
    status: "Ongoing",
  },
  {
    image: "/assets/images/projects/5.jpg",
    title: "One & Only Royal Mirage-Phase 111",
    location: "Dubai",
    sector: "Commercial",
    division: "Renovation",
    status: "Completed",
  },
  {
    image: "/assets/images/projects/6.jpg",
    title: "Address Sky View",
    location: "Dubai",
    sector: "Hospitality",
    division: "Fit-out",
    status: "Completed",
  },
  {
    image: "/assets/images/projects/7.jpg",
    title: "Saadiyat Cultural District",
    location: "Abu Dhabi",
    sector: "Institutions",
    division: "Construction",
    status: "Upcoming",
  },
  {
    image: "/assets/images/projects/8.jpg",
    title: "Al Maryah Central",
    location: "Abu Dhabi",
    sector: "Infrastructure",
    division: "MEP",
    status: "Ongoing",
  },
  {
    image: "/assets/images/projects/9.jpg",
    title: "Project Name",
    location: "Abu Dhabi",
    sector: "Infrastructure",
    division: "MEP",
    status: "Ongoing",
  },
  {
    image: "/assets/images/projects/10.jpg",
    title: "Project Name",
    location: "Abu Dhabi",
    sector: "Infrastructure",
    division: "MEP",
    status: "Ongoing",
  },
];