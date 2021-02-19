## JavaScript match() 方法

```javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

## http options方法的作用

+ 检测服务器所支持的请求方法
+ CORS中预检请求

### node中allowedMenthods的作用

+ 响应options方法，告诉它所支持的方法请求

```js
app.use(userRouter.allowedMethods())
```

+ 相应地返回405（可以实现但是没写这个方法）和501（不认识这个请求方法）

## 控制器

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

## koa-bodyparser

用于解析body请求体的中间件

```js
const bodyparser = require('koa-parser') //引入
app.use(bodyparser())//注册 
```

