import { useEffect, useCallback } from "react";
import {
  BotModel,
  BotStatus,
  OrderModel,
  OrderType,
} from "../../models/models";
import { useBots } from "../../hooks/useBots";
import { useOrders } from "../../hooks/useOrders";
import { Header } from "../../components/Header";
import { OrdersSection } from "./ordersSection";
import { BotsSection } from "./botsSection";
import { ActionSection } from "./actionSection";

export default function App() {
  const PROCESSING_TIME = 10000;

  const { bots, setBots, addBot, removeBot } = useBots();
  const {
    normalOrders,
    vipOrders,
    completedOrders,
    addNormalOrder,
    addVIPOrder,
    completeOrder,
    setNormalOrders,
    setVipOrders,
  } = useOrders();

  // Fetch the next order (prioritizing VIPs)
  const getNextOrder = useCallback((): OrderModel | undefined => {
    return vipOrders.length > 0 ? vipOrders[0] : normalOrders[0];
  }, [normalOrders, vipOrders]);

  // Update bot status utility
  const updateBotStatus = useCallback(
    (botId: number, status: BotStatus, order?: OrderModel) => {
      setBots((prevBots: BotModel[]) =>
        prevBots.map((bot: BotModel) =>
          bot.id === botId ? { ...bot, status, order } : bot
        )
      );
    },
    [setBots]
  );

  // Process order with the specific bot
  const processOrder = useCallback(
    (botId: number) => {
      const bot = bots.find((b) => b.id === botId);
      const orderToProcess = getNextOrder();

      if (!bot || bot.status !== BotStatus.IDLE || !orderToProcess) return;

      // Remove the selected order from the corresponding queue
      if (orderToProcess.type === OrderType.VIP) {
        setVipOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderToProcess.id)
        );
      } else {
        setNormalOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderToProcess.id)
        );
      }

      // Mark bot as busy and assign order
      updateBotStatus(botId, BotStatus.BUSY, orderToProcess);

      const timeoutId = setTimeout(() => {
        completeOrder(orderToProcess);
        updateBotStatus(botId, BotStatus.IDLE); // Free the bot after completion
      }, PROCESSING_TIME);

      setBots((prevBots) =>
        prevBots.map((b) => (b.id === botId ? { ...b, timeoutId } : b))
      );
    },
    [
      bots,
      getNextOrder,
      setNormalOrders,
      setVipOrders,
      completeOrder,
      setBots,
      updateBotStatus,
    ]
  );

  // Automatically process an order if an idle bot is available
  useEffect(() => {
    const idleBot = bots.find((b) => b.status === BotStatus.IDLE);
    if (idleBot && (vipOrders.length > 0 || normalOrders.length > 0)) {
      processOrder(idleBot.id);
    }
  }, [vipOrders, normalOrders, bots, processOrder]);

  return (
    <div className="min-h-screen p-8 space-y-8 bg-black">
      <Header />
      <ActionSection
        addNormalOrder={addNormalOrder}
        addVIPOrder={addVIPOrder}
        addBot={addBot}
        removeBot={() => removeBot(setNormalOrders)}
      />
      <OrdersSection
        normalOrders={normalOrders}
        vipOrders={vipOrders}
        completedOrders={completedOrders}
      />
      <BotsSection bots={bots} />
    </div>
  );
}
