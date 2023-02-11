const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/scss/global.scss";'
        }
    }
  },
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: tag => tag.startsWith('ion-')
        }
        return options
      })
  }
})
