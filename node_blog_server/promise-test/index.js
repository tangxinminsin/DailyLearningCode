const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

// const fullFileName = path.resolve(__dirname, 'files', 'a.json')
// fs.readFile(fullFileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data.toString())
// })

// const getFileContent = (fileName, callback) => {
//   const fullFileName = path.resolve(__dirname, 'files', fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// // 回调地狱
// getFileContent("a.json", aData => {
//   console.log("a.Data", aData)
//   getFileContent("b.json", aData => {
//     console.log("b.Data", aData)
//     getFileContent("c.json", aData => {
//       console.log("c.Data", aData)
//     })
//   })
// })

// 使用promise
const getFileContent = (fileName) => {
  const promise = new Promise((resolve, rejects) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        rejects(err)
        return
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
  return promise
}


getFileContent('a.json')
  .then(aData => {
    console.log("a.Data", aData)
    return getFileContent(aData.next)
  })
  .then(bData => {
    console.log("b.Data", bData)
    return getFileContent(bData.next)
  })
  .then(cData => {
    console.log("c.Data", cData)
  })
