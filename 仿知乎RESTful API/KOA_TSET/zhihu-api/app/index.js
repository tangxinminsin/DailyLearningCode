const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error')
const cors = require('@koa/cors');


const parameter = require('koa-parameter')
const path = require('path')
const checkDirExist = require('./utils/checkDirExist')
const createUploadDirName = require('./utils/createUploadDirName')


const app = new Koa();
app.use(cors());
const routing = require('./routes');
require('./plugins/db.js')(app)

//错误处理中间件
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (error) {
//     ctx.status = error.status || error.statusCode || 500
//     ctx.body = {
//       message: error.message
//     }
//   }
// })
app.use(koaStatic(path.join(__dirname, 'public'),))//静态文件一般放在最前面
app.use(error({
  // 根据生产环境和开发环境，隐藏stack信息
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { ...rest, stack }
}));
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,//保留扩展名
    onFileBegin: (name, file) => {
      const defaultName = path.basename(file.path)//获取默认生成的文件名
      const fileName = file.name.split('.')//获取文件名
      // 最终要保存到的文件夹目录
      const dir = path.join(__dirname, `public/uploads/${createUploadDirName()}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      const newFileName = `${fileName[0]}_${defaultName}`;//新文件名
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${newFileName}`;
    },
    onError: (err) => {
      console.log(err);
    }
  }
}));
app.use(parameter(app));
routing(app);

app.listen(3002, () => {
  console.log("http://localhost:3002")
})