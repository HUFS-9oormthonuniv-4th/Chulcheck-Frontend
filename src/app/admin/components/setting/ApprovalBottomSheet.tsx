import BottomSheetWrapper from "../BottomSheetWrapper";

interface ApprovalBottomSheetProps {
  selected: { name: string };
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalBottomSheet({
  selected,
  onClose,
  onApprove,
  onReject,
}: ApprovalBottomSheetProps) {
  return (
    <BottomSheetWrapper onClose={onClose}>
      <h3 className="text-lg font-bold text-gray-900 mb-1 mt-6">
        가입 요청 처리
      </h3>
      <p className="text-sm text-[#666666] mb-4 font-semibold">
        {selected.name}님의 가입 요청을 처리하세요.
      </p>
      <div className="space-y-3 divide-y divide-gray-200 mb-4">
        <button
          onClick={() => {
            onApprove();
            onClose();
          }}
          className="w-full text-md font-medium px-3 py-2 rounded-lg text-start"
        >
          승인합니다
        </button>
        <button
          onClick={() => {
            onReject();
            onClose();
          }}
          className="w-full text-md font-medium px-3 py-2 rounded-lg text-start"
        >
          거절합니다
        </button>
      </div>
    </BottomSheetWrapper>
  );
}
