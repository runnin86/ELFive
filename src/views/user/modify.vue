<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
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
      <div class="el_pw_input_box">
        <input type="password" v-model="opass" class="el_password" placeholder="原密码">
      </div>
      <div class="el_pw_input_box">
        <input type="password" v-model="npass" class="el_password" placeholder="输入新密码">
      </div>
      <div class="el_pw_input_box">
        <input type="password" v-model="cpass" class="el_password" placeholder="确认新密码">
      </div>
      <div class="el_true_go_box">
        <a @click="changePwd()" class="el_login_go"
          :style="{backgroundColor: (submitBtn ? '#1a6be4' : '#c8c9cb')}">确定</a>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'zepto'
import {api} from '../../util/service'

export default {
  ready () {
    $.init()
  },
  data () {
    return {
      uphone: window.localStorage.getItem('localPhone'),
      opass: null,
      npass: null,
      cpass: null,
      submitBtn: false
    }
  },
  methods: {
    /*
     * 修改密码
     */
    changePwd () {
      if (!this.opass) {
        $.toast('请输入原密码')
        return
      }
      if (!this.npass) {
        $.toast('请输入新密码')
        return
      }
      if (!this.cpass) {
        $.toast('请确认新密码')
        return
      }
      if (this.npass !== this.cpass) {
        $.toast('新密码输入不一致')
        return
      }
      this.submitBtn = false
      let token = window.localStorage.getItem('token')
      // 提交修改
      this.$http.post(api.changePwd, {
        uphone: this.uphone,
        opass: this.opass,
        npass: this.npass
      }, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, msg}})=>{
        $.toast(msg)
        setTimeout(() => {
          if (code === 1) {
            this.opass = null
            this.npass = null
            this.cpass = null
            this.$route.router.go({path: '/login', replace: true})
          }
          else {
            this.submitBtn = true
          }
        }, 1000)
      }).catch((e)=>{
        console.error(this.from + '修改密码失败:' + e)
      })
    }
  },
  watch: {
    '[opass,npass,cpass]': {
      handler: function (newVal, oldVal) {
        let flag = true
        newVal.map((v, k)=>{
          if (v === null || v === '') {
            flag = false
            return
          }
        })
        // 注册按钮是否灰化
        this.submitBtn = flag
        // console.log(flag)
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
.el_pw_input_box,.el_true_go_box{
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
