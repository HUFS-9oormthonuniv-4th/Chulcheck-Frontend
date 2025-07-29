import { httpService } from "@/lib/utils/httpService";

export const deleteClub = async (clubId: number | string) => {
  return await httpService.delete(`clubs/${clubId}`);
};

export interface ClubDetail {
  clubName: string;
  description: string;
  representativeAlias: string;
  memberAlias: string;
}

export const getClubDetail = async (clubId: string) => {
  return await httpService.get<ClubDetail>(`clubs/${clubId}/detail`);
};

export const updateClub = async (
  clubId: string,
  data: {
    name: string;
    representativeAlias: string;
    memberAlias: string;
    description: string;
  }
): Promise<void> => {
  await httpService.put(`clubs/${clubId}`, data);
};
