import { SYSTEM_SERVER } from "@/utils/constants";
import { http } from "@/utils/http";
import type { UserInfo } from "#/store";

enum Api {
  USER_PROFILE = "/user/profile",
  LOGIN_OUT = "/auth/logout",
}

export const getUserInfo = () =>
  http.get<UserInfo>({
    url: SYSTEM_SERVER + Api.USER_PROFILE,
  });

export const userLoginOut = () =>
  http.get({
    url: SYSTEM_SERVER + Api.LOGIN_OUT,
  });
