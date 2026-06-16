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
    image: "/assets/images/home/hero/slide-1.jpg",
    title:
      "Focused on Al Basti & Muktha Legacy and Position as a Leading Contractor",
    subtitle: "The Future of Construction",
    description: "With a commitment to precision, safety, and timely execution",
  },
  {
    id: 2,
    image: "/assets/images/home/hero/slide-1.jpg",
    title: "Building Tomorrow's Landmarks With Unmatched Expertise",
    subtitle: "Excellence in Every Detail",
    description: "From groundbreaking to handover",
  },
];

export const aboutSectionData = {
  label: "About Us",
  title: "SUCCESS IS A JOURNEY, NOT A DESTINATION",
  description:
    "Founded in 1974, <span class='font-parabolica-medium'>Al Basti & Muktha LLC (ABM)</span> is widely regarded amongst the leading building and civil construction companies in the UAE. ABM have contributed to the rapidly changing face of Dubai, driven to success by the enthusiasm and efforts of its staff and project partners.",
  logo: "/assets/images/logos/50years.svg",
  stats: [
    { value: "100", suffix: "+", label: "Employees" },
    { value: "500", suffix: "+", label: "Iconic Projects" },
    { value: "6000", suffix: "+", label: "Manpower Strength" },
  ],
};

export const coreCapabilitiesSectionData = {
  label: "SERVICES",
  title: "CORE CAPABILITIES",
  description:
    "Our Divisions & Services position us among the leading building and civil construction companies. We deliver complete solutions in construction, infrastructure, and engineering with a strong focus on quality, safety, and timely execution.",
  capabilityCards: [
    {
      id: "construction",
      title: "CONSTRUCTION",
      description:
        "Construction focuses on delivering complete building solutions with quality, safety, and timely execution across all project phases.",
      image: "/assets/images/home/capabilities/1.jpg",
      buttonText: "VIEW MORE",
      href: "/services/construction",
    },
    {
      id: "value-engineering",
      title: "VALUE ENGINEERING",
      description:
        "Value Engineering focuses on optimizing project costs without compromising quality or performance. It requires smarter material selection.",
      image: "/assets/images/home/capabilities/2.jpg",
      buttonText: "VIEW MORE",
      href: "/services/value-engineering",
    },
    {
      id: "design-build",
      title: "DESIGN & BUILD",
      description:
        "Design & Build integrates planning, design, and construction into a single streamlined process for efficient project delivery.",
      image: "/assets/images/home/capabilities/3.jpg",
      buttonText: "VIEW MORE",
      href: "/services/design-build",
    },
  ],
};

export const sectorsData = {
  label: "Key Industries",
  title: "Our Sectors",
  description:
    "Our Divisions & Services position us among the leading building and civil construction companies.",
  tabs: [
    {
      id: "residential",
      title: "Residential",
      description:
        "We deliver quality residential projects, creating modern, durable, and comfortable living spaces.",
      image: "/assets/images/home/sectors/1.jpg",
      icon: "/assets/images/home/sectors/icons/1.svg",
      href: "/projects?sector=residential",
      buttonText: "View Projects",
    },
    {
      id: "institution",
      title: "Institution",
      description:
        "We construct purpose-built institutional facilities with precision, safety, and longevity in mind.",
      image: "/assets/images/home/sectors/2.jpg",
      icon: "/assets/images/home/sectors/icons/2.svg",
      href: "/projects?sector=institution",
      buttonText: "View Projects",
    },
    {
      id: "hospitality",
      title: "Hospitality",
      description:
        "From boutique hotels to large-scale resorts, we bring world-class hospitality environments to life.",
      image: "/assets/images/home/sectors/3.jpg",
      icon: "/assets/images/home/sectors/icons/3.svg",
      href: "/projects?sector=hospitality",
      buttonText: "View Projects",
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      description:
        "Our infrastructure expertise spans roads, bridges, utilities, and large-scale civil engineering works.",
      image: "/assets/images/home/sectors/4.jpg",
      icon: "/assets/images/home/sectors/icons/4.svg",
      href: "/projects?sector=infrastructure",
      buttonText: "View Projects",
    },
    {
      id: "commercial",
      title: "Commercial",
      description:
        "We design and build high-performance commercial spaces that support modern business needs.",
      image: "/assets/images/home/sectors/5.jpg",
      icon: "/assets/images/home/sectors/icons/5.svg",
      href: "/projects?sector=commercial",
      buttonText: "View Projects",
    },
  ],
};

export const whyAbmData = {
  title: "WHY ABM",
  description:
    "We don't just build structures; we build trust. Our commitment to safety, innovation, and sustainable practices sets us apart in the industry. With ABM, you gain a partner dedicated to bringing your vision to life with precision and excellence.",
  items: [
    {
      icon: "/assets/images/home/why-abm/1.svg",
      title: "UNCOMPROMISING SAFETY STANDARDS",
    },
    {
      icon: "/assets/images/home/why-abm/2.svg",
      title: "INNOVATIVE TECHNOLOGY INTEGRATION",
    },
    {
      icon: "/assets/images/home/why-abm/3.svg",
      title: "ON-TIME & ON-BUDGET DELIVERY",
    },
    {
      icon: "/assets/images/home/why-abm/4.svg",
      title: "CLIENT COLLABORATIVE APPROACH",
    },
  ],
};

export const ourProjectsData = {
  label: "FEATURED WORK",
  title: "OUR PROJECTS",
  description:
    "Explore our diverse portfolio of successfully delivered projects across commercial, residential, institutional, and infrastructure sectors. Each project reflects our commitment to quality, innovation, safety, and excellence in construction.",
  buttonText: "VIEW ALL PROJECTS",
  href: "/projects",
  projects: [
    {
      image: "/assets/images/home/projects/1.jpg",
      title: "JUMEIRAH LIVING BUSINESS BAY",
      location: "Dubai",
      href: "/projects/jumeirah-living-business-bay",
    },
    {
      image: "/assets/images/home/projects/2.jpg",
      title: "VIDA RESIDENCE DOWNTOWN",
      location: "Dubai",
      href: "/projects/vida-residence-downtown",
    },
    {
      image: "/assets/images/home/projects/3.jpg",
      title: "PALACE BEACH",
      location: "Dubai Harbour",
      href: "/projects/palace-beach",
    },
    {
      image: "/assets/images/home/projects/4.jpg",
      title: "BURJ CROWN",
      location: "Downtown Dubai.",
      href: "/projects/burj-crown",
    },
  ],
};

export const clientsConsultantsData = {
  label: "TRUSTED CLIENTS",
  title: "CLIENTS & CONSULTANTS",
  description:
    "Our major clients trust us for quality, reliability, and on-time project delivery across diverse sectors.",
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
  title: "LET'S BUILD SOMETHING GREAT TOGETHER",
  description:
    "Ready to start your next project? Get in touch with our team of experts for a consultation or quote.",
  contactInfo: [
    {
      icon: "/assets/images/home/contact/icons/office.svg",
      title: "OFFICE",
      value: "Al Basti & Muktha LLC | P.O. Box 2393, Dubai (U.A.E.)",
    },
    {
      icon: "/assets/images/home/contact/icons/phone.svg",
      title: "PHONE",
      value: "+971 4 3439444",
    },
    {
      icon: "/assets/images/home/contact/icons/mail.svg",
      title: "E-MAIL",
      value: "abmbilt@emirates.net.ae",
    },
  ],
};
