const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method != "POST") {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', data => {
      console.log("data:", data)
      postData += data.toString()
      console.log("postData:", postData)
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      console.log("JSON", JSON.parse(postData))
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式JSON
  res.setHeader('Content-type', "application/json")

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  //解析query
  req.query = querystring.parse(url.split('?')[1])

  //处理post data
  getPostData(req).then(postData => {
    req.body = postData
    //处理blog路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }
    const blogResult = handleBlogRouter(req, res)
    console.log("blogResult", blogResult)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }


    //处理user路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
    // 未命中路由
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not Found\n")
    res.end()
  })


}


module.exports = serverHandle


// const resData = {
//   name: '小熊猫',
//   site: 'home',
//   env: process.env.NODE_ENV
// }

// res.end(
//   JSON.stringify(resData)
// )
/*
{
"name": "小熊猫",
"site": "home",
"env": "dev"
}
*/