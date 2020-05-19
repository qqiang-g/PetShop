<template >
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="search">
                <el-input v-model="search" placeholder="请输入商品名称" class="search-input"></el-input>
                <el-button type="primary"  @click="getsearch">查询</el-button>
            </div>
            <el-button style="float: right; " type="primary" plain icon="el-icon-plus" @click="toAdd()">添加商品</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="商品名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            width="180">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="描述">
            </el-table-column>
            <el-table-column
            label="操作"
            prop="_id"
            width="180"
            >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="toAdd(scope.row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delect(scope.row._id)">删除</el-button>
            </template>  
            </el-table-column>

        </el-table>
        
        <el-pagination
            background
            :current-page.sync="page"
            :pager-count="7"
            hide-on-single-page
            :page-size='pageSize'
            layout="prev, pager, next"
            @current-change='getList'
            :total="total">
        </el-pagination>

</el-card>
</template>
<script>
export default {
    
    data() {
      return {
        page:1,
        pageSize:8,
        total:0,
        tableData: [],
        search:''
      }
    },
    created(){
      this.getList()
    },
    methods: {
      //获取数据
      async getList(){
        const requit = await this.$ajax.get('/product/list',{
          params:{
            page:this.page,
            pageSize:this.pageSize,
            search:this.search
          }
        })
        if(requit.data.code==1){
          this.total = requit.data.total
          this.tableData = requit.data.data
        }
        else{
          this.$message.error(requit.data.msg)
        }
      },
      //添加
      toAdd(row){
        this.$router.push({
          name:'ProductAdd',
          params:{
            row
          }
        })
      },
      //删除
      delect(_id){
          this.$msgbox({
            title:'删除',
            message:'确定删除该数据？',
            type:'error',
            showCancelButton:true,
          })
          .then(async (data)=>{
            const reqult = await this.$ajax.post('product/delect',{_id})
            if(reqult.data.code ==1) this.getList()
            else this.$message.error(reqult.data.msg)
          }).catch((err)=>{
            console.log(err)
          })
      },
      //搜索
      getsearch(){
        if(this.search)this.getList()
      }
    }
}
</script>
<style scoped>
box-card{
    margin: 0 20px;
}
.search{
    display: inline-block;
}
.search-input
{width: 200px;
    display: inline-block;
}
</style>