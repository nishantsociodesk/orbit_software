"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RotateCcw, PackageX, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="space-y-1">
           <h1 className="text-3xl font-bold tracking-tight">Returns Management</h1>
           <p className="text-muted-foreground">
             Manage and track customer return requests and RTO shipments.
           </p>
         </div>
         <Button className="shrink-0 gap-2">
           <FileText className="size-4" />
           Export Returns Log
         </Button>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
           <div className="flex items-center gap-4">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                 placeholder="Search by Order ID, AWB, or Customer Name..."
                 className="pl-9 bg-background"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Return ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Waybill (AWB)</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Courier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               <TableRow>
                 <TableCell colSpan={7} className="h-64 text-center">
                   <div className="flex flex-col items-center justify-center text-muted-foreground">
                     <PackageX className="size-12 mb-4 opacity-20" />
                     <p className="text-lg font-medium text-foreground/70">No returns found</p>
                     <p className="text-sm">You currently have no active return or RTO requests.</p>
                   </div>
                 </TableCell>
               </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
