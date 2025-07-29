"use client";

import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

import { ClubRole } from "../../types/member";

interface MemberSelectProps {
  value: ClubRole;
  memberAlias: string;
  representativeAlias: string;
  isFounder?: boolean;
  onChange: (value: ClubRole) => void;
}

const options: { value: ClubRole; label: string }[] = [
  { value: ClubRole.MANAGER, label: "관리자" },
  { value: ClubRole.MEMBER, label: "멤버" },
];

export function MemberSelect({
  value,
  memberAlias,
  representativeAlias,
  isFounder = false,
  onChange,
}: MemberSelectProps) {
  // 생성자일 경우에만 선택 불가능
  if (isFounder) {
    return (
      <div className="relative text-sm overflow-visible">
        <Listbox value={value} onChange={() => {}} disabled>
          <div className="relative">
            <Listbox.Button className="w-20 cursor-not-allowed rounded-md bg-gray-100 py-2 pl-3 pr-7 text-right text-gray-500">
              {representativeAlias}
              <span className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </span>
            </Listbox.Button>
          </div>
        </Listbox>
      </div>
    );
  }

  // 일반 멤버/관리자는 선택 가능
  return (
    <div className="relative text-sm overflow-visible">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-20 cursor-pointer rounded-md bg-white py-2 pl-3 pr-7 text-right text-black focus:outline-none">
            {value === ClubRole.MANAGER ? "관리자" : memberAlias}
            <span className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-1 w-40 -left-20 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? "bg-gray-100 text-black" : "text-gray-800"
                  }`
                }
              >
                {({ selected }) => (
                  <span className="flex justify-between items-center">
                    {opt.value === ClubRole.MEMBER ? memberAlias : opt.label}
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
