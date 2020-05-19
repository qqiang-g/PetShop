/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    name: String,//昵称
    six:String,//性别
adressid:String//
  })
  
  // 3. 定义Model(与集合对应, 可以操作集合)
const UserDB = mongoose.model('userdb', userSchema)
  // 4. 向外暴露Model
module.exports = UserDB