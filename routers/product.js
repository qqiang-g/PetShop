/*
用来定义product路由的路由器模块
 */
const express = require('express')
//db
const ProductDB = require('../models/ProductDB')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 添加
router.post('/add',async (req, res) => {
    // const {name} = req.body
    const data = await ProductDB.create({...req.body})
        if(data){
            res.send({
                code:1,
                data
            })
        }else{
            res.send({
                code:0,
                msg: '添加商品失败'
            })
        }
    // }else{
    //     res.send({
    //         code:0,
    //         msg: '商品已存在'
    //     })
    // }    
})
//删除
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await ProductDB.deleteOne({_id})
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
    const {page,pageSize,search} = req.query
    if(!search){
        console.log('11111')
        data = await ProductDB.find()
    } 
    else{
        const reg = new RegExp(search, 'i')
        data = await ProductDB.find({
            $or : [ //多条件，数组
                {name :{$regex : reg}},
                {desc :{$regex : reg}},
                {category :{$regex : reg}},
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
    const data = await ProductDB.updateOne({_id},adress)
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