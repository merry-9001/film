<template>
  <div class="register_body">
    <div>
      用户名：
      <input v-model="username" class="register_text" type="text" />
    </div>
    <div>
      密码：
      <input v-model="password" class="register_text" type="password" />
    </div>
    <div>
      确认密码：
      <input class="register_text" type="password" />
    </div>
    <div class="register_btn">
      <button @touchstart="handleToRegister">注册</button>
    </div>
    <div class="register_link">
      <router-link to="/mine/login">立即登录</router-link>
    </div>
  </div>
</template>
<script>
import { messageBox } from '@/components/JS';
export default {
  name: "reg",
  data(){
      return{
          username:'',
          password:''
      }
  },
  methods:{
      
      handleToRegister(){
      var params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);
          this.axios.post('/api/FilmRegister.php',params).then((res)=>{
              console.log(res);
              var stauts=res.data.stauts;
              console.log(stauts);
              var that=this;
                if(stauts === "0"){
                    messageBox({
                        title : '注册',
                        content : '用户注册成功',
                        ok : '确定',
                        handleOk(){
                            that.$router.push('/mine/login');
                        }
                    });
                }
                else{
                     messageBox({
                        title : '注册',
                        content : res.data.msg + ', 请重新注册',
                        ok : '确定'
                    });
                }
          })
      }
  }
};
</script>
<style scoped>
#content .register_body {
  width: 100%;
}
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_email {
  position: relative;
}
.register_body .register_email button {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  border-radius: 3px;
  border: none;
  padding: 5px;
}
.register_body .register_btn button {
  width: 100%;
  height: 100%;
  background: #43b5f7;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.register_body .register_link {
  display: flex;
  justify-content: space-between;
}
.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #43b5f7;
}
</style>