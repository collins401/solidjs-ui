import { Component, ErrorBoundary, createSignal, Suspense, createEffect } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { ConfigProvider, Loading, ConfigProviderTheme } from '@/components/';
import useDark from '@/hooks/useDark';

import { routes } from './routes';

const App: Component = () => {
  const Route = useRoutes(routes);
  const [_] = useDark();

  let colorPrimary = localStorage.getItem('colorPrimary');
  if (!colorPrimary) {
    localStorage.setItem('colorPrimary', '#2eb872');
    colorPrimary = '#2eb872';
  }

  return (
    <Suspense
      fallback={
        <div class="p-5 text-center text-primary">
          <Loading size={30} />
        </div>
      }
    >
      <ConfigProvider theme={{ colorPrimary }}>
        <ErrorBoundary
          fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}
        >
          <Route />
        </ErrorBoundary>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
