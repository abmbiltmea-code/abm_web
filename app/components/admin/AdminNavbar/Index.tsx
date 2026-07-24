"use client";

import ClientSideLink from "@/app/(admin)/admin/client-side-link";
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
    { name: "Home", href: "/admin/home", icon: Home },
    { name: "About", href: "/admin/about", icon: Info },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Sectors", href: "/admin/sectors", icon: Building2 },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Careers", href: "/admin/careers", icon: BriefcaseBusiness },
    {
      name: "Contact",
      href: "/admin/contact",
      icon: Phone,
      hasChild: true,
      children: [
        { name: "Main Page", href: "/admin/contact" },
        { name: "Enquiries", href: "/admin/contact/enquiry" },
      ],
    },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "Divisions (Services)", href: "/admin/divisions", icon: Workflow },
    { name: "Gallery", href: "/admin/gallery", icon: GalleryVerticalIcon },
    { name: "Certifications", href: "/admin/certifications", icon: ShieldCheck },
    { name: "Clients", href: "/admin/clients", icon: Handshake },
    { name: "How We Work", href: "/admin/how-we-work", icon: Workflow },
    {
      name: "Forms",
      href: "/admin/forms/home-enquiry",
      icon: FormIcon,
      hasChild: true,
      children: [
        { name: "Home Enquiries", href: "/admin/forms/home-enquiry" },
        { name: "Contact Enquiries", href: "/admin/forms/contact-enquiry" },
        { name: "Career Enquiries", href: "/admin/forms/career-enquiry" },
      ],
    },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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