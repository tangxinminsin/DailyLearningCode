var dbCongfig = require('../util/dbconfig')

// 获取分类
getCate=(req,res)=>{
    var sql = "select * from cate";
    var sqlArr = [];
    var callBack = (err,data)=>{
      if(err){
        console.log('连接出错了')
      }else{
        res.send({
          'list':data
        })
      }
    }
  
    dbCongfig.sqlConnect(sql,sqlArr,callBack)
}
// 获取指定分类的文章列表
getPostCate=(req,res)=>{
    let {id} = req.query;
    var sql =  `select * from post where cate_id=?`;
    var sqlArr = [id];
    var callBack = (err,data)=>{
        if(err){
          console.log('连接出错了')
        }else{
          res.send({
            'list':data
          })
        }
      }
      dbCongfig.sqlConnect(sql,sqlArr,callBack)
}
    


module.exports = {
    getCate,
    getPostCate
}