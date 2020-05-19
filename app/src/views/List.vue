<template>
  <div class="scort">
    <van-nav-bar
      title="订单列表"
      left-arrow
      
      @click-left="()=>this.$router.back()"
      right-text="我的"
      @click-right="()=>this.$router.push('/my')"
    />
    <van-card v-for="(item,index) in list" :key="index"
      :num="item.count"
      :desc="item.desc"
      :title="item.productname"
      :thumb="'http://121.36.80.195:5000/img/'+item.img"
    >
      <div slot="price">
        <span style="padding-right:15px;color:#ff5000;">{{"￥"+item.price}}</span>
        {{"合计：￥"+item.price*item.count}}
        </div> 
        <template #footer>
          <van-tag mark :type="item.state?'success':'warning'">{{item.state?'已完成':'进行中'}}</van-tag>
          <div style='text-align:left;'>
            <span>{{item.adress.name}}</span><span style="margin-left:30px;">{{item.adress.tel}}</span>
            <p>{{item.adress.province+'-'+item.adress.city+'-'+item.adress.county+' '+item.adress.addressDetail}}</p>
          </div>
        </template>
    </van-card>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
        list:[],
        user:{}
    }
  },
  created(){
    if(window.localStorage.getItem('user'))
    this.user = JSON.parse(window.localStorage.getItem('user'))
    this.getlist()
  },
  methods:{
    async getlist(){
      if(!this.user._id) return
      const requit = await this.$ajax.get('order/list',{
        user_id:this.user._id
      })
      console.log(requit)
      if(requit.data.code == 1){
        this.list = requit.data.data
        this.list.map(item=>{
          item.adress = JSON.parse(item.adress)
        })
      }
        
    }
  }
}
</script>
