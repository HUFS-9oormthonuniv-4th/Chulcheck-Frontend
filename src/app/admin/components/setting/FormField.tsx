"use client";

interface Props {
  label: string;
  placeholder: string;
}

export const FormField = ({ label, placeholder }: Props) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#2C3344] mb-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-md border border-[#CBD5E1] text-sm placeholder:text-[#94A3B8] bg-white"
      />
    </div>
  );
};
