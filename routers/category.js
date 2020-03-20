/*
用来定义category路由的路由器模块
 */
const express = require('express')
//db
const CategoryDB = require('../models/CategoryDB')

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 添加
router.post('/add',async (req, res) => {
    const {name} = req.body
    const check = await CategoryDB.findOne({name})
    console.log(check)
    if(!check){
        const data = await CategoryDB.create({...req.body})
        if(data){
            res.send({
                code:1,
                data
            })
        }else{
            res.send({
                code:0,
                msg: '添加品类失败'
            })
        }
    }else{
        res.send({
            code:0,
            msg: '品类已存在'
        })
    }
    
})
//删除
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await CategoryDB.deleteOne({_id})
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
         data = await CategoryDB.find()
    } 
    else{
        const reg = new RegExp(search, 'i')
        data = await CategoryDB.find({
            $or : [ //多条件，数组
                {name :{$regex : reg}},
                {desc :{$regex : reg}},
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
    const data = await CategoryDB.updateOne({_id},adress)
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