import { BigNumber } from "ethers";

export type ApiResponse<T> = {
  message: string;
  result: T | null;
  error: string | null;
  status: number;
};

export type User = {
  id: string;
  walletAddress: string;
  username: string;
  profileImageId?: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  xp: number;
  level: number;
};

export type NFTTicket = {
  id: string;
  tokenId: string;
  uri: string;
  owner: string;
};

export type eventsWithMetadataRes = {
  eventId: bigint;
  metadata: {
    description: string;
    eventDate: string;
    image: string;
    location: string;
    name: string;
  };
  owner: string;
  startDate: bigint;
  ticketTotal: bigint;
  ticketsSold: bigint;
  uri: string;
};

export type MyTicketsRes = {
  eventId: number;
  eventName: string;
  imageUri: string;
  startDate: string;
  location: string;
  tokenId: number;
  ticketName: string;
  price: string;
  gbpPrice: string;
  quantity: number;
};

export type MyTicketContractRes = {
  eventId: BigNumber;
  eventName: string;
  imageUri: string;
  startDate: string;
  location: string;
  tokenId: BigNumber;
  ticketName: string;
  price: BigNumber;
  gbpPrice: BigNumber;
  quantity: BigNumber;
};
export type ContractRes<T> = {
  data: T;
  message: string;
  error: string | null;
};

export type UploadMetadataProps = {
  name: string;
  description: string;
  image: File;
  properties: {
    price: BigNumber;
    eventId: string;
    purchaseLimit: string;
    royaltyFee: string;
    maxResalePrice: BigNumber;
  };
};

export type DailyLogin = {
  id: string;
  userId: string;
  loginDate: Date;
};

export type Mission = {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  startDate: Date | null;
  endDate: Date | null;
};

export type MissionCompletion = {
  id: string;
  userId: string;
  missionId: string;
  completedAt: Date;
};

export type Level = {
  rewardValue: number;
  id: string;
  levelNumber: number;
  xpThreshold: number;
  rewardName: string;
  rewardDescription: string | null;
};

export type UserReward = {
  id: string;
  userId: string;
  levelId: string;
  receivedAt: Date;
  claimed: boolean;
};

export type LeaderboardEntry = {
  id: string;
  username: string;
  xp: number;
  level: number;
  profileImageId?: string;
};

export type UserLevel = {
  id: string;
  userId: string;
  currentLevel: number;
  neededLevel: number;
  currentXp: number;
  neededXp: number;
  neededPrecent: number;
  currentBadge: string;
  currentValue: number;
};

export type MissionCompletionRes = {
  id: string;
  userId: string;
  missionId: string;
  completedAt: Date;
  mission: Mission;
};

export type RewardWithLevel = UserReward & { level: Level };
