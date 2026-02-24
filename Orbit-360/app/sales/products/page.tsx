"use client";

import { useEffect, useState } from "react";
import { ProductsTable } from "@/components/products-table";
import { ProductCards } from "@/components/product-cards";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreProducts, deleteStoreProduct } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user?.stores?.[0]?.id) return;
      try {
        setLoading(true);
        const res = await getStoreProducts(user.stores[0].id);
        setProducts(res.products || []);
      } catch (error) {
        console.error("Products fetch error:", error);
        toast.error("Failed to load products from backend");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    try {
      await deleteStoreProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

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
          <ProductCards products={products} />
          <ProductsTable data={products} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
