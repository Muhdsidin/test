import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { StartexHubLogo } from '@/components/icons/startex-hub-logo'; // Changed import
import { SidebarNav } from '@/components/admin/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            {/* Changed to StartexHubLogo, removed adjacent h1 */}
            <StartexHubLogo className="h-7 w-auto" /> 
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2 group-data-[collapsible=icon]:hidden">
          <Separator className="my-2" />
          <p className="text-xs text-sidebar-foreground/70">
            &copy; {new Date().getFullYear()} Startex Hub {/* Updated company name */}
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:px-8">
          <SidebarTrigger className="md:hidden" />
          <h2 className="font-headline text-lg font-semibold">Admin Panel</h2>
          <div>{/* Placeholder for user avatar or other actions */}</div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
