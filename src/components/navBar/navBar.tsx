import type { JSX } from 'solid-js';
import { mergeProps } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { css } from 'solid-styled-components';
import { SvgIcon, useConfigProvider } from '@/components';
import createEntryPath from './store';

interface NavbarProps {
  title?: JSX.Element | string;
  left?: JSX.Element;
  right?: JSX.Element;
  hideBack?: boolean;
  fixed?: boolean;
  height?: number;
  back?: () => void;
}

export function Navbar(props: NavbarProps) {
  const { entryPath, cahceEntryPath } = createEntryPath; // 缓存入口路由
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme } = useConfigProvider();

  const mianProps = mergeProps({ height: 50, fixed: true }, props);
  if (!entryPath()) {
    console.log('入口页面pathname', pathname);

    cahceEntryPath(pathname);
  }

  function back() {
    if (props.back) {
      props.back();
      return;
    }
    if (props.hideBack || props.left) return;
    if (pathname !== entryPath()) {
      navigate(-1);
    } else {
      // 关闭浏览器webview
      console.log('重写手动关闭页面');
    }
  }
  return (
    <>
      <div
        classList={{ fixed: mianProps.fixed }}
        class={`${theme.classPrefix}-navbar bg-color text-color flex items-center ${css`
          position: ${mianProps.fixed ? 'fixed' : 'relative'};
          width: 100%;
          left: 0;
          top: 0;
          z-index: 100;
          text-align: center;
        `}`}
        style={{ height: `${mianProps.height}px`, 'line-height': `${mianProps.height}px` }}
      >
        <div class="w-12 flex-shrink-0" on:click={back}>
          {props.left ? props.left : !props.hideBack && <SvgIcon type="back" />}
        </div>
        <div class="flex-1 text-base font-semibold truncate">{props.title}</div>
        <div class="w-12 flex-shrink-0">{props.right}</div>
      </div>
      {mianProps.fixed && <div style={{ height: `${mianProps.height}px` }} />}
    </>
  );
}
