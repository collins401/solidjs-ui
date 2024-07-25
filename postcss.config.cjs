//postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 10']
    }
  }
};
