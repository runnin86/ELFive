<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/user', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>账单</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>
    <div class="el_bill_box">
    <div class="el_choice_box">
      <!-- <strong class="el_recharge_btn"
        @click="this.showTabs = 1"
        :class="this.showTabs===1?'el_click_white':''">
        充值
      </strong> -->
      <strong class="el_purchase_btn"
        @click="this.showTabs = 1"
        :class="this.showTabs===1?'el_click_white':''">
      已购买</strong>
      <strong class="el_bonus_btn"
        @click="this.showTabs = 2"
        :class="this.showTabs===2?'el_click_white':''">
      已中奖</strong>
      <strong class="el_cash_btn"
        @click="this.showTabs = 3"
        :class="this.showTabs===3?'el_click_white':''">
      提现</strong>
    </div>
    <!-- 充值 -->
    <!-- <table class="el_recharge_box" width="100%" border="0" cellpadding="0" cellspacing="0"
      :class="this.showTabs===1?'el_recharge_box':'hide'">
      <tr>
        <th>日期</th>
        <th>金额</th>
        <th>状态</th>
      </tr>
      <tr align="center">
        <td>08.24<br>11:20</td>
        <td>200.00</td>
        <td>成功</td>
      </tr>
    </table> -->

    <!-- 购买 -->
    <table class="el_purchase_box" width="100%" border="0" cellpadding="0" cellspacing="0"
      :class="this.showTabs===1?'el_recharge_box':'hide'">
      <tr>
        <th>期数</th>
        <th>玩法</th>
        <th>号码</th>
        <th>消费(元)</th>
      </tr>
      <tr align="center"
        v-for="p in purchaseList | orderBy 'orderPeriod' -1" track-by="$index">
        <td>{{p.orderPeriod?p.orderPeriod.substr(2, 8):''}}</td>
        <td v-if="p.source === 1">跟单</td>
        <td v-else>{{p.gameType | getGameTypeName}}</td>
        <td>
          <div style="width:100%; height:0.8rem;">
           <table style="height:0.8rem;">
             <tr style="height:0.8rem;">
               <td style="height:0.8rem; border:none;"
                 :class="p.isCanShow === 0&&$index>1?'record_star_td':'record_number_td'"
                 v-if="p.nums" v-for="n in p.nums.split(',')">
                 {{p.isCanShow === 1 ? n : $index<2 ? n : '*'}}
               </td>
             </tr>
           </table>
          </div>
        </td>
        <td>{{p.totalPrice | currency ''}}</td>
      </tr>
    </table>

    <!-- 已中奖 -->
    <table class="el_bonus_box" width="100%" border="0" cellpadding="0" cellspacing="0"
      :class="this.showTabs===2?'el_bonus_box':'hide'">
      <tr>
        <th>期数</th>
        <th>玩法</th>
        <th>号码</th>
        <th>奖金(元)</th>
      </tr>
      <tr align="center"
        v-for="b in bonusList | orderBy 'orderPeriod' -1" track-by="$index">
        <td>{{b.orderPeriod?b.orderPeriod.substr(2, 8):''}}</td>
        <td v-if="b.source === 1">跟单</td>
        <td v-else>{{b.gameType | getGameTypeName}}</td>
        <td>
          <div style="width:100%; height:0.8rem;">
           <table style="height:0.8rem;">
             <tr style="height:0.8rem;">
               <td style="height:0.8rem; border:none;"
                 v-if="b.nums" v-for="n in b.nums.split(',')" class="record_number_td">
                 {{n}}
               </td>
             </tr>
           </table>
          </div>
        </td>
        <td>{{b.bonus | currency ''}}</td>
      </tr>
    </table>

    <!-- 提现 -->
    <table class="el_recharge_box" width="100%" border="0" cellpadding="0" cellspacing="0"
      :class="this.showTabs===3?'el_recharge_box':'hide'">
      <tr>
        <th>日期</th>
        <th>金额(元)</th>
        <th>状态</th>
      </tr>
      <tr align="center"
        v-for="w in withdrawList | orderBy 'withdraw_date' -1" track-by="$index">
        <td>{{w.withdraw_date}}</td>
        <td>{{w.withdraw_money | currency ''}}</td>
        <td>
          {{w.withdraw_status===0?'审核中':(w.withdraw_status===1?'成功':'失败')}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {api} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    this.getBill()
  },
  data () {
    return {
      showTabs: 1,
      bonusList: [],
      purchaseList: [],
      withdrawList: []
    }
  },
  methods: {
    getBill () {
      let token = window.localStorage.getItem('elToken')
      // 获取跟单选购列表
      this.$http.get(api.userBill, {}, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          this.bonusList = data.bonus
          this.purchaseList = data.purchase
          this.withdrawList = data.withdraw
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的账单失败:' + e)
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
.el_choice_box{
  width: 100%;
  height:2.5rem;
  background-color: #282828;
}
.el_purchase_btn{
  width:33%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
  color: #666666;
}
.el_bonus_btn{
  width:34%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
  color: #666666;
}
.el_cash_btn{
  width:33%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
  color: #666666;
}
.el_click_white{
  color: white;
}
.el_recharge_box,.el_purchase_box,.el_bonus_box,.el_cash_box{
  background-color: white;
}
.el_recharge_box tr{
  width: 100%;
  height: 2.5rem;
}
.el_recharge_box tr th,.el_recharge_box tr td,.el_purchase_box tr th,.el_purchase_box tr td,.el_bonus_box tr th,.el_bonus_box tr td,.el_cash_box tr th,.el_cash_box tr td{
  border: 0.05rem solid #f0f0f0;
  height: 2.5rem;
  font-size: 0.6rem;
}
.hide {
  display: none;
}
.el_bill_box{
  height: 100%;
}
.record_number_td{
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.6rem;
  color: white;
  text-align: center;
  display: block;;
  line-height: 0.8rem;
  background-color: #e23c3c;
  border-radius: 1rem;
  float: left;
}
.record_star_td{
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.6rem;
  text-align: center;
  display: block;;
  line-height: 0.8rem;
  border-radius: 1rem;
  float: left;
}
</style>
