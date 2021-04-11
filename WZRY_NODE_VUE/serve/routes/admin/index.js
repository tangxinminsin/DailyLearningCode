module.exports = app => {
  const express = require('express')
  var jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser')
  const { secret } = require('../../config')
  const auth = require('../../middleware/auth')
  const inflection = require('inflection')
  const assert = require('http-assert')
  const router = express.Router()
  // 创建
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取列表
  router.get('/', async (req, res) => {
    const queryOption = {}
    if (req.Model.modelName === 'Category') {
      // modelName 模型自带类型：Model.prototype.modelName
      queryOption.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      queryOption.populate = 'categories'
    }

    const model = await req.Model.find().setOptions(queryOption).limit(20)
    res.send(model)
  })
  // 获取详细信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 编辑
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  app.use('/admin/api/universal/:resourse', auth(), async (req, res, next) => {
    const modelName = await inflection.classify(req.params.resourse)
    req.Model = require(`../../models/${modelName}`)
    await next()
  }, router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', auth(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await AdminUser.findOne({ username }).select('+password')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    assert(user, 422, '用户不存在')
    // 校验密码
    const isVaild = require('bcrypt').compareSync(password, user.password);
    // if (!isVaild) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    assert(isVaild, 422, '密码错误')
    // 生成token
    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1d' })//expiresIn有效期
    res.send({ token })
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.status || 401).send({
      message: err.message
    })

  })
}