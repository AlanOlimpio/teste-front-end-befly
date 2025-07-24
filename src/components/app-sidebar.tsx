import { ChevronUp, List, User2, X, } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";

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
  const { logout } = useAuth();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <div className="flex justify-end items-center">
            {isMobile && (<Button variant="outline" size="icon" className="size-8" onClick={() => { setOpenMobile(false) }}>
              <X />
            </Button>)}
          </div>
          <SidebarGroupLabel className="text-1xl/9 font-bold mb-2 text-foreground">Hotéis</SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => { setOpenMobile(false) }}
                    isActive={pathname === item.url}
                    variant="outline"
                  >
                    <Link to={item.url} >
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => logout()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
