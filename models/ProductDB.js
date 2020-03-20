/*
能操作product集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const productSchema = new mongoose.Schema({
    name:String, // 商品名字
    desc:String, //描述
    category:'',//分类id
    price: Number,//价格
    imglist:Array//图片列表
  })
  
// 3. 定义Model(与集合对应, 可以操作集合)
const ProducttDB = mongoose.model('Producttdb', productSchema)
  // 4. 向外暴露Model
module.exports = ProducttDB