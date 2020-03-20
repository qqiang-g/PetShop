/*
能操作product集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const CategorySchema = new mongoose.Schema({
    name:String, // 商品名字
    desc:String, //描述
  })
  
// 3. 定义Model(与集合对应, 可以操作集合)
const CategoryDB = mongoose.model('Category', CategorySchema)
  // 4. 向外暴露Model
module.exports = CategoryDB