import env from "@/utils/env";
import Axios from "./request";

export const http = new Axios({
  baseURL: env.VITE_APP_BASE_API,
  timeout: 10000,
});
