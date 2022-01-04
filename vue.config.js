/*
 * @Descripttion: 配置文件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 11:06:01
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 15:33:20
 */

// const target = require('./src/URL') //全局代理地址
module.exports = {
  // 项目部署的基本路径
  publicPath: '/',

  // 构建输出路径 ,vue-cli-service build 时生成。
  outputDir: 'dist',

  //放置生成的静态资源 (js、css、img、fonts) 和 outputDir 同级。
  assetsDir: '',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,

  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  //是否需要 map
  productionSourceMap: true,

  // 偏向app
  pwa: {},

  //css rem
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require ('postcss-px2rem') ({
            remUnit: 16,
          }),
        ],
      },
    },
  },

  devServer: {
    host: 'localhost', // 使用花生壳之类的 需改为 0.0.0.0
    port: '8089', // 端口号
    https: false, // 是否支持https
    open: false, // 配置自动启动浏览器
    disableHostCheck: true, // 使用花生壳之类的 需设为false
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://192.168.2.18:8030',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 调用接口时带 / 使用'' 不带使用 '/'，例如 /sys/login 则使用 '' ， sys/login 则使用 '/'
        },
      },
    },
  },
};
