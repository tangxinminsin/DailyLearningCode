const Koa = require('koa')
const book = require('./api/v1/book.js')
const app = new Koa()

app.use(book.routes())

app.listen(3333,()=>{
    console.log('http://localhost:3333')
})