<template>
<div class="content login" transition="pushtop">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      @click="this.$root.back()">
    <!-- <a class="button button-link button-nav pull-left" v-link="{path: path, replace: true}"> -->
    <span class="icon"></span>
      取消
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="content-block">
    <div class="login-input">
      <input type="number" v-model="userName" placeholder="用户名">
      <input type="password" v-model="password" placeholder="密码">
    </div>
  </div>
  <div class="submit-button">
    <button class="button button-big button-fill"
      :class="submit?'button-fill':'disabled'"
      @click="login()">登录</button>
  </div>
  <div class="pull-right" style="font-size:0.68rem;margin:0.6rem;">
    <a @click="forgetPwd()">忘记密码?</a>
  </div>
</div>
</template>

<script>
import {userApi} from '../../util/service'
import $ from 'zepto'
export default {
  ready () {
  },
  data () {
    return {
      title: '登录',
      path: '/' + this.$route.query.from,
      userName: window.localStorage.getItem('localPhone') ? window.localStorage.getItem('localPhone') : '',
      password: '',
      submit: false
    }
  },
  methods: {
    login () {
      window.localStorage.setItem('localPhone', this.userName)
      // 登录时清空公告Id对象
      window.localStorage.removeItem('globalNoticeId')
      if (!this.userName || !this.password) {
        $.toast('请输入用户名或密码')
        return
      }
      this.$http.post(userApi.login,
        {
          'userName': this.userName,
          'password': this.password
        })
      .then(({data: {code, msg, info}})=>{
        if (code === 1) {
          if (info.user.user_status === 0) {
            $.toast('账户未激活，充值后激活账户')
          }
          else if (info.user.user_status === 1) {
            $.toast('登录成功')
            window.localStorage.setItem('user', JSON.stringify(info.user))
            window.localStorage.setItem('token', info.token)
            window.localStorage.setItem('imageSwitch', true)
            // 调用公告处理
            this.$root.loadNotice()
            this.$route.router.go({path: this.path, replace: true})
            // 设置购物车图标
            this.$root.setCardBadge()
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        $.alert('服务器连接中断...')
        console.error('无法连接服务器:' + e)
      })
    },
    forgetPwd () {
      this.$route.router.go({path: '/user/forgetPwd', replace: false})
    }
  },
  watch: {
    'userName': {
      handler: function (newVal, oldVal) {
        if (this.userName && this.password) {
          this.submit = true
        }
      }
    },
    'password': {
      handler: function (newVal, oldVal) {
        if (this.userName && this.password) {
          this.submit = true
        }
      }
    }
  }
}
</script>

<style>
.sub-title {
  margin-top: 2.2rem;
  background-color: white;
  height: 2.2rem;
  font-size: .8rem;
  font-weight: normal;
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 1px solid #d8d8d9;
}
.login .content-block {
  margin: 2.3rem 0 0 0;
  padding: 0 .45rem;
}
.login-label {
  font-size: .7rem;
  line-height: 1.2rem;
}
.login-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-top: .8rem;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
.login textarea {
  height: auto;
  resize: none;
  width: 100%;
  font-size: .7rem;
  -webkit-appearance: none;
  padding: .4rem .5rem;
  -webkit-user-select: text;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
  outline: 0;
}
.login .submit-button {
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.login .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
</style>
