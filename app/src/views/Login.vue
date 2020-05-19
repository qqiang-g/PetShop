<template>
  <div class="login">
    <van-nav-bar
      v-if="!reg"
      title="登录"
      left-arrow
      @click-left="()=>this.$router.back(2)"
      right-text="注册"
      @click-right="()=>{reg=!reg}"
    />
    <van-nav-bar
      v-if="reg"
      title="用户注册"
      left-arrow
      @click-left="()=>this.$router.back()"
      right-text="登录"
      @click-right="()=>{reg=!reg}"
    />
    <!-- 登录 -->
    <div v-if="!reg">
      <van-field
        v-model="form1.username"
        name="账号"
        label="账号"
        placeholder="账号"
      />
      <van-field
        type="password"
        v-model="form1.password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
    </div>
    <!-- 注册 -->
    <div v-if="reg">
      <van-field
        v-model="form2.username"
        name="账户"
        label="账户"
        placeholder="使用手机号注册"
      />
      <van-field
        v-model="form2.name"
        name="昵称"
        label="昵称"
        placeholder="昵称"
      />
      <van-field
        type="password"
        v-model="form2.password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        type="password"
        v-model="repassword"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
      />
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="form2.six" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </div>
  <div style="margin: 16px;">
    <van-button round block color="#d75d5d" native-type="submit" @click="login">
      提交
    </van-button>
  </div>
  </div>
</template>
<script>
export default {
  name:'Login',
  data() {
    return {
      form1:{
        username:'',
        password:'',
      },
      repassword:'',
      form2:{
        username:'',
        password:'',
        name:'',
        six:'',
        adressid:''
      },
      reg:false
    }
  },
  methods:{
    //提交
    async login(){
       if(this.reg){
         //注册
         if(! /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(this.form2.username)) return this.Toast('注册的手机号不正确')
         if(this.form2.username==''||this.form2.name=='') return this.Toast('注册信息不能为空')
         this.Toast.loading({
          message: '注册中...',
          duration:0
        });
         if(this.form2.password!=this.repassword) return this.Toast('两次密码不一致')
         const requit = await this.$ajax.post('user/add',{...this.form2})
         if(requit.data.code == 1){
           this.Toast.success('注册成功，请登录');
            this.$router.go()
         }
         else
         this.Toast.fail(requit.data.msg); 
       }else{
        //  登录
        if(this.form1.username==''||this.form1.password=='') return this.Toast('账户或密码不能为空')
        this.Toast.loading({
          message: '登录中...',
          duration:0
        });
        const requit =await this.$ajax.post('user/login',this.form1)
        if(requit.data.code==1){
          window.localStorage.setItem("user",JSON.stringify(requit.data.user))
          console.log(requit.data.user)
          if(requit.data.user.adressid){
                const adress= await this.$ajax.get('adress/list',{params:{_id:requit.data.user.adressid}})
                if(adress.data.code = 1){
                  window.localStorage.setItem('adress',JSON.stringify(adress.data.data[0]))
                  this.Toast.success('登录成功');
                  this.$router.back()
                }else{
                  this.Toast.success('登录成功,添加收货地址');
                  return this.$router.push('/adress')
                }
          }else{
              this.Toast.success('登录成功,添加收货地址');
              return this.$router.push('/adress')
          }
        }else{
          this.Toast.fail(requit.data.msg);
        }
       } 
    }
  }
}
</script>
