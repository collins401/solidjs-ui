const isWindow = (val: unknown): val is Window => val === window;

const makeDOMRect = (width: number, height: number) => {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  } as any;
};

export const useRect = (elementOrRef: Element | Window) => {
  const element = elementOrRef;

  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return makeDOMRect(width, height);
  }

  if (element?.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
};
