<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="pushtop">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/user', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>修改密码</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 登录/注册 -->
    <div class="el_forget_window">
      <div class="el_title_box">
        <strong class="el_title">修改密码</strong>
      </div>
      <div class="el_phone_input_box">
        <input class="el_phone" maxlength="11" id="phone" placeholder="输入手机号" type="text" name="el_phone" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
      </div>
      <div class="el_code_input_box">
        <input class="el_code" id="code" placeholder="验证码" type="text" name="el_code" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        <a class="el_get_code" href="#">获取验证码</a>
      </div>
      <div class="el_pw_input_box">
        <input class="el_password" id="password" placeholder="输入新密码" type="text" name="el_password" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
      </div>
      <div class="el_true_go_box">
        <a v-link="{path: '/login', replace: true}" class="el_login_go">确定</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
body,ul{
  margin: 0;
  padding: 0;
}
ul,a,p{
  margin: 0;
  padding: 0;
  list-style: none;
}
.el_head{
  width: 100%;
  height: 2.5rem;
  background-color: #282828;
  overflow: hidden;
}
.el_return_btn{
  display: block;
  width:10%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
  display: block;
  margin:0.85rem auto;
}
.el_head strong{
  width: 80%;
  text-align: center;
  display: block;
  line-height: 2.5rem;
  float: left;
  color: white;
}
.el_placeholder{
  width: 10%;
  height: 2.5rem;
  float: left;
}
.el_forget_window{
  width: 90%;
  margin: 1rem 5%;
  background-color: white;
  overflow: hidden;
}
.el_title_box{
  width: 100%;
  height: 2.5rem;
  background-color: white;
}
.el_title_box strong{
  width: 100%;
  display: block;
  line-height: 2.5rem;
  text-align: center;
  float: left;
  font-size: 0.7rem;
}

.el_phone_input_box,.el_pw_input_box,.el_true_go_box,.el_code_input_box{
  width: 100%;
  background-color: white;
  height: 3.45rem;
  border-top: 0.05rem solid #f0f0f0;
}
.el_phone,.el_password{
  padding-left: 0.5rem;
  font-size: 0.7rem;
  width: 94%;
  border: none;
  background-color: #f5f5f5;
  height: 2.5rem;
  margin: 0.475rem 3%;
  border-radius: 0;
}
.el_login_go{
  font-size: 0.7rem;
  width: 94%;
  background-color: #1a6be4;
  margin: 0.475rem 3%;
  display: block;
  color: white;
  text-align: center;
  line-height: 2.5rem;
}
.el_code{
  padding-left: 0.5rem;
  font-size: 0.7rem;
  width: 64%;
  border: none;
  background-color: #f5f5f5;
  height: 2.5rem;
  margin-top: 0.475rem;
  margin-left: 3%;
  border-radius: 0;
  float: left;
}
.el_get_code{
  margin-top: 0.475rem;
  text-align: center;
  width: 30%;
  line-height: 2.4rem;
  display: block;
  float: left;
  font-size: 0.6rem;
  border:0.05rem solid #f5f5f5;
}

</style>
