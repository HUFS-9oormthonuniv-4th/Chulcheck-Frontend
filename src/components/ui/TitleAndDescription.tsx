import React from "react";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
}

export function TitleAndDescription({
  title,
  description,
}: TitleAndDescriptionProps) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-extrabold text-[#1E293B] mb-1">{title}</h2>
      <p className="text-base text-[#64748B]">{description}</p>
    </div>
  );
}
