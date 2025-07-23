import { List, X, } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const menuItems = [
  {
    title: "Lista",
    url: "/",
    icon: List,
  },
];

export function AppSidebar() {
  const { setOpenMobile, isMobile } = useSidebar();
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-end items-center">
            {isMobile && (<Button variant="secondary" size="icon" className="size-8" onClick={() => { setOpenMobile(false) }}>
              <X />
            </Button>)}
          </div>
          <SidebarGroupLabel className="text-1xl/9 font-bold mb-2">Hotéis</SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => { setOpenMobile(false) }}
                    isActive={pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
