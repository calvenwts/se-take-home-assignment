import { BotModel } from "../models/models";

export const BotComponent = ({ bot }: { bot: BotModel }) => (
  <div key={bot.id}>
    Bot #{bot.id} - {bot.status}
  </div>
);
