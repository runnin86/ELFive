
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <div class="content" transition="">
    <div class="subscription_background">
    <!-- 顶部操作栏 -->
      <div class="el_subscription_head">
        <a class="el_return_btn" v-link="{path: '/home', replace: true}">
          <img src="/img/11/return.png">
        </a>
      </div>

      <!-- 购买模块 -->
      <div class="buy_box">
        <!-- 数字显示区域及付费查看按钮 -->
        <div class="number_box">
          <ul class="number">
            <li>01</li>
            <li>03</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
          </ul>
          <div class="view_btn">
            <span @click="this.showPayWindow=true">付费查看</span>
          </div>
        </div>
        <!-- 限购时间 -->
        <div class="time_interval">
          <span>开始购买 10.16 00:01</span>
          <span>截止购买 10.16 23:59</span>
        </div>
        <!-- 购买期数区间 -->
        <div class="period_interval">
          <span>起始&nbsp2016101801&nbsp-&nbsp终止&nbsp2016101972&nbsp&nbsp共150期</span>
        </div>
        <!-- 进度条 -->
        <div class="progress_bar">
          <div class="schedule">
          </div>
        </div>
        <!-- 已售/利润率/总需 -->
        <div class="purchases">
          <span class="sales">已售 2008元</span>
          <span class="profitability">利润率 25%</span>
          <span class="total">总需 2628元</span>
        </div>
        <!-- 认购按钮 -->
        <div class="subscription_btn">
          <span @click="this.showPaymentWindow=true">马上认购</span>
        </div>
        <!-- 认购凭证 -->
        <div class="certificate">
          <span class="certificate_title">认购凭证</span>
          <span class="buying_information">购买 280元&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp日期 2016.10.18 20:20</span>
          <img class="certificate_off" src="/img/11/delete_btn.png" @click="this.showCancelWindow=true">
        </div>
      </div>

      <!-- 进行中 -->
      <div class="processing_box">
        <ul class="processing_head_box">
          <li class="buy_period">认购 20161018期</li>
          <li class="processing_icon">进行中</li>
          <li class="process" style=><font color="1ac7f9">118</font> / 150</li>
        </ul>
        <div class="number_box">
          <ul class="number">
            <li>01</li>
            <li>03</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
            <li style="background-color:#cccccc">?</li>
          </ul>
          <div class="view_btn">
            <span @click="this.showPayWindow=true">付费查看</span>
          </div>
        </div>
        <div class="processing_progress_bar">
        </div>
        <div class="sold_condition">
          <span class="sold">已售 22580元</span>
          <span class="purchase">您未购买</span>
          <span class="processing_profitability">100%利润率</span>
        </div>
      </div>

      <!-- 已结束订单 -->
      <div class="over_box">
        <ul class="processing_head_box">
          <li class="buy_period">认购 20161018期</li>
          <li class="over_icon">已结束</li>
          <li class="hit">118期命中</li>
        </ul>
        <div class="over_number_box">
          <ul class="over_number">
            <li>02</li>
            <li>03</li>
            <li>06</li>
            <li>08</li>
            <li>10</li>
            <li>11</li>
          </ul>
          <div class="view_btn">
            <span>获奖1200元</span>
          </div>
        </div>
        <div class="over_progress_bar">
        </div>
        <div class="over_condition">
          <span class="over_sold">已售 22580元</span>
          <span class="over_purchase">您购买了 600元</span>
          <span class="over_profitability">100%利润率</span>
        </div>
      </div>

      <!-- 占位符 -->
      <div class="placeholder">
      </div>
    </div>

    <!-- 付费查看弹出窗口 -->
    <div :class="this.showPayWindow?'el_eject_window_box':'hide'">
      <div class="el_eject_window">
        <img src="/img/11/delete_btn.png" class="view_confirm_off"
          @click="this.showPayWindow = false">
        <div class="el_confirm_info">
          <span class="view_confirm_info">查看所有号码需支付500.00元</span>
        </div>
        <div class="view_confirm_btn">
          <span>立即支付</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 取消认购弹出窗口 -->
  <div :class="this.showCancelWindow?'el_eject_window_box':'hide'">
    <div class="el_eject_window">
      <div class="el_confirm_info">
        <span class="el_confirm_info_up">是否确认取消本次认购?</span>
      </div>
      <div class="el_button">
        <span class="el_button_left" @click="this.showCancelWindow = false">
          取消
        </span>
        <span class="el_button_right"
          @click="this.showCancelWindow = false"
          @click="this.showCertificateWindow = false">
          确定
        </span>
      </div>
    </div>
  </div>

  <!-- 认购弹出窗口 -->
  <div
    :class="this.showPaymentWindow?'el_eject_window_box':'hide'">
    <div class="payment_window">
      <div class="pw_head">
        <span>购买窗口</span>
        <img src="/img/11/delete_btn.png" class="off_btn"
          @click="this.showPaymentWindow = false">
      </div>
      <div class="pw_input" id="pw_input">
        <span class="amount">购买 {{quantity}}元</span>
        <input class="quantity" v-model="quantity" type="text" name="quantity" placeholder="请输入您要购买的金额">
      </div>
      <div class="confirm_btn">
        <span>立即支付</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      docList: [],
      quantity: '50',
      showCertificateWindow: false,
      showPayWindow: false,
      showCancelWindow: false,
      showPaymentWindow: false,
      payRid: null,
      cancelDid: null
    }
  }
}
</script>

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
.subscription_background{
  width: 100%;
  overflow: hidden;
  background-color: #d2240d;
}
.el_subscription_head{
  width: 100%;
  height:6rem;
  background-image: url(/img/11/subscription_bg.png);
  background-size: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
}
.el_return_btn{
  display: block;
  width: 10%;
  height: 2.5rem;
  float: left;
}
.el_return_btn img{
  height: 0.8rem;
  display: block;
  margin: 0.85rem auto;
}
.buy_box{
  width: 94%;
  background-color: white;
  margin-top: -1.1rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 0.3rem;
}
.number_box{
  width: 100%;
  overflow: hidden;
}
.number{
  float: left;
  width: 74%;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.number li{
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 1.4rem;
  line-height: 1.4rem;
  margin-left: 0.4rem;
  text-align: center;
  font-size: 0.7rem;
  background-color: #f3bc26;
  color: white;
}
.view_btn{
  float: left;
  width: 24%;
  height: 1.4rem;
  margin-top: 0.4rem;
  background-color: #fb4127;
  border-radius: 1.4rem;
}
.view_btn span{
  text-align: center;
  line-height: 1.4rem;
  font-size: 0.6rem;
  color: white;
  display: block;
}
.time_interval{
  width: 100%;
  display: block;
  overflow: hidden;
  border-top: 0.05rem solid #f0f0f0;
}
.time_interval span{
  margin-top: 0.6rem;
  display: block;
  float: left;
  font-size: 0.6rem;
  margin-left: 0.4rem;
  color: #666666;
}
.period_interval span{
  display: block;
  font-size: 0.6rem;
  margin-top: 0.2rem;
  margin-left: 0.4rem;
  color: #666666;
}
.period_interval{
  width: 100%;
  display: block;
}
.progress_bar{
  width: 95%;
  height: 0.4rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
}
.schedule{
  width: 80%;
  height: 100%;
  background-color: #f3bc26;
  border-radius: 1rem;
}
.purchases{
  width: 95%;
  margin: 0 2.5%;
  overflow: hidden;
}
.sales,.profitability,.total{
  font-size: 0.6rem;
  display: block;
  line-height: 1.2rem;
}
.sales{
  width: 30%;
  float: left;
  color: #f3bc26;
}
.total{
  text-align: right;
  float: left;
  width: 30%;
  color: #999999;
}
.profitability{
 float: left;
 width: 40%;
 text-align: center;
 color: #f3bc26;
 font-size: 0.7rem;
}
.subscription_btn{
  width: 95%;
  margin: 0.6rem 2.5%;
  height: 1.8rem;
  background-color: #fb4127;
  border-radius: 1.8rem;
}
.subscription_btn span{
  width: 100%;
  line-height:1.8rem;
  color: white;
  text-align: center;
  font-size: 0.6rem;
  display: block;
}
.certificate{
  width: 100%;
  border-top: 0.05rem dashed #e5e5e5;
  height: 3.2rem;
  position: relative;
}
.certificate_title{
  border-left: 0.3rem solid #fb4127;
  display: block;
  font-size: 0.6rem;
  line-height: 0.6rem;
  height: 0.6rem;
  margin-left: 0.4rem;
  padding-left: 0.2rem;
  margin-top: 0.7rem;
}
.buying_information{
  display: block;
  font-size: 0.6rem;
  line-height: 1rem;
  height: 1rem;
  margin-left: 0.8rem;
  padding-left: 0.2rem;
  margin-top: 0.4rem;
}
.certificate_off{
  position: absolute;
  display: block;
  height: 1rem;
  right: 0.4rem;
  top: 50%;
  margin-top: -0.5rem;
}

/*弹出窗口CSS*/
.el_eject_window_box{
  display: block;
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top:0;
  background-image: url(/img/11/el_black_bg.png);
  overflow: hidden;
}
.el_eject_window{
  width: 80%;
  background-color: white;
  margin: 50% 10%;
  position: relative;
}
.el_confirm_info{
  width:100%;
  overflow: hidden;
}
.el_confirm_info_up{
  text-align: center;
  line-height:5rem;
  display: block;
  font-size: 0.8rem;
}
.view_confirm_info{
  text-align: center;
  line-height:4rem;
  display: block;
  font-size: 0.8rem;
  padding-top: 0.8rem;
}
.el_button{
  width:100%;
  height:2.5rem;
  overflow: hidden;
  border-top: 0.05rem solid #f0f0f0;
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

/*进行中CSS*/
.processing_box{
  width: 94%;
  background-color: white;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 0.3rem;
}
.processing_head_box{
  width: 100%;
  height: 2rem;
}
.processing_icon{
  background-color: #1ac7f9;
  height: 0.8rem;
  width: 2.4rem;
  text-align: center;
  color: white;
  border-radius: 1rem;
  font-size: 0.6rem;
  margin-left:0.4rem;
  margin-top: 0.6rem;
  line-height: 0.8rem;
  float: left;
}
.buy_period{
  float: left;
  font-size: 0.6rem;
  line-height: 2rem;
  margin-left: 0.4rem;
}
.process{
  float: right;
  font-size: 0.6rem;
  height: 1.2rem;
  line-height: 1.2rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
  border: 0.05rem solid #f0f0f0;
  border-radius: 0.2rem;
  width: 3.4rem;
  text-align: center
}
.processing_progress_bar{
  width: 95%;
  height: 0.4rem;
  background: -webkit-linear-gradient(left, #f3bc26 , #fb4127); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #f3bc26, #fb4127); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #f3bc26, #fb4127); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #f3bc26 , #fb4127);
  border-radius: 1rem;
  margin-top: 0.4rem;
  margin-left: auto;
  margin-right: auto;
}
.sold_condition{
  width: 95%;
  margin-top: 0.2rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.4rem;
  overflow: hidden;
}
.sold,.purchase,.processing_profitability{
  float: left;
  display: block;
}
.sold{
  width: 30%;
  font-size: 0.6rem;
}
.purchase{
  width: 40%;
  font-size: 0.6rem;
  text-align: center;
}
.processing_profitability{
  width: 30%;
  font-size: 0.6rem;
  text-align: right;
}

/*已结束认购*/
.over_box{
  width: 94%;
  background-color: white;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 0.3rem;
  color: #cccccc;
}
.over_icon{
  background-color: #cccccc;
  height: 0.8rem;
  width: 2.4rem;
  text-align: center;
  color: white;
  border-radius: 1rem;
  font-size: 0.6rem;
  margin-left:0.4rem;
  margin-top: 0.6rem;
  line-height: 0.8rem;
  float: left;
}
.hit{
  float: right;
  font-size: 0.6rem;
  height: 1.2rem;
  line-height: 1.2rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
  border: 0.05rem solid #f0f0f0;
  border-radius: 0.2rem;
  width: 3.4rem;
  text-align: center
}
.over_number_box{
  width: 100%;
  overflow: hidden;
}
.over_number{
  float: left;
  width: 74%;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.over_number li{
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 1.4rem;
  line-height: 1.4rem;
  margin-left: 0.4rem;
  text-align: center;
  font-size: 0.7rem;
  background-color: #cccccc;
  color: white;
}
.over_progress_bar{
  width: 95%;
  height: 0.4rem;
  background-color: #cccccc;
  border-radius: 1rem;
  margin-top: 0.4rem;
  margin-left: auto;
  margin-right: auto;
}
.over_condition{
  width: 95%;
  margin-top: 0.2rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.4rem;
  overflow: hidden;
}
.over_purchase{
  display: block;
  float: left;
  text-align: center;
  width: 40%;
  font-size: 0.6rem;
}
.over_sold{
  display: block;
  float: left;
  width: 30%;
  font-size: 0.6rem;
}
.over_profitability{
  display: block;
  float: left;
  width: 30%;
  font-size: 0.6rem;
  text-align: right;
}

/*占位符*/
.placeholder{
  height:2rem;
  width: 100%;
}

/*付款弹出窗口*/
.payment_window{
  width: 90%;
  background-color: white;
  margin-top: 6rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 0.2rem;
}
.pw_head{
  width: 100%;
  height: 2rem;
  border-bottom: 0.05rem solid #f0f0f0;
  position: relative;
}
.pw_head span{
  text-align: center;
  line-height: 2rem;
  display: block;
  font-size: 0.7rem;
}
.quantity{
  display: block;
  width: 90%;
  height: 1.8rem;
  border: 0.05rem solid #f0f0f0;
  background-color: #fafafa;
  font-size: 0.6rem;
  padding-left: 0.4rem;
  text-align: center;
  margin: 0.4rem auto;
  -webkit-appearance: none;
}
.amount{
  display: block;;
  width: 90%;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  font-size: 0.6rem;
  margin: 0.4rem auto;
}
.pw_input{
  width: 100%;
}
.confirm_btn{
  width: 90%;
  margin:0.8rem auto;
  border-radius: 0.1rem;
  overflow: hidden;
}
.view_confirm_btn{
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.6rem;
  border-radius: 0.1rem;
}
.confirm_btn span,.view_confirm_btn span{
  width: 100%;
  background-color: #1ec622;
  color: white;
  text-align: center;
  line-height: 2rem;
  display: block;
}
.off_btn{
  display: block;
  width: 1.2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.7rem;
}
.view_confirm_off{
  display: block;
  width: 1.2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.7rem;
}
</style>
