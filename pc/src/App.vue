<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html,body,#app{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    }
    #app{

        min-width: 1080px;
    }
    *{
        padding:0;
        margin: 0;
      }
      .el-table{
          margin-top: 15px;
          font-size: 13px;
      }
      .el-pagination{
          margin-top: 15px;
      }
      .el-container{
          height: 100%;
          width: 100%;
      }
      .el-main{
          height: 100%;
          width: 100%;
      }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
