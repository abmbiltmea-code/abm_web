import image from "next/image";

export const relatedTopicsData = {
  label: "RELATED TOPICS",
  viewAllHref: "/news-and-media",
  items: [
    {
      id: "1",
      date: "11/05/2026",
      category: "Construction",
      title: "NEW COMMERCIAL TOWER PROJECT BEGINS",
      image: "/assets/images/news-details/1.jpg",
      href: "/news-and-media/new-commercial-tower-project-begins",
    },
    {
      id: "2",
      date: "11/05/2026",
      category: "Infrastructure",
      title: "SUSTAINABLE CONSTRUCTION PRACTICES",
      image: "/assets/images/news-details/2.jpg",
      href: "/news-and-media/sustainable-construction-practices",
    },
  ],
};

export const newsDetailData = {
  category: "Construction",
  publishDate: "11/05/2026",
  title: "RECOGNIZED FOR EXCELLENCE IN CONSTRUCTION INDUSTRY",
  contentHtml: `
    <p class="mb-5 sm:mb-40">Our company has been honored with an industry excellence award for delivering high-quality construction projects and maintaining outstanding safety standards. This recognition reflects our dedication to innovation, reliability, and customer satisfaction across all ongoing developments.</p>

    <img src="/assets/images/news-details/main.jpg" alt="Construction skyline" />

    <p class="mt-5 sm:mt-40 mb-4 sm:mb-6 3xl:mb-[30px]">This achievement reflects our commitment to adopting innovative construction techniques and smart technologies that improve project efficiency and enhance long-term building performance. Through careful planning, professional project management, and attention to detail, we continue to create developments that support modern lifestyles and future urban growth.</p>
    <p class="mb-60">One of the major factors behind this recognition is our strong focus on workplace safety and operational excellence. The company follows strict safety regulations, conducts regular training sessions, and ensures that all project sites maintain internationally recognized safety standards. By prioritizing employee well-being and risk management, we have successfully created safer and more productive working environments across all our projects.</p>

    <h2 class="mb-[15px] sm:mb-5">ACHIEVEMENT HIGHLIGHTS</h2>
    <ul>
      <li>Recognized for excellence in construction quality and project execution</li>
      <li>Awarded for maintaining high safety and operational standards</li>
      <li>Successfully completed multiple projects with timely delivery</li>
      <li>Strong focus on sustainable and environmentally responsible construction</li>
    </ul>

    <h2 class="mt-60 mb-[15px] sm:mb-5">LOOKING AHEAD</h2>
    <p>As the company continues to expand its presence in the construction industry, we remain committed to delivering sustainable, and high-quality developments that exceed client expectations. This award inspires us to continue pushing boundaries, embracing new techniques, and setting higher benchmarks for excellence in the construction sector.</p>

    <h2 class="mt-60 mb-[15px] sm:mb-5">COMMITMENT TO QUALITY</h2>
    <p>Quality remains at the core of every project we deliver. From planning and design to construction and final execution, our team focuses on precision, durability, and modern construction practices to ensure long-lasting results.</p>

    <h2 class="mt-60 mb-[15px] sm:mb-5">INNOVATION & TECHNOLOGY</h2>
    <p>The company continues to adopt modern technologies and smart construction solutions to improve project quality, efficiency, and overall performance. Innovation plays a key role in delivering future-ready developments.</p>

    <h2 class="mt-60 mb-[15px] sm:mb-5">KEY HIGHLIGHTS</h2>
    <ul>
      <li>Excellence in construction quality</li>
      <li>Strong workplace safety standards</li>
      <li>Sustainable building practices</li>
    </ul>
  `,
};

export const ctaData = {
  title: "Explore Our Work ",
  description:
    `Ready to start your next project<span class="font-tasa">?</span> Get in touch with our team of experts for a consultation or quote.`,
  image: "/assets/images/about/cta.jpg",
};