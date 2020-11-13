const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req,res)=>{
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  // querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合。
  const query = queryString.parse(url.split("?")[1])

  //设置返回格式为 json
  res.setHeader('content-type','application/json')

  // 返回数据
  const resData ={
    method,
    url,
    path,
    query
  }
  // 返回
  if(method==="GET"){
    res.end(
      JSON.stringify(resData)
    )
  }
  if(method==="POST"){
    let postData = ''
    req.on('data',thunk=>{
      postData += thunk.toString()
    })
    req.on('end',()=>{
      resData.postData = postData
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})
server.listen(8000,()=>{
  console.log("http://localhost:8000")
})