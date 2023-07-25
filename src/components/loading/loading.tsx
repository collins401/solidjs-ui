import { styled, css, keyframes } from 'solid-styled-components';

export interface LoadingProps {
  style?: any;
  class?: any;
  size?: number;
  bgFill?: boolean;
}
const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;
const circular = keyframes`
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40;
  }
  to {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120;
  }
`;
const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  color: currentColor;
  z-index: 4;
  position: relative;
  vertical-align: middle;
  circle {
    animation: ${circular} 1.5s ease-in-out infinite;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    z-index: 3;
  }
`;

export function Loading(props: LoadingProps) {
  return (
    <div
      class={`${props.class || ''} ${css`
        color: inherit;
        font-size: ${props.size ? props.size + 'px' : 'inherit'};
        position: relative;
        width: 1em;
        display: inline-block;
        vertical-align: middle;
        animation: ${rotate} 0.8s linear infinite;
        animation-duration: 2s;
        &:before {
          width: 100%;
          height: 100%;
          content: '';
          position: absolute;
          display: ${props.bgFill ? 'block' : 'none'};
          left: 0;
          top: 0;
          border: 3px solid #5d5a5a;
          border-radius: 50%;
          z-index: 0;
        }
      `}`}
      style={props.style}
    >
      <Svg width="50" height="50" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="23" fill="none" />
      </Svg>
    </div>
  );
}
