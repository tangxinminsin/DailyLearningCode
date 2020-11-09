const apiUrl = 'http://127.0.0.1:7001/admin/'

const servePath = {
    checkLogin:apiUrl + 'checkLogin' , //检查用户名和密码
    getTypeInfo:apiUrl + 'getTypeInfo' , // 获得文章类别信息
    addArticle:apiUrl + 'addArticle' , // 添加文章
    updataArticle:apiUrl + 'updataArticle' , // 修改文章
    getArticleList:apiUrl + 'getArticleList' , // 获取文章列表
    deleteArticle:apiUrl + 'deleteArticle/' , // 删除文章
    revampArticle:apiUrl + 'revampArticle/' , // 修改文章
}

module.exports=servePath 