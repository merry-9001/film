<template>
  <div>
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="isAdmin" label="是否管理员" ></el-table-column>
      <el-table-column prop="src" label="头像" >
          <template slot-scope="scope">
              <img :src="scope.row.src" class="head">
              </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" ></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="small" @click="handleToFreeze(scope.$index,scope.row)">{{scope.row.freeze==0?'冻结':'未冻结'}}</el-button>
        <el-button size="small" @click="handleToDelete(scope.$index,scope.row)" >删除</el-button>
      </template>

      </el-table-column>
    </el-table>
    <el-pagination
  background class="page"
  :page-size="pageSize"
  :current-page.sync="currentPage"
  layout="prev, pager, next"
  :total="tableData.length">
</el-pagination>
  </div>
</template>
<script>
export default {
    name:'users',
    data(){
        return{
            tableData:[],
            currentPage:1,
            pageSize:3
        }
    },
    mounted(){
        this.axios.get('/api/FilmSelectUser.php').then((res)=>{
            console.log(res);
            var msg=res.data.msg;
            // console.log(msg);
            if(msg==='ok'){
                this.tableData=res.data.data.users;
            }
        })
    },
    computed:{
        nowTableData(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.pageSize*this.currentPage)||[]
        }
    }
    ,
    methods:{
        handleToFreeze(index,row)
        {
            var f=1;
            console.log(index,row);
            if(row.freeze==1)
            {
                f=0;
            }
            
            var params = new URLSearchParams();
            params.append('username', row.username);
            params.append('updateState', f);
            this.axios.post('/api/FilmModifyFreeze.php',params).then((res)=>{
                console.log(res);
                var state=res.data.msg;
                if(state==='ok')
                {
                   this.$alert('成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData[index].freeze=f;
                        }
                   })
                }
                else
                {
                   this.$alert('失败', '信息', {
                        confirmButtonText: '确定'
                       
                   })
                }
            })
        },
        handleToDelete(index,row){
            var params = new URLSearchParams();
            params.append('username', row.username);
            
            this.axios.post('/api/FilmUserDelete.php',params).then((res)=>{
                var state=res.data.stauts;
                console.log(res);
                if(state==='成功')
                {
                   this.$alert('成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData.splice(index,1);
                        }
                   })  
                }
                else
                {
                   this.$alert('失败', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            
                        }
                   })                  
                }
            })
        }
    }
};
</script>
<style scoped>
.page{
    margin-top:20px;
}
.head{
    width: 50px;
    height: 50px;
}
</style>