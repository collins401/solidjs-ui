const cssPrefix = '-webkit-';

const vendorPrefix = 'Webkit';

const transformProperty = vendorPrefix + 'Transform';
const transformStyleName = cssPrefix + 'transform';
const transitionProperty = vendorPrefix + 'Transition';
const transitionStyleName = cssPrefix + 'transition';
const transitionEndProperty = vendorPrefix.toLowerCase() + 'TransitionEnd';

const getTranslate = function (element) {
  const result = { left: 0, top: 0 };
  if (element === null || element.style === null) return result;

  const transform = element.style[transformProperty];
  const matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)/gi.exec(transform);
  if (matches) {
    result.left = Number(matches[1]);
    result.top = Number(matches[3]);
  }
  return result;
};

const translateElement = function (element, y) {
  if (y === null) return;
  if (element === null || element === undefined || element.style === null) return;
  // if (!element.style[transformProperty] && y === 0) return;
  let yy = y;
  if (y === null) {
    const translate = getTranslate(element);
    if (!y) {
      yy = translate.top;
    }
  }
  cancelTranslateElement(element);
  element.style[transformProperty] = ` translate(0px, ${yy || 0}px)`;
};

const cancelTranslateElement = function (element) {
  if (element === null || element.style === null) return;
  let transformValue = element.style[transformProperty];
  if (transformValue) {
    transformValue = transformValue.replace(
      /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)/g,
      ''
    );
    element.style[transformProperty] = transformValue;
  }
};
const exportObj = {
  transformProperty: transformProperty,
  transformStyleName: transformStyleName,
  transitionProperty: transitionProperty,
  transitionStyleName: transitionStyleName,
  transitionEndProperty: transitionEndProperty,
  getElementTranslate: getTranslate,
  translateElement: translateElement,
  cancelTranslateElement: cancelTranslateElement
};

export default exportObj;
