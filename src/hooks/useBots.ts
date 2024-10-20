import { useState } from "react";
import { BotModel, BotStatus, OrderModel } from "../models/models";

export const useBots = () => {
  const [bots, setBots] = useState<BotModel[]>([]);

  const addBot = () => {
    const newBotId = bots.length + 1;
    setBots([...bots, { id: newBotId, status: BotStatus.IDLE }]);
  };

  const removeBot = (
    setOrders: React.Dispatch<React.SetStateAction<OrderModel[]>>
  ) => {
    if (bots.length === 0) return;
    const lastBot = bots[bots.length - 1];
    if (lastBot.status === BotStatus.BUSY && lastBot.timeoutId) {
      clearTimeout(lastBot.timeoutId);
      setOrders((prevOrders) => {
        if (lastBot.order) {
          return [...prevOrders, lastBot.order];
        }
        return prevOrders;
      });
    }
    setBots((prevBots) => prevBots.slice(0, -1));
  };

  return { bots, setBots, addBot, removeBot };
};
