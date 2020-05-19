<template>
    <div class="login">
        <div class="login_box">
            <div class="avatar_box">
                <img src="./../assets/login.jpg" alt="">
            </div>
            <!-- 表单提交 -->
            <el-form ref="loginFormRef"  :rules="loginFormRules" :model="form" label-width="0px" class="login_form" >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input  prefix-icon="el-icon-user-solid" v-model="form.username" ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password">
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="form_button">
                    <el-button type="primary"  @click="login">提交</el-button>
                    <el-button  @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            // 表单验证规则
            loginFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        // 重置登录表单
        resetLoginForm:function(){
            this.$refs.loginFormRef.resetFields()
        },
        login:function(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid)return;
                //aixos请求接收返回的data数据
               const reqult = await this.$ajax.post("admin/login",this.form);
                if(reqult.data.code==1){
                    
                    window.localStorage.setItem('user',JSON.stringify(reqult.data.data))
                    this.$router.push('/home')
                }
                else
                    this.$message(reqult.data.msg)
                // 成功后执行 保存令牌   跳转页面
                // window.sessionStorage.setItem('tokenkey',reqult.data.key)
                // this.$router.push('/home')
            })
        }
    }
    

}
</script>

<style  scoped>
    .login{
        height: 100%;
        background-color: #245e63;
        background: url(../assets/bg.png) no-repeat 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #ffffff;
        border-radius: 5px;
        /* margin: 100px auto;  */
        position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    }
    .avatar_box{
        width: 130px;
        height: 130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        margin: -70px auto;
        background-color: #fff;
    }
    .avatar_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 35px;
        box-sizing: border-box;
    }
    .form_button{
        display: flex;
        justify-content: flex-end;
    }

</style>