interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div>
      <label className="text-[14px] font-medium text-[#1E293B] mb-1 block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border bg-white border-[#E5E7EB] rounded-md px-3 py-3 text-sm"
      />
    </div>
  );
}
