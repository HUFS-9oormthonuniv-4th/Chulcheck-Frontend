"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";

import { useCreateClub } from "@/app/(main)/clubs/hooks/useCreateClub";

import { CreateClubForm } from "../components/CreateClubForm";

interface CreateClubFormValues {
  name: string;
  leaderTitle: string;
  memberTitle: string;
  description: string;
}

export default function CreateClubPage() {
  const form = useForm<CreateClubFormValues>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const createClub = useCreateClub();

  const onSubmit = async (data: CreateClubFormValues) => {
    try {
      await createClub.mutateAsync({
        name: data.name,
        representativeAlias: data.leaderTitle,
        memberAlias: data.memberTitle,
        description: data.description,
      });

      alert("동아리 생성이 완료되었습니다.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "동아리 생성 실패");
    }
  };
  return (
    <div className="flex flex-col items-center bg-white pb-10">
      {/* 헤더 */}
      <div className="w-full max-w-[375px] px-3 py-5">
        <div className="inline-flex items-center gap-1">
          <Image
            src="/assets/icons/arrow-up.svg"
            width={15}
            height={15}
            alt="back"
          />
          <span className="text-[20px] font-semibold leading-[28px] tracking-[-0.1px] text-[rgba(15,23,42,0.90)]">
            새 동아리 생성
          </span>
        </div>
      </div>

      <div className="w-full max-w-[375px] flex flex-col mt-[27px] px-4">
        <div className="flex flex-col items-start gap-[12px] self-stretch mb-[44px]">
          <h2 className="text-[#0F172A] text-[18px] font-bold leading-[18px] font-inter">
            동아리 정보
          </h2>
          <p className="text-[#666] text-[14px] font-medium leading-[20px] font-pretendard">
            새로운 동아리의 정보를 입력해주세요
          </p>
        </div>

        <CreateClubForm
          form={form}
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
