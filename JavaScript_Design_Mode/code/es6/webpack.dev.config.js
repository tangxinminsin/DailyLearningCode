/**
 * @Author: tangxinmin
 * @Date: 2021-05-25 12:26:10
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-08-20 14:47:07
 * @Description: file content
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'  // release 会自动创建
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'  // bundle.js 会自动注入
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "./release"),  // 根目录
    open: true,  // 自动打开浏览器
    port: 9000,   // 端口
    proxy: {
      '/api/*': {
        target: 'http://localhost:8880'
      }
    }
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
}