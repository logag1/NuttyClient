export interface snsInfoList {
  type: string;
  url: string;
  updatedAt: number;
}

export interface FriendRes {
  botType: string;
  friendId: string;
  friendName: string;
  friendFirstname: string;
  friendLastName: string;
  channelUrl: string;
  profileImageUrl: string;
  snsInfoList: snsInfoList[];
  statusMessage: string;
  intimacyDescription: any; // ??
  intimacyLevel: number;
  isBlocked: boolean;
}

export interface FriendListRes {
  'friends': FriendRes[]
}