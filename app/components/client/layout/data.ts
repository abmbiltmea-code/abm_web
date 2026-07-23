export const NAV_ITEMS = [
  { label: "ABOUT", subItems: [{ label: "Company Overview", href: "/about" }, { label: "Leadership", href: "/about/leadership" }] },
  { label: "OUR SECTORS", href: "/sectors" },
  { label: "OUR DIVISIONS", subItems: [{ label: "Construction", href: "/division/construction-division" }] },
  { label: "PROJECTS", href: "/projects" },
  { label: "CLIENTS", href: "/clients" },
  { label: "HOW WE WORK", href: "/how-we-work" },
  { label: "GALLERY", href: "/gallery" },
];

export const footerData = {
  logo: {
    src: "/assets/images/logos/header-logo.png",
  },

  address: {
    icon: "/assets/icons/footer/location.svg",
    // value: [`Al Basti <span class="font-tasa">&amp;</span> Muktha LLC`, `P.O. Box 2393, Dubai (U.A.E.)`],
    value: `P.O. Box 2393, Al Addiyar Building, Ground Floor, Sheikh Zayed Road, Dubai, U.A.E.`,
    href: "https://maps.app.goo.gl/5tCAML4NaT5EDX4Y6",
  },

  phone: {
    icon: "/assets/icons/footer/phone.svg",
    label: "PHONE",
    value: "+971 4 3439444",
    href: "tel:+97143439444",
  },

  email: {
    icon: "/assets/icons/footer/mail.svg",
    label: "EMAIL",
    value: "abmbilt@abmgroup.ae",
    href: "mailto:abmbilt@abmgroup.ae",
  },

  navLinks: [
    { label: "HOME", href: "/" },
    { label: "CERTIFICATIONS", href: "/certifications-and-accreditations" },
    { label: "HOW WE WORK", href: "/how-we-work" },
    { label: "ABOUT", href: "/about" },
    { label: "CLIENTS", href: "/clients" },
    { label: "CAREERS", href: "/careers" },
    { label: "OUR DIVISIONS", href: "/division/construction-division" },
    { label: "NEWS & MEDIA", href: "/news-and-media" },
    { label: "GALLERY", href: "/gallery" },
    { label: "PROJECTS", href: "/projects" },
    { label: "CONTACT US", href: "/contact-us" },
  ],

  legal: [
    { label: `Terms <span class="font-tasa">&amp;</span> conditions`, href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],

  socials: [
    { label: "LINKEDIN", href: "#" },
    { label: "FACEBOOK", href: "#" },
    { label: "INSTAGRAM", href: "#" },
  ],
};


export const DropdownMenuItems = [
  { label: "Certifications & Accreditations", href: "/certifications-and-accreditations", image: "/assets/images/header/certifications.jpg" },
  { label: "How We Work", href: "/how-we-work", image: "/assets/images/header/how-we-work.jpg" },
  { label: "Careers", href: "/careers", image: "/assets/images/header/careers.jpg" },
  { label: "News & Media", href: "/news-and-media", image: "/assets/images/header/news-and-media.jpg" },
  { label: "Contact Us", href: "/contact-us", image: "/assets/images/header/contact-us.jpg" },
];



export type MobileSubItem = {
  label: string;
  href: string;
};

export type MobileMenuItem = {
  label: string;
  href: string;
  subItems?: MobileSubItem[];
};

export const MobileMenuItems: MobileMenuItem[] = [
  {
    label: "About",
    href: "#",
    subItems: [
      { label: "Company Overview", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    label: "Our Sectors",
    href: "/sectors",
  },
  {
    label: "Our Divisions",
    href: "#",
    subItems: [
      { label: "Construction", href: "/division/construction-division" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Clients",
    href: "/clients",
  },
  {
    label: "How We Work",
    href: "/how-we-work",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Certifications & Accreditations",
    href: "/certifications-and-accreditations",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "News & Media",
    href: "/news-and-media",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];