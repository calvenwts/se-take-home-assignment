import { OrderListComponent } from "../../components/OrderListComponent";
import { CompletedOrderModel, OrderModel } from "../../models/models";

interface OrdersSectionProps {
  pendingOrders: OrderModel[];
  completedOrders: CompletedOrderModel[];
}

export const OrdersSection = ({
  pendingOrders,
  completedOrders,
}: OrdersSectionProps) => (
  <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <OrderListComponent title="Pending Orders" orders={pendingOrders} />
    <OrderListComponent title="Completed Orders" orders={completedOrders} />
  </section>
);
