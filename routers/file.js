/*
用来定义file路由的路由器模块
 */
const express = require('express')
// 得到路由器对象
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const dirPath = path.join(__dirname, '..', 'public/img')

const storage = multer.diskStorage({
    // destination: 'upload', //string时,服务启动将会自动创建文件夹
    destination: function (req, file, cb) { //函数需手动创建文件夹
      // console.log('destination()', file)
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, function (err) {
          if (err) {
            console.log(err)
          } else {
            cb(null, dirPath)
          }
        })
      } else {
        cb(null, dirPath)
      }
    },
    filename: function (req, file, cb) {
    //   console.log('filename()', file)
      var ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + ext)
    }
  })

const upload = multer({storage}).array('imgs', 12)

// 上传
router.post('/add',(req, res) => {
    upload(req, res, function (err) { //错误处理
      if (err) {
        return res.send({
          code: 0,
          msg: '上传文件失败'
        })
      }
      let img =[]
      req.files.map((item)=>{
          img.push(item.filename)
      })
      res.send({
        code: 1,
        imgurl:img
      })

})
    
})
router.post('/delect', (req, res) => {
  const {name} = req.body
  fs.unlink(path.join(dirPath, name), (err) => {
    if (err) {
      console.log(err)
      res.send({
        code: 0,
        msg: '删除文件失败'
      })
    } else {
      res.send({
        code: 1
      })
    }
  })
})
router.get('/getimg', (req, res) => {
    console.log(req.body)
  res.send({
      s:'admin'
  })
})

module.exports=router