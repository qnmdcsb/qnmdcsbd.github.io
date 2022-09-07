module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://1.116.64.64:5004/api2/',
        // 允许跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
