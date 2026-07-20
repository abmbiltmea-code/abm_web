"use client";

import ClientSideLink from "@/app/(admin)/admin/client-side-link";
import { useState } from "react";
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
  Map,
  Settings,
  Phone,
} from "lucide-react";

interface SolutionItem {
  _id: string;
  bannerSection: {
    title: string;
  };
  isHidden: boolean;
}

const AdminNavbar = () => {
  const [openLink, setOpenLink] = useState<string | null>(null);
  const navItems = [
    { name: "Home", href: "/admin/home", icon: Home },

    { name: "About", href: "/admin/about", icon: Info },

    {
      name: "Team",
      href: "/admin/team",
      icon: Users,
      hasChild: true,
      children: [{ name: "Main Page", href: "/admin/team" }],
    },

    {
      name: "Sectors",
      href: "/admin/sectors",
      icon: Building2,
      hasChild: true,
      children: [{ name: "Main Page", href: "/admin/sectors" }],
    },

    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
    },

    {
      name: "Careers",
      href: "/admin/careers",
      icon: BriefcaseBusiness,
    },

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

    {
      name: "News",
      href: "/admin/news",
      icon: Newspaper,
    },

    {
      name: "Divisions (Service)",
      href: "/admin/divisions",
      icon: Workflow,
    },

    {
      name: "Certifications",
      href: "/admin/certifications",
      icon: ShieldCheck,
    },

    {
      name: "Clients",
      href: "/admin/clients",
      icon: Handshake,
    },

    {
      name: "How We Work",
      href: "/admin/how-we-work",
      icon: Workflow,
    },

    {
      name: "Navigation",
      href: "/admin/navigation",
      icon: Map,
    },

    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

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
      >
        {item.children}
      </ClientSideLink>
    );
  });
};

export default AdminNavbar;
