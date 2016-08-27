<template>
  <div class="content">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a href="#"><img src="/img/11/return.png"></a>
      <strong>登录</strong>
    </div>

    <!-- 登录/注册 -->
    <div class="el_login_box">
      <div class="el_choice_btn">
        <strong class="el_login_btn el_click_blue">登录</strong>
        <strong class="el_sign_up_btn">注册</strong>
      </div>
      <div>
        <div class="el_phone_input_box">
          <input class="el_phone" placeholder="输入手机号" type="text" name="el_phone" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_pw_input_box">
          <input class="el_password" placeholder="输入密码" type="text" name="el_password" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_login_go_box">
          <a href="" class="el_login_go">登录</a>
        </div>
      </div>
    </div>


  </div>
</template>

<style>
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
  background-color: #1a6be4;
  position: relative;
}
.el_head strong{
  display: block;
  color: #fff;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
}
.el_head img{
  display: block;
  height: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.85rem;
}
.el_login_box{
  width: 90%;
  margin: 1rem 5%;
  background-color: white;
  overflow: hidden;
}
.el_choice_btn{
  width: 100%;
  height: 2.5rem;
  background-color: white;
}
.el_choice_btn strong{
  width: 50%;
  display: block;
  line-height: 2.5rem;
  text-align: center;
  float: left;
  font-size: 0.7rem;
}
.el_login_btn{
  border-right: 0.05rem #f0f0f0 solid;
}
.el_click_blue{
  color: #1a6be4;
}
.el_phone_input_box,.el_pw_input_box,.el_login_go_box{
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



</style>
