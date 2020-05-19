<template>
  <div class="scort">
    <div style="position:fixed;width:100%;">
      <van-search 
        lable='123' 
        v-model="search" class="mall-serch" 
        show-action show-lable shape="round" 
        placeholder="请输入搜索关键词" 
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
        <template #left>
          <van-icon name="arrow-left" @click="back" />
        </template>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item v-model="category" :options="option1" @change="cateList" />
        <van-dropdown-item v-model="sort" :options="option2" @change="sortList"/>
      </van-dropdown-menu>
    </div>
    
 <!-- 商品 -->
      <div class="word" style="padding-top:105px;">
        <div class="left">
          
          <div class="word-card" v-for="(item,index) in leftList" :key="index" @click="toMessage(item._id)">
            <img v-lazy="item.img" />
            <div class="word-text">
              <span>{{item.name}}</span><br/>
              <div class="word-price">￥{{item.price}}</div>
            </div>
          </div>


        </div>
        <div class="right">
          
         <div class="word-card"  v-for="(item,index) in rightList" :key="index" @click="toMessage(item._id)">
            <img v-lazy="item.img" />
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

  </div>
</template>
<script>
export default {
  data() {
    return {
      category: '',
      search:'',
      sort: 'all',
      option1: [
        { text: '全部商品', value: '' },
      ],
      option2: [
        { text: '默认排序', value: 'all' },
        { text: '价格从高到低', value: 'height' },
        { text: '价格从低到高', value: 'low' },
      ],
      leftList:[],
      rightList:[]
    }
  },
  created(){
    if(this.$route.params.search){
      this.search = this.$route.params.search
    }
    if(this.$route.params.category){
      this.category = this.$route.params.category
    }
    this.getCategory()
    this.getList()
  },
  methods: {
    //初始化分类
    async getCategory(){
      const requit = await this.$ajax.get('category/list')
      if(requit.data.code == 1){
        requit.data.data.forEach(element => {
          this.option1.push({
            text:element.name,
            value:element.name,
          })
        });
      }
    },
    //初始化列表
    async getList(){
      const requit = await this.$ajax.get('product/list',{
        params:{
          search:this.search,
          category:this.category
        }
      })
      if(requit.data.code==1){
        this.leftList = [],
        this.rightList = []
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
        }
        this.sortList()
      }
    },
    //返回
    back(){
      this.$router.push('/')
    },
    //排序
    sortList(){
      if(this.sort=='all') return
      const  list = [...this.leftList,...this.rightList]
      let leftList=[]
      let rightList=[]
      list.sort((a,b)=>{
          return a.price-b.price
      })
      if(this.sort=='height') list.reverse()
      for(let i=0;i<list.length;i++){
        if(i%2==1){
           rightList.push(list[i])
        }else{
           leftList.push(list[i])
        }
      }
      this.leftList = leftList
      this.rightList = rightList
    },
    //分类
    async cateList(){
      if(this.category == '') return this.getList()
      if(!this.category)return
      this.getList()

    },
    //搜索
    onSearch(){
      if(!this.search) return
      this.getList()
    },
    toMessage(_id){
      this.$router.push({name:'Message',params:{_id}})
    }
  }

};
</script>
<style  scoped>
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

</style>