<template>
  <div class="search">
    <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="()=>this.$router.back()"
    >
      <van-search slot="title" v-model="value" class="mall-serch" shape="round" show-action @search="onSearch" placeholder="请输入搜索关键词" >
          <div slot="action" @click="onSearch" class='can'>搜索</div>
      </van-search>
    </van-nav-bar>
     
     <div class="history">
        <van-nav-bar title="" left-text="历史搜索">
          <van-icon color="#fc9086" name="delete" @click="clearHistory" slot="right" />
        </van-nav-bar>
        <div class="center">
        <van-tag round color="#e8e5e5" text-color="#5d5a5a" v-for="(item,index) in history" :key="index" @click="()=>{value = item}">{{item}}</van-tag>
        </div>
     </div>
     <!-- <div class="hot">
        <van-nav-bar title="" left-text="推荐搜索">
          <van-icon color="#fc9086" name="replay" slot="right" />
        </van-nav-bar>
        <div class="center">
        <van-tag round>标签</van-tag>
        </div>
     </div> -->
  </div>
</template>
<script>
import storage from '../tools/index.js'
export default {
  name: 'Search',
  
  data() {
    return {
        history:[],//历史
        hot:[],//推荐
        value:'',//搜索内容
    }
  },
  created(){
    const {history} =storage.getMsg('history')
    if(history)
      this.history = history
  },
  methods:{
    //回车搜索
    onSearch(){
      if(this.value){
        this.history.push(this.value)
        storage.saveMsg('history',{history:this.history})
        this.$router.push({name:'Product',params:{
          search:this.value
        }})
      }
      
    },
    //取消返回
    headClick(){
      this.$router.back()
    },
    //清空历史搜索
    clearHistory(){
      if(history.length>1)
      this.Dialog.confirm({
        title:'提示',
        message:'清除所有的历史吗'
      }).then(() => {
        this.history = []
        storage.removeMsg('history')
      }).catch(() => { });
      
    }
  }
}
</script>
<style scoped>
.search{
  height: 100%;
}
/*搜索按钮 */
.can{
  border-radius: 17px;
  padding: 0 15px;
  background: lightcoral;
  color: aliceblue;
}
.van-nav-bar .van-nav-bar__title {
    max-width: 90%;
    padding-left: 10%;
}
/*tag标签 */
 .van-nav-bar__text{
  color: #123;
}
/*center */
.center{
  padding: 5px 5%;
}
.center .van-tag{
  margin-right: 7px;
}
.van-dialog__confirm, .van-dialog__confirm:active {
  color:#fc9086 ;
}
</style>