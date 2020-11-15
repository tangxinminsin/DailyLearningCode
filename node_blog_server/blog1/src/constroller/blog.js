const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题1",
      content: "内容1",
      createTime: 1605431905057,
      author: "sin"
    },
    {
      id: 2,
      title: "标题2",
      content: "内容2",
      createTime: 1605431905057,
      author: "panda"
    },
  ]
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