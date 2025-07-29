import { httpService } from "@/lib/utils/httpService";

export interface PendingMember {
  id: number;
  userName: string;
  userNickname: string;
  createdAt: string;
}

export const getPendingJoinRequests = async (clubId: number) => {
  return await httpService.get<PendingMember[]>(
    `clubs/${clubId}/join-requests/pending`
  );
};

export const approveJoinRequest = async (clubId: number, requestId: number) => {
  return await httpService.put(
    `clubs/${clubId}/join-requests/${requestId}/process`,
    {
      requestId,
      status: "ACTIVE",
      rejectionReason: "",
    }
  );
};

export const rejectJoinRequest = async (
  clubId: number,
  requestId: number,
  reason: string
) => {
  return await httpService.put(
    `clubs/${clubId}/join-requests/${requestId}/process`,
    {
      requestId,
      status: "REJECTED",
      rejectionReason: reason,
    }
  );
};
