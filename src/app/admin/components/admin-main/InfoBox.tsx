interface InfoBoxProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  className?: string;
}

export function InfoBox({
  title,
  icon,
  value,
  description,
  className = "",
}: InfoBoxProps) {
  return (
    <div className={`rounded-2xl border bg-white p-4 text-start ${className}`}>
      <div className="flex items-center justify-between mb-2 space-x-2">
        <span className="text-xl font-bold text-black">{title}</span>
        {icon}
      </div>
      <div className="text-[#3282F0] font-bold mb-1 text-2xl">{value}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
