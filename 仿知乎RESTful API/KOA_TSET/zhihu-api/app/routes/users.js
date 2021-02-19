const Router = require('koa-router')
const { find, findById, create, update, detele } = require('../controller/users')
const router = new Router({ prefix: '/user' })

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.put('/', update)
router.delete('/:id', detele)

module.exports = router
