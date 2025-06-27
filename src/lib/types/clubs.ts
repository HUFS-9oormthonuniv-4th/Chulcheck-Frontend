// src/lib/types/clubs.ts

export interface CreateClubRequest {
  name: string;
  representativeAlias: string;
  memberAlias: string;
  description: string;
  // ❌ ownerId: string; 제거됨
}

export interface CreateClubResponse {
  clubId: string;
  message: string;
}
