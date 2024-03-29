const { exec } = require('../db/mysql')

// 获取列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  // where 1=1占位，若是没有author/keyword
  // select * from blogs where order by createtime desc;则会报错
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回 promise
  return exec(sql)
}

// 获取详情
const getDetail = (id) => {
  let sql = ` select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

// 新建博客
const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  let sql = `
  insert into blogs (title,content,createtime,author)
  values ('${title}','${content}','${createtime}','${author}')
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 更新博客
const updataBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content

  let sql = `
  update blogs set title='${title}',content='${content}' where id='${id}';
  `

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 删除博客
const delBlog = (id, author) => {
  const sql = `
  delete from blogs where id='${id}' and author='${author}';
  `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updataBlog,
  delBlog
}