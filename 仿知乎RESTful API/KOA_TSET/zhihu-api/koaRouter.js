const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
//设置路由前缀
const userRouter = new Router({ prefix: '/user' })
let db = [{ name: "txm" }, { name: "sin" }]
router.get('/', (ctx) => {
  ctx.body = "这是主页"
})
// router.get('/user/:id', (ctx) => {
//   ctx.body = `这是用户id：${ctx.params.id}`
// })
userRouter.get('/', (ctx) => {
  ctx.body = db
})
userRouter.get('/:id', (ctx) => {
  ctx.body = db[ctx.params.id * 1]
})
userRouter.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})
userRouter.put('/', (ctx) => {
  db[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})
userRouter.delete('/:id', (ctx) => {
  db.splice(ctx.params.id * 1, 1)
  ctx.status = 204
})

app.use(bodyparser())
app.use(router.routes())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(3001, () => {
  console.log("http://localhost:3001")
})