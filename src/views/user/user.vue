
<template>
  <div class="content">
    <!-- 个人中心顶部信息栏 -->
    <div class="el_user_head_box">

      <!-- 顶部操作栏 -->
      <div class="el_user_head">
        <a href="#"><img src="/img/11/return.png"></a>
        <strong>个人中心</strong>
      </div>

      <!-- 个人头像/名字 -->
      <div class="el_user_name_box">
        <img src="/img/11/head_icon.png">
        <span class="el_user_name">Robert De Niro</span>
      </div>

      <!-- 个人财产信息 -->
      <div class="el_user_info_box">
        <div class="el_user_info_left">
          <span>可用余额</span>
          <span class="el_balance">0.00</span>
        </div>
        <div class="el_user_info_right">
          <span>冻结金额</span>
          <span class="el_balance">0.00</span>
        </div>
      </div>
    </div>

    <!-- 提现按钮/充值按钮 -->
    <div class="el_property_operation">
      <div class="el_withdrawals_btn">
        <strong>提现</strong>
      </div>
      <div class="el_recharge_btn">
        <strong>充值</strong>
      </div>
    </div>

    <!-- 账单 -->
    <div class="el_bill_box">
      <img src="/img/11/bill_icon.png" class="el_bill_icon">
      <span class="el_bill_tagging">账单</span>
      <div class="el_bill_remind">
        <img src="/img/11/go_icon.png" class="el_go_icon">
        <span class="el_transaction_info">所有交易信息</span>
      </div>
    </div>

    <!-- 订单 -->
    <div class="el_order_box">
      <img src="/img/11/order_icon.png" class="el_order_icon">
      <span class="el_order_tagging">订单</span>
    </div>

    <!-- 修改密码 -->
    <div class="el_modify_pw">
      <img src="/img/11/modify_pw.png" class="el_modify_pw_icon">
      <span class="el_modify_pw_tagging">修改密码</span>
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
.el_user_head_box{
  width: 100%;
  height: 8rem;
  background-image: url(/img/11/user_bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.el_user_head{
  width: 100%;
  height: 2.5rem;
  overflow: hidden;
}
.el_user_head img{
  display: block;
  height: 0.8rem;
  position: absolute;
  left: 0.5rem;
  top: 0.85rem;
}
.el_user_head strong{
  display: block;
  color: #fff;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
}
.el_user_name_box{
  width: 100%;
  height: 3rem;
  overflow: hidden;
}
.el_user_name_box img{
  width: 1.7rem;
  height: 1.7rem;
  margin-top: 0.4rem;
  display: block;
  margin-left: 0.5rem;
}
.el_user_name_box img,.el_user_name_box span{
  float: left;
}
.el_user_name{
  line-height: 2.5rem;
  margin-left: 0.5rem;
  color: white;
}
.el_user_info_box{
  width: 100%;
  height: 2.5rem;
  background-image: url(/img/11/opacity_bg.png);
}
.el_user_info_left,.el_user_info_right{
  width: 50%;
  height: 1.6rem;
  float: left;
  margin-top: 0.45rem;
}
.el_user_info_left{
  border-right: 0.05rem #4c4c4c solid;
}
.el_user_info_left span,.el_user_info_right span{
  display: block;
  width: 100%;
  font-size: 0.6rem;
  color: white;
  text-align: center;
  line-height: 0.6rem;
}
.el_balance{
  margin-top:0.4rem;
}
.el_property_operation{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  overflow: hidden;
}
.el_withdrawals_btn,.el_recharge_btn{
  width: 50%;
  height: 2.5rem;
  overflow: hidden;
  float: left;
}
.el_withdrawals_btn{
  border-right: 0.05rem #f0f0f0 solid;
}
.el_withdrawals_btn strong,.el_recharge_btn strong{
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
  font-size: 0.7rem;
}
.el_recharge_btn strong{
  color: #3ec4a0;
}
.el_withdrawals_btn strong{
  color: #999999;
}
.el_bill_box{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.5rem;
  overflow: hidden;
  border: none;
}
.el_order_box,.el_modify_pw{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.05rem;
  overflow: hidden;
  border: none;
}
.el_bill_icon{
  height:1.15rem;
  float: left;
  display: block;
  margin-left:0.5rem;
  margin-top:0.675rem;
}
.el_order_icon,.el_modify_pw_icon{
  height:1.15rem;
  float: left;
  display: block;
  margin-left:0.62rem;
  margin-top:0.675rem;
}
.el_transaction_info,.el_go_icon{
  float:right;
  display: block;
  margin-right:0.5rem;
}
.el_go_icon{
  height:0.6rem;
  margin-top:0.95rem;
}
.el_bill_tagging{
  float: left;
  display: block;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  line-height: 2.5rem;
}
.el_order_tagging,.el_modify_pw_tagging{
  float: left;
  display: block;
  margin-left: 0.55rem;
  font-size: 0.7rem;
  line-height: 2.5rem;
}
.el_bill_remind span{
  font-size: 0.6rem;
  color: #999999;
  line-height: 2.5rem;
}
</style>
