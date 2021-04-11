// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { find, findById, create, update, listTopicFollowers, listTopicQuestions } = require('../controller/topics')
const router = new Router({ prefix: '/topic' })
const { secret } = require('../config')

const auth = jwt({ secret })
router.get('/', find)
router.get('/:id', findById)
router.post('/', auth, create)
// router.put('/:id', update)
router.patch('/:id', auth, update) //patch 局部更新
router.get('/:id/followers', listTopicFollowers) //获取话题的粉丝列表
router.get('/:id/question', listTopicQuestions) //获取话题下的问题
module.exports = router
