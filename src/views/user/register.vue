<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="pushtop">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <div class="el_return_btn"></div>
      <!-- <a class="el_return_btn" v-link="{path: '/login', replace: true}">
        <img src="/img/11/return.png">
      </a> -->
      <strong>注册</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 登录/注册 -->
    <div class="el_forget_window">
      <div class="el_title_box">
        <strong class="el_title">注册</strong>
      </div>
      <div class="el_sign_up_box">
        <div class="el_phone_input_box">
          <input class="el_phone" maxlength="11" id="phone" placeholder="输入手机号" type="text" name="el_phone" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_code_input_box">
          <input class="el_code" id="code" placeholder="支付宝账号" type="text" name="el_code" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_code_input_box">
          <input class="el_code" id="code" placeholder="姓名（需与支付宝一致）" type="text" name="el_code" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_pw_input_box">
          <input class="el_password" id="password" placeholder="输入密码" type="text" name="el_password" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="el_login_go_box">
          <a v-link="{path: '/login', replace: true}" class="el_login_go">注册</a>
        </div>
      </div>
    </div>
  </div>

    <!-- 弹出窗口 -->
    <div class="el_eject_window_box"
      :class="this.showTabs===2?'el_eject_window_box':'hide'"
      :class="this.showTabs===3?'el_eject_window_box':'hide'">
      <div class="el_eject_window">
        <div class="el_confirm_info">
          <span class="el_confirm_info_up">恭喜您，修改成功</span>
        </div>
        <div class="el_button">
          <span class="el_button_left"
            @click="this.showTabs = 3"
          >取消</span>
          <span class="el_button_right" v-link="{path: '/login', replace: true}">确定</span>
        </div>
      </div>
    </div>
  </template>

  <script>
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
    },
    data () {
      return {
        showTabs: 1
      }
    },
    methods: {
    }
  }
  </script>
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
  margin: 0.5rem 5%;
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
  width: 94%;
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
.el_eject_window_box{
  display: block;
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top:0;
  background-image: url(/img/11/el_black_bg.png);
}
.el_eject_window{
  width: 80%;
  background-color: white;
  height: 7.5rem;
  margin: 50% 10%;
}
.el_confirm_info{
  width:100%;
  height:5rem;
  border-bottom:solid 0.05rem #f0f0f0;
  overflow: hidden;
}
.el_confirm_info_up,.el_confirm_info_lower{
  text-align: center;
  line-height:1.5rem;
  display: block;
}
.el_confirm_info_up{
  font-size: 0.8rem;
  margin-top: 1.8rem;
}
.el_confirm_info_lower{
  font-size: 0.6rem;
}
.el_button{
  width:100%;
  height:2.5rem;
  overflow: hidden;
}
.el_button_left,.el_button_right{
  width: 50%;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.7rem;
  display: block;
  float: left;
}
.el_button_left{
  border-right: 0.05rem #f0f0f0 solid;
}
.el_login_go_box{
  border-top: 0.05rem solid #f0f0f0;
}
.hide{
  display: none;
}
</style>
