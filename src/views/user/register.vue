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
          <input type="tel" v-model="uphone" class="el_phone" placeholder="输入手机号">
        </div>
        <div class="el_code_input_box">
          <input type="text" v-model="alipayid" class="el_code" placeholder="支付宝账号">
        </div>
        <div class="el_code_input_box">
          <input type="text" v-model="uname" class="el_code" placeholder="姓名（需与支付宝一致）">
        </div>
        <div class="el_pw_input_box">
          <input type="password" v-model="upass" class="el_password" placeholder="输入密码">
        </div>
        <div class="el_login_go_box">
          <a class="el_login_go" @click="register()"
            :style="{backgroundColor: (submitBtn ? '#1a6be4' : '#c8c9cb')}">
            注册
          </a>
        </div>
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
      uid: this.$route.query.uid,
      uphone: null,
      uname: null,
      upass: null,
      alipayid: null,
      submitBtn: false
    }
  },
  methods: {
    /*
     * 注册
     */
    register () {
      if (!this.uphone) {
        $.toast('请输入手机号')
        return
      }
      if (!this.uname) {
        $.toast('请输入姓名')
        return
      }
      if (!this.upass) {
        $.toast('请输入密码')
        return
      }
      if (!this.alipayid) {
        $.toast('请输入支付宝账号')
        return
      }
      this.submitBtn = false
      // 提交注册
      this.$http.post(api.register, {
        uname: this.uname,
        upass: this.upass,
        uphone: this.uphone,
        alipayid: this.alipayid,
        uid: this.uid
      })
      .then(({data: {code, msg}})=>{
        $.toast(msg)
        setTimeout(() => {
          if (code === 1) {
            this.$route.router.go({path: '/login', replace: true})
          }
          else {
            this.submitBtn = true
          }
        }, 1500)
      }).catch((e)=>{
        console.error(this.from + '用户注册失败:' + e)
      })
    }
  },
  watch: {
    '[uphone,alipayid,uname,upass]': {
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
.el_login_go_box{
  border-top: 0.05rem solid #f0f0f0;
}
.hide{
  display: none;
}
</style>
