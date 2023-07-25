import { createContext, useContext, createSignal, mergeProps, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import GlobalStyle from '../styles/global';

export interface ConfigProviderTheme {
  colorPrimary?: string;
  colorBorder?: string;
  defaultColorPrimary?: string;
  defaultButtonHeight?: string;
  baseBorderRadius?: string;
  defaultSwitchHeight?: number;
  classPrefix?: string;
  maskOpacity?: number;
  maskZIndex?: number;
}
export interface ConfigProviderConfig {
  duration?: number;
}
export interface ConfigProviderType {
  theme?: ConfigProviderTheme;
  config?: ConfigProviderConfig;
}
export interface ConfigProviderProps {
  theme?: ConfigProviderTheme;
  config?: ConfigProviderConfig;
  children: JSX.Element;
}

const ConfigProviderContext = createContext<ConfigProviderType | null>({
  config: {
    duration: 3000
  },
  theme: {
    colorPrimary: '#07c160',
    colorBorder: '#e5e5ee',
    classPrefix: 'so',
    defaultButtonHeight: '36px',
    baseBorderRadius: '4px',
    defaultSwitchHeight: 26,
    maskOpacity: 0.7,
    maskZIndex: 1000
  }
});
const defaultTheme = {
  colorPrimary: '#07c160',
  colorBorder: '#e5e5ee',
  classPrefix: 'so',
  defaultButtonHeight: '36px',
  baseBorderRadius: '4px',
  defaultSwitchHeight: 26,
  maskOpacity: 0.7,
  maskZIndex: 1000
};
const defaultConfig = {
  duration: 3000
};
export function ConfigProvider(props: ConfigProviderProps) {
  const theme = mergeProps(defaultTheme, props.theme);
  const config = mergeProps(defaultConfig, props.config);
  const content: ConfigProviderType = {
    theme: theme,
    config: config
  };

  return (
    <ConfigProviderContext.Provider value={content}>
      <GlobalStyle />
      {props.children}
    </ConfigProviderContext.Provider>
  );
}

export function useConfigProvider() {
  return useContext(ConfigProviderContext);
}
