"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Palette,
    Eye,
    MoreHorizontal,
    Plus,
    Search,
    Store,
    Layers,
    Activity,
    Settings
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type Theme = {
    id: string
    name: string
    description: string
    preview_url: string
    status: string
    active_stores: number
    current_version: string
    layout_sections: Array<unknown>
}

export default function ThemesPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredThemes: Theme[] = []

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">Theme Management</h2>
                            <p className="text-muted-foreground">
                                Manage and deploy storefront themes across the platform
                            </p>
                        </div>
                        <Button className="font-medium">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Theme
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search themes..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredThemes.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            No themes available from the backend.
                        </p>
                    )}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredThemes.map((theme) => (
                            <Card key={theme.id} className="group overflow-hidden border-border/50 transition-all hover:border-primary/20 hover:shadow-lg">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <img
                                        src={theme.preview_url}
                                        alt={theme.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                                        <Button variant="secondary" size="sm" className="font-medium">
                                            Preview Theme
                                        </Button>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={theme.status === "Live" ? "default" : "secondary"} className="shadow-sm">
                                            {theme.status}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-lg font-bold">{theme.name}</CardTitle>
                                    <CardDescription className="line-clamp-1">{theme.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-3">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Store className="h-3.5 w-3.5" />
                                            <span>{theme.active_stores} active stores</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-mono">
                                            <span>v{theme.current_version}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">{theme.layout_sections.length} layout sections</span>
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter className="p-2 pt-2 px-3 flex justify-between gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs font-semibold"
                                        onClick={() => router.push(`/dashboard/themes/${theme.id}`)}
                                    >
                                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                                        Manage
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
