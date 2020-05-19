<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#FC9086" inactive-color="#868686" >
      <van-tabbar-item :icon="active==0?'shop':'shop-o'" to='/'>商城</van-tabbar-item>
      <van-tabbar-item :icon="active==1?'label':'label-o'" to='/sort' > 分类 </van-tabbar-item>
      <van-tabbar-item :icon="active==2?'shopping-cart':'shopping-cart-o'" to='/cart' >购物车</van-tabbar-item>
      <van-tabbar-item :icon="active==3?'manager':'manager-o'" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  created(){
    this.active = this.path.indexOf(this.$router.history.current.path)
  },
  data() {
    return {
       active: 0,
      path:['/','/sort','/cart','/my'],
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  },
  methods:{
     
  }
}
</script>
<style   scoped>
.home{
  height: 100%;
}
</style>
