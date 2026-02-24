import {
  IconTrendingDown,
  IconTrendingUp,
  IconBox,
  IconAlertCircle,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardsProps {
  products?: any[];
}

export const ProductCards: React.FC<ProductCardsProps> = ({ products = [] }) => {
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStock = products.filter(p => p.stock <= 0).length;
  
  // Find top category
  const categories: Record<string, number> = {};
  products.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  const topCategory = Object.keys(categories).sort((a, b) => categories[b] - categories[a])[0] || "None";

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalProducts}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Catalog
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active SKUs in inventory <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Managed by merchant</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Low Stock Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {lowStock}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconAlertCircle />
              Attention
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Items under 10 units <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Replenishment recommended
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Out of Stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {outOfStock}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBox />
              Urgent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Potential revenue loss <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Zero inventory detected</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Category</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl truncate max-w-[150px]">
            {topCategory}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconStar />
              #1
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Highest product count <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Trending sector</div>
        </CardFooter>
      </Card>
    </div>
  );
}
