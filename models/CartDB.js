/*
能操作cart集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const cartSchema = new mongoose.Schema({
    user_id:{type: String, required: true},//用户的_id
    product_id:String,//商品的id
    name:String, // 商品名字
    desc:String, //描述
    price: Number,//价格
    count:Number,//数量
    img:String//第一个图片的地址
  })
  
// 3. 定义Model(与集合对应, 可以操作集合)
const CartDB = mongoose.model('cartdb', cartSchema)
  // 4. 向外暴露Model
module.exports = CartDB