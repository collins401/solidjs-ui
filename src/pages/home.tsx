import { createEffect, createResource, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Navbar, Switch, SvgIcon, SafeArea } from '@/components';
import useDark from '@/hooks/useDark';

function Home() {
  const [dark, toggle] = useDark();

  return (
    <>
      <Navbar title="Solid-template" hideBack />
      <div class="p-5 text-center space-y-2.5">
        <A href="/demo" class="text-primary block">
          👉查看UI
        </A>
      </div>
      <div class="bg-color rounded mx-4 p-5 leading-10">
        <div class="text-base font- mb-2">Vite + Solidjs构建mobile start项目</div>
        <div class="flex items-center justify-between border-t">
          ✨暗黑模式
          <Switch checked={dark()} onChange={toggle} />
        </div>
        <div class="border-t">✨自建UI组件库</div>
        <div class="border-t">✨fetch封装</div>
        <div class="border-t">✨rem适配</div>
        <div class="border-t">✨tailwind 样式组件</div>
        <div class="border-t">
          🎨集成自定义svg图标组件 <SvgIcon type="scan" fill="fill-primary" size="22px" />
          <div class="text-color/30">
            <pre class="mt-0 text-xs"> &lt;SvgIcon type="scan" size="26px" /&gt;</pre>
          </div>
        </div>
        <div class="border-t">🎨Eslint+Prettier+Commitlint代码规范</div>
        <div class="border-t">
          🎨vite.config.ts最佳配置
          <div class="text-xs text-color/30">legacy+console+pwa+gzip</div>
        </div>
      </div>
    </>
  );
}

export default Home;
