// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { find, findById, create, update, delete: del } = require('../controller/comments')
const router = new Router({ prefix: '/question/:questionId/answers/:answerId/comments' })
const { secret } = require('../config')
const checkCommentExist = require('../middleware/checkCommentExist')
const checkCommentator = require('../middleware/checkCommentator')

const auth = jwt({ secret })
router.get('/', find)
router.get('/:id', checkCommentExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkCommentExist, checkCommentator, update) //patch 局部更新
router.delete('/:id', auth, checkCommentExist, checkCommentator, del)
module.exports = router
