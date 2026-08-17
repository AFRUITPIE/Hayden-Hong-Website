"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { AnimatedInitialsBase } from "@/components/animated-initials";
import { SearchDialog } from "@/components/search-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { TreeNode } from "@/lib/content";

function NavNode({
  node,
  pathname,
  depth,
}: {
  node: TreeNode;
  pathname: string;
  depth: number;
}) {
  const Item = depth === 0 ? SidebarMenuItem : SidebarMenuSubItem;
  const Button = depth === 0 ? SidebarMenuButton : SidebarMenuSubButton;
  // Only top-level menu items get shadcn's automatic room for a menu action.
  const actionSpacing = depth === 0 ? undefined : "pr-8";

  if (node.type === "page") {
    return (
      <Item>
        <Button
          isActive={pathname === node.url}
          render={<Link href={node.url} />}
        >
          <span>{node.title}</span>
        </Button>
      </Item>
    );
  }

  return (
    // Sections start expanded so every page is one click away.
    <Collapsible defaultOpen className="group/collapsible">
      <Item>
        {node.url ? (
          <Button
            isActive={pathname === node.url}
            className={actionSpacing}
            render={<Link href={node.url} />}
          >
            <span>{node.title}</span>
          </Button>
        ) : (
          <Button className={actionSpacing} render={<CollapsibleTrigger />}>
            <span>{node.title}</span>
          </Button>
        )}
        {node.children.length > 0 ? (
          <>
            <CollapsibleTrigger
              render={
                <SidebarMenuAction
                  aria-label={`Toggle ${node.title} section`}
                />
              }
            >
              <ChevronRightIcon className="transition-transform group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {node.children.map((child) => (
                  <NavNode
                    key={child.type === "page" ? child.url : child.title}
                    node={child}
                    pathname={pathname}
                    depth={depth + 1}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </Item>
    </Collapsible>
  );
}

export function SiteSidebar({ tree }: { tree: TreeNode[] }) {
  const pathname = usePathname();

  return (
    <Sidebar data-testid="site-sidebar">
      <SidebarHeader className="gap-3 p-3">
        <Link
          href="/"
          aria-label="Hayden Hong, home"
          className="flex items-center rounded-md px-1 py-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <AnimatedInitialsBase
            className="flex items-center text-foreground"
            svgClassName="block h-[1.2rem] w-auto overflow-visible"
            aria-label="Hayden Hong"
          />
        </Link>
        <SearchDialog />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((node) => (
                <NavNode
                  key={node.type === "page" ? node.url : node.title}
                  node={node}
                  pathname={pathname}
                  depth={0}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
