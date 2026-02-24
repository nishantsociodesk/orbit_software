"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, ExternalLink, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StorefrontPreviewPage() {
  const { activeStore, loading } = useAuth();
  const router = useRouter();

  let storeUrl = activeStore?.storefrontUrl || activeStore?.upfrontTemplateUrl;

  if (activeStore && typeof window !== "undefined" && window.location.hostname === "localhost") {
    const getP = (str: string | undefined | null) => {
      if (!str) return null;
      const s = str.toLowerCase();
      if (s.includes("toy")) return "3004";
      if (s.includes("electronic") || s.includes("tech")) return "3006";
      if (s.includes("food") || s.includes("grocery")) return "3007";
      if (s.includes("footwear") || s.includes("shoe")) return "3008";
      if (s.includes("fragrance") || s.includes("perfume")) return "3009";
      if (s.includes("beauty") || s.includes("cosmetic")) return "3010";
      if (s.includes("jewel") || s.includes("jewelry")) return "3017";
      if (s.includes("fashion") || s.includes("clothing") || s.includes("apparel") || s.includes("wear")) return "3005";
      return null;
    };
    
    let port = getP(activeStore.templateName) || 
               getP(activeStore.category) || 
               getP(activeStore.industry) || 
               getP(activeStore.subdomain) || 
               "3006"; // Default fallback
               
    console.log("[Preview Mapping] Resolved Port:", port, "for", activeStore.templateName, activeStore.industry);
    
    const sub = activeStore.subdomain || "preview";
    storeUrl = `http://${sub}.localhost:${port}`;
  }

  useEffect(() => {
    // If the URL somehow wasn't caught by the sidebar link but is available now, redirect.
    if (!loading && storeUrl) {
      window.location.href = storeUrl;
    }
  }, [activeStore, loading, storeUrl]);

  if (loading) {
    return <div className="p-8">Loading store data...</div>;
  }

  if (!storeUrl) {
    return (
      <div className="flex flex-1 h-[80vh] items-center justify-center flex-col gap-6 px-4">
        <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
            <LayoutTemplate className="size-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">No Storefront Configured</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your store does not have an active theme or storefront URL attached to it. 
              Please go to the Theme configuration page or Settings to set up your online store.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/settings")}>
               Go to Settings
            </Button>
            <Button onClick={() => window.open('https://github.com/upfront', '_blank')}>
               Install a Theme <ArrowRight className="size-4 ml-2" />
            </Button>
        </div>
      </div>
    );
  }

  // Fallback while redirecting
  return (
    <div className="flex flex-1 h-[80vh] items-center justify-center flex-col gap-4">
        <ExternalLink className="size-10 text-muted-foreground animate-pulse" />
        <p className="text-muted-foreground">Redirecting to your live store...</p>
    </div>
  );
}
