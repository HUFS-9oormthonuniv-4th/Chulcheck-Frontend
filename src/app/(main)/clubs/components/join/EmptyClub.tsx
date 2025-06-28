export function EmptyClub() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-[256px] mx-auto mt-10">
      <p className="text-center text-[17px] font-semibold leading-[22px] tracking-[-0.073px] text-black">
        생성된 동아리가 없어요
      </p>
      <p className="text-center text-sm leading-5 text-[#777]">
        검색한 동아리명이 맞는지 확인하고 <br />
        생성된 동아리가 맞는지 확인해주세요.
      </p>
      <div className="flex justify-center items-start gap-2 mt-2 text-[40px]">
        🥲
      </div>
    </div>
  );
}
