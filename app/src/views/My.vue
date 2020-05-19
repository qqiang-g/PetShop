<template>
  <div class="my">
    <van-card>
      <div slot="thumb" class="card-img">
        <img src="https://img.yzcdn.cn/vant/ipad.jpeg" alt="">
      </div>
      <div slot="title" class="card-title" >{{user.name?user.name:'暂未登录'}}</div>
      <div slot="num" class="card-desc" @click="go('/myinfo')">
        个人资料
        <van-icon name="arrow" color="#ff5000" />
      </div>
    </van-card>
    <van-grid :column-num="3">
      <van-grid-item icon="balance-list" text="订单列表" @click="go('/list')" />
      <van-grid-item icon="shop" text="收货地址" @click="go('/adress')"/>
      <van-grid-item icon="lock" text="修改密码" @click="showform"/>
    </van-grid>
<div style="margin: 16px;" v-if="user">
  <van-button round block color="#70a428" native-type="submit" @click="()=>{this.$router.push('/login')}">
    切换账号
  </van-button>
</div>
<div style="margin: 16px;" v-if="user">
  <van-button round block color="#d75d5d" native-type="submit" @click="loginout">
    退出登录
  </van-button>
</div>


<van-overlay :show="show" @click="show=false">
  <div class="wrapper">
    <div class="block" @click.stop>
      <van-field
        v-model="oldpsd"
        name="旧密码"
        label="旧密码"
        placeholder="旧密码"
        type="password"
      />
      <van-field
        v-model="newpsd"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        type="password"
      />
      <div style="margin: 16px;">
        <van-button round block color="#d75d5d" native-type="submit" @click="changepsd">
          提交
        </van-button>
      </div>
    </div>
  </div>
</van-overlay>


  </div>
</template>
<script>
export default {
  name: 'Mall',
  components: {
  },
  created(){
    if(window.localStorage.getItem('user')){
      this.user = JSON.parse(window.localStorage.getItem('user'))
    }
  },
  data() {
    return {
      user:'',
      newpsd:'',
      oldpsd:'',
      show:false
    }
  },
  methods:{
    go(path){
      if(!this.user) path = '/login'
      this.$router.push(path)
    },
    showform(){
      if(!this.user) return  this.$router.push('/login')
      this.show = true
    },
    //修改
    async changepsd(){
      if(this.oldpsd!=this.user.password) this.Toast('原密码不正确');
      const requit = await this.$ajax.post('user/updata',{
        _id:this.user._id,
        password:this.newpsd
      })
      if(requit.data.code == 1){
        this.Toast('修改成功');
        localStorage.removeItem('user');
      }else{
        this.Toast('修改失败');
      }
    },
    //退出
    loginout(){
      window.localStorage.removeItem('adress')
      window.localStorage.removeItem('user')
      this.$router.go(0)
    }
  }
}
</script>
<style scoped>
.van-card{
  height: 160px;
}
.card-img{
  width:140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid lightblue;
}
.card-img img{ 
width: 140px;
}
.card-title{
  font-size: 19px;
  font-weight: 700;
  margin-top: 50px;
  margin-left: 70px;
}
.card-desc{
  margin-top: 20px;
  font-size: 16px;
}
.van-grid{
  margin-top: 30px;
  background: #fff;
  margin:50px  5% 0;
}
.van-grid{
    color: #f16240;
}

/**弹出成 */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  padding: 15px 10px;
  border-radius: 5px;
  background-color: #fff;
}
</style>
