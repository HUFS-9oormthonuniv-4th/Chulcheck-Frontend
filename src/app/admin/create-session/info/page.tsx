"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { FolderPlus } from "lucide-react";

import Header from "@/components/ui/Header";

import { FormButton } from "../../components/Button";
import FormInput from "../../components/create-session/FormInput";
import TimeInput from "../../components/create-session/TimeInput";

export default function CreateSessionForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    clubName: "",
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("제출 내용", form);
    router.push("/admin/create-session/check-qr");
  };

  return (
    <div className="max-w-md mx-auto pb-6 bg-white min-h-screen">
      <Header variant="back" />
      <header className="flex flex-col gap-2 py-2 bg-white pb-4">
        <h1 className="text-xl font-bold text-gray-900">출석 세션 정보</h1>
        <p className="text-sm text-gray-700">
          출석 체크를 위한 세션 정보를 입력하세요
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormInput
          label="동아리 이름"
          name="clubName"
          type="text"
          value={form.clubName}
          onChange={handleChange}
        />
        <FormInput
          label="세션 제목"
          name="title"
          type="text"
          placeholder="예) 4월 첫째주 모임"
          value={form.title}
          onChange={handleChange}
        />
        <label className="text-[14px] font-medium text-[#1E293B] mb-1 block">
          설명(선택)
        </label>
        <textarea
          name="description"
          placeholder="세션에 대한 간단한 설명을 입력하세요"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-[#E5E7EB] rounded-md px-3 py-3 text-sm resize-none"
        />
        <FormInput
          label="장소"
          name="location"
          type="text"
          placeholder="예: 백년관 301호"
          value={form.location}
          onChange={handleChange}
        />
        <FormInput
          label="날짜"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <TimeInput
          startTime={form.startTime}
          endTime={form.endTime}
          onChange={handleChange}
        />
        <p className="text-[14px] text-[#666666] mt-3 mb-10 leading-relaxed">
          세션을 생성하면 QR 코드 페이지도 자동으로 넘어가요!
          <br />
          QR 코드 생성을 통해 멤버의 출석을 편리하게 관리할 수 있어요.
        </p>
        <div className="space-y-2 mt-6">
          <FormButton
            variant="primary"
            icon={<FolderPlus className="w-5 h-5 mr-2" />}
            type="submit"
          >
            출석 QR 생성하기
          </FormButton>
          <FormButton variant="secondary" onClick={() => router.push("/admin")}>
            취소
          </FormButton>
        </div>
      </form>
    </div>
  );
}
