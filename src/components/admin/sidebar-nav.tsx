'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, LayoutDashboard, PlusSquare , Calendar } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/posts', label: 'Blogs', icon: LayoutDashboard },
  { href: '/admin/posts/new', label: 'Create-Blog', icon: PlusSquare },
  { href: '/admin/hiring', label: 'Hire-Someone', icon: Calendar },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href || (item.href === '/admin/posts' && pathname.startsWith('/admin/posts/')) && pathname !== '/admin/posts/new' }
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
