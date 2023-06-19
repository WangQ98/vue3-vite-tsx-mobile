import { TOKEN_KEY } from "@/enums/CacheEnum";
import userSetting from "@/settings/userSetting";
import WebStorage from "../cache";
import type { BasicKeys } from "#/store";

export function getToken(): string {
  return (
    (getAuthCache(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY)) ??
    userSetting.token
  );
}

export function removeToken() {
  removeAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  return WebStorage.get(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  return WebStorage.set(key, value);
}

export function removeAuthCache(key: BasicKeys) {
  return WebStorage.remove(key);
}

export function clearAuthCache() {
  return WebStorage.clear();
}

export function logOut() {
  const redirect = location.pathname + location.search + location.hash;
  location.href = `/sso/login?redirect=${encodeURIComponent(redirect)}`;
}
