"use client";

import React from "react";

export default function ColorTest() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">컬러 테스트</h2>

      {/* 기본 컬러 사용 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">기본 컬러 사용</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary rounded-md" />
            <span>primary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-secondary rounded-md" />
            <span>secondary</span>
          </div>
        </div>
      </div>

      {/* 커스텀 컬러 사용 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">커스텀 컬러 사용</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#3282F0] rounded-md" />
            <span>메인 컬러 하드코딩</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#D6E6FC] rounded-md" />
            <span>서브 컬러 하드코딩</span>
          </div>
        </div>
      </div>

      {/* 커스텀 변수 사용 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">커스텀 변수 사용</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-md"
              style={{ backgroundColor: "var(--color-main)" }}
            />
            <span>--color-main</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-md"
              style={{ backgroundColor: "var(--color-sub)" }}
            />
            <span>--color-sub</span>
          </div>
        </div>
      </div>

      {/* 버튼 사용 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">버튼 사용</h3>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded-md">
            Primary 버튼
          </button>
          <button className="px-4 py-2 bg-secondary text-primary rounded-md">
            Secondary 버튼
          </button>
        </div>
      </div>
    </div>
  );
}
