/*
用来定义user路由的路由器模块
 */
const express = require('express')
 
//db
const UserDB = require('../models/UserDB')

// 得到路由器对象
const router = express.Router()


//登陆
router.post('/login', (req, res) => {
    const {username,password} = req.body
     UserDB.findOne({username, password})
    .then(user=>{
        if(user) 
            res.send({
                code:1,
                user
            })
        else 
            res.send({
                code:0,
                msg:'用户名或密码不正确!',
            })
    })
    .catch(err=>{
        res.send({
            code:0,
            msg: '登陆异常, 请重新尝试'
        })
    })
    
})
//注册add
router.post('/add',async (req, res) => {
    const {username,password,name} = req.body
    const check =await UserDB.findOne({username})
    if(check){
        res.send({
            code:0,
            msg: '用户名已存在'
        })
    }else{
        const data = await UserDB.create({...req.body})
        if(data){
            res.send({
                code:1,
                data
            })
        }else{
            res.send({
                code:0,
                msg: '添加用户失败'
            })
        }
        
    }
})
//修改个人信息
router.post('/updata',async (req, res) => {
    const user = req.body
    const {_id} = user
    console.log(user)
    const data=await UserDB.updateOne({_id}, user)
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
// 删除用户
router.post('/delect',async (req, res) => {
    const {_id} = req.body
    const data = await UserDB.deleteOne({_id})
    if(data){
        res.send({
            code:1,
            data
        })
    }else{
        res.send({
            code:0,
            msg: '删除失败'
        })
    }
})
//获取列表
//获取列表
router.get('/list',async (req, res) => {
    let data
    const {page,pageSize,search} = req.query
    if(!search){
        data = await UserDB.find()
    } 
    else{
        const reg = new RegExp(search, 'i')
        data = await UserDB.find({
            $or : [ //多条件，数组
                {name :{$regex : reg}},
                {username :{$regex : reg}},
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

module.exports=router