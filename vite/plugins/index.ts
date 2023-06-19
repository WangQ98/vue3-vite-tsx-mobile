import VueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueMacros from "unplugin-vue-macros/vite";

import { configMockPlugin } from "./mock";
import type { PluginOption } from "vite";

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    VueMacros({
      plugins: {
        vueJsx: VueJsx(),
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue/macros", "vue-router", "@vueuse/core"],
      dts: "types/auto-imports.d.ts",
      dirs: ["./src/hooks"],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ];

  // mock服务
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}
