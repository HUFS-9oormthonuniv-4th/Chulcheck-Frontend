import React, { useState } from "react";

interface AttendancePinInputProps {
  onClose: () => void;
  onSubmit?: (pin: string) => void;
}

export default function AttendancePinInput({
  onClose,
  onSubmit,
}: AttendancePinInputProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPin(value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError("PIN 코드를 입력해주세요.");
      return;
    }
    if (onSubmit) onSubmit(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8B8F9C]/80">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative flex flex-col items-center">
        {/* 돌아가기 버튼 */}
        <button
          className="absolute left-4 top-4 text-[#475569] hover:text-[#334155] focus:outline-none"
          onClick={onClose}
          aria-label="돌아가기"
        >
          ← 돌아가기
        </button>

        {/* 안내 텍스트 */}
        <div className="mt-8 mb-2 w-full text-left">
          <div className="text-lg font-extrabold text-[#1E293B]">
            PIN 코드로 출석체크
          </div>
          <div className="text-sm text-[#64748B] mt-1">
            화면에 보이는 PIN코드를 작성 후 버튼을 눌러주세요
          </div>
        </div>

        {/* 입력 카드 */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full mt-6"
        >
          <div className="bg-[#F6F8FA] rounded-2xl flex flex-col items-center justify-center min-h-[180px] w-full max-w-xs mb-8 border border-[#E2E8F0] px-6 py-8">
            <label
              className="w-full text-left text-base font-bold text-[#1E293B] mb-2"
              htmlFor="pin-input"
            >
              PIN 코드(숫자)
            </label>
            <input
              id="pin-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              className="w-full rounded-lg border border-[#CBD5E1] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#3282F0] bg-white placeholder-[#94A3B8] mb-4"
              placeholder="화면에 보이는 PIN 코드를 입력 해주세요"
              value={pin}
              onChange={handleChange}
              autoFocus
            />
            {error && (
              <div className="text-red-500 text-sm mb-2 w-full text-left">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#3282F0] hover:bg-[#2563EB] transition-colors rounded-lg py-3 text-white font-bold text-base mt-2"
            >
              출석하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
