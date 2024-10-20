import { useState } from "react";
import {
  OrderModel,
  OrderStatus,
  OrderType,
  CompletedOrderModel,
} from "../models/models";

export const useOrders = () => {
  const [normalOrders, setNormalOrders] = useState<OrderModel[]>([]);
  const [vipOrders, setVipOrders] = useState<OrderModel[]>([]);
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
    setNormalOrders([...normalOrders, newOrder]);
    setNextOrderId(nextOrderId + 1);
  };

  const addVIPOrder = () => {
    const newOrder: OrderModel = {
      id: nextOrderId,
      type: OrderType.VIP,
      status: OrderStatus.PENDING,
    };
    setVipOrders([...vipOrders, newOrder]);
    setNextOrderId(nextOrderId + 1);
  };

  const completeOrder = (order: OrderModel) => {
    setCompletedOrders((prevCompleted) => [
      ...prevCompleted,
      { ...order, status: OrderStatus.COMPLETE },
    ]);
  };

  return {
    normalOrders,
    vipOrders,
    completedOrders,
    addNormalOrder,
    addVIPOrder,
    completeOrder,
    setNormalOrders,
    setVipOrders,
  };
};
