"use client";

import { useEffect, useState } from "react";
import {
  getPendingMerchants,
  provisionMerchant,
  getThemes,
  getPlans,
} from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Store, User, Mail, Calendar, CheckCircle2 } from "lucide-react";

type Merchant = {
  id: string;
  name: string;
  subdomain: string;
  description: string;
  provisioningStatus: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
  };
};

type Theme = {
  id: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
};

type Plan = {
  id: string;
  name: string;
  slug: string;
};

export default function ProvisioningPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [provisioning, setProvisioning] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [merchantsRes, themesRes, plansRes] = await Promise.all([
        getPendingMerchants(),
        getThemes(),
        getPlans(),
      ]);
      setMerchants(merchantsRes.merchants as Merchant[]);
      setThemes(themesRes.themes as Theme[]);
      setPlans(plansRes.plans as Plan[]);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvision = async () => {
    if (!selectedMerchant || !selectedTheme) return;

    try {
      setProvisioning(true);
      const result = await provisionMerchant(selectedMerchant.id, {
        themeId: selectedTheme,
        planId: selectedPlan || undefined,
      });

      if (result.success) {
        alert(
          `✅ ${selectedMerchant.name} provisioned!\n\nStorefront: ${result.store.storefront}\nDashboard: ${result.store.dashboard}`
        );
        setDialogOpen(false);
        setSelectedMerchant(null);
        setSelectedTheme("");
        setSelectedPlan("");
        loadData();
      }
    } catch (error) {
      console.error("Provisioning failed:", error);
      alert("Provisioning failed. Please try again.");
    } finally {
      setProvisioning(false);
    }
  };

  const openProvisionDialog = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merchant Provisioning</h1>
        <p className="text-muted-foreground mt-2">
          Assign templates and activate pending merchants
        </p>
      </div>

      {merchants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg font-medium">No pending merchants</p>
            <p className="text-sm text-muted-foreground">
              All merchants have been provisioned
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {merchants.map((merchant) => (
            <Card key={merchant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Store className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{merchant.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {merchant.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-2" />
                  {merchant.user.fullName}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {merchant.user.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(merchant.createdAt).toLocaleDateString()}
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">Subdomain:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {merchant.subdomain}.orbit360.com
                  </code>
                </div>
                <Button
                  onClick={() => openProvisionDialog(merchant)}
                  className="w-full mt-4"
                >
                  Provision Merchant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provision {selectedMerchant?.name}</DialogTitle>
            <DialogDescription>
              Select a template and plan to activate this merchant
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Website Template *</label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                      {theme.category && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({theme.category})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subscription Plan</label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave empty to skip plan assignment
              </p>
            </div>

            {selectedMerchant && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Preview:</p>
                <div className="text-xs space-y-1">
                  <p>
                    <span className="text-muted-foreground">Storefront:</span>{" "}
                    <code>https://{selectedMerchant.subdomain}.orbit360.com</code>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Dashboard:</span>{" "}
                    <code>
                      https://dashboard.orbit360.com/store/{selectedMerchant.id}
                    </code>
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={provisioning}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProvision}
              disabled={!selectedTheme || provisioning}
            >
              {provisioning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Provisioning...
                </>
              ) : (
                "Provision Merchant"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
