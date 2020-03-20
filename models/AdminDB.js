/*
能操作admin集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const adminSchema = new mongoose.Schema({
    username:{type: String, required: true},//用户的_id
    password:{type: String, required: true},//用户的_id
  })
  
// 3. 定义Model(与集合对应, 可以操作集合)
const AdminDB = mongoose.model('admindb', adminSchema)
AdminDB.findOne({username:'admin',password:'admin'})
.then(data=>{
  if(data) return
  else
  AdminDB.create({username:'admin',password:'admin'})
})
.catch(err=>{
  console.log(err)
})

  // 4. 向外暴露Model
module.exports = AdminDB