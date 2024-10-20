interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color: "blue" | "green" | "yellow" | "red";
  dataTest?: string;
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  red: "bg-red-500 hover:bg-red-600",
};

export const ActionButton = ({
  label,
  onClick,
  color,
  dataTest,
}: ActionButtonProps) => {
  const colorClass = colorClasses[color];

  return (
    <button
      data-test={dataTest}
      className={`flex items-center gap-2 ${colorClass} text-white px-6 py-3 rounded-lg shadow`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
