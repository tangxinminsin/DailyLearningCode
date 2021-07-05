const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  // JavaScript 执行入口文件
  entry: './src/index.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   'style-loader',
        //   'css-loader',
        // ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
  },
}

// 通常你可用如下经验去判断如何配置 Webpack：
// 想让源文件加入到构建流程中去被 Webpack 控制，配置 entry。
// 想自定义输出文件的位置和名称，配置 output。
// 想自定义寻找依赖模块时的策略，配置 resolve。
// 想自定义解析和转换文件的策略，配置 module，通常是配置 module.rules 里的 Loader。
// 其它的大部分需求可能要通过 Plugin 去实现，配置 plugin。