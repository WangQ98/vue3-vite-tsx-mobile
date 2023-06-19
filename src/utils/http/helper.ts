import { ResultEnum } from "@/enums";

export function joinTimestamp(join: boolean): string | object {
  if (!join) {
    return {};
  }
  const now = Date.now();
  return { _t: now };
}

/**
 * 处理status、code、状态码
 * @param resultStatus
 */
export function handleResult(resultStatus: number) {
  let resMsg = "";
  switch (resultStatus) {
    case ResultEnum.TIMEOUT:
      resMsg = "登录超时，请重新登录";
      break;
    case ResultEnum.NO_PERMISSION:
      resMsg = "没有权限，请联系管理员";
      break;
    case ResultEnum.SERVER_ERROR:
      resMsg = "服务器错误，请联系管理员";
      break;
    case ResultEnum.NO_ENABLED:
      resMsg = "账号已被禁用，请联系管理员";
      break;
    case ResultEnum.SUCCESS:
      break;
  }
  return resMsg;
}
