<template>
  <div>
    <div>个人中心</div>
    <div>
      当前用户：{{$store.state.user.name}}
      <a href="javascript:;" @touchstart="handleToLogout">退出</a>
    </div>
    <div v-if="$store.state.user.isAdmin==0">普通用户</div>
    <div v-else>
      管理员

       <router-link tag="a" to="/admin" target="_blank">
        <p>进入后台11</p>
      </router-link>
      <!-- <a href="/admin" target="_blank">进入后台</a> -->
    </div>
  <div>
    <input type="file" name="file" value="上传头像" @change="handleToUpload">
    <img :src="$store.state.user.userHead" class="head">
  </div>
  </div>
</template>
<script>
import axios from "axios";
import {messageBox} from '@/components/JS'
export default {
  name: "center",
  methods: {
    handleToLogout() {
      this.axios.get("/api/FilmLogout.php").then(res => {
        // console.log(res);
        var state = res.data.state;
        //  console.log(status);
        if (state === "0") {
          localStorage.removeItem("name");
          localStorage.removeItem("isAdmin");
          this.$store.commit("user/USER_NAME", { name: "", isAdmin: 0 ,userHead:''});
          this.$router.push("/mine/login");
        }
      });
    },
    handleToUpload(ev){
      var file=ev.target.files[0];
      var param =new FormData();
      param.append('file',file,file.name);
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };
      this.axios.post("/api/FilmUpload.php",param,config).then((res)=>{
        console.log(res);
        var msg=res.data.msg;
        console.log(msg);
        var that=this;
        if(msg==='ok')
          {
            messageBox({
              title:'信息',
              content:'上传信息成功',
              ok:'确定',
              handleOk(){
                that.$store.commit("user/USER_NAME", {
                  name: that.$store.state.user.name,
                  isAdmin: that.$store.state.user.isAdmin,
                  userHead:res.data.address+ '?' + Math.random()
                });
              }
            })
          }
          else{
            messageBox({
              title:'信息',
              content:'上传信息失败',
              ok:'确定',
            })
          }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.get("/api/FilmGetUser.php").then(res => {
      console.log(res);
      // console.log(res.data.data.isAdmin);
      var state = res.data.state;
      if (state === "0") {
        next(vm => {
          localStorage.setItem("name", res.data.session);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          vm.$store.commit("user/USER_NAME", {
            name: res.data.session,
            isAdmin: res.data.data.isAdmin,
            userHead:res.data.data.src
          });
        });
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>
<style scoped>
.head{
  width: 150px;
  height: 150px;
}
</style>