/**
 * @description 生成uuid
 * @returns {string}
 */
export function generateUUID() {
  let d = Date.now();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.trunc((d + Math.random() * 16) % 16);
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

/**
 * @description 获取url参数
 * @returns {Record<string, string>}
 */
export function getUrlParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

/**
 * @description 判断是否是移动端
 * @returns {boolean}
 */
export function isMobile(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "iphone",
    "ipod",
    "ipad",
    "windows phone",
    "blackberry",
    "webos",
    "symbian",
    "touch",
  ];

  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
}
