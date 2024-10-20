import { BotComponent } from "../../components/BotComponent";
import { BotModel } from "../../models/models";

interface BotsSectionProps {
  bots: BotModel[];
}

export const BotsSection = ({ bots }: BotsSectionProps) => (
  <section>
    <h2 className="text-2xl font-semibold text-gray-300">Bots Status</h2>
    <ul
      className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2"
      data-test="bot-list"
    >
      {bots.map((bot) => (
        <li
          key={bot.id}
          className="p-4 text-white bg-gray-800 rounded-lg shadow"
        >
          <BotComponent bot={bot} />
        </li>
      ))}
    </ul>
  </section>
);
