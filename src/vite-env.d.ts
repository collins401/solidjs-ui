/// <reference types="vite/client" />

import type {} from 'solid-js';
// don't extract on:events
type ExtractEventHandlers<T> = // don't extract on:events
  T extends `on:${string}` ? never : T extends `on${infer I}` ? Lowercase<I> : never;
type MapEventHandlers<T> = {
  [K in ExtractEventHandlers<keyof T> as `on:${K}`]?: T[Extract<`on${K}`, keyof T>];
};

declare module 'solid-js' {
  namespace JSX {
    interface CustomEvents {
      click: (ev: MouseEvent) => void;
    }
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
