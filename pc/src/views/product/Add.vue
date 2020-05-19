<template >
<el-card class="box-card">
   <div slot="header" class="clearfix">
    <el-link  icon="el-icon-arrow-left" type="primary" @click="back">品类管理</el-link>
  </div>
    <el-form :model="ruleForm"  label-width="100px" class="demo-dynamic" ref="ruleForm">
  <el-form-item
    prop="name"
    label="商品名称"
    :rules="[ { required: true, message: '请输入商品名称', trigger: 'blur' }]"
  >
    <el-input v-model="ruleForm.name" placeholder="请输入商品名称" />
  </el-form-item>
  <el-form-item
    prop="price"
    
    label="商品价格"
    :rules="[ { required: true, message: '请输入商品价格', trigger: 'blur' }]"
  >
    <el-input v-model="ruleForm.price" placeholder="请输入商品价格" >
        <template slot="append">￥</template>
    </el-input>
  </el-form-item>
  <el-form-item 
    prop="category"
    label="商品分类"
    :rules="[ { required: true, message: '请选择商品分类', trigger: 'blur' }]"
  >
    <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
      <el-option v-for="(item,index) in category" :key="index" :label="item.name" :value="item.name" />
    </el-select>
  </el-form-item>
  <el-form-item
    prop="desc"
    label="商品描述"
    :rules="[ { required: true, message: '请输入商品描述', trigger: 'blur' }]"
  >
    <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入商品描述"/>
  </el-form-item>

  <el-form-item
    label="商品图片"
  >
  <el-upload
    action="#"
    :http-request="uploadProductPic"
    accept="image/*"
    list-type="picture-card"
    :on-remove='handleContImgRemove'
    :file-list="fileList"
  >
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" >
    </el-dialog>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button v-if="!exiting" @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>
<script>
  export default {
    data() {
      return {
        exiting:false,
        ruleForm:{
          name:'',
          price:'',
          category:'',
          desc:'',
          imglist:[]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        file:[],//提交的图片列表
        fileList: [],//图片的临时列表
        category:[],//分类列表，
        delimg:[],//需要删除的图片
      };
    },
    created(){
      this.getCategory()
      this.initexit()
    },
    methods: {
      //添加图片
      uploadProductPic: function (file) {
        this.file.push(file.file)
      },
      //取消图片
      handleContImgRemove:function (file, fileList) {
        if(file.status=='success'){
          this.fileList = this.fileList.filter(item=>item.name!==file.name)
          this.ruleForm.imglist = this.ruleForm.imglist.filter(item=>item!==file.name)
          this.delimg.push(file.name)
        }
        else
        this.file = this.file.filter(item=>item.uid!==file.uid)
      },
      //删除图片
      async delectimg(){
        let img = []
        for(let i in this.delimg)
            img.push( await  this.$ajax.post('/file/delect',{name:this.delimg[i]}))
        return img  
      },
      //提交按钮
      submitForm(formName) {
        this.$refs[formName].validate( async(valid) => {
          if (valid) {
            console.log(this.exiting)
              if(this.exiting)this.exit()
              else this.add()
          }
        });
      },
      //重置
      resetForm(formName) {
       this.exit()
        // this.$refs[formName].resetFields();
        
      },
      //传输图片
      async upload(){
        if(this.file.length<1)return {code:0}
        let form = new FormData()
        this.file.forEach(item=>{
          form.append('imgs',item)
        }) 
        const reqult = await this.$ajax.post(
          "/file/add",
          form,
          {
            headers: {'Content-Type': 'multipart/form-data'}
          }
        )
        return reqult.data
      },
      //添加功能
      async add(){
            const imglist =await this.upload()
            if(imglist.code==1){
              console.log(imglist.imgurl)
              this.ruleForm.imglist = imglist.imgurl 
            }
            const reqult = await this.$ajax.post("product/add",this.ruleForm); 
            if(reqult.data.code==1) this.$message.success('添加成功') ,this.resetForm('ruleForm'),this.$router.back()
            else this.$message.error(reqult.data.msg)
      },
      //修改功能
      async exit(){
        if(!this.exiting) return
        const checkimg =await this.upload()
        let  imglist = []
        console.log(checkimg)
        if(checkimg.code==1){
          this.ruleForm.imglist=this.ruleForm.imglist.concat(checkimg.imgurl)
        }
        console.log(this.ruleForm.imglist)
        const del = await this.delectimg()
        console.log(del)
        const requit = await this.$ajax.post('product/updata',{...this.ruleForm,_id:this.$route.params.row._id})
        if(requit.data.code==1)this.$message.success('添加修改'),this.$router.back()
        else this.$message.error(requit.data.msg)
      },
      //返回
      back(){
        this.$router.back()
      },
      //获取分类列表
      async getCategory(){
        const requit =await this.$ajax.get('/category/list')
        if(requit.data.code == 1)
          this.category = requit.data.data
      },
      //修改初始化
      initexit(){
        if(this.$route.params.row){
          this.exiting = true
          this.ruleForm.name = this.$route.params.row.name
          this.ruleForm.price = this.$route.params.row.price
          this.ruleForm.category = this.$route.params.row.category
          this.ruleForm.desc = this.$route.params.row.desc
          this.ruleForm.imglist = this.$route.params.row.imglist
          this.ruleForm.imglist.forEach(item=>{
            this.fileList.push({
              name:item,
              url:'http://121.36.80.195:5000/img/'+item
            })
          })
        }else{
          this.exiting = false
        }
      }
    }
  }
</script>