<template>
  <div class="scort">
      <div class="bbb" v-for="(item,index) in data" :key="index" :border='false' @click="goProduct(item.name)">
        <div class='aaa' slot="default">{{item.name}}</div>
      </div>
  </div>
</template>
<script>
export default {
  name:'scort',
  data(){
    return{
        data:[]
    }
  },
  created(){
    this.getlist()
  },
  methods:{
    async getlist(){
      const requit = await this.$ajax.get('category/list')
      if(requit.data.code == 1){
        this.data = requit.data.data
      }
    },
    //跳转分类
    goProduct(product){
      if(product=='更多') product = ''
      this.$router.push({name:'Product',params:{
        category:product
      }})
    },
  }
}
</script>
<style scoped>
.bbb{
  box-sizing: border-box;
  width: 21%;
  display: inline-block;
  padding: 10px 10px;
  color: #fff;
  background: #d68a34;
  border-radius: 5px;
  text-align: center;
  margin: 10px 2%;
}


</style>
