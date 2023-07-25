import { mergeProps } from 'solid-js';
import { styled } from 'solid-styled-components';
const Icon = styled('i')`
  position: relative;
  display: inline-block;
  text-rendering: auto;
  vertical-align: middle;
  font-size: 0;
`;
const IconSvg = styled('svg')`
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin: 0 auto;
  font-size: 16px;
`;
export interface SvgIconProps {
  class?: string;
  fill?: string; // fill className
  type: string;
  color?: string;
  size?: string;
  onClick?: () => void;
  style?: any;
}
export function SvgIcon(props: SvgIconProps) {
  const mainProps = mergeProps(
    {
      color: '#eee',
      size: '16px'
    },
    props
  );
  return (
    <Icon class={mainProps.class} style={mainProps.style} on:click={() => mainProps.onClick?.()}>
      <IconSvg
        class={props.fill}
        aria-hidden="true"
        style={{
          width: mainProps.size,
          height: mainProps.size,
          color: mainProps.color,
          fill: mainProps.fill ? '' : 'currentColor'
        }}
      >
        <use xlink:href={`#icon-${mainProps.type}`} />
      </IconSvg>
    </Icon>
  );
}
