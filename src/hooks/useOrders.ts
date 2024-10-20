import { useState } from "react";
import {
  OrderModel,
  OrderStatus,
  OrderType,
  CompletedOrderModel,
} from "../models/models";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [completedOrders, setCompletedOrders] = useState<CompletedOrderModel[]>(
    []
  );
  const [nextOrderId, setNextOrderId] = useState<number>(1);

  const addNormalOrder = () => {
    const newOrder: OrderModel = {
      id: nextOrderId,
      type: OrderType.NORMAL,
      status: OrderStatus.PENDING,
    };
    setOrders([...orders, newOrder]);
    setNextOrderId(nextOrderId + 1);
  };

  const addVIPOrder = () => {
    const newOrder: OrderModel = {
      id: nextOrderId,
      type: OrderType.VIP,
      status: OrderStatus.PENDING,
    };
    const vipOrders = orders.filter((order) => order.type === OrderType.VIP);
    const normalOrders = orders.filter(
      (order) => order.type === OrderType.NORMAL
    );
    setOrders([...vipOrders, newOrder, ...normalOrders]);
    setNextOrderId(nextOrderId + 1);
  };

  const completeOrder = (order: OrderModel) => {
    setCompletedOrders((prevCompleted) => [
      ...prevCompleted,
      { ...order, status: OrderStatus.COMPLETE },
    ]);
  };

  return {
    orders,
    completedOrders,
    addNormalOrder,
    addVIPOrder,
    completeOrder,
    setOrders,
  };
};
