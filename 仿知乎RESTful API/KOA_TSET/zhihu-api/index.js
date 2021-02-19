const Koa = require('koa');
const app = new Koa()//实例化

//app.use传递一个函数（中间件）
// app.use((ctx)=>{
//   ctx.body="hello word"
// });


// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log("1",`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000,()=>{
  console.log("http://localhost:3000")
})