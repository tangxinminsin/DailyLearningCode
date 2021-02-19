//自动化注册路由脚本
const fs = require('fs');
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === "index.js") { return; }
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
    // option 请求方法时 allowedMethods增加请求头allow显示接口实现的方法种类
  });
}