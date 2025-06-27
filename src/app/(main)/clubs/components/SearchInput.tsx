import { InputHTMLAttributes } from "react";

import SearchIcon from "@/assets/icons/search.svg";

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2.5 rounded-sm border border-[#E2E8F0] bg-white px-[10px] py-[10px] w-full">
      <SearchIcon width={15} height={15} />
      <input
        type="text"
        placeholder="동아리 검색..."
        className="flex-1 border-none outline-none text-sm text-[#797E8A] font-medium leading-5 font-pretendard placeholder:text-[#94A3B8]"
        {...props}
      />
    </div>
  );
}
