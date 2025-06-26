interface ManagementTabsProps {
  activeTab: "memberManagement" | "attendanceManagement";
  setActiveTab: (tab: "memberManagement" | "attendanceManagement") => void;
}

export function ManagementTabs({
  activeTab,
  setActiveTab,
}: ManagementTabsProps) {
  return (
    <div className="mt-2 mb-4">
      <h2 className="text-md px-3 py-2 w-[56px] text-center font-semibold rounded-sm text-white mb-2 bg-[#262E40]">
        관리
      </h2>
      <div className="flex bg-[#F1F5F9] p-1 w-full text-sm font-medium rounded-md">
        <button
          onClick={() => setActiveTab("memberManagement")}
          className={`w-1/2 py-2 rounded-md transition ${
            activeTab === "memberManagement"
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-gray-600"
          }`}
        >
          회원 관리
        </button>
        <button
          onClick={() => setActiveTab("attendanceManagement")}
          className={`w-1/2 py-2 rounded-md transition ${
            activeTab === "attendanceManagement"
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-gray-600"
          }`}
        >
          출석 관리
        </button>
      </div>
    </div>
  );
}
