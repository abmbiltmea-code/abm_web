"use client";

import ClientSideLink from "@/app/(admin)/4bm-4dm1n/client-side-link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Info,
  Users,
  Building2,
  FolderKanban,
  BriefcaseBusiness,
  Newspaper,
  ShieldCheck,
  Handshake,
  Workflow,
  FormIcon,
  Settings,
  GalleryVerticalIcon,
  Phone,
  Layers,
  Route,
  LayoutDashboard,
} from "lucide-react";

const AdminNavbar = () => {
  const pathname = usePathname();

  const navItems: {
    group?: string;
    name: string;
    href: string;
    icon: typeof Home;
    exact?: boolean;
    hasChild?: boolean;
    children?: { name: string; href: string }[];
  }[] = [
    { name: "Dashboard", href: "/4bm-4dm1n", icon: LayoutDashboard, exact: true },
    { group: "Pages", name: "Home", href: "/4bm-4dm1n/home", icon: Home },
    { name: "About", href: "/4bm-4dm1n/about", icon: Info },
    { name: "Team", href: "/4bm-4dm1n/team", icon: Users },
    { name: "Sectors", href: "/4bm-4dm1n/sectors", icon: Building2 },
    { name: "Projects", href: "/4bm-4dm1n/projects", icon: FolderKanban },
    { name: "Careers", href: "/4bm-4dm1n/careers", icon: BriefcaseBusiness },
    {
      name: "Contact",
      href: "/4bm-4dm1n/contact",
      icon: Phone,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/4bm-4dm1n/contact" },
        { name: "Enquiries", href: "/4bm-4dm1n/contact/enquiry" },
      ],
    },
    { group: "Content", name: "News", href: "/4bm-4dm1n/news", icon: Newspaper },
    { name: "Divisions (Services)", href: "/4bm-4dm1n/divisions", icon: Layers },
    { name: "Gallery", href: "/4bm-4dm1n/gallery", icon: GalleryVerticalIcon },
    { name: "Certifications", href: "/4bm-4dm1n/certifications", icon: ShieldCheck },
    { name: "Clients", href: "/4bm-4dm1n/clients", icon: Handshake },
    { name: "How We Work", href: "/4bm-4dm1n/how-we-work", icon: Route },
    {
      group: "Submissions & System",
      name: "Forms",
      href: "/4bm-4dm1n/forms/home-enquiry",
      icon: FormIcon,
      hasChild: true,
      children: [
        { name: "Home Enquiries", href: "/4bm-4dm1n/forms/home-enquiry" },
        { name: "Contact Enquiries", href: "/4bm-4dm1n/forms/contact-enquiry" },
        { name: "Career Enquiries", href: "/4bm-4dm1n/forms/career-enquiry" },
      ],
    },
    { name: "Settings", href: "/4bm-4dm1n/settings", icon: Settings },
  ];

  const isItemActive = (item: (typeof navItems)[number]) => {
    const ownMatch =
      pathname === item.href ||
      (!item.exact && pathname?.startsWith(`${item.href}/`));
    const childMatch = item.children?.some(
      (child) => pathname === child.href || pathname?.startsWith(`${child.href}/`),
    );
    return Boolean(ownMatch || childMatch);
  };


  const [openLink, setOpenLink] = useState<string | null>(() => {
    const activeParent = navItems.find(
      (item) => item.hasChild && isItemActive(item),
    );
    return activeParent?.href ?? null;
  });


  useEffect(() => {
    const activeParent = navItems.find(
      (item) => item.hasChild && isItemActive(item),
    );
    setOpenLink(activeParent?.href ?? null);
  }, [pathname]);

  return navItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <div key={index}>
        {item.group && (
          <p
            className={`px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${
              index === 0 ? "pt-1" : "pt-5"
            }`}
          >
            {item.group}
          </p>
        )}
        <ClientSideLink
          href={item.href}
          name={item.name}
          icon={<Icon className="h-4 w-4" />}
          isOpen={openLink === item.href}
          setOpenLink={setOpenLink}
          hasChild={item.hasChild}
          isActiveOverride={isItemActive(item)}
        >
          {item.children}
        </ClientSideLink>
      </div>
    );
  });
};

export default AdminNavbar;
