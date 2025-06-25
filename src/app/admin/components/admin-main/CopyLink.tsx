"use client";

import { RefreshCw, Copy } from "lucide-react";

export function CopyLink() {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://fclub-log.vercel.app/");
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg border mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-900">초대 링크</h2>
        <RefreshCw className="h-5 w-5" />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        이 링크를 공유하여 새로운 멤버를 초대해요
        <br />
        링크가 초기화하면 기존링크를 사용할 수 없어요
      </p>
      <div className="flex rounded-lg overflow-hidden gap-2">
        <input
          type="text"
          readOnly
          value="https://fclub-log.vercel.app/"
          className="flex-grow px-3 rounded-lg text-gray-700 text-sm outline-none border border-gray-300"
        />
        <button
          onClick={() => {
            void handleCopyLink();
          }}
          className="text-black p-2 border border-gray-300 rounded-lg"
        >
          <Copy className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
