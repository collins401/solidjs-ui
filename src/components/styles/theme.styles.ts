import { createGlobalStyles, styled, setup } from 'solid-styled-components';
import { useConfigProvider } from '../config-provider';

export function themeStyle() {
  const config = useConfigProvider();
  const MaskStyle = styled.div((props) => ({
    position: 'fixed',
    backgroundColor: `rgba(0,0,0,${config?.theme.maskOpacity})`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: `${config?.theme.maskZIndex}`
  }));
  return {
    MaskStyle
  };
}
