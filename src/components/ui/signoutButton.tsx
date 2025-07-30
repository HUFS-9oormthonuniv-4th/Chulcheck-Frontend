import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/auth/actions/signout";

export default function SignoutButton() {
  return (
    <form className="p-4 border-t border-gray-200" action={logoutAction}>
      <button className="w-full flex items-center space-x-3 py-2 px-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer">
        <LogOut className="h-4 w-4" />
        <span>로그아웃</span>
      </button>
    </form>
  );
}
