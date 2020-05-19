/*
用来定义order路由的路由器模块
 */
const express = require('express')
//db
const OrderDB = require('../models/OrderDB')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 添加
router.post('/add',async (req, res) => {
        const data = await OrderDB.create({...req.body})
        
        if(data){
            res.send({
                code:1,
                data
            })
        }else{
            res.send({
                code:0,
                msg: '添加订单失败'
            })
        }
})
//删除
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await OrderDB.deleteOne({_id})
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
    let data
    const {user_id,page,pageSize,search} = req.query
    if(!search){
         data = await OrderDB.find()
    }
    if(user_id){
        data = await OrderDB.find({user_id:user_id})
    } 
    if(search){
        const reg = new RegExp(search, 'i')
        data = await OrderDB.find({
            $or : [ //多条件，数组
                {username :{$regex : reg}},
                {productname:{$regex : reg}},
            ]
        })
    }
    
    if(data)
        if(pageSize)
            res.send({
                code:1,
                total:data.length,
                data:data.splice((page-1)*pageSize,pageSize)
            })
        else
        res.send({
            code:1,
            data:data
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
    const data = await OrderDB.updateOne({_id},adress)
    if(data.nModified>0)
        res.send({
            code:1,
            data
        })
    else
        res.send({
            code:0,
            data:'修改失败'
        })
})   
module.exports=router