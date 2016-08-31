<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>自选付款区</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 推荐号码 -->
    <div class="el_recommend">
        <span>自选号码-任6</span>
    </div>
    <div class="recommendation_number_box">
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
        <strong >01</strong>
    </div>

    <!-- 计算表格 -->
    <table class="el_number_table" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <th><span>序号</span></th>
        <th><span>期号</span></th>
        <th><span>倍数</span></th>
        <th><span>累计投入</span></th>
        <th><span>中奖盈利</span></th>
        <th><span>利润率</span></th>
      </tr>
      <tr>
        <td><span>1</span></td>
        <td><span>11</span></td>
        <td><span>1</span></td>
        <td><span>2</span></td>
        <td><span>88</span></td>
        <td><span>4400%</span></td>
      </tr>
      <tr>
        <td><span>1</span></td>
        <td><span>11</span></td>
        <td><span>1</span></td>
        <td><span>2</span></td>
        <td><span>88</span></td>
        <td><span>4400%</span></td>
      </tr>
    </table>
  </div>

  <!-- 付款窗口 -->
  <div class="el_payment_box">
      <div class="el_payment_proposal">
        <span>需&nbsp680&nbsp元</span>
      </div>
      <ul class="el_condition_input">
        <li class="el_times">
          <span>追</span>
          <input type="text" name="times" class="el_times_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <span>倍</span>
        </li>
        <li class="el_stage">
          <span>追</span>
          <input type="text" name="stage" class="el_stage_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <span>期</span>
        </li>
        <li class="el_profit">
          <input type="text" name="profit" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <span>%利润率</span>
        </li>
      </ul>
      <div class="el_payment_btn">
        <span
          @click="this.showTabs = 2">
        付款</span>
      </div>
  </div>

  <!-- 弹出窗口 -->
  <div class="el_eject_window_box"
    :class="this.showTabs===2?'el_eject_window_box':'hide'"
    :class="this.showTabs===3?'el_eject_window_box':'hide'">
    <div class="el_eject_window">
      <div class="el_confirm_info">
        <span class="el_confirm_info_up">总计消费640.00元</span>
        <span class="el_confirm_info_lower">（如终止追单，剩余金额将返还到您的账户）</span>
      </div>
      <div class="el_button">
        <span class="el_button_left"
          @click="this.showTabs = 3"
        >取消</span>
        <span class="el_button_right"  v-link="{path: '/choose', replace: true}">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'

export default {
  ready () {
    $.init()
  },
  data () {
    return {
      showTabs: 1
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
  margin: 0.85rem auto;
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
.el_recommend{
  width: 100%;
  height: 1.2rem;
  background-color: #282828;
}
.el_recommend span{
  font-size: 0.7rem;
  color: #fff;
  display: block;
  width: 100%;
  line-height: 1.2rem;
  text-align: center;
}
.recommendation_number_box{
  width: 100%;
  height: 2.5rem;
  background-color: #282828;
}
.recommendation_number_box strong{
  color: #fff;
  line-height: 2.5rem;
  display: block;
  float: left;
  text-align: center;
  font-size: 1rem;
  width: 16.6%;
}
.el_number_table{
  background-color: white;
  margin-bottom: 6.3rem;
}
.el_number_table tr{
  width: 100%;
  height: 2.5rem;
  border-top: 0.05rem solid #f0f0f0;
}
.el_number_table tr td,.el_number_table tr th{
  border-left: 0.05rem solid #f0f0f0;
}
.el_number_table tr td span,.el_number_table tr th span{
  display: block;
  line-height: 1.6rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0.7rem;
}
.el_payment_box{
  width: 100%;
  background-color: white;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
}
.el_payment_proposal{
  width: 100%;
  background-color: white   ;
  height: 1.3rem;
  border-bottom:0.05rem solid #f0f0f0;
}
.el_payment_proposal span{
  width: 100%;
  line-height: 1.3rem;
  text-align: center;
  display: block;
  font-size: 0.6rem;
}
.el_condition_input{
  width: 100%;
  height: 2.5rem;
  background-color: white;
}
.el_condition_input li{
  float: left;
}
.el_times,.el_stage{
  width: 31%;
  height: 100%;
  border-right: 0.05rem solid #f0f0f0;
  background-color: white;
}
.el_profit{
  width: 38%;
  height: 100%;
  background-color: white;
}
.el_profit_input{
  margin-left: 6%;
}
.el_times span,.el_times input,.el_stage span,.el_stage input,.el_profit span,.el_profit input{
  float: left;
  display: block;
}
.el_times_input,.el_stage_input,.el_profit_input{
   width: 44%;
   margin-top: 0.5rem;
   border: none;
   background-color: #f5f5f5;
   height: 1.4rem;
   border-radius: none;
   font-size: 0.7rem;
}
.el_times span,.el_stage span{
  font-size: 0.6rem;
  line-height: 2.5rem;
  text-align: center;
  width: 28%;
}
.el_profit span{
  font-size: 0.6rem;
  line-height: 2.5rem;
  text-align: center;
  width: 50%;
}
.el_payment_btn{
  width: 100%;
  height: 2.5rem;
  background-color: #42c1b1;
}
.el_payment_btn span{
  display: block;
  width: 100%;
  line-height: 2.5rem;
  color: white;
  text-align: center;
  font-size: 0.7rem;
}
.el_eject_window_box{
  display: block;
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
.hide{
  display: none;
}
</style>
