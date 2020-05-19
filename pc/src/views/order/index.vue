<template >
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="search">
                <el-input v-model="search" placeholder="请输入查询内容" class="search-input"></el-input>
                <el-button type="primary"  @click="getsearch">查询</el-button>
            </div>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
            <el-table-column
              prop="username"
              label="账户"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="adname"
              label="姓名"
              width="90"
            >
            </el-table-column>
             <el-table-column
              prop="tel"
              label="电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="ad"
              label="地址"
            >
            </el-table-column>
            <el-table-column
              prop="productname"
              label="商品名称"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              width="70"
            >
            </el-table-column>
            <el-table-column
              prop="count"
              label="数量"
              width="70"
            >
            </el-table-column>
            <el-table-column
              label="订单状态"
              prop="_id"
              width="100"
            >
            <template slot-scope="scope">
                <el-tag v-if="scope.row.state" type="success">已完成</el-tag>
                <el-tag v-if="!scope.row.state"  type="warning">进行中</el-tag>
            </template>  
            </el-table-column>
            <el-table-column
            label="操作"
            prop="_id"
            width="180"
            >
            <template slot-scope="scope">
                <el-button 
                    :type="scope.row.state?'warning':'success'" 
                    :icon="scope.row.state?'el-icon-minus':'el-icon-check'" size="small" @click="state(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delect(scope.row._id)"></el-button>
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
        const requit = await this.$ajax.get('/order/list',{
          params:{
            page:this.page,
            pageSize:this.pageSize,
            search:this.search
          }
        })
        console.log(requit)
        if(requit.data.code==1){
          this.total = requit.data.total
          this.tableData = requit.data.data
          requit.data.data.map(item=>{
            const ad = JSON.parse(item.adress)
            item.adname = ad.name
            item.tel = ad.tel
            item.ad = ad.province+'-'+ad.city+'-'+ad.county+'-'+ad.addressDetail
          })
        }
        else{
          this.$message.error(requit.data.msg)
        }
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
            const reqult = await this.$ajax.post('order/delect',{_id})
            if(reqult.data.code ==1) this.getList()
            else this.$message.error(reqult.data.msg)
          }).catch((err)=>{
            console.log(err)
          })
      },
      //修改状态
      async state(form){
          form.state = !form.state
          const requit = await this.$ajax.post('order/updata',form)
          if(requit.data.code ==1)this.getList()
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