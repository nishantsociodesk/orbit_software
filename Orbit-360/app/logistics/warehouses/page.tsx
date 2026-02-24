"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2, MapPin, Phone, Mail, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WarehousesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="space-y-1">
           <h1 className="text-3xl font-bold tracking-tight">Pickup Locations</h1>
           <p className="text-muted-foreground">
             Manage your warehouses and dispatch centers for forward orders.
           </p>
         </div>
         <Button className="shrink-0 gap-2 shadow-sm font-semibold px-6">
           <Plus className="size-5" />
           Add Warehouse
         </Button>
      </div>

      <div className="flex items-center gap-4 py-2 border-b">
         <div className="relative flex-1 max-w-md">
           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
           <Input
             placeholder="Search warehouses by name, city, or pincode..."
             className="pl-9 bg-background py-5"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
         </div>
         <Badge variant="outline" className="px-3 py-1.5 text-sm">
           All Cities
         </Badge>
         <Badge variant="outline" className="px-3 py-1.5 text-sm">
           Active Locations
         </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Placeholder for no backend list API */}
         <Card className="flex flex-col border-primary/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/80"></div>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
               <div className="space-y-1">
                 <div className="flex items-center gap-2">
                   <h3 className="font-semibold text-xl border-none m-0 p-0 leading-none">Primary Hub</h3>
                   <Badge variant="default" className="text-[10px] uppercase h-5 px-1.5 bg-green-500/10 text-green-600 hover:bg-green-500/20 shadow-none border-green-200">Default Return</Badge>
                 </div>
                 <p className="text-sm text-muted-foreground font-mono">ID: WH-9812-MAIN</p>
               </div>
               <Button variant="ghost" size="icon" className="-mr-2 -mt-2 opacity-50 hover:opacity-100">
                  <MoreVertical className="size-4" />
               </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 flex-1">
               <div className="flex items-start gap-3">
                 <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                 <p className="text-sm leading-relaxed text-foreground/80">
                   Block 12, Industrial Area, Sector 58<br/>
                   Gurugram, Haryana - 122011<br/>
                   India
                 </p>
               </div>
               <div className="flex items-center gap-3">
                 <Building2 className="size-4 text-muted-foreground shrink-0" />
                 <p className="text-sm text-foreground/80 font-medium">Rahul Kumar (Manager)</p>
               </div>
               <div className="flex items-center gap-3">
                 <Phone className="size-4 text-muted-foreground shrink-0" />
                 <p className="text-sm text-foreground/80 font-mono">+91 9876543210</p>
               </div>
               <div className="flex items-center gap-3">
                 <Mail className="size-4 text-muted-foreground shrink-0" />
                 <p className="text-sm text-foreground/80 font-mono">hub.dispatch@company.in</p>
               </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 pt-4 flex justify-between border-t border-border/50 transition-colors">
               <Button variant="outline" size="sm" className="w-full">Edit Location</Button>
            </CardFooter>
         </Card>

         <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="size-16 bg-background border shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Plus className="size-8 text-primary/60 group-hover:text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground/70 group-hover:text-foreground">Add New Warehouse</p>
            <p className="text-sm text-muted-foreground text-center mt-2 max-w-[200px]">Create an additional pickup center to dispatch your orders locally.</p>
         </div>
      </div>
    </div>
  );
}
