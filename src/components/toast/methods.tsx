import { render, Dynamic } from 'solid-js/web';
import { JSX, mergeProps } from 'solid-js';
import { ToastInstance } from './Toast';
export interface ToastConfig {
  duration: number;
}

export interface ShowProps {
  message: string;
  duration?: number;
  icon?: string | JSX.Element;
  closeOnMaskClick?: boolean;
}

let timer = null;
const defaultProps: ShowProps = {
  duration: 3000,
  message: '',
  icon: ''
};

export function show(props: ShowProps | string) {
  const newProps = typeof props === 'string' ? { message: props } : props;
  const mainProps = mergeProps(defaultProps, newProps);

  let elment = document.getElementById('container-toast');

  if (elment) {
    elment.firstChild && elment.removeChild(elment.firstChild);
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  } else {
    elment = document.createElement('div');
    elment.setAttribute('id', 'container-toast');
    document.body.appendChild(elment);
  }

  timer = setTimeout(() => {
    clear();
  }, mainProps.duration);

  render(() => <ToastInstance {...mainProps} />, elment);
}
export function clear() {
  console.log('timer', timer);
  let elment = document.getElementById('container-toast');
  if (timer || elment) {
    elment.firstChild && elment.removeChild(elment.firstChild);
    clearTimeout(timer);
    timer = null;
  }
}
