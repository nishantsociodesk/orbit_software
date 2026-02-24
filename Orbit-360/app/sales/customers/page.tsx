"use client";

import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/customers-table";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreCustomers } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

export default function CustomersPage() {
  const { user, loading: authLoading } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user?.stores?.[0]?.id) return;
      try {
        setLoading(true);
        const data = await getStoreCustomers(user.stores[0].id);
        // The endpoint likely returns { data: [] } or just []
        setCustomers(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Customers fetch error:", error);
        toast.error("Failed to load customers from backend");
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
          <CustomersTable data={customers} />
        </div>
      </div>
    </div>
  );
}
