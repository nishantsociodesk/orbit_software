"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useAuth } from "@/contexts/AuthContext";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isLoginPage = pathname.includes("/login");
  const { loading } = useAuth();

  if (isLoginPage) {
    return <main className="w-full h-full min-h-screen">{children}</main>;
  }

  if (loading) {
    return (
      <main className="w-full h-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
