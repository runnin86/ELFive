<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <div class="content" transition="pushtop">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <div class="el_return_btn"></div>
      <!-- <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a> -->
      <strong>登录</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 登录/注册 -->
    <div class="el_login_window">
      <div class="el_choice_btn">
        <strong class="el_login_btn el_click_blue"
          @click="this.showTabs = 1"
          :class="this.showTabs===1?'el_click_blue':''">
          登录
        </strong>
        <strong class="el_sign_up_btn"
          @click="this.showTabs = 2"
          :class="this.showTabs===2?'el_click_blue':''">
          忘记密码
        </strong>
      </div>

      <!-- 登录盒子 -->
      <div class="el_login_box"
        :class="this.showTabs===1?'el_login_box':'hide'">
        <div class="el_phone_input_box">
          <input type="tel" v-model="userPhone" class="el_phone" placeholder="输入手机号">
        </div>
        <a class="clear" style="margin-left: 77%;"
          :style="{display: userPhone?'block':'none'}"
          @click="this.userPhone=null"></a>
        <div class="el_pw_input_box">
          <input type="password" v-model="password" class="el_password" placeholder="输入密码">
        </div>
        <a class="clear" style="margin-left: 77%;"
          :style="{display: password?'block':'none'}"
          @click="this.password=null"></a>
        <div class="el_login_go_box">
          <a @click="login()" class="el_login_go"
            :style="{backgroundColor: (loginSubmit ? '#42c1b1' : '#c8c9cb')}">
            登录
          </a>
        </div>
      </div>

      <!-- 忘记密码盒子 -->
      <div class="el_sign_up_box"
        :class="this.showTabs===2?'el_sign_up_box':'hide'">
        <div class="el_phone_input_box">
          <input type="tel" v-model="forgetPhone" class="el_phone" placeholder="输入手机号">
        </div>
        <a class="clear" style="margin-left: 77%;"
          :style="{display: forgetPhone?'block':'none'}"
          @click="this.forgetPhone=null"></a>
        <div class="el_code_input_box">
          <input type="tel" v-model="vCode" class="el_code" placeholder="验证码">
          <a class="el_get_code" @click="getVerificationCode()"
            :style="{backgroundColor: (forgetPhone&&countDown===0 ? '#42c1b1' : 'white')}">
            获取验证码{{countDown>0?'('+countDown+')':''}}
          </a>
        </div>
        <a class="clear" style="margin-left: 50%;"
          :style="{display: vCode?'block':'none'}"
          @click="this.vCode=null"></a>
        <div class="el_pw_input_box">
          <input type="password" v-model="newPwd" class="el_password" placeholder="输入新密码">
        </div>
        <a class="clear" style="margin-left: 77%;"
          :style="{display: newPwd?'block':'none'}"
          @click="this.newPwd=null"></a>
        <div class="el_login_go_box">
          <a @click="forgetPwd()" class="el_login_go"
            :style="{backgroundColor: (forgetSubmit ? '#42c1b1' : '#c8c9cb')}">
            确定
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import {api} from '../../util/service'

var vCodeCountDown
export default {
  ready () {
  },
  data () {
    return {
      showTabs: 1,
      userPhone: window.localStorage.getItem('localPhone') ? window.localStorage.getItem('localPhone') : '',
      password: '',
      loginSubmit: false,
      forgetSubmit: false,
      forgetPhone: null,
      vCode: null,
      countDown: 0,
      newPwd: null,
      code: this.$route.query.code,
      state: this.$route.query.state
    }
  },
  methods: {
    /*
     * 登录
     */
    login () {
      window.localStorage.setItem('localPhone', this.userPhone)
      if (!this.userPhone || !this.password) {
        $.toast('请输入手机号或密码')
        return
      }
      $.showIndicator()
      let spcarInfos = {
        'uphone': this.userPhone,
        'upass': this.password,
        'code': this.code ? this.code : '123'
      }
      // let postBody = JSON.stringify(spcarInfos)
      this.$http.post(api.login, spcarInfos, {
        emulateJSON: true
      })
      .then(({data: {code, msg, data}})=>{
        if (code === 1) {
          if (data) {
            if (data.user.userStatus === 0) {
              $.toast('账户禁用')
            }
            else if (data.user.userStatus === 1) {
              window.localStorage.setItem('elUser', JSON.stringify(data.user))
              window.localStorage.setItem('elToken', data.token)
              window.localStorage.setItem('elOpenid', data.openid)
              this.$route.router.go({path: '/home', replace: true})
            }
          }
        }
        $.toast(msg)
      }).catch((e)=>{
        $.alert('服务器连接中断...')
        console.error('无法连接服务器:' + e)
      }).finally(()=>{
        $.hideIndicator()
      })
    },
    /*
     * 忘记密码->获取验证码
     */
    getVerificationCode () {
      if (this.forgetPhone) {
        if (this.countDown === 0) {
          // 获取验证码
          this.$http.post(api.getCheckCode, {
            'uphone': this.forgetPhone
          })
          .then(({data: {code, msg}})=>{
            if (code === 1) {
              $.toast('验证码已发送至' + this.forgetPhone + ',请注意查收!')
              // 显示倒计时
              this.countDown = 60
              window.clearInterval(vCodeCountDown)
              vCodeCountDown = setInterval(() => {
                if (this.countDown > 0) {
                  this.countDown--
                }
                else {
                  this.countDown = 0
                }
              }, 1000)
            }
            else {
              $.toast(msg)
            }
          }).catch((e)=>{
            console.error('获取验证码失败:' + e)
          })
        }
        else {
          $.toast('请' + this.countDown + '秒后再次获取验证码!')
        }
      }
      else {
        $.toast('请输入手机号码')
      }
    },
    forgetPwd () {
      if (!this.forgetPhone) {
        $.toast('请填写手机号!')
        return
      }
      if (!this.vCode) {
        $.toast('请填写验证码!')
        return
      }
      if (!this.newPwd) {
        $.toast('请填写新密码!')
        return
      }
      // 发送忘记密码请求
      this.$http.post(api.findPwd, {
        'uphone': this.forgetPhone,
        'npass': this.newPwd,
        'phoneCheckCode': this.vCode
      })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          this.forgetPhone = null
          this.newPwd = null
          this.vCode = null
          this.showTabs = 1
        }
        $.toast(msg)
      }).catch((e)=>{
        console.error('找回密码失败:' + e)
      })
    }
  },
  watch: {
    'userPhone,password': {
      handler: function (newVal, oldVal) {
        this.loginSubmit = this.userPhone && this.password
      }
    },
    'forgetPhone,vCode,newPwd': {
      handler: function (newVal, oldVal) {
        this.forgetSubmit = this.forgetPhone && this.vCode && this.newPwd
      }
    }
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
  background-color: #42c1b1;
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
  margin:0.7rem auto;
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
.el_login_window{
  width: 90%;
  margin: 0.5rem 5%;
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
  color: #42c1b1;
}
.el_phone_input_box,.el_pw_input_box,.el_login_go_box,.el_code_input_box{
  width: 100%;
  background-color: white;
  height: 3.45rem;
  border-top: 0.05rem solid #f0f0f0;
  position: relative;
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
.forget_box{
  width: 100%;
  height: 2.5rem;
  display: block;
  position: absolute;
  bottom: 0;
}
.forget_box a{
  line-height: 2.5rem;
  text-align: center;
  display: block;
  font-size: 0.7rem;
}
.hide{
  display: none;
}
.clear{
  background:no-repeat center center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAflBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCtoPsAAAAKnRSTlMAAQIDBAUHCQoLDA0ODxASGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjOWCMFEAAABUklEQVR4Xo3U4W6CMBSG4a8dcyo4FUVAHCpa4bv/G1xiOJm1B9j7+0lz0rQHfibZlFeSzbnYriyGm2cPvtTmMfS+KgbVSwWatKPWIRgjOnGgy8yXXzcO5mJPPjhS9w0JUcPR2oVI88OJblFPUwH3YEyxeX/xckuFLXx5tLnY5EmPIg1M4UkDI/b8PLSXjQHEigSsDLUCkLEvhdg/aUr2lYB1DKwi2UVYkoFVJLnGhpqtAsk9SipWkaxxpWIVSQdHxSqSRMfAipyklZF7eAtOkbrFVZHquQ6lL+1zzlSxNTaKJBW7x1KTml3DulBqtouALJCqLV+e9l2kZ72njUpWjhEp9uXUi/8ND1ak2F7KocBu8HM3Igt5RPW/Vwai+/Qikubt9HqTFmNLM4HX5+C8zQxv2V2nyvwDYbMihNUceovMu4pHHmOkeFudHdmeT2lifPALZUK7MQNh4w4AAAAASUVORK5CYII=);
  background-size: 15px 15px;
  width:40px;
  height:40px;
  position: absolute;
  margin-top: -2.74rem;
  margin-right: 0.2rem;
  margin-bottom: 0;
  /*margin: -2.76rem 0.2rem 0 86%;*/
  /*display: none;*/
}
</style>
