const {exec} = require('../db/mysql')
const getList = (author, keyword) => {
  const sql = `select * from blogs where 1=1 `
  // where 1=1占位，若是没有author/keyword
  // select * from blogs where order by createtime desc;则会报错
  if(author){
    sql+=`and author='${author}' `
  }
  if(keyword){
    sql+=`and title like '%${keyword}% `
  }
  sql+=`order by createtime desc;`
  // 返回 promise
  return exec(sql)
}
const getDetail = (id) => {
  return {
    id: 1,
    title: "标题1",
    content: "内容1",
    createTime: 1605431905057,
    author: "sin"
  }
}
module.exports = {
  getList,
  getDetail
}