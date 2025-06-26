import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

import { Member } from "@/lib/type/admin";

interface MemberSelectProps {
  value: Member["role"];
  onChange: (value: Member["role"]) => void;
}

const roles: Member["role"][] = ["대표", "운영진", "미르미"];

export function MemberSelect({ value, onChange }: MemberSelectProps) {
  return (
    <div className="relative text-sm overflow-visible">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-20 cursor-pointer rounded-md bg-white py-2 pl-3 pr-7 text-right text-black focus:outline-none">
            {value}
            <span className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-1 w-40 -left-20 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {" "}
            {roles.map((role) => (
              <Listbox.Option
                key={role}
                value={role}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-gray-100 text-black" : "text-gray-800"
                  }`
                }
              >
                {({ selected }) => (
                  <span className="flex justify-between items-center">
                    {role}
                    {selected && <Check className="h-4 w-4 text-black" />}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
