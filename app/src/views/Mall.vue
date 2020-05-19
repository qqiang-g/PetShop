<template>
  <div class="mall">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search class="mall-serch" shape="round" placeholder="请输入搜索关键词" @click="onSearch" />
      <van-swipe class="mall-swipe" :autoplay="3000" indicator-color="#123">
        <!-- <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item> -->
        <van-swipe-item @click="()=>this.$router.push('/product')">
          <img src='../plugins/a1.jpg' />
        </van-swipe-item>
        <van-swipe-item @click="()=>this.$router.push('/product')">
          <img src='../plugins/a2.jpg' />
        </van-swipe-item >
        <van-swipe-item @click="()=>this.$router.push('/product')">
          <img src='../plugins/a3.jpg' />
        </van-swipe-item>
        <van-swipe-item>
          <img src='../plugins/a4.jpg' />
        </van-swipe-item>
      </van-swipe>
      <div class="scort">
        <div class="scort-title">
          呵护爱宠的明智之选  ❤
        </div>
          <van-grid :column-num="3" :border="false" >
            <van-grid-item v-for="(value,index) in sortImgs" :key="index" @click="goProduct(value.title)">
              <div class="img">
                <img :src="value.url">
              </div>
              <span class="title">{{value.title}}</span>
            </van-grid-item>
          </van-grid>
      </div>
      <div class="hot">
          <van-count-down :time="time" millisecond >
            <template v-slot="timeData" >
              <span class="item">{{ timeData.hours|floats }}</span>
              <span class="item">{{ timeData.minutes|floats }}</span>
              <span class="item">{{ timeData.seconds|floats }}</span>
              <span class="item-title">今日热卖<van-icon name="fire" color="#ff5000" /></span>
            </template>
          </van-count-down>
          <div class="hot-center">
            <div class="hot-center-c">
              <div class="product" v-for="(item,index) in hotImg" :key='index' @click="toMessage(item._id)">
                  <img :src="item.img">
                  <div class="product-text">
                    <div class="product-title" >{{item.title}}</div>
                    <div class="product-price" >￥{{item.price}}</div>
                  </div>
                  
              </div>
              <!-- 更多 -->
              <div  style="display: inline-block; width:13%;margin-right:1%;text-align:center; font-size:40px;" @click="()=>this.$router.push('/product')">
                  <van-icon name="wap-home-o" color="#b7b8b9" />
                  <div style="font-size:16px;color:#b7b8b9;">更多商品</div>
                  <br/>
              </div>
            </div> 
          </div>
      </div>
      <!-- 商品 -->
      <div class="word">
        <van-nav-bar  left-text="猜你需要" >
          <!-- <van-icon name="search" slot="right" /> -->
        </van-nav-bar>
        <div class="left">
          <div class="word-card" v-for="item in leftList" :key="item._id" @click="toMessage(item._id)">
            <img :src="item.img" />
            <div class="word-text">
              <span>{{item.name}}</span><br/>
              <div class="word-price">￥{{item.price}}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="word-card" v-for="item in rightList" :key="item._id" @click="toMessage(item._id)">
            <img :src="item.img" />
            <div class="word-text">
              <span>{{item.name}}</span><br/>
              <div class="word-price">￥{{item.price}}</div>
            </div>
          </div>
        </div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
          到底了
        </van-divider>
      </div>
      

    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'Mall',
  components: {
  },
  
  data() {
    return {
      hotImg:[ ],

      time: 30 * 60 * 60 * 1000,//hot中的时间
      isLoading: false,//加载动画
      //轮播图
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      //列表图
      sortImgs:[
        {url:require('../plugins/1.png'),title:'干粮系列'},
        {url:require('../plugins/2.png'),title:'零食系列'},
        {url:require('../plugins/3.png'),title:'保健系列'},
        {url:require('../plugins/4.png'),title:'医疗系列'},
        {url:require('../plugins/5.png'),title:'生活日用'},
        {url:require('../plugins/6.png'),title:'其他商品'}
      ],
      leftList:[],
      rightList:[],
      
    }
  },
  created(){
    this.initTime()
    this.initList()
  },
  methods:{
    //跳转分类
    goProduct(product){
      if(product=='其他商品') product = ''
      this.$router.push({name:'Product',params:{
        category:product
      }})
    },
    //初始化时间
    initTime(){
      const h = new Date().getHours()
      const m = new Date().getSeconds()
      const s = new Date().getMinutes()
      this.time = (24-h)*3600000 +(m-60)*60000+(s-60)*1000
    },
    //初始化列表
    async initList(){
      const requit =await this.$ajax.get('product/list')
      if(requit.data.code==1){
        for(let i=0;i<requit.data.data.length;i++){
          if(i%2==1){
            this.rightList.push({
              _id:requit.data.data[i]._id,
              name:requit.data.data[i].name,
              price:requit.data.data[i].price,
              img:'http://121.36.80.195:5000/img/'+requit.data.data[i].imglist[0],
            })
          }else{
              this.leftList.push({
              _id:requit.data.data[i]._id,
              name:requit.data.data[i].name,
              price:requit.data.data[i].price,
              img:'http://121.36.80.195:5000/img/'+requit.data.data[i].imglist[0],
            })
          }
          if(i<5)
            this.hotImg.push({
              _id:requit.data.data[i]._id,
              title:requit.data.data[i].name,
              price:requit.data.data[i].price,
              img:'http://121.36.80.195:5000/img/'+requit.data.data[i].imglist[0],
            })
        }
      }
    },
    //获取信息
    toMessage(_id){
      this.$router.push({name:'Message',params:{_id}})
    },
    onSearch(){
      this.$router.push('/search')
    },
    onRefresh(){
      setTimeout(() => {
        this.Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    }
  },
  filters:{
    floats(num){
      num = num+''
        if(num.length == 1)
        return '0'+num
        return num
    }
  }
}
</script>
<style   scoped>
.mall{
  height: 100%;
}
.van-pull-refresh{
  height: 100%;
  background: #e4f0fd4d;
  overflow-y: auto;
  padding-bottom: 50px;
}
/*搜索框 */
.mall-serch{
  background: #00000000;
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
}
.van-search__content{
  background-color: #f7f8faa6;
}
.van-search__content--round {
    border-radius: 17px;
    border: 1px solid #1122331c;
}
/*轮播图 */
.mall-swipe{
  height: 200px;
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
/**分类 */
.scort{
  margin: 15px 3%;
  padding: 10px 0 15px ;
  background: #fff;
  border-radius: 15px;
  border: 1px solid #ffffffa1;
  border-top: 60px solid #bedbebb5;
}
.scort .img{
  width: 60%;
  height: 60%;
  border: 2px solid #8be0ce9a;
  padding: 5px;
  border-radius: 50%;
  text-align: center;
}
.scort img{
  width: 100%;
}
.scort .title{
  font-size: 15px;
}
.scort-title{
  font-size: 18px;
  margin-top: -70px;
  text-align: center;
 height: 60px;
 line-height: 60px;
    color: #f7d0c4;
    font-weight: 600;
    background: #a9f3da;
    background-image: -webkit-linear-gradient(45deg,#cc7c7c,#2c6b56);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue 2s infinite linear;
}

/**::before
hot今日热卖
 */
 .hot{
   margin: 15px 3%;
   padding: 15px;
 }
 .hot .item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #f5711a;
  
}
.hot .item-title{
float: right;
}
.hot .hot-center{
  overflow-x:scroll ;
  overflow-y:hidden ;
  margin-top: 10px;
  background: #e481924d;
  padding: 7px 0;
  height: 190px;
  border-radius: 5px;
  width: 100%;
}
.hot .hot-center-c{
  height: 100%;
  width: 200%;
}

/*图片 */
.product{
  display: inline-block;
  width: 16%;
  margin-left:1% ;
  height: 100%;
  background: #ffffff91;
  border-radius: 3px;
}
.product img {
  border-radius: 3px;
  width: 100%;
  height: 140px;
}
.product-text{
  text-align: center;
  height:50px ;
}
.product-price{
  text-align: left;
  color: #ff5000;
}
/*商品 */
.word{
  width: 90%;
  padding-top: 5px;
  margin: 0 5%;
}

.word .left{
  float: left;
  width: 49%;
  background: lightblue;
  margin-right: 2%;
}
.word .right{
  float: right;
  width: 49%;
  background: lightblue;
}
/**商品卡片 */
.word-card{
  width: 92%;
  margin: 4%;
  background: #fff;
  border-radius: 5px;
}
.word-card img{
  border-top-right-radius: 5px;
   border-top-left-radius: 5px;
  width: 100%;
}
.word-text{
  padding: 3px 15px 5px;
  font-weight: 600;
  text-align: center;
  color: #817f7f;
}
.word-price{
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  color: #ff5000;
}


@keyframes hue {
    from {
        -webkit-filter: hue-rotate(0deg);
    }
    to {
        -webkit-filter: hue-rotate(-360deg);
    }
}
</style>
