/*
能操作order集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const orderSchema = new mongoose.Schema({
    user_id:{type: String, required: true},//用户的_id
    username:String,//用户的名字
    product_id:String,//商品的id
    productname:String,//商品的名字
    time:String, // 订单时间
    state:Boolean,//状态false是未完成，true一完成
    price: Number,//价格
    count:Number,//数量
    img:String,//第一个图片的地址
	adress:String
  })
  
// 3. 定义Model(与集合对应, 可以操作集合)
const OrderDB = mongoose.model('orderdb', orderSchema)
  // 4. 向外暴露Model
module.exports = OrderDB 