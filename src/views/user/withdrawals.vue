
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
      <div class="el_placeholder">&nbsp</div>
      <strong class="el_balance">2880.28</strong>
    </div>

    <!-- 提现操作窗口 -->
    <div class="el_withdrawals_window_box">
      <div class="el_withdrawals_alipay_box">
        <span class="el_withdrawals_alipay_notes">支付宝</span>
        <span class="el_withdrawals_alipay_username">stonecoolpapa@163.com</span>
      </div>
      <div class="el_withdrawals_balance_box">
        <span class="el_withdrawals_balance_notes">提现金额</span>
        <input type="text" maxlength="11" placeholder="输入提现金额" id="withdrawals_balance" class="el_withdrawals_balance_input"  name="withdrawals_balance" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
      </div>
      <div class="el_withdrawals_btn_box">
        <strong class="el_withdrawals_btn"  v-link="{path: '/withdrawals_complete', replace: true}">确定</strong>
      </div>
    </div>

    <!-- 弹出窗口 -->
    <!-- <div class="el_eject_window_box">
      <div class="el_eject_window">
        <div class="el_confirm_info">
          <span class="el_confirm_info_up">提现640.00元</span>
          <span class="el_confirm_info_lower">（提现申请将于3个工作日内完成）</span>
        </div>
        <div class="el_button">
          <span class="el_button_left">取消</span>
          <span class="el_button_right">确定</span>
        </div>
      </div>
    </div> -->

  </div>
</template>

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
  width:10%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
  display: block;
  margin:0.85rem auto;
}
.el_balance_title{
  width: 80%;
  text-align: center;
  display: block;
  line-height: 2.5rem;
  float: left;
  color: white;
  font-size: 0.7rem;
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
</style>
