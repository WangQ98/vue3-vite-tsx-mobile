import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { getUserInfo, userLoginOut } from "@/api/common/user";
import {
  getAuthCache,
  getToken,
  logOut,
  removeToken,
  setAuthCache,
} from "@/utils/auth";
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums";
import { store } from "@/store";
import type { UserInfo } from "#/store";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getToken();
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : "";
      setAuthCache(TOKEN_KEY, token);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = Date.now();
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = "";
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      this.setUserInfo(userInfo);
      return userInfo;
    },
    loginOut() {
      userLoginOut().then((res) => {
        ElMessage.success({
          message: res.msg,
        });
        removeToken();
        logOut();
      });
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
