"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function ProjectsPage() {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6" suppressHydrationWarning>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Projects</h2>
            <p className="text-muted-foreground">
              Track initiatives, milestones, and delivery status.
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Projects
                <Badge variant="secondary">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>This section is under active development.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We are preparing project tracking tools for the admin team. Check back shortly.
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
