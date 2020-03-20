/*
用来定义user路由的路由器模块
 */
const express = require('express')
const fs = require("fs")

// 得到路由器对象
const router = express.Router()
// console.log('router', router)


// 登陆
router.get('/*', (req, res) => {
    const path = req.params[0]
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    fs.readFile('public/img/'+path,function(err,file){
        if(err){
            console.log(err);
            res.end();
            return ;
        }else{

            res.write(file);
            res.end();
        }
    });
})

module.exports=router