import type { PropType as VuePropType } from "vue";

declare global {
  // vue
  declare type PropType<T> = VuePropType<T>;

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_DROP_CONSOLE: boolean;
    VITE_APP_BASE_API: string;
    VITE_APP_BASE_URL: string;
    // plugin
    VITE_USE_MOCK: boolean;
    // project
    VITE_LOAD_ALL_WIDGET: boolean;
  }
}

declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
