import _ from "lodash";

// @ts-ignore
const env: ViteEnv = _.cloneDeep(import.meta.env);

Object.entries(import.meta.env as unknown as ViteEnv).forEach(
  ([key, value]) => {
    if (value === "true" || value === "false") {
      env[key] = value === "true";
    } else if (/^\d+$/.test(value)) {
      env[key] = Number(value);
    } else if (value === "null") {
      env[key] = null;
    } else if (value === "undefined") {
      env[key] = undefined;
    } else {
      env[key] = value;
    }
  }
);

export default env as ViteEnv;
