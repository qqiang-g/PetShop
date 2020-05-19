<template>

  <div class="scort">
      <van-nav-bar
      title="收货地址"
      left-arrow
      right-text="我的"
      @click-right="()=>this.$router.push('/my')"
      @click-left="()=>this.$router.back()"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select='select'
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenAddressId: '0',
      list: [],
      user:'1',
      oldlist:[],
    }
  },
  created(){
    this.user =JSON.parse(window.localStorage.getItem('user'))
    this.chosenAddressId = this.user.adressid
    this.getlist()
  },
  methods: {
    onAdd() {
      this.$router.push('/exitadress')
    },
    onEdit(item, index) {
      console.log(this.oldlist[index])
      this.$router.push({name:'ExitAdtess',params:{data:this.oldlist[index]}})
    },
    async getlist(){
      const requit =await this.$ajax.get('/adress/list',{
        params:{
          user_id:this.user._id
        }
      })
      if(requit.data.code == 1){
        this.list = []
        this.oldlist =requit.data.data
        console.log(requit)
        requit.data.data.map((item,index)=>{
          this.list.push({
            id:item._id,
            name:item.name,
            tel:item.tel,
            address:item.province+'-'+item.city+'-'+item.county+'-'+item.addressDetail
          })
        })
      }
    },
    select(item,index){
      this.$ajax.post('user/updata',{
        _id:this.user._id,
        adressid:item.id
      }).then((data)=>{
        this.user.adressid = item.id
        console.log(this.user)
        window.localStorage.setItem('user',JSON.stringify(this.user))
        window.localStorage.setItem('adress',JSON.stringify(this.oldlist[index]))
      })

    }

  }  
}
</script>
