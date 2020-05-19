<template>
  <div class="cart">
    <!-- 头部 -->
    <van-nav-bar  style="text-align:left;" >
      <span  slot="title" style="font-size:18px;font-weight:600;color: #323233;">购物车</span>
      <van-button type="warning" slot="right" size="small" round @click="onClickRight">{{tabnar.title}}</van-button>
    
    </van-nav-bar>
    <div class="card" v-if="!login">
      <van-divider v-if="carts.length==0">购物车还没有商品</van-divider>
     <van-card
     v-for="(item,index) in carts" :key="index"
      :price="item.price"
      :desc="item.desc"
      :title="item.name"
      :thumb="'http://121.36.80.195:5000/img/'+item.img"
    >
      <van-checkbox slot="tag" v-model="item.checked" checked-color="#ff5000" @change="checkClick(index)"></van-checkbox>
      <van-stepper slot="num" max="10" v-model="item.num" integer disabled-input  @change="numClick(item)" />
    </van-card>

    </div>
    <div style="text-align:center;margin-top:100px;" v-if="login">你还没有登录

      <div style="margin: 16px;">
    <van-button round block color="#d75d5da2" native-type="submit" @click="()=>{this.$router.push('/login')}">
      去登录
    </van-button>
  </div>
    </div>

<!-- 结算操作 -->
<van-submit-bar
  :price="allPrice"
  button-text="结算"
  @submit="buycart"
>
  <van-checkbox v-model="allchecked" checked-color="#ff5000" @change="allChecked"  >{{allchecked?'全不选':'全选'}}</van-checkbox>
</van-submit-bar>
<!-- 删除操作 -->
<van-submit-bar
v-show="tabnar.type"
  button-text="删除"
  @submit="delcart"
>

  <van-checkbox v-model="allchecked" checked-color="#ff5000" @change="allChecked"  >{{allchecked?'全不选':'全选'}}</van-checkbox>
<div slot="default" class="van-submit-bar__text" >{{'选中（'+tabnar.num+'）项'}}</div>
</van-submit-bar>


<van-overlay id="ad" style="position: absolute;z-index: 999;" :show="showad" @click="show=false">
  <van-address-list
      v-model="chosenAddressId"
      :list="adlist"
      add-button-text='取消'
      @select='select'
      @add="()=>{showad = false}"
    >
      <div slot="item-bottom"></div>
    </van-address-list>

</van-overlay>

 </div>
</template>
<script>
export default {
  name: 'Mall',
  components: {
  },
  
  data() {
    return {
      showad:false,
      chosenAddressId:'',
      adlist:[],
      oldlist:[],
      tabnar:{
        title:'管理',
        type:false,
        num:0
      },
      allPrice:0,
      allchecked:false,
      carts:[ ],
      user:{},
      login:false
    }
  },
  created(){
    
    if(window.localStorage.getItem('user')){
      this.login = false
      this.user = JSON.parse(window.localStorage.getItem('user'))
    }else{
      this.login = true
    }
    this.getlist()
    this.getadlist()
  },
  methods:{
    select(item,index){
      this.$ajax.post('user/updata',{
        _id:this.user._id,
        adressid:item.id
      }).then((data)=>{
        this.user.adressid = item.id
        window.localStorage.setItem('user',JSON.stringify(this.user))
        window.localStorage.setItem('adress',JSON.stringify(this.oldlist[index]))
      this.showad = false
      this.Toast.loading({
          message: '结算中...',
          forbidClick:true,
          duration:0
        });
      this.carts.map((item)=>{
        if(item.checked)
          this.$ajax.post('order/add',{
            user_id:this.user._id,
            username:this.user.name,
            product_id:item.id,
            productname:item.name,
            time:Date.parse(new Date()),
            state:false,
            price:item.price,
            count:item.num,
            img:item.img,
            adress:window.localStorage.getItem('adress')
          }).then(data=>console.log(data))
      })
      
      this.carts.map((item)=>{
        if(item.checked)
          this.$ajax.post('cart/delect',{
            _id:item.id
          })
      })
       setTimeout(()=>{
      this.Toast.success('结算成功');
      this.$router.go()
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
      console.log(requit)
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
    //购物车管理开关
    onClickRight(){
      if(this.tabnar.type){
        this.tabnar.title = '管理'
        this.tabnar.type = false
      }
      else{
        this.tabnar.title = '完成'
        this.tabnar.type = true
      }
    },
    //选中的商品
    checkClick(index){
      const cen =this.carts[index].num*Number(this.carts[index].price)
      if(this.carts[index].checked){
          this.tabnar.num+=1
        this.allPrice =( Number(this.allPrice) +cen*100  )
      }else{
          this.tabnar.num-=1
        this.allPrice = ( Number(this.allPrice) -cen*100  )
      }
      if(this.allPrice<0)this.allPrice = 0
      let count = 0
      for(let i in this.carts)
        if(this.carts[i].checked==true)count++
      if(count==this.carts.length) this.allchecked=true
      else this.allchecked=false  
      console.log(count)
    },
    //增加数量
    numClick(item){
      this.$ajax.post('cart/updata',{
        _id:item.id,
        count:item.num
      })
      this.allPrice = 0
      this.carts.forEach((item,index)=>{
        if(item.checked){
          this.allPrice +=Number(item.price)*item.num*100
        }
      })
    },
    //被选中后
    allChecked(e){
      if(this.allchecked){
        for(let i in this.carts ) {
          this.carts[i].checked = true
        }
      }else{
        for(let i in this.carts ) {
          this.carts[i].checked = false
        }  
      }
      
    },
    //删除
    delcart(){
      let yes = false
      this.carts.map((item)=>{
        if(item.checked)
          yes = true
      })
      if(!yes) return

      this.Toast.loading({
          message: '删除中...',
          forbidClick:true,
          duration:0
        });
      this.carts.map((item)=>{
        if(item.checked)
          this.$ajax.post('cart/delect',{
            _id:item.id
          })
      })
      this.Toast.success('删除成功');
      this.$router.go()
    },
    //结算
    buycart(){
      let yes = false
      this.carts.map((item)=>{
        if(item.checked)
          yes = true
      })
      if(!yes) return
      if(!window.localStorage.getItem('adress')||window.localStorage.getItem('adress')=='undefined'){
          this.Toast.fail('请添加地址');
          this.$router.push('adress')
          return
        } 
      this.showad = true  
      
    },

    //获取数据
    async getlist(){
      if(this.login) return
      const requit = await this.$ajax('cart/list',{
        params:{
          user_id :this.user._id
        }
      })
      if(requit.data.code == 1){
        this.carts = []
        requit.data.data.map((item)=>{
          this.carts.push({
            id:item._id,
            name:item.name,
            desc:item.desc,
            price:item.price,
            num:item.count,
            img:item.img,
            checked:false
          })
        })
      }
    }
  }
}
</script>
<style scoped>
#ad{
  position: absolute;
  z-index: 999;
  background: #fff;
}
#ad .van-icon-edit{
  display: none;
}
.cart{
  width: 100%;
  height: 100%;
}
.card{
  width: 90%;
  padding: 60px 5% 10px;
}
.van-card__tag {
    position: absolute;
    top: 2px;
    left: -10px;
    height: 50px;
}
/**商品卡 */
.van-card .van-checkbox {
  padding-bottom: 60px;
}
.van-submit-bar {
  margin-bottom: 60px;
}
.van-image {
  margin-left: 15px;
}
.van-card__content{
  margin-left: 15px;
}
/**顶部 */
.van-nav-bar{
  position: fixed;
  width: 100%;
  top: 0;
}
/**结算区域 */
.action1{
  width: 35%;
  padding-left: 5%;
}
.action2{
  width: 20%;
}
.action3{
  width: 30%;
  padding :0 5%;
}

</style>