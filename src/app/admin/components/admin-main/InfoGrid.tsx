import { Users, CalendarDays, Key, BarChart2 } from "lucide-react";

import { InfoBox } from "./InfoBox";

export function InfoGrid() {
  return (
    <section className="space-y-4 mb-6 mt-2.5">
      <div className="grid grid-cols-5 gap-4">
        <InfoBox
          title="멤버"
          icon={<Users className="h-6 w-6 text-black" />}
          value="6"
          description="가입한 멤버 수"
          className="col-span-2"
        />
        <InfoBox
          title="출석 세션"
          icon={<CalendarDays className="h-6 w-6" />}
          value="5"
          description="생성된 출석 세션 수"
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <InfoBox
          title="역할"
          icon={<Key className="h-6 w-6" />}
          value="관리자"
          description="동아리 내 역할"
          className="col-span-3"
        />
        <InfoBox
          title="통계"
          icon={<BarChart2 className="h-6 w-6" />}
          value="Top 2"
          description="개근자 및 결석자"
          className="col-span-2"
        />
      </div>
    </section>
  );
}
