"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getLogisticsStatus, configureLogistics, testLogisticsConnection } from "@/lib/api";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IconLoader, IconCheck, IconSettings, IconTruckDelivery } from "@tabler/icons-react";

export default function LogisticsSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  
  const [apiKey, setApiKey] = useState("");
  const [isStaging, setIsStaging] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [lastTested, setLastTested] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user?.stores?.[0]?.id) return;
      
      try {
        const res: any = await getLogisticsStatus(user.stores[0].id);
        if (res.success && res.settings) {
          setApiKey(res.settings.apiKey || "");
          setIsStaging(true); // Always default to Staging since we use qc.fship.in if isStaging
          // Wait, backend says `isStaging: provider.config?.isStaging ?? true`
          setIsStaging(res.settings.isStaging ?? true);
          setIsActive(res.active || false);
        }
      } catch (error) {
        console.error("Failed to load logistics config:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, [user]);

  const handleSave = async () => {
    if (!user?.stores?.[0]?.id) return;
    if (!apiKey) {
      toast.error("Please provide the FShip API Security Key");
      return;
    }

    setSaving(true);
    try {
      await configureLogistics(user.stores[0].id, {
        apiKey,
        isStaging
      });
      setIsActive(true);
      toast.success("FShip Configuration Saved!");
      setLastTested(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!user?.stores?.[0]?.id || !isActive) {
       toast.error("Please save configuration before testing.");
       return;
    }
    setTesting(true);
    try {
      const result: any = await testLogisticsConnection(user.stores[0].id);
      if (result.success) {
         toast.success("Successfully connected to FShip!");
         setLastTested(true);
      } else {
         toast.error("Connection failed.");
         setLastTested(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Test failed. Please check your credentials.");
      setLastTested(false);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-4xl mx-auto w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Logistics Settings</h1>
        <p className="text-muted-foreground">
          Configure shipping providers for handling your product deliveries and returns.
        </p>
      </div>

      <Card className="relative overflow-hidden border-primary/20 shadow-sm">
        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
          <IconTruckDelivery className="size-32" />
        </div>
        
        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          <div className="size-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <IconTruckDelivery className="size-8" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">FShip Integration</CardTitle>
            <div className="flex items-center gap-2 mt-2">
               <span className="flex h-2 w-2 relative">
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                 <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
               </span>
               <CardDescription className="text-sm m-0">
                 {isActive ? "Provider Active & Connected" : "Action Required - Configure Settings"}
               </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4 max-w-xl">
             <div className="space-y-2">
               <Label htmlFor="apiKey" className="text-base">Signature / API Security Key</Label>
               <Input 
                 id="apiKey" 
                 type="text" 
                 placeholder="085c36066064af83c66b9dbf..." 
                 value={apiKey}
                 onChange={(e) => setApiKey(e.target.value)}
                 className="font-mono text-sm"
               />
               <p className="text-xs text-muted-foreground">
                 This is your authentication signature token provided by FShip.
               </p>
             </div>

             <div className="flex items-center justify-between rounded-lg border p-4">
               <div className="space-y-0.5">
                 <Label className="text-base select-none cursor-pointer" htmlFor="staging-mode">Staging / Sandbox Mode</Label>
                 <p className="text-xs text-muted-foreground w-[90%]">
                   Enable this to use <span className="font-mono text-[10px] bg-secondary px-1 py-0.5 rounded">capi-qc.fship.in</span> instead of production environments.
                 </p>
               </div>
               <Checkbox 
                 id="staging-mode"
                 checked={isStaging} 
                 onCheckedChange={(checked) => setIsStaging(!!checked)} 
               />
             </div>
          </div>
        </CardContent>

        <CardFooter className="bg-secondary/20 pt-6 flex gap-4">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <IconLoader className="size-4 animate-spin mr-2" /> : <IconSettings className="size-4 mr-2" />}
            Save Configuration
          </Button>
          
          <Button onClick={handleTestConnection} disabled={testing || !isActive} variant="outline">
            {testing ? <IconLoader className="size-4 animate-spin mr-2" /> : null}
            Test Connection
          </Button>

          {lastTested !== null && (
            <div className="flex items-center ml-auto font-medium text-sm gap-2">
               {lastTested ? (
                 <span className="text-green-500 flex items-center"><IconCheck className="size-5 mr-1"/> Connection Success</span>
               ) : (
                 <span className="text-red-500 flex items-center">Connection Failed</span>
               )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
