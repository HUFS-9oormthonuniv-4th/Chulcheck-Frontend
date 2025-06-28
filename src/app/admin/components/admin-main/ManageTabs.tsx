type TabKey = "memberManagement" | "attendanceManagement";

interface ManagementTabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  labels: {
    first: string;
    second: string;
  };
  keys: {
    first: TabKey;
    second: TabKey;
  };
  showTitle?: boolean;
}

export function ManagementTabs({
  activeTab,
  setActiveTab,
  labels,
  keys,
  showTitle = true,
}: ManagementTabsProps) {
  return (
    <div className="mt-2 mb-4">
      {showTitle && (
        <h2 className="text-md px-3 py-2 w-[56px] text-center font-semibold rounded-sm text-white mb-2 bg-[#262E40]">
          관리
        </h2>
      )}
      <div className="flex bg-[#F1F5F9] p-1 w-full text-sm font-medium rounded-md">
        <button
          onClick={() => setActiveTab(keys.first)}
          className={`w-1/2 py-2 rounded-md transition ${
            activeTab === keys.first
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-gray-600"
          }`}
        >
          {labels.first}
        </button>
        <button
          onClick={() => setActiveTab(keys.second)}
          className={`w-1/2 py-2 rounded-md transition ${
            activeTab === keys.second
              ? "bg-white text-black font-semibold shadow-sm"
              : "text-gray-600"
          }`}
        >
          {labels.second}
        </button>
      </div>
    </div>
  );
}
