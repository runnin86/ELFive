
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="pushtop">

    <!-- 成功提示 -->
    <div class="el_complete_box">
      <img src="/img/11/complete_icon.png" class="el_complete_icon">
      <strong class="el_complete_notes">提现成功</strong>
    </div>

    <!-- 提现信息/提醒 -->
    <div class="el_complete_info_box">
      <div class="el_complete_info">
        <div class="el_complete_money">
          <span>提现金额</span>
          <span>{{money | currency '¥'}}</span>
        </div>
        <div class="el_complete_alipay">
          <span>提现渠道</span>
          <span>支付宝</span>
        </div>
        <div class="el_complete_username">
          <span>账户名称</span>
          <span>{{user.userAlipayId}}</span>
        </div>
        <div class="el_complete_time">
          <span>提现日期</span>
          <span>{{withDrawDate}}</span>
        </div>
      </div>
      <div class="el_withdrawals_notes">
        <span>您的提现申请已经成功提交，提现金额会在3个工作日内划入到您的支付宝账户。</span>
      </div>
    </div>

    <!-- 完成按钮 -->
    <div class="el_withdrawals_complete_btn">
      <strong  v-link="{path: '/user', replace: true}">完成</strong>
    </div>

  </div>
</template>

<script>
import $ from 'zepto'
import {dateFormat} from '../../util/util'

export default {
  ready () {
    $.init()
  },
  data () {
    return {
      money: this.$route.query.m,
      user: JSON.parse(window.localStorage.getItem('elUser')),
      withDrawDate: dateFormat(new Date(), 'yyyy-MM-dd HH:mm')
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
.el_complete_box{
  width: 100%;
  height: 7.2rem;
  background-image: url(/img/11/withdrawals_complete_bgimg.png);
  background-size: 100%;
  overflow: hidden;
}
.el_complete_icon{
  width: 2.95rem;
  height: 2.95rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.4rem;
}
.el_complete_notes{
  line-height: 2rem;
  font-size: 0.8ren;
  color: white;
  text-align: center;
  display: block;

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
  width: 3rem;
  margin-left: 0.5rem;
}
.el_withdrawals_alipay_username{
  color: #999999;
  margin-left: 1rem;
}
.el_withdrawals_balance_input{
  display: block;
  float: left;
  height: 2.5rem;
  background-color: white;
  margin-left: 1rem;
  padding: 0;
  border: none;
  font-size: 0.7rem;
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
.el_complete_info_box{
  width: 94%;
  margin: 0.5rem 3%;
  overflow: hidden
}
.el_complete_info{
  display: block;
  width: 100%;
  height: 7.95rem;
  background-image: url(/img/11/complete_info_out.png);
  background-size: 100%;
}
.el_withdrawals_notes{
  margin-top: 0.05rem;
  display: block;
  width: 100%;
  height: 3.25rem;
  background-image: url(/img/11/complete_notes_bgimg.png);
  background-size: 100%;
  overflow: hidden;
}
.el_complete_money,.el_complete_alipay,.el_complete_username,.el_complete_time{
  width: 100%;
  overflow: hidden;
}
.el_complete_money span,.el_complete_alipay  span,.el_complete_username  span,.el_complete_time  span{
  display: block;
  float: left;
  line-height: 0.8rem;
  margin-top: 0.9rem;
  font-size: 0.8rem;
  margin-left: 0.6rem;
  color: #666666;
}
.el_withdrawals_notes span{
  display: block;
  width: 92%;
  color: #999999;
  line-height: 1rem;
  font-size: 0.6rem;
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 0.6rem;
}
.el_withdrawals_complete_btn{
  width: 94%;
  height: 2.5rem;
  background-color: #42c1b1;
  border-radius:0.1rem;
  margin: 0.5rem 3%;
  overflow: hidden;
}
.el_withdrawals_complete_btn strong{
  width: 100%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  color: white;
  font-size: 0.8rem;
}
</style>
