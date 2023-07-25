import { createGlobalStyles, styled, setup } from 'solid-styled-components';
import { prefix } from 'goober/prefixer';
setup(prefix, null);
const Animate = createGlobalStyles`
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
export default Animate;
