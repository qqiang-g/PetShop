/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库
  说明: 只有当连接上数据库后才去启动服务器
3. 使用中间件
 */
const mongoose = require('mongoose')
const express = require('express')
// const bodyParser = require('body-')
const app = express() // 产生应用对象

// 声明使用解析post请求的中间件
app.use(express.urlencoded({extended: true})) // 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}
//跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
 
      next();
});

// 声明user使用路由器中间件
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const adressRouter = require('./routers/adress')
const cartRouter = require('./routers/cart')
const productRouter = require('./routers/product')
const fileRouter = require('./routers/file')
const imgRouter = require('./routers/img')
const categoryRouter = require('./routers/category')
const orderRouter = require('./routers/order')
//路由
app.use('/user', userRouter)  
app.use('/admin', adminRouter)  
app.use('/adress', adressRouter) 
app.use('/cart', cartRouter)
app.use('/product', productRouter)
app.use('/file', fileRouter)
app.use('/img', imgRouter)
app.use('/category', categoryRouter)
app.use('/order', orderRouter)

// 通过mongoose连接数据库
mongoose.connect('mongodb://localhost/set', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('连接数据库成功!!!')
    // 只有当连接上数据库后才去启动服务器
    app.listen('5000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:5000')
    })
  })
  .catch(error => {
    console.error('连接数据库失败', error)
  })

