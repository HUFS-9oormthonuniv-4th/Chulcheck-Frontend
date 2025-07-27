// Badge 타입 정의
export interface BadgeResponse {
  id: number;
  name: string;
  badgeImage: string;
  obtainedAt: string; // ISO date string
  isAcquired: boolean;
}

// 사용자 정보 타입 정의 (배지 포함)
export interface UserWithBadgesResponse {
  userId: string;
  nickname: string;
  image: string;
  role: string;
  name: string;
  school: string;
  major: string;
  studentNum: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
  isOAuthUser: boolean;
  attendanceRate: number;
  badges: BadgeResponse[];
}

// API 응답 래퍼 타입
export interface ApiResponseUserWithBadgesResponse {
  status: number;
  message: string;
  data: UserWithBadgesResponse;
}
