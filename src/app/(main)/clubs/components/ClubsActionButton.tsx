import { ButtonHTMLAttributes } from "react";

import { FolderPlusIcon } from "lucide-react";

interface ClubActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function ClubActionButton({ label, ...props }: ClubActionButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 rounded-md bg-[#0F172A] px-4 py-2 text-white font-medium"
      {...props}
    >
      <FolderPlusIcon size={16} />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
