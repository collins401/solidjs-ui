/* @refresh reload */
import './polyfill';
import { render } from 'solid-js/web';
import { HashRouter } from '@solidjs/router';
import { routes } from './routes';
import App from './App';

import './styles/index.css';
import './styles/dark.less';
import './styles/tailwind.css';
import 'virtual:svg-icons-register';

render(
  () => <HashRouter root={App}>{routes}</HashRouter>,
  document.getElementById('root') as HTMLElement
);
