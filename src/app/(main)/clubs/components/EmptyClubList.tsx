import { Frown, Ghost, Meh } from "lucide-react";

export function EmptyClubList() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-[256px] mx-auto mt-10">
      <p className="text-center text-[17px] font-semibold leading-[22px] tracking-[-0.073px] text-black font-pretendard">
        가입한 동아리가 없어요
      </p>
      <p className="text-center text-sm leading-5 text-[#777] font-pretendard">
        관심있는 동아리에 가입해보세요
      </p>
      <div className="flex justify-center items-start gap-2 mt-2">
        <Meh size={30} color="#3282F0" />
        <Ghost size={30} color="#3282F0" />
        <Frown size={30} color="#3282F0" />
      </div>
    </div>
  );
}
