
const path = require('path');
const sass = require('sass');

const addStyleResource = (rule) => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/_vars.scss')],
    });
};

module.exports = {
  chainWebpack: (config) => {
    // Disable prefetching and preloading
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        implementation: sass,
      },
    },
  },
};
