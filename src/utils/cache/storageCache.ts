import { isNullOrUnDef } from "../is";

export interface CreateStorageParams {
  prefixKey: string;
  storage: Storage;
  timeout?: Nullable<any>;
}

export const createStorage = ({
  prefixKey = "",
  storage = sessionStorage,

  timeout = null,
}: Partial<CreateStorageParams> = {}) => {
  /**
   * Cache class
   * 构造参数可以传入sessionStorage、localStorage
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
    }

    getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     *
     *  Set cache
     * @param {string} key
     * @param {*} value
     * @expire 过期时间（秒）
     * @memberof Cache
     */
    set(key: string, value: any, expire = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? Date.now() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    /**
     * 读取缓存
     * @param {string} key
     * @memberof Cache
     */
    get(key: string, def: any = null) {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= Date.now()) {
          return value;
        }
        this.remove(key);
      } catch {
        return def;
      }
    }

    /**
     * 根据key删除缓存
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * 删除本实例的所有缓存
     */
    clear() {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
