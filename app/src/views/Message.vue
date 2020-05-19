<template>
  <div class="message">
    <div class="van-nav-bar" style="position:fixed;width:90%;text-align:center;padding:0 5%;">
      <!-- <van-nav-bar
      left-arrow
      right-text="购物车"
      @click-right="()=>this.$router.push('/cart')"
    >
      <template #left>
          <van-icon name="arrow-left" @click="()=>this.$router.push('/product')" />1232
        </template>
    </van-nav-bar> -->
    <span style="float:left;">
    <van-icon  name="arrow-left " @click="()=>this.$router.push('/product')" />
    </span>
      <span style="float:right;" class="van-nav-bar__text" @click="()=>this.$router.push('/cart')">购物车</span>
    </div>
    
<div>



<van-swipe class="mall-swipe" :autoplay="3000" indicator-color="#123">
        <!-- <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item> -->
        <van-swipe-item v-for="(item,index) in img" :key='index'>
          <img :src="'http://121.36.80.195:5000/img/'+item" />
        </van-swipe-item>
      </van-swipe>
      <div style="margin:5px 5%;;color:#ff5000;">￥{{product.price}}</div>
      <div class="title">
        {{product.name}}
      </div>
      <div class="desc">
        <span>
          {{product.desc}}
        </span>
      </div>
      <div style="text-align:center;">
        <van-divider>详情展示</van-divider>
        <van-image style="width:100%;" v-for="(item,index) in imglist" :key='index' :src="'http://121.36.80.195:5000/img/'+item"></van-image>
      </div>

<!-- 底部按钮 -->
    <van-goods-action>
      <van-goods-action-button type="warning" text="加入购物车" @click="()=>{now =false, onClickButton()}" />
      <van-goods-action-button type="danger" text="立即购买" @click="()=>{now =true, onClickButton()}" />
    </van-goods-action>
    <!-- 弹出ceng -->
    <van-popup
      v-model="show"
      closeable
      round
      close-icon="close"
      position="bottom"
      :style="{ height: '350px' }"
    >
    <div class='pop'>
        <van-field>
          <template #input>
            <img :src="'http://121.36.80.195:5000/img/'+img[0]" alt="" style="height:150px;">
            <span style="color:#ff5000;margin-left:15px;">￥{{product.price}}</span>
          </template>
        </van-field>
        <van-field name="stepper" label="购买数量">
          <template #input>
            <van-stepper v-model="value" @change="checkchange" max="10" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block color="#ff6034"  @click="addcart">
            确定
          </van-button>
        </div>
    </div>
    </van-popup>
<van-overlay :show="showad" id="ad">
  <van-address-list
      v-model="chosenAddressId"
      :list="adlist"
      add-button-text='取消'
      @select='select'
       @add="()=>{showad = false}"
    />

</van-overlay>

  </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      user:{},
      now:false,//是否立即购买
      show:false,
      showad:false,
      chosenAddressId:'',
      img:[],
      adlist:[],
      oldlist:[],
      imglist:[],
      value:'',
      product:{ },
    }
  },
  created(){
    this.user =JSON.parse(window.localStorage.getItem('user'))
    this.chosenAddressId = this.user.adressid
    this.getadlist()
    if(this.$route.params._id)
      this.getMessage(this.$route.params._id)
    else 
      this.$router.push('/product')
    if(window.localStorage.getItem('user'))
      this.user = JSON.parse( window.localStorage.getItem('user') )
  },
  methods: {
    checkchange(val){
      if(val>10){
        this.Toast('购买数量不能超过十个')
        this.value = 10
        return 10
      } 
    },
    onClickButton() {
      this.show = true
    },
    //获取信息
    async getMessage(_id){
      if(!_id)return
      this.id = _id
      const requit =await this.$ajax.post('product/message',{_id})
      if(requit.data.code==1){
        this.product = requit.data.data
        this.img = requit.data.data.imglist.splice(0,3)
        this.imglist = [...this.img,...requit.data.data.imglist]
      }
    },
    select(item,index){
      this.$ajax.post('user/updata',{
        _id:this.user._id,
        adressid:item.id
      }).then((data)=>{
        this.user.adressid = item.id
        window.localStorage.setItem('user',JSON.stringify(this.user))
        window.localStorage.setItem('adress',JSON.stringify(this.oldlist[index]))

        //添加订单
        if(!window.localStorage.getItem('adress')||window.localStorage.getItem('adress')=='undefined'){
          this.Toast.fail('请添加地址');
          this.$router.push('adress')
          return
        } 
        this.showad = false
        this.Toast.loading({
          message: '购买中...',
          forbidClick:true,
          duration:0
        });
        
        this.$ajax.post('/order/add',{
          user_id:this.user._id,
          username:this.user.name,
          product_id:this.product._id,
          productname:this.product.name,
          time:Date.parse(new Date()),
          state:false,
          price:this.product.price,
          count:this.value,
          img:this.img[0],
          adress:window.localStorage.getItem('adress')
        })
        setTimeout(()=>{
           this.Toast.success('购买成功');
        },2000)
      })

    },
    //地址
    async getadlist(){
      const requit =await this.$ajax.get('/adress/list',{
        params:{
          user_id:this.user._id
        }
      })
      if(requit.data.code == 1){
        this.adlist = []
        this.oldlist =requit.data.data
        requit.data.data.map((item,index)=>{
          this.adlist.push({
            id:item._id,
            name:item.name,
            tel:item.tel,
            address:item.province+'-'+item.city+'-'+item.county+'-'+item.addressDetail
          })
        })
      }
    },
    //添加购物车
    async addcart(){
      if(!this.user) return this.Dialog.confirm({
        title: '登录',
        message: '您还未登录，是否登录？'
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {
        // on cancel
      });
      if(this.now){
        this.showad = true
        this.show = false
      }else{
        //添加购物车
        
        const requit = await this.$ajax.post('cart/add',{
          user_id:this.user._id,
          product_id:this.product._id,
          name:this.product.name,
          desc:this.product.desc,
          price:this.product.price,
          count:this.value,
          img:this.img[0]
        })
        if(requit.data.code==1)
        this.Toast('添加成功');
      }
    }
    
  }
}
</script>
<style   scoped>
#ad{
  position: absolute;
  z-index: 999;
  background: #fff;
}
#ad .van-icon-edit{
  display: none;
}
.message{
  width: 100%;
}
/* 轮播 */
.mall-swipe{
  height: 250px;
}
.mall-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a8ed;
}
.mall-swipe .van-swipe-item img{
  width: 100%;
}


/**标题 */
.title{
  padding:10px 5% 0;
  width: 90%;
  text-align: left;
  color: #0d3d3d;
  font-size: 23px;

}
.desc{
  width: 90%;
  padding:0 5%;
}


/* 弹窗 */
.pop{
  margin-top: 25px;
}
</style>