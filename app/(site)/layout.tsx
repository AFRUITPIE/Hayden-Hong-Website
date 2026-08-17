import type { CSSProperties, ReactNode } from "react";
import { getPageTree } from "@/lib/content";
import { SiteSidebar } from "@/components/site-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Wider than the 16rem default so nested page titles fit without truncating.
const SIDEBAR_WIDTH = { "--sidebar-width": "18rem" } as CSSProperties;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider style={SIDEBAR_WIDTH}>
      <SiteSidebar tree={getPageTree()} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur md:hidden">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
