<template>
  <div class="login_body">
    <div>
      <input  v-model="username" class="login_text" type="text" placeholder="账户名/手机号/Email" />
    </div>
    <div>
      <input v-model="password" class="login_text" type="password" placeholder="请输入您的密码" />
    </div>
    <div class="login_btn">
      <input type="submit" value="登录" @touchstart="handleToLogin"/>
    </div>
    <div class="login_link">
      <router-link  to="/mine/register" href="#">立即注册</router-link>
    </div>
  </div>
</template>
<script>
import {messageBox} from '@/components/JS';
import { constants } from 'crypto';
export default {
  name:'Login',
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods:{
    handleToLogin(){
      var params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);
      this.axios.post('/api/FilmLogin.php',params).then((res)=>
      {
        console.log(res);
        var stauts=res.data.stauts;
        var that=this;
        if(stauts==="0")
        {
          messageBox({
            title:'登录',
            content:"登录成功",
            ok:"确定",
            handleOk(){
                that.$router.push('/mine/center');
            }
          })
        }
        else
        {
          messageBox({
            title:'登录',
            content:"登录失败",
            ok:"确定"
          })
        }
      })
    }
  }
};
</script>
<style scoped>
#content .login_body {
  width: 100%;
}
.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.login_body .login_btn {
  height: 50px;
  margin: 10px;
}
.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #43b5f7;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.login_body .login_link {
  display: flex;
  justify-content: space-between;
}
.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #43b5f7;
}
</style>