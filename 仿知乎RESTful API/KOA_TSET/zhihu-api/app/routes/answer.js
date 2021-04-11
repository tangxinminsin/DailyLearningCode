// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { find, findById, create, update, delete: del } = require('../controller/answers')
const router = new Router({ prefix: '/question/:questionId/answers' })
const { secret } = require('../config')
const checkAnswerExist = require('../middleware/checkAnswerExist')
const checkAnswerer = require('../middleware/checkAnswerer')

const auth = jwt({ secret })
router.get('/', find)
router.get('/:id', checkAnswerExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update) //patch 局部更新
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del)
module.exports = router
