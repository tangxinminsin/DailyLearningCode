const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const routing = require('./routes');

//错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || error.statusCode || 500
    ctx.body = {
      message: error.message
    }
  }
})
app.use(bodyparser());
routing(app);

app.listen(3002, () => {
  console.log("http://localhost:3002")
})