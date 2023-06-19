import userSetting from "@/settings/userSetting";
import { getRequestToken, resultError, resultSuccess } from "../_util";
import type { MockMethod } from "vite-plugin-mock";
import type { requestParams } from "../_util";

export function createFakeUserList() {
  return [
    {
      token: userSetting.token,
      id: "1400814d9eae4211bc156611140d29bb",
      userName: "admin",
      accountId: "admin",
      fullName: "平台管理员",
    },
  ];
}

export default [
  {
    url: "/api/sys/user/profile",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find(
        (item) => item.token === token
      );
      if (!checkUser) {
        return resultError(
          "The corresponding user information was not obtained!"
        );
      }
      return resultSuccess(checkUser);
    },
  },
] as MockMethod[];
