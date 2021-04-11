const Router = require('koa-router')
const { index, upload, test } = require('../controller/home')
const router = new Router()

router.get('/', index)
router.post('/upload', upload)
router.get('/test', test)

module.exports = router
