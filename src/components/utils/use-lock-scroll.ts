const pageScrollTop = () => {
  if (document.scrollingElement) {
    return document.scrollingElement.scrollTop;
  }
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};
let scrollTop = 0;
const lockMaskScroll = () => {
  const bodyCls = 'lock-body';

  function afterOpen() {
    scrollTop = pageScrollTop();
    console.log('scrollTop', scrollTop);
    document.body.classList.add(bodyCls);
    document.body.style.top = -scrollTop + 'px';
  }

  function beforeClose() {
    if (document.body.classList.contains(bodyCls)) {
      document.body.classList.remove(bodyCls);
      document.documentElement.scrollTop = scrollTop;
    }
  }
  return {
    afterOpen,
    beforeClose
  };
};
export default lockMaskScroll;
