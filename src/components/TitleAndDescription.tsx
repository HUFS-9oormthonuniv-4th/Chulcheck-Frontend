import React from "react";

interface TitleAndDescriptionProps {
  title: string;
  description: React.ReactNode;
}

export function TitleAndDescription({
  title,
  description,
}: TitleAndDescriptionProps) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-extrabold text-[#1E293B] mb-1">{title}</h2>
      <p className="text-sm text-[#64748B]">{description}</p>
    </div>
  );
}
