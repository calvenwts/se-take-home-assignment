import { ActionButton } from "../../components/ActionButtonComponent";

interface ActionSectionProps {
  addNormalOrder: () => void;
  addVIPOrder: () => void;
  addBot: () => void;
  removeBot: () => void;
}

export const ActionSection = ({
  addNormalOrder,
  addVIPOrder,
  addBot,
  removeBot,
}: ActionSectionProps) => (
  <section className="space-y-6">
    <div>
      <h2 className="text-xl font-semibold text-gray-300">Order Actions</h2>
      <div className="flex gap-4 mt-2">
        <ActionButton
          label="New Normal Order"
          onClick={addNormalOrder}
          color="blue"
        />
        <ActionButton
          label="New VIP Order"
          onClick={addVIPOrder}
          color="green"
        />
      </div>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-300">Bot Management</h2>
      <div className="flex gap-4 mt-2">
        <ActionButton label="Add Bot" onClick={addBot} color="yellow" />
        <ActionButton label="Remove Bot" onClick={removeBot} color="red" />
      </div>
    </div>
  </section>
);
