"use client";

import React from "react";
import { 
  IconCreditCard, 
  IconCheck,
  IconExternalLink,
  IconPlus,
  IconLoader,
  IconBrandFacebook,
  IconSpeakerphone
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentConfigModal } from "@/components/payment-config-modal";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreSettings, getMetaStatus } from "@/lib/api";
import { toast } from "sonner";

const INTEGRATIONS = [
  {
    category: "Payment Gateways",
    icon: <IconCreditCard className="size-5 text-blue-500" />,
    apps: [
      {
        id: "payu",
        name: "PayU",
        description: "Connect your PayU account to accept payments in India.",
        logo: "💳",
        color: "bg-blue-500/10 text-blue-500"
      },
      {
        id: "cashfree",
        name: "Cashfree",
        description: "Connect your Cashfree account for fast and secure payments.",
        logo: "💰",
        color: "bg-green-500/10 text-green-500"
      },
      {
        id: "razorpay",
        name: "Razorpay",
        description: "Connect your Razorpay account for seamless Indian payments.",
        logo: "⚡",
        color: "bg-purple-500/10 text-purple-500"
      },
      {
        id: "phonepe",
        name: "PhonePe",
        description: "Connect your PhonePe account for UPI-based payments.",
        logo: "📱",
        color: "bg-orange-500/10 text-orange-500"
      }
    ]
  },
  {
    category: "Marketing & Advertising",
    icon: <IconSpeakerphone className="size-5 text-indigo-500" />,
    apps: [
      {
        id: "meta-ads",
        name: "Meta Ads Manager",
        description: "Sync your product catalog and run dynamic Facebook & Instagram ads.",
        logo: <IconBrandFacebook className="size-6" />,
        color: "bg-blue-600/10 text-blue-600"
      }
    ]
  }
];

export default function IntegrationsPage() {
  const { user } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  const [selectedGateway, setSelectedGateway] = React.useState<{id: string, name: string, logo: string} | null>(null);
  const [configuredGateways, setConfiguredGateways] = React.useState<Record<string, boolean>>({});
  const [loading, setLoading] = React.useState(true);

  const fetchStatuses = async () => {
    if (!user?.stores?.[0]?.id) {
      setLoading(false);
      return;
    }
    try {
      const [res, metaRes] = await Promise.allSettled([
        getStoreSettings(user.stores[0].id),
        getMetaStatus()
      ]);
      
      const statusMap: Record<string, boolean> = {};
      
      if (res.status === 'fulfilled') {
        const settings = res.value?.data?.paymentMethods || res.value?.paymentMethods || {};
        Object.keys(settings).forEach(key => {
          statusMap[key] = settings[key]?.enabled === true;
        });
      }

      if (metaRes.status === 'fulfilled') {
        statusMap['meta-ads'] = metaRes.value?.connected === true;
      }

      setConfiguredGateways(statusMap);
    } catch (err: any) {
      console.error("Failed to fetch integration statuses:", err);
      if (err.message === "Unauthorized") {
        toast.error("Your session has expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStatuses();
  }, [user]);

  const handleConnect = (app: any) => {
    if (["payu", "cashfree", "razorpay", "phonepe"].includes(app.id)) {
      setSelectedGateway({
        id: app.id,
        name: app.name,
        logo: app.logo
      });
      setPaymentModalOpen(true);
    } else if (app.id === "meta-ads") {
      const token = localStorage.getItem('auth_token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      window.open(`${API_URL}/auth/meta/login?token=${encodeURIComponent(token || "")}`, '_blank');
    } else {
      toast.info(`Integration with ${app.name} is coming soon!`);
    }
  };

  const isConnected = (appId: string) => {
    return configuredGateways[appId] || false;
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {selectedGateway && (
        <PaymentConfigModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          gateway={selectedGateway}
          onSuccess={fetchStatuses}
        />
      )}

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect Orbit with your favorite tools to automate your business.
        </p>
      </div>

      {INTEGRATIONS.map((section) => (
        <div key={section.category} className="space-y-4">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
            {section.icon}
            {section.category}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.apps.map((app) => (
              <Card key={app.id} className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`size-12 rounded-xl flex items-center justify-center text-2xl ${app.color}`}>
                    {app.logo}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    <Badge variant={isConnected(app.id) ? "default" : "secondary"} className="mt-1">
                      {isConnected(app.id) && <IconCheck className="size-3 mr-1" />}
                      {isConnected(app.id) ? "Connected" : "Setup Required"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed min-h-[40px]">
                    {app.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant={isConnected(app.id) ? "outline" : "default"} 
                    className="w-full group"
                    onClick={() => handleConnect(app)}
                  >
                    {isConnected(app.id) ? "Manage" : "Connect"}
                    <IconPlus className="size-4 ml-2 group-hover:rotate-90 transition-transform" />
                  </Button>
                </CardFooter>
                {isConnected(app.id) && (
                   <div className="absolute top-0 right-0 p-2">
                     <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                   </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <IconExternalLink className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xl">Request an Integration</h3>
            <p className="text-muted-foreground max-w-md">
              Don't see the tool you use? Let us know and we'll work on adding it to Orbit.
            </p>
          </div>
          <Button variant="secondary">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
}
