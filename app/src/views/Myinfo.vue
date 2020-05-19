<template>
  <div class="myinfo">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="()=>this.$router.back()"
    />
    <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="昵称"
    label="昵称"
    placeholder="昵称"
  />
  <van-field name="radio" label="性别">
  <template #input>
    <van-radio-group v-model="six" direction="horizontal">
      <van-radio name="男" checked-color='#9cba63'>男</van-radio>
      <van-radio name="女" checked-color='#9cba63'>女</van-radio>
    </van-radio-group>
  </template> 
</van-field>
  <div style="margin: 16px;">
    <van-button round block color="#d75d5d" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      six:''
    };
  },
  created(){
    console.log(this.$ajax.defaults.baseURL)
    if(window.localStorage.getItem('user'))
    this.user =JSON.parse( window.localStorage.getItem('user'))
    this.username = this.user.name
    this.six = this.user.six
  },
  methods: {
    async onSubmit() {
      const requit =await this.$ajax.post('user/updata',{
        _id:this.user._id,
        name :this.username,
        six:this.six
      })
      if(requit.data.code ==1){
        this.user.name = this.username
        this.user.six = this.six
        window.localStorage.setItem('user',JSON.stringify(this.user))
        this.Toast('修改成功');
        this.$router.back()
      }
    },
  },
};

</script>
<style scoped>
.van-nav-bar .van-icon{
   color: lightcoral;
 }
</style>
