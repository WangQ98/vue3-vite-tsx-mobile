import type { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/enums";

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
}

export type BasicKeys = keyof BasicStore;

export interface OrgUserInfo {
  userId: string;
  projectId: string;
  projectName: string;
  orgId: string;
  orgName: string;
  choose: boolean;
}

/**
 * 用户信息
 */
export interface UserInfo {
  accountId: string;
  fullName: string;
  userId: string;
  projectId: string;
  projectName: string;
  orgId: string;
  orgName: string;
  orgUserInfos: OrgUserInfo[];
}
