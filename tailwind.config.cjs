import colors from 'tailwindcss/colors'
/** @type {import('tailwindcss').Config} */
// 用变量定义配置，方便多主题切换
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(var(${variable}), ${opacityValue})`;
  };
}
module.exports = {
  preflight: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: 'rgba(255,255,255,1)',
        primary: 'rgba(77,184,127,1)',
        secondary: 'rgba(235,91,89,1)',
        danger: 'rgba(235,91,89,1)',
        border: {
          DEFAULT: 'var(--color-border)',
          button: 'var(--color-border-button)'
        },
        active: withOpacityValue('--color-bg-active'), // 常规白底点击背景
      },
      textColor: {
        // 默认文字颜色rgba(0,0,0,.85); 其他色值可用 text-color/60, text-color/50等
        color: withOpacityValue('--color-default'),
        // 不透明灰色文字
        solidGray: 'rgba(0,0,0,.60)',
      },
      borderColor: {
        button: 'var(--color-border-button)'
      },
      // 基于figma官网尺寸修改，对应字号默认行高，建议保留
      fontSize: {
        '12px': ['12px', '17px'],
        '13px': ['12px', '18px'],
        '14px': ['14px', '20px'],
        '15px': ['15px', '21px'],
        '16px': ['16px', '22px'],
        '17px': ['17px', '24px'],
        '18px': ['18px', '25px'],
        '20px': ['20px', '28px'],
        '22px': ['22px', '31px'],
        '23px': ['23px', '32px'],
        '24px': ['24px', '34px'],
        '26px': ['26px', '36px'],
        '28px': ['28px', '40px']
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
