/* @refresh reload */
import './polyfill';
import { render } from 'solid-js/web';
import { Router, hashIntegration } from '@solidjs/router';

import App from './App';
import './styles/index.css';
import './styles/dark.less';
import './styles/tailwind.css';
import 'virtual:svg-icons-register';

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
