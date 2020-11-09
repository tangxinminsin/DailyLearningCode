const Router = require('koa-router')
const router = new Router()

router.get("http://localhost:3000/index",(req,res)=>{
    ctx.body = res.query
})

module.exports = router;