/*
用来定义user路由的路由器模块
 */
const express = require('express')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)
const AdminDB = require('../models/AdminDB')

// 登陆
router.post('/login', async(req, res) => {
    const {password,username} = req.body
    if(password==""||username=="")
        res.send({
            code:0,
            msg:'用户名或密码不正确'
        })   
    const data = await AdminDB.findOne({...req.body})
    if(data)
        res.send({
            code:1,
            data
        })
    else
        res.send({
            code:0,
            msg:'用户名或密码不正确'
        })    
})
//修改个人信息
router.post('/updata',async (req, res) => {
    const user = req.body
    const {_id} = user
    console.log(user)
    const data=await AdminDB.updateOne({_id}, user)
    if(data){
        res.send({
            code:1,
            data: data
        })
    }else{
        res.send({
            code:0,
            msg: '修改信息失败'
        })
    }
})
module.exports=router