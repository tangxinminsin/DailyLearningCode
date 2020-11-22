const { getList, getDetail,newBlog,updataBlog,delBlog } = require('../constroller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客例表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id)
    return result.then(data=>{
      return new SuccessModel(data)
    })
  }
  // 新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    // 作者假数据
    const author = "txm"
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data=>{
      return new SuccessModel(data)
    })
  }
  // 更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updataBlog(id,req.body)
    return result.then(val=>{
      if(val){
        return new SuccessModel("更新博客成功")
      }
      return new ErrorModel("更新博客失败")
    })
  }
  // 删除一篇博客
  if (method === "POST" && req.path === "/api/blog/del") {
       // 作者假数据
       const author = "txm"
       req.body.author = author
       const result = delBlog(id,author)
       return result.then(val=>{
         if(val){
           return new SuccessModel("删除成功")
         }
         return new ErrorModel("删除失败")
       })
  }
}

module.exports = handleBlogRouter