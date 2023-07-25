import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home
  },
  { path: '/list', component: lazy(() => import('./pages/list/cnode')) },
  { path: '/detail/:id', component: lazy(() => import('./pages/list/detail')) },
  {
    path: '/demo',
    component: lazy(() => import('./pages/demo')),
    children: [
      { path: '', component: lazy(() => import('./pages/demo/page')) },

      {
        path: 'config-provider',
        component: lazy(() => import('./components/config-provider/demo'))
      },
      { path: 'toast', component: lazy(() => import('./components/toast/demo')) },
      { path: 'dialog', component: lazy(() => import('./components/dialog/demo')) },
      { path: 'switch', component: lazy(() => import('./components/switch/demo')) },
      { path: 'radio', component: lazy(() => import('./components/radio/demo')) },
      { path: 'checkbox', component: lazy(() => import('./components/checkbox/demo')) },
      { path: 'input', component: lazy(() => import('./components/input/demo')) },
      { path: 'button', component: lazy(() => import('./components/button/demo')) },
      { path: 'popup', component: lazy(() => import('./components/popup/demo')) },
      { path: 'picker', component: lazy(() => import('./components/picker/demo')) },
      { path: 'picker2', component: lazy(() => import('./components/picker2/demo')) },
      { path: 'infiniteScroll', component: lazy(() => import('./components/infiniteScroll/demo')) },
      { path: 'calendar', component: lazy(() => import('./components/calendar/demo')) },
      { path: 'imageView', component: lazy(() => import('./components/imageView/demo')) },
      { path: 'dropdown', component: lazy(() => import('./components/dropdown/demo')) }
    ]
  },
  {
    path: '**',
    component: lazy(() => import('./pages/NotFound/index'))
  }
];
