import { createGlobalStyles, styled, setup } from 'solid-styled-components';
import { prefix } from 'goober/prefixer';
setup(prefix, null);
const GlobalStyle = createGlobalStyles`
    *, *:before,*:after {
      box-sizing: border-box;
      user-select: none;
      border-color: var(--color-border);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:focus, input:focus, button:focus, textarea:focus {
      outline: none;
    }
    body.lock-body {
      position: fixed;
      width: 100%;
    }
    .so-button {
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .so-button:disabled {
      pointer-events: none;
      opacity: 0.4;
    }
    .so-button:before {
      opacity: 0.05;
      background: #000;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: inherit;
    }
    .so-button:active:before {
      content: '';
    }
    input {
      appearance: none;
      margin: 0;
      padding: 0;
      outline: none;
      color: var(--color-text);
    }
    input:focus {
      outline: none
    }
    input,button,textarea {
      font: inherit;
      color: inherit
    }
    button[type=button] {
      -webkit-tap-highlight-color: transparent;
      appearance: button;
      -webkit-font-smoothing: auto;
      position: relative;
      vertical-align: middle;
    }
    button[type=button][disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .scroll-snap-type {
      scroll-snap-type: y mandatory;
      -webkit-scroll-snap-type: y mandatory;
    }
    .scroll-snap-type-x {
      scroll-snap-type: x mandatory;
      -webkit-scroll-snap-type: x mandatory;
    }
    .fade-enter, .fade-exit-to {
      opacity: 0;
    }
    .fade-enter-active {
      transition: .3s ease-out opacity;
    }
    .fade-exit-active {
      transition: .2s ease-in opacity;
    }
    .fade-bottom-enter, .fade-bottom-exit-to {
      opacity: 0;
      transform: translateY(100%);
    }
    .fade-bottom-enter-active {
      transition: 0.3s ease-out all;
    }
    .fade-bottom-exit-active {
      transition: 0.2s ease-in all;
    }
    .fade-top-enter, .fade-top-exit-to {
      opacity: 0;
      transform: translateY(-100%);
    }
    .fade-top-enter-active {
      transition: 0.3s ease-out all;
    }
    .fade-top-exit-active {
      transition: 0.2s ease-in all;
    }
    .fade-left-enter, .fade-left-exit-to {
      opacity: 0;
      transform: translateX(-100%);
    }
    .fade-left-enter-active {
      transition: 0.3s ease-out all;
    }
    .fade-left-exit-active {
      transition: 0.2s ease-in all;
    }
    .fade-right-enter, .fade-right-exit-to {
      opacity: 0;
      transform: translateX(100%);
    }
    .fade-right-enter-active {
      transition: 0.3s ease-out all;
    }
    .fade-right-exit-active {
      transition: 0.2s ease-in all;
    }
    .fade-scale-enter, .fade-scale-exit-to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    .fade-scale-enter-active {
      transition: .2s ease-out all;
    }
    .fade-scale-exit-active {
      transition:  0.2s ease-in all;
    }
  `;
export default GlobalStyle;
