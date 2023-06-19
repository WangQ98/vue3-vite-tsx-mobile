import { DEFAULT_CACHE_TIME } from "../settings";
import pkg from "../../../package.json";
import { createStorage as create } from "./storageCache";
import type { CreateStorageParams } from "./storageCache";

export type Options = Partial<CreateStorageParams>;

function getCommonStoragePrefix() {
  return `fzpt_xdesk__${pkg.version}__`.toUpperCase();
}

const createOptions = (storage: Storage, options: Options = {}) => {
  return {
    storage,
    prefixKey: getCommonStoragePrefix(),
    timeout: DEFAULT_CACHE_TIME,
    ...options,
  };
};

export const WebStorage = create(createOptions(localStorage));

export const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {}
) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export const createLocalStorage = (options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export default WebStorage;
