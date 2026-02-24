"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Smartphone, 
  Save, 
  GripVertical, 
  LayoutTemplate,
  ChevronLeft,
  Paintbrush,
  Image as ImageIcon,
  Type,
  Palette,
  Link as LinkIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getStoreCustomization, updateStoreCustomization, getStoreProducts } from "@/lib/api";
import { toast } from "sonner";

export default function WebsiteEditorPage() {
  const { activeStore } = useAuth();
  const [deviceMap, setDeviceMap] = useState<"desktop" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [customization, setCustomization] = useState<any>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const sectionTitleMap: Record<string, string> = {
    announcementBar: "Announcement Bar",
    headerStyle: "Header & Navigation",
    heroSection: "Hero Banner",
    productSections: "Featured Products",
    featuredProducts: "Featured Products",
    aboutSection: "Rich Text / About",
    featuresSection: "Features & Services",
    footerContent: "Footer Details",
    footerStyle: "Footer Details",
    newsletterCatch: "Newsletter",
    newsletter: "Newsletter",
    brandColors: "Brand Colors",
    socialLinks: "Social Links"
  };

  useEffect(() => {
    if (activeStore?.id) {
       getStoreCustomization(activeStore.id).then((res) => {
         if (res.customization) setCustomization(res.customization);
       }).catch(err => console.error("Failed to fetch customization:", err));
       
       getStoreProducts(activeStore.id).then((res) => {
         if (res.products) setProducts(res.products);
       }).catch(err => console.error("Failed to fetch products:", err));
    }
  }, [activeStore]);

  // Listen for clicks from the preview iframe to automatically open that section's config
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_SECTION_CLICK') {
        setActiveSection(e.data.sectionId);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
               "3006";
               
    const sub = (activeStore.subdomain || "preview").replace(/\s+/g, "-").toLowerCase();
    storeUrl = `http://${sub}.localhost:${port}`;
  }

  const handleSave = async () => {
    if (!activeStore) return;
    setIsSaving(true);
    try {
      // Remap internal editor keys to match the DB model field names
      const payload: any = { ...customization };
      if (payload.featuresSection !== undefined) {
        payload.features = payload.featuresSection;
        delete payload.featuresSection;
      }
      
      // Create a separate dbPayload for the API call so we don't mutate the live-preview payload
      const dbPayload = { ...payload };

      // headerStyle is stored as a String in DB — serialize if needed
      if (dbPayload.headerStyle && typeof dbPayload.headerStyle === 'object') {
        dbPayload.headerStyle = JSON.stringify(dbPayload.headerStyle);
      }

      await updateStoreCustomization(activeStore.id, dbPayload);
      toast.success("Website published successfully!");

      // Send a postMessage to the iframe to hot-reload if the theme supports it
      const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'ORBIT_CUSTOMIZATION_UPDATE', data: payload }, '*');
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: any) => {
    setCustomization((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };
  
  // Realtime hot-loading logic to the iframe:
  useEffect(() => {
     const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
     if (iframe && iframe.contentWindow) {
         iframe.contentWindow.postMessage({ type: 'ORBIT_CUSTOMIZATION_UPDATE', data: customization }, '*');
     }
  }, [customization]);

  if (!storeUrl) {
    return (
      <div className="flex flex-1 h-[80vh] items-center justify-center flex-col gap-4 p-6">
        <LayoutTemplate className="size-12 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-semibold">Store Preview Not Available</h2>
        <p className="text-muted-foreground text-sm max-w-sm text-center">
          Your storefront theme server isn&apos;t running locally. Make sure you&apos;ve started 
          your theme dev server (e.g. <code className="bg-muted px-1 rounded text-xs">npm run dev</code>) 
          in the correct <code className="bg-muted px-1 rounded text-xs">all_upfront</code> folder.
        </p>
        {activeStore && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg px-4 py-3 text-center">
            <p>Store: <strong>{activeStore.name}</strong></p>
            <p>Category: <strong>{activeStore.category || 'Not set'}</strong></p>
            <p>Subdomain: <strong>{activeStore.subdomain || 'Not set'}</strong></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-background h-[calc(100vh-theme(spacing.16))] border rounded-md m-2">
      <header className="flex h-14 shrink-0 px-4 items-center justify-between border-b bg-muted/20">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hidden lg:flex" onClick={() => setActiveSection(null)}>
             <ChevronLeft className="size-4" /> Exit
           </Button>
           <Separator orientation="vertical" className="h-6 hidden lg:block" />
           <p className="text-sm font-medium">{activeStore?.name || "My Store"} <span className="text-muted-foreground font-normal ml-2">Live Theme</span></p>
        </div>
        
        <div className="flex items-center gap-1 bg-muted rounded-md p-1">
          <Button 
             variant={deviceMap === "desktop" ? "secondary" : "ghost"} 
             size="icon" 
             className="size-8 rounded-sm"
             onClick={() => setDeviceMap("desktop")}
          >
             <Monitor className="size-4" />
          </Button>
          <Button 
             variant={deviceMap === "mobile" ? "secondary" : "ghost"} 
             size="icon" 
             className="size-8 rounded-sm"
             onClick={() => setDeviceMap("mobile")}
          >
             <Smartphone className="size-4" />
          </Button>
        </div> 
        
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
             {isSaving ? "Saving..." : <><Save className="size-4 mr-2" /> Publish</>}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 shrink-0 border-r bg-card flex flex-col hidden md:flex h-full">
           {!activeSection ? (
             <Tabs defaultValue="sections" className="flex flex-col flex-1 h-full">
               <div className="px-4 py-2 border-b">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                    <TabsTrigger value="settings">Global</TabsTrigger>
                    <TabsTrigger value="inventory">Products</TabsTrigger>
                  </TabsList>
               </div>
               
               <TabsContent value="sections" className="flex-1 overflow-hidden m-0 p-0 flex flex-col">
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                      <div className="space-y-3">
                         <div className="flex items-center justify-between">
                         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Header</h3>
                         </div>
                         <Card onClick={() => setActiveSection("announcementBar")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <Type className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Announcement Bar</span>
                         </Card>
                         <Card onClick={() => setActiveSection("headerStyle")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <ImageIcon className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Header / Navigation</span>
                         </Card>

                         <Separator className="my-2" />
                         
                         <div className="flex items-center justify-between">
                           <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Template Sections</h3>
                         </div>
                         <Card onClick={() => setActiveSection("heroSection")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <ImageIcon className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Hero / Image Banner</span>
                         </Card>
                         <Card onClick={() => setActiveSection("aboutSection")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <Type className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Rich Text / About</span>
                         </Card>
                         <Card onClick={() => setActiveSection("featuresSection")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <GripVertical className="size-4 text-muted-foreground/50" />
                            <span className="text-sm font-medium">Features / Services</span>
                         </Card>
                         <Card onClick={() => setActiveSection("productSections")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <GripVertical className="size-4 text-muted-foreground/50" />
                            <span className="text-sm font-medium">Featured Products</span>
                         </Card>

                         <Separator className="my-2" />

                         <div className="flex items-center justify-between">
                           <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Footer</h3>
                         </div>
                         <Card onClick={() => setActiveSection("footerContent")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <Type className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Footer Details</span>
                         </Card>
                         <Card onClick={() => setActiveSection("newsletter")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                            <Type className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Newsletter Catch</span>
                         </Card>
                      </div>
                 </div>
               </TabsContent>
               
               <TabsContent value="settings" className="flex-1 p-0 m-0 overflow-auto">
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                    <div className="space-y-3">
                       <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Global Styling</h3>
                       <Card onClick={() => setActiveSection("brandColors")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                          <Palette className="size-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Brand Colors</span>
                       </Card>
                       <Card onClick={() => setActiveSection("socialLinks")} className="p-3 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors">
                          <LinkIcon className="size-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Social Links</span>
                       </Card>
                    </div>
                 </div>
               </TabsContent>

               <TabsContent value="inventory" className="flex-1 p-0 m-0 overflow-auto">
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                    <div className="space-y-3 mb-2">
                       <div className="flex items-center justify-between">
                         <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Store Products</h3>
                         {products.length > 0 && (
                           <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{products.length}</span>
                         )}
                       </div>
                       <p className="text-xs text-muted-foreground leading-relaxed">
                         Products added in <strong>Sales → Products</strong> automatically appear in your storefront sections.
                       </p>
                       <Button 
                         variant="default" 
                         size="sm" 
                         className="w-full text-xs gap-2 mt-1" 
                         onClick={() => window.open("/sales/products/new", "_blank")}
                       >
                         + Add New Product
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         className="w-full text-xs gap-2" 
                         onClick={() => window.open("/sales/products", "_blank")}
                       >
                         Manage All Products →
                       </Button>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Live Product List</p>
                      {products.length === 0 ? (
                         <div className="text-center py-8 space-y-3">
                           <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                             <ImageIcon className="size-5 opacity-30"/>
                           </div>
                           <div>
                             <p className="text-sm font-medium">No products yet</p>
                             <p className="text-xs text-muted-foreground mt-1">Add products from Sales → Products and they&apos;ll appear here and in your storefront automatically.</p>
                           </div>
                           <Button 
                             variant="default" 
                             size="sm" 
                             className="text-xs"
                             onClick={() => window.open("/sales/products/new", "_blank")}
                           >
                             Add Your First Product
                           </Button>
                         </div>
                      ) : (
                         products.map((p: any) => (
                            <Card key={p.id} className="p-3 flex items-center gap-3 group hover:border-primary/40 transition-colors">
                               {p.images && p.images[0] ? (
                                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-md border flex-shrink-0" />
                               ) : (
                                  <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center flex-shrink-0"><ImageIcon className="size-4 opacity-50"/></div>
                               )}
                               <div className="flex-1 min-w-0">
                                 <p className="text-sm font-medium truncate">{p.name}</p>
                                 <p className="text-xs text-muted-foreground">₹{(p.price || 0).toLocaleString()} • {p.category || 'Uncategorized'}</p>
                               </div>
                               <Button 
                                 variant="ghost" 
                                 size="icon"
                                 className="size-7 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-muted-foreground hover:text-primary"
                                 onClick={() => window.open(`/sales/products`, "_blank")}
                                 title="Edit in Admin"
                               >
                                 <Paintbrush className="size-3.5" />
                               </Button>
                            </Card>
                         ))
                      )}
                    </div>
                 </div>
               </TabsContent>

             </Tabs>
           ) : (
             <div className="flex flex-col h-full">
               <div className="p-4 border-b flex items-center gap-2">
                 <Button variant="ghost" size="icon" onClick={() => setActiveSection(null)} className="h-8 w-8 -ml-2">
                   <ChevronLeft className="size-4" />
                 </Button>
                 <h3 className="font-semibold">{activeSection ? (sectionTitleMap[activeSection] || "Edit Section") : "Edit Section"}</h3>
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                 
                 {activeSection === "announcementBar" && (
                   <>
                     <div className="space-y-2">
                       <Label>Message</Label>
                       <Input 
                         value={customization?.announcementBar?.text || ""} 
                         onChange={(e) => updateField("announcementBar", "text", e.target.value)} 
                         placeholder="Free shipping over $50!" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Link URL (Optional)</Label>
                       <Input 
                         value={customization?.announcementBar?.link || ""} 
                         onChange={(e) => updateField("announcementBar", "link", e.target.value)} 
                         placeholder="/products" 
                       />
                     </div>
                   </>
                 )}

                 {activeSection === "headerStyle" && (
                   <>
                     <div className="space-y-2">
                       <Label>Store Logo Text</Label>
                       <Input 
                         value={customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || activeStore?.name || ""} 
                         onChange={(e) => updateField("headerStyle", "storeName", e.target.value)} 
                         placeholder="My Store" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Logo Image URL (Overrides Text)</Label>
                       <Input 
                         value={customization?.headerStyle?.logoUrl || ""} 
                         onChange={(e) => updateField("headerStyle", "logoUrl", e.target.value)} 
                         placeholder="https://..." 
                       />
                     </div>
                   </>
                 )}

                 {activeSection === "heroSection" && (
                   <>
                     <div className="space-y-2">
                       <Label>Headline</Label>
                       <Input 
                         value={customization?.heroSection?.title || customization?.heroSection?.headline || ""} 
                         onChange={(e) => updateField("heroSection", "title", e.target.value)} 
                         placeholder="Grand Opening Sale!" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Subheadline / Description</Label>
                       <Textarea 
                         value={customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || ""} 
                         onChange={(e) => updateField("heroSection", "subtitle", e.target.value)}
                         placeholder="Discover our new collection today..."
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Background Image URL</Label>
                       <Input 
                         value={customization?.heroSection?.backgroundImage || ""} 
                         onChange={(e) => updateField("heroSection", "backgroundImage", e.target.value)}
                         placeholder="https://..."
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Button Text</Label>
                       <Input 
                         value={customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || ""} 
                         onChange={(e) => updateField("heroSection", "ctaText", e.target.value)}
                         placeholder="Shop Now"
                       />
                     </div>
                   </>
                 )}

                 {activeSection === "productSections" && (
                   <>
                     <div className="space-y-2">
                       <Label>Section Title</Label>
                       <Input 
                         value={customization?.productSections?.title || ""} 
                         onChange={(e) => updateField("productSections", "title", e.target.value)} 
                         placeholder="New Arrivals" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Subtitle</Label>
                       <Input 
                         value={customization?.productSections?.subtitle || ""} 
                         onChange={(e) => updateField("productSections", "subtitle", e.target.value)}
                         placeholder="Check out our latest products..."
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Filter Category</Label>
                       <Input 
                         value={customization?.productSections?.categoryFilter || ""} 
                         onChange={(e) => updateField("productSections", "categoryFilter", e.target.value)}
                         placeholder="e.g. Shirts (leave blank for all)"
                       />
                     </div>
                   </>
                 )}

                 {activeSection === "aboutSection" && (
                   <>
                     <div className="space-y-2">
                       <Label>About Us Headline</Label>
                       <Input 
                         value={customization?.aboutSection?.title || customization?.aboutSection?.headline || ""} 
                         onChange={(e) => updateField("aboutSection", "title", e.target.value)} 
                         placeholder="Our Story" 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Story / Content</Label>
                       <Textarea 
                         rows={5}
                         value={customization?.aboutSection?.content || ""} 
                         onChange={(e) => updateField("aboutSection", "content", e.target.value)}
                         placeholder="We started this company because..."
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Featured Image URL (Optional)</Label>
                       <Input 
                         value={customization?.aboutSection?.image || customization?.aboutSection?.imageUrl || ""} 
                         onChange={(e) => updateField("aboutSection", "image", e.target.value)}
                         placeholder="https://..."
                       />
                     </div>
                   </>
                 )}
                 
                 {activeSection === "featuresSection" && (
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="space-y-3 p-3 border rounded-md">
                           <Label className="text-xs uppercase font-bold text-muted-foreground">Feature {i}</Label>
                           <Input 
                              value={customization?.featuresSection?.[`feature${i}Title`] || ""} 
                              onChange={(e) => updateField("featuresSection", `feature${i}Title`, e.target.value)} 
                              placeholder="Title"
                           />
                           <Input 
                              value={customization?.featuresSection?.[`feature${i}Desc`] || ""} 
                              onChange={(e) => updateField("featuresSection", `feature${i}Desc`, e.target.value)} 
                              placeholder="Description"
                           />
                        </div>
                      ))}
                    </div>
                  )}

                 {(activeSection === "footerContent" || activeSection === "footerStyle") && (
                   <>
                     <div className="space-y-2">
                       <Label>Footer Bio / Description</Label>
                       <Textarea 
                         value={customization?.footerContent?.bio || customization?.footerContent?.description || customization?.footerStyle?.bio || ""} 
                         onChange={(e) => {
                           updateField("footerContent", "bio", e.target.value);
                           updateField("footerStyle", "bio", e.target.value);
                         }} 
                         placeholder="We are a dedicated team providing the best products." 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Copyright Text</Label>
                       <Input 
                         value={customization?.footerContent?.copyright || customization?.footerStyle?.copyright || ""} 
                         onChange={(e) => {
                           updateField("footerContent", "copyright", e.target.value);
                           updateField("footerStyle", "copyright", e.target.value);
                         }} 
                         placeholder={`© ${new Date().getFullYear()} ${activeStore?.name || "Company"}. All rights reserved.`} 
                       />
                     </div>

                     {/* ── Contact Details ── */}
                     <div className="pt-3 border-t">
                       <p className="text-xs font-bold uppercase text-muted-foreground mb-3">Contact Details</p>
                       <div className="space-y-3">
                         <div className="space-y-1">
                           <Label>Phone Number</Label>
                           <Input 
                             value={customization?.footerContent?.contact?.phone || customization?.footerStyle?.contact?.phone || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "contact", { ...(customization?.footerContent?.contact || {}), phone: e.target.value });
                               updateField("footerStyle", "contact", { ...(customization?.footerStyle?.contact || {}), phone: e.target.value });
                             }} 
                             placeholder="+91 98765 43210" 
                           />
                         </div>
                         <div className="space-y-1">
                           <Label>Email Address</Label>
                           <Input 
                             type="email"
                             value={customization?.footerContent?.contact?.email || customization?.footerStyle?.contact?.email || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "contact", { ...(customization?.footerContent?.contact || {}), email: e.target.value });
                               updateField("footerStyle", "contact", { ...(customization?.footerStyle?.contact || {}), email: e.target.value });
                             }} 
                             placeholder="hello@yourstore.com" 
                           />
                         </div>
                         <div className="space-y-1">
                           <Label>Address</Label>
                           <Textarea 
                             rows={2}
                             value={customization?.footerContent?.contact?.address || customization?.footerStyle?.contact?.address || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "contact", { ...(customization?.footerContent?.contact || {}), address: e.target.value });
                               updateField("footerStyle", "contact", { ...(customization?.footerStyle?.contact || {}), address: e.target.value });
                             }} 
                             placeholder="123 Main Street, City, Country" 
                           />
                         </div>
                       </div>
                     </div>

                     {/* ── Social Links ── */}
                     <div className="pt-3 border-t">
                       <p className="text-xs font-bold uppercase text-muted-foreground mb-3">Social Links</p>
                       <div className="space-y-3">
                         <div className="space-y-1">
                           <Label>Instagram URL</Label>
                           <Input 
                             value={customization?.footerContent?.socials?.instagram || customization?.footerStyle?.socials?.instagram || customization?.socials?.instagram || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "socials", { ...(customization?.footerContent?.socials || {}), instagram: e.target.value });
                               updateField("footerStyle", "socials", { ...(customization?.footerStyle?.socials || {}), instagram: e.target.value });
                             }} 
                             placeholder="https://instagram.com/yourstore" 
                           />
                         </div>
                         <div className="space-y-1">
                           <Label>Facebook URL</Label>
                           <Input 
                             value={customization?.footerContent?.socials?.facebook || customization?.footerStyle?.socials?.facebook || customization?.socials?.facebook || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "socials", { ...(customization?.footerContent?.socials || {}), facebook: e.target.value });
                               updateField("footerStyle", "socials", { ...(customization?.footerStyle?.socials || {}), facebook: e.target.value });
                             }} 
                             placeholder="https://facebook.com/yourstore" 
                           />
                         </div>
                         <div className="space-y-1">
                           <Label>Twitter / X URL</Label>
                           <Input 
                             value={customization?.footerContent?.socials?.twitter || customization?.footerStyle?.socials?.twitter || customization?.socials?.twitter || ""} 
                             onChange={(e) => {
                               updateField("footerContent", "socials", { ...(customization?.footerContent?.socials || {}), twitter: e.target.value });
                               updateField("footerStyle", "socials", { ...(customization?.footerStyle?.socials || {}), twitter: e.target.value });
                             }} 
                             placeholder="https://twitter.com/yourstore" 
                           />
                         </div>
                       </div>
                     </div>
                   </>
                 )}

                 {activeSection === "newsletter" && (
                   <>
                     <div className="space-y-2">
                       <Label>Newsletter Heading</Label>
                       <Input 
                         value={customization?.newsletter?.heading || "Subscribe to our newsletter"} 
                         onChange={(e) => updateField("newsletter", "heading", e.target.value)} 
                       />
                     </div>
                     <div className="space-y-2">
                       <Label>Subtext</Label>
                       <Input 
                         value={customization?.newsletter?.subtext || "Get the latest updates and offers."} 
                         onChange={(e) => updateField("newsletter", "subtext", e.target.value)} 
                       />
                     </div>
                   </>
                 )}

                 {activeSection === "brandColors" && (
                   <>
                     <div className="space-y-2">
                       <Label>Primary Color (Hex)</Label>
                       <div className="flex items-center gap-2">
                         <Input 
                           type="color" 
                           className="w-12 h-10 p-1"
                           value={customization?.brandColors?.primary || "#000000"} 
                           onChange={(e) => updateField("brandColors", "primary", e.target.value)}
                         />
                         <Input 
                           value={customization?.brandColors?.primary || ""} 
                           onChange={(e) => updateField("brandColors", "primary", e.target.value)}
                           placeholder="#000000"
                         />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label>Secondary Color (Hex)</Label>
                       <div className="flex items-center gap-2">
                         <Input 
                           type="color" 
                           className="w-12 h-10 p-1"
                           value={customization?.brandColors?.secondary || "#ffffff"} 
                           onChange={(e) => updateField("brandColors", "secondary", e.target.value)}
                         />
                         <Input 
                           value={customization?.brandColors?.secondary || ""} 
                           onChange={(e) => updateField("brandColors", "secondary", e.target.value)}
                           placeholder="#ffffff"
                         />
                       </div>
                     </div>
                   </>
                 )}

                 {activeSection === "socialLinks" && (
                   <>
                     <div className="space-y-4">
                       <p className="text-sm text-muted-foreground">Add full URLs (e.g., https://twitter.com/yourbrand)</p>
                       <div className="space-y-2">
                         <Label>Twitter / X URL</Label>
                         <Input 
                           value={customization?.socialLinks?.twitter || ""} 
                           onChange={(e) => updateField("socialLinks", "twitter", e.target.value)} 
                           placeholder="https://..." 
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>Instagram URL</Label>
                         <Input 
                           value={customization?.socialLinks?.instagram || ""} 
                           onChange={(e) => updateField("socialLinks", "instagram", e.target.value)} 
                           placeholder="https://..." 
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>Facebook URL</Label>
                         <Input 
                           value={customization?.socialLinks?.facebook || ""} 
                           onChange={(e) => updateField("socialLinks", "facebook", e.target.value)} 
                           placeholder="https://..." 
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>TikTok URL</Label>
                         <Input 
                           value={customization?.socialLinks?.tiktok || ""} 
                           onChange={(e) => updateField("socialLinks", "tiktok", e.target.value)} 
                           placeholder="https://..." 
                         />
                       </div>
                     </div>
                   </>
                 )}

               </div>
               <div className="p-4 border-t bg-muted/10">
                 <p className="text-xs text-muted-foreground text-center">Changes will immediately reflect in compatible live themes upon publishing.</p>
               </div>
             </div>
           )}
        </aside>

        <main className="flex-1 bg-muted/30 flex items-center justify-center p-4 overflow-hidden relative">
           <div 
             className={`bg-background border shadow-sm transition-all duration-300 ease-in-out relative flex flex-col overflow-hidden
                ${deviceMap === 'mobile' ? 'w-[375px] h-[812px] rounded-[2.5rem] border-[12px] border-black/80 ring-1 ring-border shadow-2xl overflow-y-auto' : 'w-full h-full rounded-lg'}
             `}
           >
              {deviceMap === 'mobile' && (
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-10 pointer-events-none">
                  <div className="w-[120px] h-[24px] bg-black/80 rounded-b-2xl"></div>
                </div>
              )}
              
              <iframe 
                 id="preview-iframe"
                 src={storeUrl} 
                 className="w-full flex-1 border-0"
                 title="Live Store Editor Sandbox"
                 sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                 loading="lazy"
              />
           </div>
        </main>
      </div>
    </div>
  );
}
