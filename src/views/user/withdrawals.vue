
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">

    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/user', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong class="el_balance_title">账户余额</strong>
      <strong class="el_placeholder" v-link="{path: '/rule', replace: true}">规则</strong>
      <strong class="el_balance">{{userAccount}}</strong>
    </div>

    <!-- 提现操作窗口 -->
    <div class="el_withdrawals_window_box">
      <div class="el_withdrawals_alipay_box">
        <span class="el_withdrawals_alipay_notes">支付宝</span>
        <span class="el_withdrawals_alipay_username">{{user.userAlipayId}}</span>
      </div>
      <div class="el_withdrawals_balance_box">
        <span class="el_withdrawals_balance_notes">提现金额</span>
        <input v-model="withdrawMoney" class="el_withdrawals_balance_input"
          placeholder="输入提现金额" type="number" min=10 max={{userAccount}}
          onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
          onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
      </div>
      <div class="el_withdrawals_btn_box">
        <strong class="el_withdrawals_btn" @click="submitWithdraw()">确定</strong>
      </div>
      <div class="el_prompt">
        <span>请您认真核对支付宝账号是否正确后再进行提现</span>
    </div>
  </div>
</template>

<script>
  import {api} from '../../util/service'
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
      if (this.user) {
        // 获取账户信息
        this.getUserAccount()
      }
    },
    data () {
      return {
        user: JSON.parse(window.localStorage.getItem('elUser')),
        userAccount: '-',
        withdrawMoney: null
      }
    },
    methods: {
      /*
       * 获取账户
       */
      getUserAccount () {
        let token = window.localStorage.getItem('elToken')
        this.$http.get(api.userAccount, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          if (code === 1) {
            this.userAccount = data.userAccount
          }
          else {
            console.log('获取账户错误:' + msg)
          }
        }).catch((e)=>{
          console.error('获取账户信息失败:' + e)
        })
      },
      /*
       * 提交提现
       */
      submitWithdraw () {
        if (!this.user.userAlipayId) {
          $.toast('账户支付宝账户为空,无法提现!')
          return
        }
        if (this.withdrawMoney < 10) {
          $.toast('提现金额必须大于10元!')
          this.withdrawMoney = null
          return
        }
        if (this.withdrawMoney > this.userAccount) {
          $.toast('提现金额大于账户余额!')
          this.withdrawMoney = null
          return
        }
        let token = window.localStorage.getItem('elToken')
        this.$http.post(api.withdraw, {
          wamount: this.withdrawMoney
        }, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            this.$route.router.go({path: '/withdrawals_complete?m=' + this.withdrawMoney, replace: true})
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('提现失败:' + e)
        })
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
  height: 5.5rem;
  background-image: url(/img/11/withdrawals_bgimg.png);
  background-size: 100%;
  overflow: hidden;
}
.el_return_btn{
  display: block;
  width:15%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
  display: block;
  margin:0.85rem auto;
}
.el_balance_title{
  width: 70%;
  text-align: center;
  display: block;
  line-height: 2.5rem;
  float: left;
  color: white;
  font-size: 0.7rem;
}
.el_placeholder{
  width: 15%;
  float: left;
  line-height: 2.5rem;
  font-size: 0.7rem;
  color: white;

}
.el_balance{
  width: 100%;
  line-height: 2.2rem;
  font-size: 1.6rem;
  color: white;
  text-align: center;
  display: block;
  clear:both;
}
.el_withdrawals_window_box{
  margin: 0.5rem 3%;
  width: 94%;
  overflow: hidden;
}
.el_withdrawals_alipay_box,.el_withdrawals_balance_box{
  width: 100%;
  background-color: white;
  overflow: hidden;
}
.el_withdrawals_balance_box{
  margin-top: 0.05rem;
}
.el_withdrawals_alipay_box span,.el_withdrawals_balance_box span{
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
}
.el_withdrawals_alipay_notes,.el_withdrawals_balance_notes{
  margin-left: 0.8rem;
  width: 2.8rem;
}
.el_withdrawals_alipay_username{
  color: #999999;
  margin-left: 0.8rem;
}
.el_withdrawals_balance_input{
  display: block;
  float: left;
  height: 2.5rem;
  background-color: white;
  margin-left: 0.8rem;
  padding: 0;
  border: none;
  font-size: 0.7rem;
  width: 60%;
}
.el_withdrawals_btn_box{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  overflow: hidden;
}
.el_withdrawals_btn{
  width:100%;
  display: block;
  line-height: 2.5rem;
  background-color: #42c1b1;
  font-size: 0.7rem;
  color: white;
  text-align: center;
}
.el_eject_window_box{
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
  margin-top: 0.9rem;
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
.el_prompt,.el_rule{
  width: 100%;
}
.el_prompt span{
  margin-bottom: 3rem;
  width: 100%;
  text-align: center;
  line-height: 3rem;
  display: block;
  font-size: 0.6rem;
  color: #666666;
}
</style>
