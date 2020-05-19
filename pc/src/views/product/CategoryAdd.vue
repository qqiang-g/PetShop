<template >
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-link  icon="el-icon-arrow-left" type="primary" @click="back">品类管理</el-link>
  </div>
    <el-form :model="ruleForm"  label-width="100px" class="demo-dynamic" ref="ruleForm">
  <el-form-item
    prop="name"
    
    label="品类名称"
    :rules="[ { required: true, message: '请输入品类名称', trigger: 'blur' }]"
  >
    <el-input v-model="ruleForm.name" placeholder="请输入品类名称" />
  </el-form-item>
  <el-form-item
    prop="desc"
    label="品类描述"
    :rules="[ { required: true, message: '请输入商品描述', trigger: 'blur' }]"
  >
    <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入商品描述"/>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button v-if="!ruleForm._id" @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>
<script>
  export default {
    data() {
      return {
        id:'',
        ruleForm:{
          _id:'',
          name:'',
          desc:'',
        },
      }
    },
    created(){
      if(this.$route.params.row){
        this.ruleForm.name = this.$route.params.row.name
        this.ruleForm.desc = this.$route.params.row.desc
        this.ruleForm._id = this.$route.params.row._id
      }
    },
    methods: {
      //提交
       submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            if(!this.ruleForm._id){
              const requit =await this.$ajax.post('category/add',{
                name:this.ruleForm.name,
                desc:this.ruleForm.desc
              })
              console.log(requit)
              if(requit.data.code ==1)
                this.$message.success('添加成功'),this.resetForm('ruleForm'),this.back()
              else
                this.$message.error(requit.data.msg)  
            }
            else{
              const requit = await this.$ajax.post('/category/updata',this.ruleForm)
              if(requit.data.code ==1)
                this.$message.success('修改成功'),this.back()
              else
                this.$message.error(requit.data.msg)  
            }
            
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        
      },
      //返回
      back(){
        this.$router.back()
      }
    }
  }
</script>