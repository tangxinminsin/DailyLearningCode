// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const Router = require('koa-router')
const { find, findById, create, update, detele, login, listFollowing,
  follow, unFollow, listFollowers, followTopic, unFollowTopic, listFollowingTopic,
  listQuestion, likingAnsers, unlikingAnsers, listLikingAnswer, DislikingAnsers, unDislikingAnsers, listDisLikingAnswer } = require('../controller/users')
const router = new Router({ prefix: '/user' })
const { secret } = require('../config')
const checkUserExist = require('../middleware/checkUserExist')
const checkTopicExist = require('../middleware/checkTopicExist')
const checkAnswerExist = require('../middleware/checkAnswerExist')
const checkOwner = require('../middleware/checkOwner')
//jsonwebtoken鉴权-认证
// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header
//   const token = authorization.replace('Bearer ', '')//Bearer后面有一个空格
//   try {
//     const user = jsonwebtoken.verify(token, secret)
//     ctx.state.user = user // 将用户信息放在上下文中的state中
//   } catch (error) {
//     ctx.throw(401, error.message)
//   }
//   await next();
// }
const auth = jwt({ secret })//koa-jwt 鉴权
router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
// router.put('/', update)
router.patch('/:id', auth, checkOwner, update) //patch 局部更新
router.delete('/:id', auth, checkOwner, detele)
router.post('/login', login)
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/following/:id', auth, checkUserExist, unFollow)
//话题
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)
router.delete('/followingTopics/:id', auth, checkTopicExist, unFollowTopic)
router.get('/:id/followingTopics', listFollowingTopic)
router.get('/:id/question', listQuestion)
//赞与取消赞
router.put('/likingAnsers/:id', auth, checkAnswerExist, likingAnsers, unDislikingAnsers)//赞之后取消踩
router.delete('/likingAnsers/:id', auth, checkAnswerExist, unlikingAnsers)
router.get('/:id/likingAnsers', listLikingAnswer)
//踩与取消踩
router.put('/DislikingAnsers/:id', auth, checkAnswerExist, DislikingAnsers, unlikingAnsers)//踩之后取消赞
router.delete('/DislikingAnsers/:id', auth, checkAnswerExist, unDislikingAnsers)
router.get('/:id/DislikingAnsers', listDisLikingAnswer)

module.exports = router
