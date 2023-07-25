import { createSignal, createRoot } from 'solid-js';

export const ENTRY_PAGE_KEY = 'entryPath';

function createEntryPath() {
  const cache = sessionStorage.getItem(ENTRY_PAGE_KEY);
  const [entryPath, setEntryPath] = createSignal(cache || '');
  function cahceEntryPath(path: string) {
    sessionStorage.setItem(ENTRY_PAGE_KEY, path);
    setEntryPath(path);
  }
  return { entryPath, cahceEntryPath };
}

export default createRoot(createEntryPath);
