import { ButtonHTMLAttributes, ReactNode } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
  children: ReactNode;
}

export const FormButton = ({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: FormButtonProps) => {
  const base =
    "w-full py-2.5 rounded-lg font-semibold flex justify-center items-center gap-2";
  const variants = {
    primary: "bg-[#3B82F6] text-white",
    secondary: "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]",
    danger: "bg-[#F6D5D6] text-[#EA4343] border-2 border-[#EA4343]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
};
