import {
  IconTrendingDown,
  IconTrendingUp,
  IconShoppingCart,
  IconPackage,
  IconTruckDelivery,
  IconCreditCardRefund,
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

interface OrdersCardsProps {
  orders?: any[];
}

export const OrdersCards: React.FC<OrdersCardsProps> = ({ orders = [] }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];
  
  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length;
  const shippedToday = safeOrders.filter(o => {
    const today = new Date().toISOString().split('T')[0];
    return o.status === 'SHIPPED' && o.createdAt?.startsWith(today);
  }).length;
  const refunds = safeOrders.filter(o => o.status === 'REFUNDED' || o.status === 'CANCELLED').length;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Lifetime
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Overall volume <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Across all time</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Fulfillment</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {pendingOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPackage />
              To do
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Needs processing <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Orders waiting to be packed
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shipped Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {shippedToday}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTruckDelivery />
              Today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Logistics moving <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Dispatched from facility</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Returns / Cancelled</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {refunds}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-500 border-red-200">
              <IconCreditCardRefund />
              Issues
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cancelled/Refunded <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Impact on net revenue</div>
        </CardFooter>
      </Card>
    </div>
  );
}
