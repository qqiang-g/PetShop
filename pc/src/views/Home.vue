<template>
  <div id="home">
    <div></div>
    <el-container class="home_container">
      <!-- 顶部 -->
      <!-- <el-header>
        <div>
          <span>xxx后台管理系统</span>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item divided command="exit">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header> -->

      <el-container>
        <el-aside :width="'200px'">
          <div class="dis-menu" >管理平台</div>
          <el-menu
          @select="select"
            :default-active="action"
            class="el-menu-vertical-demo"
            background-color="#123"
            router
            text-color="#fff"
            active-text-color="#fff">
            <span v-for="(item,index) in menuList" :key="index">
                <el-menu-item v-if="!item.children" :index="item.index">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.title}}</span>
                </el-menu-item>
                <el-submenu  v-if="item.children" :index="item.index">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item-group v-for="(items,index) in item.children" :key='index'>
                    <el-menu-item :index="items.index">
                      <i :class="items.icon"></i>
                      <span slot="title">{{items.title}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
            </span>
            <!-- <el-menu-item index="/product">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/order" >
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-setting"></i>
              <span slot="title">用户管理</span>
            </el-menu-item> -->

            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">品类管理</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->

          </el-menu>
        </el-aside>
        <el-main class="right">
          <div class="right-head" >
            <div class="right-head-top">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  Admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item divided command="exit" >修改密码</el-dropdown-item>
                  <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="right-head-bottom">
              <div class="right-head-bottom-left">{{title}}</div>
              <div class="right-head-bottom-right" >{{time}}</div>
            </div>
          </div>
          <div style="margin:0 10px;">
            <router-view></router-view>
          </div>
          
        </el-main>
      </el-container>
    </el-container>
<!-- 修改密码 -->
<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="现在密码" :label-width="'100px'">
      <el-input type="password" v-model="form.old" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="修改密码" :label-width="'100px'">
      <el-input type="password" v-model="form.new" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="ok">确 定</el-button>
  </div>
</el-dialog>


  </div>
</template> 
<script>
export default {
  data() {
    return {
      dialogFormVisible:false,
      form:{
        new:'',
        old:''
      },
      menuList:[
        {
          title:'商品',
          index:'food',
          icon:'el-icon-s-goods',
          children:[
              {
              title:'品类管理',
              index:'/category',
              router:'product',
              icon:'el-icon-s-grid',
              },
              {
              title:'商品管理',
              index:'/product',
              icon:'el-icon-s-data',
              }  
          ]
        },
        {
          title:'订单管理',
          index:'/order',
          icon:'el-icon-s-order',
        },
          {
          title:'用户管理',
          index:'/user',
          icon:'el-icon-s-custom',
        }, 
      ],
      time:'123',
      activeName: "",
      action:'',
      title:''
    };
  },
  created() {
    this.action = this.$router.history.current.path
    
    setInterval(() => {
      this.time =`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    }, 1000);
    if(window.localStorage.getItem('user')){
      this.user =JSON.parse(window.localStorage.getItem('user'))
    }else this.$router.push('/')
    this.activeTab()
  },
  methods: {
    //账户操作
    handleCommand(command) {
        this[command]()
    },
    //退出登录
    logout() {
      this.$msgbox
        .confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/");
          window.localStorage.removeItem('user')
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 1000
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出登录",
            duration: 500
          });
        });
    },
    //修改密码
    exit(){
        this.dialogFormVisible=true
    },
    //提交修改密码
    async ok(){
      console.log(this.user)
      if(this.form.old !=this.user.password) return this.$message('原密码错误')
      if(this.form.old ==this.form.new) return this.$message('两次密码一样')
      const requit = await this.$ajax.post('admin/updata',{
        _id:this.user._id,
        password:this.form.new
      })
      if(requit.data.code==1){
        this.$message.success('修改成功，请重新登录')
        window.localStorage.removeItem('user')
        this.$router.replace('/login')
      }
    },
    //选中
    select(index){
      this.map(this.menuList,index)
    },
    //菜单页面折叠的打开收起
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    activeTab(path) {
      this.activeName = "/" + path;
      this.map(this.menuList,this.action)
    },
    map(list,action){
      console.log(action)
      list.map(item=>{
        if(item.index==action) return this.title=item.title
        if(item.children) this.map(item.children,action)
      })
    }
  }
};
</script>

<style  scoped>
#home {
  height: 100%;
}
.home_container {
  height: 100%;
}
.el-header {
  background-color: #112233b2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 25px;
}
.dis-menu {
  color: #fff;
  font-size: 23px;
  text-align: center;
  background: #456;
  height: 80px;
  line-height: 80px;
  cursor:pointer
}
.el-menu-item, .el-submenu__title{
  text-align: left !important;
}
.el-menu-item.is-active {
    background: #1DA57A !important;
}
.el-aside {
  overflow: hidden;
  background-color: #162a3d;
}
.el-menu {
  border: none;
}



/*右侧 */
.right{
  padding: 0;
  background: #e7e7e7;
}
.right-head{
  height: 80px;
  background: #fff;
  color: #000;
  margin-bottom: 20px;
}
.right-head-top{
  width: 100%;
  height: 39px;
  line-height: 39px;
  text-align: right;
  border-bottom: #1DA57A solid 1px;
}
.el-dropdown {
  margin-right: 30px;
  color:#1DA57A;
}
.right-head-bottom{
  width: 100%;
  height: 40px;
  text-align: center;
}
.right-head-bottom-left{
  height: 40px;
  line-height: 40px;
  width: 50%;
  float: left;
  text-align: center;position: relative;
}
.right-head-bottom-right{
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: right;
  font-size: 15px;
  text-align: right;
  padding-right: 30px;
  box-sizing: border-box;
}
.right-head-bottom-left::before{
  content: ' ';
  left: 50%;
  top: 100%;
  position: absolute;
  transform: translate(-50%);
  border-top: 20px solid #fff;
  border-bottom: 20px solid #1da57a00;
  border-left: 20px solid #1DA57A00;
  border-right: 20px solid #1DA57A00;
}
</style>