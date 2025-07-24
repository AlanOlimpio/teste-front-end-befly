import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme/theme-toggle";
export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-4 pt-6 max-sm:pt-8">
        <div className="flex px-8 max-sm:px-5 gap-3">
          <SidebarTrigger />
          <ThemeToggle />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
