const fs = require('fs')

// fs.readFile('./package.json',(err,data)=>{
//   console.log(data)
// })
// console.log("fs读取文件")

/**
fs读取文件
<Buffer 7b 0a 20 20 22 6e 61 6d 65 22 3a 20 22 66 73 22 2c 0a 20 20 22 76 65 72 73 69 6f 6e 22 3a 20 22 31 2e 30 2e 30 22 2c 0a 20 20 22 64 65 73 63 72 69 70 ... 138 more bytes>
 */


// 获取时间戳
// Date.now() === new Date().valueOf()

// 同步示例
//同步的形式会阻塞 Node.js 事件循环和进一步的 JavaScript 执行，直到操作完成。 异常会被立即地抛出，可以使用 try…catch 处理，也可以冒泡。
// try {
//   fs.readFile('./package.json');
//   console.log('已成功删除文件');
// } catch (err) {
//   // 处理错误
//   console.log(err)
// }

//回调示例
// fs.readFile('./package.json', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
/**
 * {
  "name": "fs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
*/