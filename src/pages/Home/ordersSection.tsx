import { OrderListComponent } from "../../components/OrderListComponent";
import { CompletedOrderModel, OrderModel } from "../../models/models";

interface OrdersSectionProps {
  normalOrders: OrderModel[];
  vipOrders: OrderModel[];
  completedOrders: CompletedOrderModel[];
}

export const OrdersSection = ({
  normalOrders,
  vipOrders,
  completedOrders,
}: OrdersSectionProps) => {
  const pendingOrders = [...vipOrders, ...normalOrders];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <OrderListComponent
        title="Pending Orders"
        orders={pendingOrders}
        dataTest="pending-order-list"
      />
      <OrderListComponent
        title="Completed Orders"
        orders={completedOrders}
        dataTest="completed-order-list"
      />
    </section>
  );
};
