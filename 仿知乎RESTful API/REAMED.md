## 1.JavaScript match() 方法

```javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

## 2.http options方法的作用

+ 检测服务器所支持的请求方法
+ CORS中预检请求

### node中allowedMenthods的作用

+ 响应options方法，告诉它所支持的方法请求

```js
app.use(userRouter.allowedMethods())
```

+ 相应地返回405（可以实现但是没写这个方法）和501（不认识这个请求方法）

## 3.控制器

+ 拿到路由分配的任务，并执行
+ 在koa中，是一个中间件 
+ 作用
  + 获取http请求参数
  + 处理业务逻辑
  + 发送http响应

###  获取http请求参数

+ Query String，如?q=keyword
+ Router Params，如/users/:id
+ Body，如{name:"txm"}
+ Header，如Acce，Cookie

### 编写控制器最佳实践

+ 每个资源的控制权放在不同的文件里
+ 尽量使用类+类方法的形式编写控制器
+ 严谨的错误处理

## 4.koa-bodyparser

用于解析body请求体的中间件，仅支持json、from格式体

```js
const bodyparser = require('koa-parser') //引入
app.use(bodyparser())//注册 
```

## 5.koa-json-error

koa 错误处理中间件

```js
const error = require('koa-json-error')
app.use(error());
```

## 6.cross-env

设置环境变量

```json
  "scripts": {
    "start-concordance": "cross-env NODE_ENV=production node app/index.js"
  },
```

## 7.koa-parameter

校验参数

```js
const parameter = require('koa-parameter')
app.use(parameter(app));


  create(ctx) {
    ctx.verifyParams({ name: { type: 'string', required: true } })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  };
```

## 8.MongoDB

+ 性能好（内存计算）
+ 大规模数据存储（可拓展性）
+ 可靠安全（本地复制、自动故障转移）
+ 方便存储复杂数据解构（Schema Free）

### MongoDB Atlas使用步骤

+ 注册用户
+ 创建集群（服务器）
+ 添加数据库用户
+ 设置IP地址白名单
+ 获取连接地址

## 9.Session

### Session的优势

+ 相比JWT，最大的优势就在于可以主动清楚session
+ session保存在服务端，相对比较安全
+ 结合cookie使用，较为灵活，兼容性较好

### Session的劣势

+ cookie（具有不可跨域性）+session在跨域场景表现并不好
+ 如果时分布式部署，需要做多机共享session机制
+ 基于cookie的机制很容易被CSRF
+ 查询session信息可能会有数据库查询操作

### 相关概念

+ session:主要存放在服务端，相对比较安全

+ cookie:主要存放在客户端，并不是很安全
+ sessionStorage：仅在当前会话下有效，关闭页面或浏览器后被清除
+ localstorage：除非被清除，否则永久保存

## 10.JWT（JSON Web Token）

定义了一种紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行安全传输，该信息可以验证和信任，因为时经过数字签名的

### JWT的构成

+ 头部（header）
  + typ：token的类型，这里固定为JWT
  + alg：使用hash算法，例如：HMAC SHA256 或者RSA
  + 编码前：{"alg":"HS256","typ":"JWT"}
  + 编码后：第一个.之前的乱码
+ 有效载荷（payload）
  + 存储需要传递的信息，如用户ID,用户名等
  + 还包含元数据，如过期时间、发布人等
  + 与Header不同，Payload可以加密
  + 编码前：{"user_id":"zhangsan"}
+ 签名（signature）
  + 对Header和Payload部分进行签名
  + 保证Token在传输的过程中没有被篡改或者破坏

## 11. Node中使用JWT

+ 安装jsonwebtoken
+ 签名
+ 验证

```powershell
$ node
> jwt = require('jsonwebtoken')  //引用
{
  decode: [Function (anonymous)],
  verify: [Function (anonymous)],
  sign: [Function (anonymous)],
  JsonWebTokenError: [Function: JsonWebTokenError],
  NotBeforeError: [Function: NotBeforeError],      
  TokenExpiredError: [Function: TokenExpiredError] 
}
> token = jwt.sign({name:"txm"},"secret");  //签名
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHhtIiwiaWF0IjoxNjEzNzE5NzU2fQ.6OIxXkz7tL3JuHHagZiiXBLJxJAkqpV85SZl332NI34'
> jwt.decode(token);//解码
{ name: 'txm', iat: 1613719756 }
> jwt.verify(token,"secret");//验证
{ name: 'txm', iat: 1613719756 }
```

+ koa-jwt（鉴权中间件）

## 12.koa-body

支持json\from\文件格式

```js
const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,//保留扩展名
  }
}));
```



## 13. koa-static

生成静态服务

```js
const koaStatic = require('koa-static');
app.use(koaStatic(path.join(__dirname, 'public'),))//静态文件一般放在最前面
```

## 14.字段过滤

### 字段隐藏

```js
 //Schema中添加select: false字段
 password: { type: String, required: true, select: false },
```

### 字段显示

```js
//http://localhost:3002/user/6030cd40500a8d45901c551f?fields=gender;employments    
const { fields } = ctx.query
//filter(f => f) 防止；后为空 出现[ 'employments', '' ]的情况
const selectFields = fields.split(";").filter(f => f).map(f => ' +' + f).join('')
const user = await User.findById(ctx.params.id).select(selectFields)
```

## 15. $or

$or操作符，可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用，如下示例：

```js
Model.find({"$or":[{"name":"yaya"},{"age":28}]})
```

## 16. $inc

用来增加指定字段的数量

```js
  { $inc: { fields: count } }
```

