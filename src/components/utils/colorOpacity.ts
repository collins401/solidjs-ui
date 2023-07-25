export const getOpacityColor = (color, opacity) => {
  let theColor = color.toLowerCase();
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (theColor && reg.test(theColor)) {
    if (theColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1));
      }
      theColor = sColorNew;
    }
    // 处理六位的颜色值
    let sColorChange = [];
    for (let j = 1; j < 7; j += 2) {
      sColorChange.push(parseInt(`0x${theColor.slice(j, j + 2)}`));
    }
    return `rgba(${sColorChange.join(',')},${opacity})`;
  }
  // 如果是rgba或者rgb
  if (theColor.startsWith('rgb')) {
    let numbers = theColor.match(/(\d(\.\d+)?)+/g);
    numbers = numbers.slice(0, 3).concat(opacity);
    return `rgba(${numbers.join(',')})`;
  }

  return theColor;
};
