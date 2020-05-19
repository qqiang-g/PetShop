/*
用来定义adress路由的路由器模块
 */
const express = require('express')
//db
const Adress = require('../models/AdressDB')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 添加
router.post('/add',async (req, res) => {
    const adress = req.body
    const data = await Adress.create({...adress})
    if(data)
        res.send({
            code:1,
            data
        })
    else
        res.send({
            code:0,
            msg:'添加失败'
        })
})
//删除
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await Adress.deleteOne({_id})
    if(data.deletedCount>0)
        res.send({
            code:1,
            data
        })
    else  
        res.send({
            code:0,
            msg:'删除失败'
        })  
})
//获取列表
router.get('/list',async (req, res) => {
    const {user_id,_id} = req.query
    let data
    if(user_id)
        data = await Adress.find({user_id})
    else 
        data = await Adress.find({_id})
    if(data)
        res.send({
            code:1,
            data
        })
    else
        res.send({
            code:0,
            msg:'获取地址列表失败'
        })   
})  
//修改
router.post('/updata',async (req, res) => {
    const adress = req.body
    const {_id} = adress
    console.log(adress)
    const data = await Adress.updateOne({_id},adress)
    res.send({
        code:1,
        data
    })
})   
module.exports=router