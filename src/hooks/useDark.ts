import { createEffect, createSignal } from 'solid-js';

export default function useDark() {
  const theme = localStorage.getItem('theme');
  const [dark, setDark] = createSignal(false);

  createEffect(() => {
    document.documentElement.className = theme ? theme : 'light';
    setDark(theme === 'dark');
  });

  function changeTheme(e) {
    setDark(e);
    document.documentElement.className = e ? 'dark' : 'light';
    localStorage.setItem('theme', e ? 'dark' : 'light');
  }
  return [dark, changeTheme] as const;
}
