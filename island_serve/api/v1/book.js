const Router = require('koa-router')
const router = new Router()

router.get("/index",(ctx,next)=>{
    ctx.body = {
        key:"123"
    }
})

module.exports = router;