"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "@/components/orders-table";
import { OrdersCards } from "@/components/orders-cards";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreOrders } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user?.stores?.[0]?.id) return;
      try {
        setLoading(true);
        const data = await getStoreOrders(user.stores[0].id);
        const orderData = Array.isArray(data) ? data : (data.orders || []);
        setOrders(orderData);
      } catch (error) {
        console.error("Orders fetch error:", error);
        toast.error("Failed to load orders from backend");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <OrdersCards orders={orders} />
          <OrdersTable data={orders} />
        </div>
      </div>
    </div>
  );
}
