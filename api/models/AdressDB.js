/*
能操作adress集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const adressSchema = new mongoose.Schema({
    user_id:{type: String, required: true},//用户的_id
    name:String, // 姓名
    tel:String,
areaCode:String,
postalCode:String,
province:String,
city:String,
county:String,
addressDetail:String
  })
  
  // 3. 定义Model(与集合对应, 可以操作集合)
const AdressDB = mongoose.model('adressdb', adressSchema)
  // 4. 向外暴露Model
module.exports = AdressDB