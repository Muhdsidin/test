"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  PlusSquare,
  Calendar,
  FileTextIcon,
  Activity,
  Album,
  UsersRound
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const BlogItems = [
  { href: "/admin/posts", label: "BlogList", icon: LayoutDashboard },
  { href: "/admin/posts/new", label: "Create-Blog", icon: PlusSquare },


];

const HireItems = [
  { href: "/admin/hiring", label: "Hire-Someone", icon: Calendar },
  { href: "/admin/hiring/careers", label: "Careers", icon: Calendar },
  // { href: '/admin/careers', label: 'Careers', icon: Calendar },
];

const ActivityItems = [
  { href: "/admin/activity", label: "Activity", icon: Album },
];

const FormItems = [
    { href: "/admin/form", label: "Message", icon: FileTextIcon },
    { href: "/admin/consultant", label: "Consultant", icon: UsersRound },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      <hr />
      <span className="px-4 py-2 text-sm font-semibold">Blog</span>

      {BlogItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={
                pathname === item.href ||
                (item.href === "/admin/posts" &&
                  pathname.startsWith("/admin/posts/") &&
                  pathname !== "/admin/posts/new")
              }
              className="w-full"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-headline">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      <hr />
      <span className="px-4 py-2 text-sm font-semibold">Careers</span>

      {HireItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={
                pathname === item.href ||
                (item.href === "/admin/posts" &&
                  pathname.startsWith("/admin/posts/") &&
                  pathname !== "/admin/posts/new")
              }
              className="w-full"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-headline">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}

      <hr />
      <span className="px-4 py-2 text-sm font-semibold">Business Activity</span>

      {ActivityItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={
                pathname === item.href ||
                (item.href === "/admin/posts" &&
                  pathname.startsWith("/admin/posts/") &&
                  pathname !== "/admin/posts/new")
              }
              className="w-full"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-headline">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}



       <hr />
      <span className="px-4 py-2 text-sm font-semibold">Messages & Consultant</span>

      {FormItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={
                pathname === item.href ||
                (item.href === "/admin/posts" &&
                  pathname.startsWith("/admin/posts/") &&
                  pathname !== "/admin/posts/new")
              }
              className="w-full"
              tooltip={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-headline">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
