export interface CreateClubRequest {
  name: string;
  representativeAlias: string;
  memberAlias: string;
  description: string;
  ownerId: string;
}

export interface CreateClubResponse {
  id: string;
  name: string;
  representativeAlias: string;
  memberAlias: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
