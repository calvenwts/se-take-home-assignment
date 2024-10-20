export enum BotStatus {
  IDLE = "IDLE",
  BUSY = "BUSY",
}

export interface OrderModel {
  id: number;
  type: OrderType;
  status: OrderStatus;
}

export interface CompletedOrderModel extends OrderModel {}

export enum OrderType {
  NORMAL = "NORMAL",
  VIP = "VIP",
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

export interface BotModel {
  id: number;
  status: BotStatus;
  order?: OrderModel;
  timeoutId?: NodeJS.Timeout;
}
