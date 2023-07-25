import { createEffect, createSignal } from 'solid-js';
import { Outlet, useLocation } from '@solidjs/router';
import { Navbar } from '@/components';

export default function DemoPage() {
  const { pathname } = useLocation();
  const [title, setTitle] = createSignal('');
  createEffect(() => {
    const str = pathname.substring(6);
    console.log('title', pathname);
    setTitle(str);
  });
  return (
    <>
      <Navbar title="demo" />
      <Outlet />
    </>
  );
}
