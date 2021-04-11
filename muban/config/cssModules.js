import path from 'path';
import genericNames from 'generic-names';

const cssModulesLocalIdentName = '[local]-[hash:base64:10]';
const nodeModulesPath = path.resolve('node_modules');

export default {
  chainWebpack(memo, { env, webpack }) {
    // 文档参考 webpack-chain
    // 修改已有的规则排除 node_modules 目录
    const cssOfLessRule = memo.module.rule('less').oneOf('css');
    cssOfLessRule.merge({ exclude: [/src/] });

    // 添加新的规则 只包括 src 目录
    const cssNodeModulesRule = memo.module
      .rule('less')
      .oneOf('css-node-modules');
    cssNodeModulesRule.merge({ include: [/src/] });
    cssNodeModulesRule
      .use('extract-css-loader')
      .loader(nodeModulesPath + '\\mini-css-extract-plugin\\dist\\loader.js')
      .options({ publicPath: './', esModule: false });

    cssNodeModulesRule
      .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 1,
        modules: {
          localIdentName: cssModulesLocalIdentName,
          // 解决CSS Modules 与 babel-plugin-react-css-modules 生成的hash不一致的问题
          getLocalIdent: (context, localIdentName, localName, options) => {
            const relativePath = path.relative(
              process.cwd(),
              context.resourcePath,
            );
            return genericNames(localIdentName)(localName, relativePath);
          },
        },
      });

    // cssNodeModulesRule
    //       .use('postcss-loader')
    //         .loader('postcss-loader')
    //           .options({ident: 'postcss'});

    cssNodeModulesRule
      .use('less-loader')
      .loader('less-loader')
      .options({ modifyVars: undefined, javascriptEnabled: true });
  },
  extraBabelPlugins: [
    [
      'babel-plugin-react-css-modules',
      {
        generateScopedName: cssModulesLocalIdentName,
        filetypes: {
          '.less': {
            syntax: 'postcss-less',
          },
        },
        handleMissingStyleName: 'warn',
        exclude: '/node_modules/',
      },
    ],
  ],
};
