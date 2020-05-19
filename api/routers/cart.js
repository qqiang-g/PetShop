/*
用来定义cart路由的路由器模块
 */
const express = require('express')
//db
const Cart = require('../models/CartDB')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 添加
router.post('/add',async (req, res) => {
    const cart = req.body
    const {user_id,product_id} = cart
    const check =await Cart.findOne({user_id,product_id})
    if(check){
        check.count++ 
        console.log({user_id,product_id})
        const data = await Cart.updateOne({user_id,product_id},check)
        if(data.nModified>0)
            res.send({
                code:1,
                data
            })
        else
            res.send({
                code:0,
                msg:'添加失败'
            })
    }
    else{
        const data = await Cart.create({...cart})
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
    }
})
//删除
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await Cart.deleteOne({_id})
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
    const {user_id} = req.query
    const data = await Cart.find({user_id})
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
    const data = await Cart.updateOne({_id},adress)
    if(data.nModified>0)
        res.send({
            code:1,
            data
        })
    else
        res.send({
            code:1,
            msg:'修改失败'
        })
})   
module.exports=router