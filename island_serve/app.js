const Koa = require('koa')
const book = require('./api/v1/book')

const app = new Koa()


// app.use(book.router())




app.listen(3333,()=>{
    console.log('http://localhost:3333')
})