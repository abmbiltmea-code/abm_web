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
} from "lucide-react";

const AdminNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/4bm-4dm1n/home", icon: Home },
    { name: "About", href: "/4bm-4dm1n/about", icon: Info },
    { name: "Team", href: "/4bm-4dm1n/team", icon: Users },
    { name: "Sectors", href: "/4bm-4dm1n/sectors", icon: Building2 },
    { name: "Projects", href: "/4bm-4dm1n/projects", icon: FolderKanban },
    { name: "Careers", href: "/4bm-4dm1n/careers", icon: BriefcaseBusiness },
    {
      name: "Contact",
      href: "/admin/contact",
      icon: Phone,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/4bm-4dm1n/contact" },
        { name: "Enquiries", href: "/4bm-4dm1n/contact/enquiry" },
      ],
    },
    { name: "News", href: "/4bm-4dm1n/news", icon: Newspaper },
    { name: "Divisions (Services)", href: "/4bm-4dm1n/divisions", icon: Workflow },
    { name: "Gallery", href: "/4bm-4dm1n/gallery", icon: GalleryVerticalIcon },
    { name: "Certifications", href: "/4bm-4dm1n/certifications", icon: ShieldCheck },
    { name: "Clients", href: "/4bm-4dm1n/clients", icon: Handshake },
    { name: "How We Work", href: "/4bm-4dm1n/how-we-work", icon: Workflow },
    {
      name: "Forms",
      href: "/admin/forms/home-enquiry",
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
    const ownMatch = pathname === item.href || pathname?.startsWith(`${item.href}/`);
    const childMatch = item.children?.some(
      (child) => pathname === child.href || pathname?.startsWith(`${child.href}/`),
    );
    return ownMatch || childMatch;
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
      <ClientSideLink
        key={index}
        href={item.href}
        name={item.name}
        icon={<Icon className="h-5 w-5" />}
        isOpen={openLink === item.href}
        setOpenLink={setOpenLink}
        hasChild={item.hasChild}
        isActiveOverride={isItemActive(item)}
      >
        {item.children}
      </ClientSideLink>
    );
  });
};

export default AdminNavbar;