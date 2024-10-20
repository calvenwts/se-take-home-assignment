import { CompletedOrderModel, OrderModel } from "../models/models";

interface OrderListComponentProps {
  title: string;
  orders: (OrderModel | CompletedOrderModel)[];
  dataTest?: string;
}

export const OrderListComponent = ({
  title,
  orders,
  dataTest,
}: OrderListComponentProps) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-300">{title}</h2>
    <ul className="mt-4 space-y-4" data-test={dataTest}>
      {orders.map((order) => (
        <li
          key={order.id}
          className="p-4 text-white bg-gray-800 rounded-lg shadow"
        >
          <div className="p-4 bg-gray-800 rounded-lg shadow">
            Order #{order.id} ({order.type}) - {order.status}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
