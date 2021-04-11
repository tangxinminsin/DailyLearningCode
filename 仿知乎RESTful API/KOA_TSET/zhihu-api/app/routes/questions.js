// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { find, findById, create, update, delete: del } = require('../controller/questions')
const router = new Router({ prefix: '/question' })
const { secret } = require('../config')
const checkQuestionExist = require('../middleware/checkQuestionExist')
const checkQuestioner = require('../middleware/checkQuestioner')

const auth = jwt({ secret })
router.get('/', find)
router.get('/:id', checkQuestionExist, findById)
router.post('/', auth, create)
// router.put('/:id', update)
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update) //patch 局部更新
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del) //删除问题
module.exports = router
