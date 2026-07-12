import { px } from "framer-motion";

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/assets/images/home/hero/sl01.jpg",
    title:
      "BUILDING DUBAI’S MOST ICONIC LANDMARKS SINCE 1974 ",
    subtitle: "A Legacy of Quality",
    description: "One of Dubai's longest-standing construction companies ",
  },
  {
    id: 2,
    image: "/assets/images/home/hero/sl02.jpg",
    title: "BUILDING DUBAI’S MOST ICONIC LANDMARKS SINCE 1974 ",
    subtitle: "Triple ISO Certified ",
    description: "Committed to quality, safety and environmental responsibility ",
  },
  {
    id: 3,
    image: "/assets/images/home/hero/sl03.jpg",
    title: "BUILDING DUBAI’S MOST ICONIC LANDMARKS SINCE 1974 ",
    subtitle: "Unlimited A Class Contractor ",
    description: "Authorised to build projects of any scale or value ",
  },
  {
    id: 4,
    image: "/assets/images/home/hero/sl04.jpg",
    title: "BUILDING DUBAI’S MOST ICONIC LANDMARKS SINCE 1974 ",
    subtitle: "Trusted by Dubai's Leading Names",
    description: "Serving royal establishments, government bodies and prominent developers",
  },
  {
    id: 5,
    image: "/assets/images/home/hero/sl05.jpg",
    title: "BUILDING DUBAI’S MOST ICONIC LANDMARKS SINCE 1974 ",
    subtitle: "A Group Built for Construction ",
    description: "In-house MEP, ducting and specialist manufacturing under one roof ",
  },
];

export const aboutSectionData = {
  label: "About Us",
  title: "SUCCESS IS A JOURNEY, NOT A DESTINATION",
  description: `Founded in 1974, <span class='font-parabolica-medium'>Al Basti <span class="font-tasa">&amp;</span> Muktha LLC (ABM)</span> is one of Dubai's leading building and civil construction companies, playing a significant role in the development and transformation of the city's skyline over five decades.`,
  logo: "/assets/images/logos/50years.svg",
  stats: [
    { value: "900", suffix: "+", label: "Engineering & Managerial Staff" },
    { value: "200", suffix: "+", label: "Projects Delivered" },
    { value: "6000", suffix: "+", label: "Manpower Strength" },
  ],
};

export const coreCapabilitiesSectionData = {
  label: "SERVICES",
  title: "CORE CAPABILITIES",
  description:
    "ABM delivers a full range of building and civil construction services across diverse project types, with a consistent focus on quality, safety and timely delivery. ",
  capabilityCards: [
    {
      id: "construction",
      title: "CONSTRUCTION",
      description:
        " From high-rise towers and villa developments to schools and infrastructure, every project is managed through structured planning and supported by dedicated engineering, QA/QC and HSE teams.",
      image: "/assets/images/home/capabilities/01.jpg",
      buttonText: "VIEW MORE",
      href: "#",
    },
    {
      id: "value-engineering",
      title: "VALUE ENGINEERING",
      description:
        " Drawing on decades of practical experience, ABM works with clients and consultants to identify opportunities for cost and programme optimisation without compromising quality or design intent.",
      image: "/assets/images/home/capabilities/02.jpg",
      buttonText: "VIEW MORE",
      href: "#",
    },
    {
      id: "design-build",
      title: "DESIGN & BUILD",
      description:
        "ABM engages from project inception, contributing to design efficiency, buildability and cost planning. Taking full responsibility for both design coordination and construction delivery, ensures a well-integrated approach from the earliest stages through to final handover.",
      image: "/assets/images/home/capabilities/03.jpg",
      buttonText: "VIEW MORE",
      href: "#",
    },
  ],
};

export const sectorsData = {
  label: "Key Industries",
  title: "Our Sectors",
  description:
    "ABM's experience spans a broad range of building typologies across Dubai's most significant development sectors. ",
  tabs: [
    {
      id: "residential",
      title: "Residential",
      description:
        "From villa communities and high-rise towers to waterfront residences, ABM has delivered some of Dubai's most prominent residential developments.",
      image: "/assets/images/home/sectors/01.jpg",
      icon: "/assets/images/home/sectors/icons/1.svg",
      href: "#",
      buttonText: "View Projects",
    },
    {
      id: "institution",
      title: "Institution",
      description:
        "Government headquarters, knowledge facilities and school buildings delivered across Dubai for public sector clients and educational institutions.",
      image: "/assets/images/home/sectors/02.jpg",
      icon: "/assets/images/home/sectors/icons/2.svg",
      href: "#",
      buttonText: "View Projects",
    },
    {
      id: "hospitality",
      title: "Hospitality",
      description:
        "Five-star hotels and resorts constructed to the exacting standards of world-class operators, including the Hyatt Regency and Royal Mirage Resort.",
      image: "/assets/images/home/sectors/03.jpg",
      icon: "/assets/images/home/sectors/icons/3.svg",
      href: "#",
      buttonText: "View Projects",
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      description:
        "Port infrastructure, supply facilities and processing buildings, including the landmark MINA Jebel Ali Port Container Terminal.",
      image: "/assets/images/home/sectors/04.jpg",
      icon: "/assets/images/home/sectors/icons/4.svg",
      href: "#",
      buttonText: "View Projects",
    },
    {
      id: "commercial",
      title: "Commercial",
      description:
        "Office buildings, business parks and mixed-use developments for some of Dubai's most active developers and government entities.",
      image: "/assets/images/home/sectors/05.jpg",
      icon: "/assets/images/home/sectors/icons/5.svg",
      href: "#",
      buttonText: "View Projects",
    },
  ],
};

export const whyAbmData = {
  title: "WHY ABM",
  description:
    "Built on five decades of consistent delivery, strong client relationships and a genuine commitment to quality on every project.",
  items: [
    {
      icon: "/assets/images/home/why-abm/1.svg",
      title: "Uncompromising Safety Standards ",
    },
    {
      icon: "/assets/images/home/why-abm/2.svg",
      title: "In-House Engineering Capabilities",
    },
    {
      icon: "/assets/images/home/why-abm/3.svg",
      title: "On-Time & On-Budget Delivery ",
    },
    {
      icon: "/assets/images/home/why-abm/4.svg",
      title: "Client Collaborative Approach ",
    },
  ],
};

export const ourProjectsData = {
  label: "FEATURED WORK",
  title: "OUR PROJECTS",
  description:
    "ABM's portfolio spans some of the most prestigious addresses in Dubai, from high-rise residential towers and five-star hotels to government facilities and major infrastructure projects. ",
  buttonText: "VIEW ALL PROJECTS",
  href: "/projects",
  projects: [
    {
      image: "/assets/images/home/projects/01.jpg",
      title: "Hyatt Regency - Creek Heights  ",
      location: "Dubai Healthcare City",
      href: "/projects/hyatt-regency-creek-heights",
    },
    {
      image: "/assets/images/home/projects/02.jpg",
      title: "Vida Residence",
      location: "Downtown Dubai",
      href: "/projects/vida-residence",
    },
    {
      image: "/assets/images/home/projects/03.jpg",
      title: "The Peninsula Five ",
      location: "Business Bay",
      href: "/projects/the-peninsula-five",
    },
    {
      image: "/assets/images/home/projects/04.jpg",
      title: "Grosvenor House - II",
      location: "Dubai Marina",
      href: "/projects/grosvenor-house-ii",
    },
  ],
};

export const clientsConsultantsData = {
  label: "TRUSTED CLIENTS",
  title: "CLIENTS & CONSULTANTS",
  description:
    "From royal establishments and government bodies to the UAE's most prominent real estate developers, ABM has built lasting working relationships across Dubai's public and private sectors. Repeat business from its clients remains the strongest testament to the company's performance. ",
  rowOne: [
    { name: "Wasl Properties", logo: "/assets/images/home/clients/1.png" },
    { name: "Sharaf Group", logo: "/assets/images/home/clients/2.png" },
    { name: "Union", logo: "/assets/images/home/clients/3.png" },
    { name: "Oasis Mall", logo: "/assets/images/home/clients/4.png" },
    { name: "Client 5", logo: "/assets/images/home/clients/5.png" },
    { name: "Edutech", logo: "/assets/images/home/clients/6.png" },
  ],
  rowTwo: [
    { name: "Edutech", logo: "/assets/images/home/clients/7.png" },
    { name: "Oasis", logo: "/assets/images/home/clients/8.png" },
    { name: "Edutech", logo: "/assets/images/home/clients/9.png" },
    { name: "Client Red", logo: "/assets/images/home/clients/1.png" },
    {
      name: "Dubai Healthcare City",
      logo: "/assets/images/home/clients/2.png",
    },
    { name: "TECOM Group", logo: "/assets/images/home/clients/3.png" },
  ],
};

export const contactSectionData = {
  backgroundImage: "/assets/images/home/contact/bg.jpg",
  backgroundImageMobile: "/assets/images/home/contact/bg-mobile.jpg",
  title: "LET'S BUILD SOMETHING GREAT TOGETHER",
  description:
    "Whether you have a new development in mind or would like to learn more about how ABM can support your project, our team is ready to assist. ",
  contactInfo: [
    {
      icon: "/assets/images/home/contact/icons/office.svg",
      title: "OFFICE",
      // value: `Al Basti <span class="font-tasa">&amp;</span> Muktha LLC <span class="inline-block h-3.5 md:h-[20px] w-px md:w-[2px] mx-[5px] bg-white/60 align-middle"></span> P.O. Box 2393, Dubai (U.A.E.)`,
      value: `P.O. Box 2393, Al Addiyar Building, Ground Floor, Sheikh Zayed Road, Dubai, U.A.E.`,
      href: "https://maps.app.goo.gl/5tCAML4NaT5EDX4Y6",
    },
    // {
    //   icon: "/assets/images/home/contact/icons/phone.svg",
    //   title: "PHONE",
    //   value: "+971 4 3439444",
    //   href: "tel:+97143439444",
    // },
    // {
    //   icon: "/assets/images/home/contact/icons/mail.svg",
    //   title: "E-MAIL",
    //   value: "abmbilt@abmgroup.ae",
    //   href: "mailto:abmbilt@abmgroup.ae",
    // },
  ],
};
