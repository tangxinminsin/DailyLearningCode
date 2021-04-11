const path = require('path')
const createUploadDirName = require('../utils/createUploadDirName')
class HomeCtl {
  index(ctx) {
    ctx.body = "<h1>这是主页</h1>"
  }
  // 上传图片
  upload(ctx) {
    // const file = ctx.request.files;
    const file = ctx.request.files.file;
    // const pathurl = file[''].path //图片路径
    const pathurl = file.path //图片路径
    const basename = path.basename(pathurl)//path.basename() 方法会返回 path 的最后一部分
    ctx.body = {
      path: {
        url: `${ctx.origin}/uploads/${createUploadDirName()}/${basename}`,//生成图片连接
      }
    }
  }
  test(ctx) {
    ctx.body = {
      request: ctx.request
    }
  }
}

module.exports = new HomeCtl();