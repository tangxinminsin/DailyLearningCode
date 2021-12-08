/**
 * @Author: tangxinmin
 * @Date: 2021-08-19 17:44:51
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-08-19 18:51:36
 * @Description: file content
 */
module.exports = {
  devServer: {
    // 设置主机地址
    host: 'sin.tangxinmin.com',
    // 设置默认端口
    port: 80,
    // 设置代理
    proxy: {
      /**
       * changeOrigin:true
       * /api/test
       * http://localhost:5000/test
       * changeOrigin:false
       * /api/test
       * http://localhost:5000/api/test
       */
      '/api': {
        // 设置目标API地址
        target: 'http://localhost:3000',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点改为目标URL
        changeOrigin: false
      }
    }
  }
}