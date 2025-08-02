"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  Plus,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/utils";

interface MenuItem {
  title: string;
  href?: string;
  submenu?: MenuItem[];
  icon?: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    title: "메인",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "내 동아리",
    href: "/clubs",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "동아리 참여",
    href: "/clubs/join",
    icon: <Plus className="h-5 w-5" />,
    // submenu: [
    //   { title: '동아리 생성', href: '/clubs/create' },
    //   { title: '동아리 수정', href: '/clubs/edit' },
    //   { title: '동아리 삭제', href: '/clubs/delete' },
    // ],
  },
  {
    title: "프로필",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
  },
];

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = item.href === pathname;

  const hasActiveSubmenu = item.submenu?.some(
    (subItem) => subItem.href === pathname,
  );

  if (item.submenu) {
    return (
      <Collapsible open={isOpen || hasActiveSubmenu} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-3 px-4 text-base font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg group",
              depth > 0 && "pl-8",
              hasActiveSubmenu && "bg-blue-50 text-blue-700 hover:bg-blue-100",
            )}
          >
            <div className="flex items-center space-x-3">
              {item.icon && (
                <span
                  className={cn(
                    "transition-colors",
                    hasActiveSubmenu
                      ? "text-blue-600"
                      : "text-gray-600 group-hover:text-gray-900",
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span
                className={cn(
                  "transition-colors",
                  hasActiveSubmenu
                    ? "text-blue-700"
                    : "text-gray-700 group-hover:text-gray-900",
                )}
              >
                {item.title}
              </span>
            </div>
            {isOpen || hasActiveSubmenu ? (
              <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500 transition-transform duration-200" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={subItem.title}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center space-x-3 py-3 px-4 text-base font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg group",
        depth > 0 && "pl-8",
        isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100",
      )}
    >
      {item.icon && (
        <span
          className={cn(
            "transition-colors",
            isActive
              ? "text-blue-600"
              : "text-gray-600 group-hover:text-gray-900",
          )}
        >
          {item.icon}
        </span>
      )}
      <span
        className={cn(
          "transition-colors",
          isActive
            ? "text-blue-700"
            : "text-gray-700 group-hover:text-gray-900",
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};

export default function HamburgerMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="h-5 w-5 text-gray-700" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] sm:w-[320px] p-0 border-r border-gray-200"
      >
        {/* 접근성을 위한 제목 - 시각적으로는 숨김 */}
        <SheetTitle className="sr-only">네비게이션 메뉴</SheetTitle>

        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="text-lg font-semibold text-gray-900">메뉴</div>
          </div>

          {/* 메뉴 아이템들 */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <MenuItemComponent key={item.title} item={item} />
            ))}
          </nav>

          {/* 푸터 */}
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
