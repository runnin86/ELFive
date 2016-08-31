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
    <table width="100%" class="recommendation_number_box">
      <tr align="center">
        <!-- 数组带入并根据数组数量自动循环 -->
        <td v-for="n in numberList">
          {{n}}
        </td>
      </tr>
    </table>

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
      <tr v-for="l in showList">
        <td><span>{{l.id}}</span></td>
        <td><span>{{l.pid}}</span></td>
        <td><span>{{l.mul}}</span></td>
        <td><span>{{l.buy}}</span></td>
        <td><span>{{l.mon}}</span></td>
        <td><span>{{l.rate}}%</span></td>
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
          <input type="text" name="times" v-model="addMultiple" class="el_times_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <span>倍</span>
        </li>
        <li class="el_stage">
          <span>追</span>
          <input type="text" name="stage" v-model="addPeriod" class="el_stage_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <span>期</span>
        </li>
        <li class="el_profit">
          <input type="text" name="profit" v-model="addProfit" class="el_profit_input" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')">
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
import {getOdds} from '../../util/util'

export default {
  ready () {
    $.init()
    this.calculateProfit()
  },
  data () {
    return {
      showTabs: 1,
      gameType: this.$route.params.gameType,
      numberList: this.$route.params.number.split(','), // 截取数组
      currentPeriod: 78, // 当前期数(从服务器获取)
      price: 2, // 单价(从上一页传递过来)
      addPeriod: 20,
      addMultiple: 1,
      addProfit: 300,
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
      let startMul = this.addMultiple
      // 默认生成追号7期
      for (let i = 0; i < this.addPeriod; i++) {
        let obj = {}
        // 期号大于78时变更
        let p = this.currentPeriod + i
        if (p >= 78 * parseInt(p / 78, 0)) {
          p = p - 78 * parseInt(p / 78, 0) + 1
        }
        // 截止上一期累计投入
        let lastPeriodMoney = (i > 0 ? this.showList[i - 1].buy : 0)
        // 如果利润小于期望利润则要加倍
        let tempBuy = this.price * (i + 1) * startMul
        let tempMon = odds * this.price * startMul - tempBuy
        let tempRate = parseInt((tempMon / tempBuy) * 100, 0)
        while (tempRate < this.addProfit) {
          startMul++
          let b = this.price * startMul + lastPeriodMoney
          let m = odds * this.price * startMul - b
          tempRate = parseInt((m / b) * 100, 0)
        }
        // 组装数据
        obj.id = i + 1 // 序号
        obj.pid = p < 10 ? '0' + p : p // 期号
        obj.mul = startMul
        obj.buy = this.price * startMul + lastPeriodMoney
        obj.mon = odds * this.price * startMul - obj.buy
        obj.rate = tempRate
        // 填充数据
        this.showList.push(obj)
      }
      // 总花费=showList的最后一条数据的累计投入
      this.totalMoney = this.showList[this.showList.length - 1].buy
    }
  },
  watch: {
    'addMultiple': {
      handler: function (newVal, oldVal) {
        // 倍数 无值时默认为1
        this.addMultiple = !newVal ? 1 : newVal
        this.calculateProfit()
      }
    },
    'addPeriod': {
      handler: function (newVal, oldVal) {
        // 追期 无值时默认为1
        this.addPeriod = !newVal ? 1 : newVal
        this.calculateProfit()
      }
    },
    'addProfit': {
      handler: function (newVal, oldVal) {
        this.addProfit = !newVal ? 1 : newVal
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
.recommendation_number_box tr td{
  color: #fff;
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
</style>
