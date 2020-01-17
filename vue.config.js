module.exports = {
    // assetsPublicPath:"/",
    publicPath: "/",
    outputDir: 'dist',
    lintOnSave: false,//关闭eslint效验报错
    runtimeCompiler: true, //关键点在这  
    // 调整内部的 webpack 配置。
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 。
    devServer: {
      open: true,
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: null, // string | Object
      // before: app => {}
    },
    // build:{
    //   assetsPublicPath:"/"
    // }
  }
