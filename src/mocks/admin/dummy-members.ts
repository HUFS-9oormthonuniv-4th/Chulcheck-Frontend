export type Member = {
  id: number;
  name: string;
  department: string;
  joinDate: string;
  role: "대표" | "운영진" | "미르미";
};
export const dummyMembers: Member[] = [
  {
    id: 1,
    name: "이예림",
    department: "컴퓨터공학과",
    joinDate: "2024-03-15",
    role: "대표",
  },

  {
    id: 2,
    name: "김준호",
    department: "소프트웨어학과",
    joinDate: "2024-04-02",
    role: "미르미",
  },
  {
    id: 3,
    name: "박지우",
    department: "정보보호학과",
    joinDate: "2024-04-28",
    role: "미르미",
  },
  {
    id: 4,
    name: "최민서",
    department: "데이터학과",
    joinDate: "2024-05-10",
    role: "미르미",
  },
  {
    id: 5,
    name: "정하윤",
    department: "인공지능학과",
    joinDate: "2024-06-01",
    role: "운영진",
  },
];
