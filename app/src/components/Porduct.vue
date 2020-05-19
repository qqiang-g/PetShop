<template>
  <div class="product">
    <img src="" alt="">
  </div>
</template>

<script>
export default {
  name: 'Product',
  created(){
    // this.img = this.$props.img
    // this.title = this.$props.title
    // this.price = this.$props.price
    console.log(this.$props)
  },
  props: ['img','title','price'],
  props:{
    img:{                        //父组件绑定的属性名
      type:String ,                //值的类型
      required:true                //是否符合规定
    },
    title:{                        //父组件绑定的属性名
      type:String ,                //值的类型
      required:true                //是否符合规定
    },
    price:{                        //父组件绑定的属性名
      type:String ,                //值的类型
      required:true                //是否符合规定
    }
  },
  data() {
    return {
      img:'',
      title:'',
      price:''
    }
  }
}
</script>
<style scoped>

</style>
