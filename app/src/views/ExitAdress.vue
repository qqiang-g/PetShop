<template>
  <div class="scort">
    
 <van-nav-bar
      title="添加地址"
      left-arrow
      right-text="我的"
      @click-right="()=>this.$router.push('/my')"
      @click-left="()=>this.$router.back()"
    />


<van-address-edit
  :area-list="areaList"
  :address-info='init'
  show-postal
  show-delete
  show-search-result
  :areaCode='110101'
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
/>





  </div>
</template>
<script>
import toole from '../tools/index.js'
export default {
  
  data() {
    return {
      areaList:{ },
      searchResult: [],
      init:{
        
      }
    }
  },
  created(){
    if(this.$route.params.data){
      this.init = this.$route.params.data
    }
    this.areaList= toole.getAdress()
    this.user =JSON.parse(window.localStorage.getItem('user'))
  },
  methods: {
    onSave(item) {
      console.log(item)
      if(!this.init._id){
        this.$ajax.post('adress/add',{
          ...item,
          user_id:this.user._id
        }).then((requit)=>{
          if(requit.data.code==1) {
            this.Toast.success('添加成功');
            this.$router.push('/adress')
          }
        })
      }else{
        this.$ajax.post('adress/updata',{
          ...item,
          user_id:this.user._id
        }).then((requit)=>{
          if(requit.data.code==1) {
            this.Toast.success('修改成功');
            this.$router.push('/adress')
          }
        })
      }  
      
    },
    onDelete() {
      if(this.init._id)
      this.$ajax.post('adress/delect',{
        _id:this.init._id
      }).then((requit)=>{
        if(requit.data.code == 1){
          this.Toast.success('删除成功');
          this.$router.back()  
        }
      })
      
    },
  }
}
</script>
