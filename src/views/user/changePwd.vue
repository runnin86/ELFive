<template>
<div class="content password" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="content-block">
    <div style="font-size:0.68rem;margin-bottom:0.3rem;">
      <font>
        请设置您的新密码。密码请设置为6位以上的字母、数字、符号，尽量为三者组合，以保障您的账号安全
      </font>
    </div>
    <div class="password-input">
      <input type="password" v-model="oldPwd" placeholder="旧密码">
      <input type="password" v-model="newPwd" placeholder="新密码">
    </div>
  </div>
  <div class="submit-button">
    <button class="button button-big button-fill"
      :class="submit?'button-fill':'disabled'"
      @click="changePwd()">提交</button>
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
      oldPwd: '',
      newPwd: '',
      submit: false,
      title: '修改密码'
    }
  },
  methods: {
    changePwd () {
      if (this.oldPwd && this.newPwd) {
        let token = window.localStorage.getItem('token')
        this.$http.post(userApi.changePwd, {
          'npwd': this.newPwd,
          'opwd': this.oldPwd
        }, {
          headers: {
            'x-token': token
          },
          emulateJSON: true
        })
        .then(({data: {code, msg, result}})=>{
          if (code === 1) {
            $.toast('修改成功!')
            this.newPwd = ''
            this.oldPwd = ''
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('修改密码失败:' + e)
        })
      }
    }
  },
  watch: {
    'oldPwd': {
      handler: function (newVal, oldVal) {
        if (this.oldPwd && this.newPwd) {
          this.submit = true
        }
      }
    },
    'newPwd': {
      handler: function (newVal, oldVal) {
        if (this.oldPwd && this.newPwd) {
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
.password .content-block {
  margin: 3rem 0 0 0;
  padding: 0 .45rem;
}
.password-label {
  font-size: .7rem;
  line-height: 1.2rem;
}
.password-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
.password .submit-button {
  margin-top: .4rem;
  width: 100%;
  padding: 0 .45rem;
}
.password .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
</style>
