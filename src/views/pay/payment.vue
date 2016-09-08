<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">

    <!-- 计算表格 -->
    <table class="el_number_table" width="100%" border="0" cellpadding="0" cellspacing="0">
      <!-- <tr>
        <th><span>序号</span></th>
        <th><span>期号</span></th>
        <th><span>倍数</span></th>
        <th><span>累计投入</span></th>
        <th><span>中奖盈利</span></th>
        <th><span>利润率</span></th>
      </tr> -->
      <tr v-for="l in showList">
        <td class="el_number_order"><span>{{l.id}}</span></td>
        <td class="el_number_stage"><span>{{l.pid}}</span></td>
        <td class="el_number_times"><span>{{l.mul}}</span></td>
        <td class="el_number_investment"><span>{{l.buy}}</span></td>
        <td class="el_number_profit"><span>{{l.mon}}</span></td>
        <td class="el_number_rate"><span>{{l.rate}}%</span></td>
      </tr>
    </table>
  </div>

  <!-- 付款窗口 -->
  <div class="el_payment_box">
      <div class="el_payment_proposal">
        <span>需&nbsp{{totalMoney}}&nbsp元</span>
      </div>
      <ul class="el_condition_input">
        <li class="el_times">
          <span>追</span>
            <input v-model="startMultiple"
              type="number" min=1 max=999
              class="el_times_input"
              onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
              onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          <span>倍</span>
        </li>
        <li class="el_stage">
          <span>追</span>
            <input v-model="followPeriod"
              type="number" min=1
              class="el_stage_input"
              onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
              onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          <span>期</span>
        </li>
        <li class="el_profit">
          <input v-model="expectProfit"
            type="number" min=1
            class="el_profit_input"
            onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
            onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          <span>%利润率</span>
        </li>
      </ul>
      <div class="el_payment_btn">
        <span @click="this.showPayButton=true">
          付款
        </span>
      </div>
  </div>
  <!-- 顶部操作栏 -->
  <div class="el_head">
    <a class="el_return_btn" @click="this.$root.back()">
      <img src="/img/11/return.png">
    </a>
    <strong>{{from === 'gd' ? '跟单' : '自选'}}付款区</strong>
    <div class="el_placeholder">&nbsp</div>
  </div>

  <!-- 付款区 -->
  <div class="el_recommend_box">
    <div class="el_recommend">
        <span v-if="from === 'gd'">跟单号码</span>
        <span v-else>
          {{gameType ? '玩法-' : ''}}{{gameType | getGameTypeName}}
        </span>
    </div>
    <table width="100%" class="recommendation_number_box">
      <tr align="center">
        <!-- 数组带入并根据数组数量自动循环 -->
        <td v-for="n in numberList" track-by="$index">
          {{n}}
        </td>
      </tr>
    </table>
    <div class="el_number_title">
      <span class="el_number_order">序号</span>
      <span class="el_number_stage">期号</span>
      <span class="el_number_times">倍数</span>
      <span class="el_number_investment">累计投入</span>
      <span class="el_number_profit">中奖盈利</span>
      <span class="el_number_rate">利润率</span>
    </div>
  </div>

  <!-- 弹出窗口 -->
  <div class="el_eject_window_box"
    :class="this.showPayButton?'el_eject_window_box':'hide'">
    <div class="el_eject_window">
      <div class="el_confirm_info">
        <span class="el_confirm_info_up">总计消费{{totalMoney | currency '¥'}}</span>
        <span class="el_confirm_info_lower">（博彩有风险，投注需谨慎）</span>
      </div>
      <div class="el_button">
        <span class="el_button_left" @click="this.showPayButton=false">
          取消
        </span>
        <span class="el_button_right" @click="payOrder()">
          确定
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import pingpp from 'pingpp-js'
import {getOdds} from '../../util/util'
import {api} from '../../util/service'

export default {
  ready () {
    $.init()
    this.getCurrentPeriod()
  },
  data () {
    return {
      showPayButton: false,
      rid: this.$route.query.rid,
      from: this.$route.params.from,
      gameType: this.$route.params.gameType,
      numberList: this.$route.params.number.split(','), // 截取数组
      currentPeriod: 78, // 当前期数(从服务器获取)
      price: this.$route.query.price ? this.$route.query.price : 2, // 单价(默认2元)
      maxWinC: this.$route.query.maxWinC ? this.$route.query.maxWinC : 1, // 任六选六只有一种中奖可能性
      followPeriod: 7,
      startMultiple: 1,
      expectProfit: 25,
      showList: [],
      totalMoney: 0
    }
  },
  methods: {
    /*
     * 自动计算利润b=倍数,q=期数,l=利润
     */
    calculateProfit () {
      let odds = getOdds(this.gameType)
      this.showList = []
      let startMul = this.startMultiple
      let maxRate = 0
      // 默认生成追号7期
      for (let i = 0; i < this.followPeriod; i++) {
        let obj = {}
        // 期号大于78时变更
        let p = this.currentPeriod + i - 1
        if (p >= 78 * parseInt(p / 78, 0)) {
          p = p - 78 * parseInt(p / 78, 0) + 1
        }
        // 组合某期的奖金(可能的组合数*每注2元*赔率*倍数)
        let winMon = this.maxWinC * 2 * odds * startMul
        // 截止上一期累计投入
        let lastPeriodMoney = (i > 0 ? this.showList[i - 1].buy : 0)
        // 如果利润小于期望利润则要加倍
        let tempBuy = this.price * startMul + lastPeriodMoney
        let tempMon = winMon - tempBuy
        let tempRate = parseInt((tempMon / tempBuy) * 100, 0)
        if (i === 0) {
          // 第一个即为最高利润率
          maxRate = tempRate
        }
        while (tempRate < this.expectProfit) {
          if (tempRate >= maxRate) {
            // 大于等于最高利润率则停止加倍
            break
          }
          if (startMul >= 999) {
            break
          }
          startMul++
          let b = this.price * startMul + lastPeriodMoney
          winMon = this.maxWinC * 2 * odds * startMul
          let m = winMon - b
          tempRate = parseInt((m / b) * 100, 0)
        }
        if (tempRate < this.expectProfit && i > 0) {
          $.toast('该方案最多只能生成' + i + '期')
          this.followPeriod = i
          break
        }
        // 组装数据
        obj.id = i + 1 // 序号
        obj.pid = p < 10 ? '0' + p : p // 期号
        obj.mul = startMul
        obj.buy = this.price * startMul + lastPeriodMoney
        obj.mon = winMon - obj.buy
        obj.rate = tempRate
        // 填充数据
        this.showList.push(obj)
      }
      // 总花费=showList的最后一条数据的累计投入
      this.totalMoney = this.showList[this.showList.length - 1].buy
    },
    /*
     * 支付
     */
    payOrder () {
      let postBody = {}
      let postUrl = ''
      let openid = window.localStorage.getItem('elOpenid')
      $.toast(openid)
      if (this.from === 'gd') {
        /*
         * 推荐号码跟单
         */
        // rid,startMultiple,totPeriods,ratePercent,openid
        postUrl = api.payOrderByGD
        postBody = {
          rid: this.rid,
          startMultiple: this.startMultiple,
          totPeriods: this.followPeriod,
          ratePercent: this.expectProfit,
          totmount: this.totalMoney,
          openid: openid
        }
      }
      else if (this.from === 'zx') {
        /*
         * 自选号码跟单(一期和多期)
         */
        if (parseInt(this.followPeriod, 0) === 1) {
          console.log('自选只买一期')
          // nums,unitPrice,multiple,totalPrice,gameType,startPeriods,openId
          postUrl = api.payOrderByZXOne
          postBody = {
            nums: this.$route.params.number,
            unitPrice: this.price,
            multiple: this.startMultiple,
            totalPrice: this.totalMoney,
            gameType: this.gameType,
            startPeriods: this.followPeriod,
            openid: openid
          }
        }
        else if (parseInt(this.followPeriod, 0) > 1) {
          console.log('自选多期跟单')
          postUrl = api.payOrderByZXMore
          postBody = {
            startMultiple: this.startMultiple, // 初始倍数
            nums: this.$route.params.number, // 初始号码
            unitPrice: this.price, // 单价
            ratePercent: this.expectProfit, // 利润率
            totPeriods: this.followPeriod, //  自定义追单期数
            totalPrice: this.totalMoney, // 总价
            gameType: this.gameType, // 玩法
            openid: openid
          }
        }
      }
      if (postUrl) {
        let token = window.localStorage.getItem('elToken')
        this.$http.post(postUrl, postBody, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          console.log(data)
          if (code === 1) {
            if (data.paytype === 'wx_pub') {
              console.log(data.charge)
              pingpp.createPayment(data.charge, function (result, err) {
                if (result === 'success') {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  $.toast('支付成功!')
                  setTimeout(function () {
                    this.showPayButton = false
                    this.$root.back()
                  }.bind(this), 1500)
                }
                else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  $.toast('支付失败!')
                  setTimeout(function () {
                    this.showPayButton = false
                  }.bind(this), 1500)
                }
                else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                  $.toast('支付取消!')
                  this.showPayButton = false
                }
              })
            }
            else {
              // 账户金额支付
              $.toast(msg)
              this.showPayButton = false
              this.$root.back()
            }
          }
          $.toast(msg)
        }).catch((e)=>{
          console.error(this.from + '付款提交失败:' + e)
        })
      }
    },
    /*
     * 获取当前期
     */
    getCurrentPeriod () {
      let token = window.localStorage.getItem('elToken')
      this.$http.get(api.currentPeriod, {}, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        if (code === 1 && data) {
          this.currentPeriod = parseInt(data.periodnum.substr(8, 2), 0)
        }
      }).catch((e)=>{
        console.error('获取最新期失败:' + e)
      }).finally(()=>{
        this.calculateProfit()
      })
    }
  },
  watch: {
    'startMultiple': {
      handler: function (newVal, oldVal) {
        // 倍数 无值时默认为1
        this.startMultiple = !newVal ? 1 : (newVal > 999 ? 999 : newVal)
        this.calculateProfit()
      }
    },
    'followPeriod': {
      handler: function (newVal, oldVal) {
        // 追期 无值时默认为1
        this.followPeriod = !newVal ? 1 : (newVal < 1 ? 1 : newVal)
        this.calculateProfit()
      }
    },
    'expectProfit': {
      handler: function (newVal, oldVal) {
        this.expectProfit = !newVal ? 1 : newVal
        this.calculateProfit()
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
  position: fixed;
  top: 0;
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
  position: fixed;
  top: 2.5rem;
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
  position: fixed;
  top: 3.7rem;
}
.recommendation_number_box tr td{
  color: #fff;
}
.el_number_table{
  background-color: white;
  margin-bottom: 6.35rem;
  margin-top: 8.7rem;
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
  font-size: 0.6rem;
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
   text-align: center;
   color: #666666;
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
.el_number_title{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  position: fixed;
  top: 6.2rem;
}
.el_number_title span{
  line-height: 2.5rem;
  font-size: 0.6rem;
  text-align: center;
  display: block;
  float: left;
}
.el_number_order{
  width: 10%;
}
.el_number_stage{
  border-left: 0.05rem solid #f0f0f0;
  width: 15%;
}
.el_number_times{
  width: 10%;
  border-left: 0.05rem solid #f0f0f0;
}
.el_number_investment{
  width: 20%;
  border-left: 0.05rem solid #f0f0f0;
}
.el_number_profit{
  width: 20%;
  border-left: 0.05rem solid #f0f0f0;
}
.el_number_rate{
  width: 25%;
  border-left: 0.05rem solid #f0f0f0;
}
</style>
