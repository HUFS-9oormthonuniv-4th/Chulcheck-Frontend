"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FolderMinus } from "lucide-react";

import { TitleAndDescription } from "@/components/TitleAndDescription";
import Header from "@/components/ui/Header";
import { FormButton } from "../../components/Button";
import { deleteClub } from "../../apis/clubs";

export default function EditClubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clubId = searchParams.get("clubId");
  const clubName = searchParams.get("clubName") || "";

  const [inputName, setInputName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (inputName !== clubName) {
      alert("동아리 이름이 정확하지 않습니다.");
      return;
    }

    if (!clubId) {
      alert("clubId가 유효하지 않습니다.");
      return;
    }

    const confirm = window.confirm("정말로 동아리를 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      setLoading(true);
      await deleteClub(clubId);

      alert("동아리가 성공적으로 삭제되었습니다.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10 max-w-md mx-auto">
      <Header variant="back" />
      <TitleAndDescription
        title="동아리 삭제"
        description={
          <>
            동아리를 삭제하면 모든 멤버, 출석 세션, 출석 기록 등이 함께
            삭제되며, 복구할 수 없습니다. <br />
            삭제를 확인하려면 동아리 이름 [{clubName}]을 입력하세요.
          </>
        }
      />
      <div className="py-8">
        <label className="block text-sm font-semibold text-[#2C3344] mb-1">
          동아리 이름
        </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="동아리 이름을 입력해주세요"
          className="w-full px-4 py-3 rounded-md border border-[#CBD5E1] text-sm placeholder:text-[#94A3B8] bg-white"
        />
      </div>

      <div className="space-y-2 mt-6">
        <FormButton
          variant="danger"
          icon={<FolderMinus className="w-5 h-5 mr-2" />}
          onClick={() => void handleDelete()}
          disabled={loading}
        >
          동아리 삭제하기
        </FormButton>
        <FormButton
          variant="secondary"
          onClick={() => router.push("/admin/setting")}
        >
          취소
        </FormButton>
      </div>
    </div>
  );
}
