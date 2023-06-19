import { loadEnv } from "vite";
import createVitePlugins from "./vite/plugins";
import { wrapperEnv } from "./vite/utils";
import alias from "./vite/alias";
import type { ConfigEnv, UserConfig } from "vite";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const isBuild = command === "build";

  const viteEnv = wrapperEnv(env);

  const { VITE_DROP_CONSOLE, VITE_PORT } = viteEnv;

  return {
    server: {
      port: VITE_PORT,
      // https: true,
      host: true,
      proxy: {
        "/api": {
          target: "http://localhost:5600/",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/(sys|auth)\//, ""),
        },
      },
    },
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/styles/config.less";',
          javascriptEnabled: true,
        },
      },
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE
        ? ["console.log", "console.info", "debugger"]
        : [],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
