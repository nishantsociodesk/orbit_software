"use client"

import * as React from "react"
import {
    Info,
    ShieldCheck,
    Layout,
    Rocket,
    History,
    Save,
    RefreshCw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SystemConfig = {
    key: string
    label: string
    description: string
    value: string | boolean | number
    updated_at: string
}

export default function SettingsPage() {
    const [config, setConfig] = React.useState<SystemConfig[]>([])

    const handleToggle = (key: string) => {
        setConfig(prev => prev.map(item =>
            item.key === key ? { ...item, value: !item.value, updated_at: new Date().toISOString() } : item
        ))
    }

    const featureToggles = config.filter(c => typeof c.value === 'boolean')
    const systemInfo = config.filter(c => typeof c.value !== 'boolean')

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
                            <p className="text-muted-foreground">
                                Manage platform-level configurations and global feature flags
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button size="sm">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </div>

                    {config.length === 0 && (
                        <p className="text-sm text-muted-foreground mb-4">
                            No system settings available from the backend.
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* FEATURE CONFIGURATIONS */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-primary" />
                                        <CardTitle>Feature Controls</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Enable or disable core platform modules and onboarding flows.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {featureToggles.map((item) => (
                                        <div key={item.key} className="flex items-start justify-between space-x-4">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {item.description}
                                                </div>
                                            </div>
                                            <Switch
                                                checked={item.value as boolean}
                                                onCheckedChange={() => handleToggle(item.key)}
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-muted/30">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <History className="h-5 w-5 text-muted-foreground" />
                                        <CardTitle className="text-base">Recent Updates</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[...config]
                                        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                                        .slice(0, 3)
                                        .map((item) => (
                                            <div key={item.key} className="flex items-center justify-between text-xs">
                                                <span className="text-muted-foreground">{item.label}</span>
                                                <span className="font-mono">{new Date(item.updated_at).toLocaleString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* SYSTEM INFORMATION (READ-ONLY) */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Info className="h-5 w-5 text-primary" />
                                        <CardTitle>System Information</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Read-only details about the current platform state.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {systemInfo.map((item) => (
                                        <div key={item.key} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                                                <Badge variant="outline" className="font-mono">
                                                    {item.value}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">
                                                {item.description}
                                            </p>
                                            <Separator className="mt-4" />
                                        </div>
                                    ))}

                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Layout className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Global Themes</div>
                                                <div className="text-xs text-muted-foreground">Standardized UI templates</div>
                                            </div>
                                            <Badge className="ml-auto" variant="secondary">Active</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Rocket className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Deployment Sync</div>
                                                <div className="text-xs text-muted-foreground">Vercel Edge Network</div>
                                            </div>
                                            <Badge className="ml-auto" variant="secondary">Stable</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
