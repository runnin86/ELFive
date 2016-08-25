<template>
<div class="content findPwd" transition="bounce" style="background:#fff;">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
      <span class="icon icon-left"></span>
    </a>
    <button @click="complete()"
      style="margin-right:0.1rem;font-size:0.78rem;color:#2F0000;"
      class="button button-link button-nav pull-right">
      完成
    </button>
    <h1 class="title color">找回密码</h1>
  </header>
  <div class="list-block" style="margin-top:2.2rem;font-size:0.72rem;">
    <ul>
      <li class="item-content"
        v-link="{ path: '/user/bill', query: { pageTransition: 'bounce' }, replace: false}">
        <div class="item-inner-fwd" style="color:red;">
          请设置您的新密码。密码请设置为6位以上的字母、数字、符号，尽量为三者组合，以保障您的账号安全。
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-name"></i></div>
          <div class="item-inner-fwd" style="margin-top:.6rem;">
            <div class="item-title label" style="margin-right:-1.6rem;">
              注册手机号
            </div>
            <div class="item-input">
              <input v-model="userPhone" type="tel" placeholder="填写手机号">
            </div>
            <div class="item-after">
              <a :class="userPhone?'':'disabled'" class="button button-light"
                @click="getVerificationCode()">
                获取验证码
              </a>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-email"></i></div>
          <div class="item-inner-fwd" style="margin-bottom:1rem;">
            <div class="item-title label" style="margin-right:-1.6rem;">
              验证码
            </div>
            <div class="item-input">
              <input v-model="vCode" type="tel" placeholder="填写验证码">
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="item-content">
          <div class="item-media"><i class="icon icon-form-password"></i></div>
          <div class="item-inner-fwd" style="margin-top:.6rem;">
            <div class="item-title label" style="margin-right:-1.6rem;">
              密码
            </div>
            <div class="item-input">
              <input v-model="password" type="password" placeholder="填写密码" class="">
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {userApi} from '../../util/service'
import $ from 'zepto'

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
  },
  data () {
    return {
      userPhone: window.localStorage.getItem('localPhone'),
      vCode: '',
      password: ''
    }
  },
  methods: {
    getVerificationCode () {
      if (this.userPhone) {
        // 获取验证码
        this.$http.post(userApi.getVCode, {
          'phone': this.userPhone,
          'type': 'forgetpwd'
        })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            $.toast('验证码已发送至' + this.userPhone + ',请注意查收!')
          }
          else {
            $.toast('验证码发送失败,请联系客服人员!')
          }
        }).catch((e)=>{
          console.error('获取验证码失败:' + e)
        })
      }
    },
    complete () {
      if (!this.userPhone) {
        $.toast('请填写注册手机号!')
        return
      }
      if (!this.vCode) {
        $.toast('请填写验证码!')
        return
      }
      if (!this.password) {
        $.toast('请填写密码!')
        return
      }
      // 发送忘记密码请求
      this.$http.post(userApi.forgetPwd, {
        'phone': this.userPhone,
        'password': this.password,
        'code': this.vCode,
        'submitType': 'forgetpwd'
      })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          $.toast('找回密码成功!')
          this.$root.back()
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('找回密码失败:' + e)
      })
    }
  }
}
</script>

<style>
.color {
  background-color: #ed8e07;
}
input[type="text"], input[type="password"], input[type="tel"] {
  font-size: 0.72rem !important;
}
.list-block .item-inner-fwd {
  padding-right: 0.75rem;
  position: relative;
  width: 100%;
  padding-top: 0.4rem;
  padding-bottom: 0.35rem;
  min-height: 2.2rem;
  overflow: hidden;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.list-block .item-input:after {
  content: '';
  position: absolute;
  left: 4.5rem;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
.list-block ul:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
</style>
