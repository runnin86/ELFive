<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/user', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>订单</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>
    <div class="el_choice_box">
      <strong class="el_documentary_btn "
        @click="this.showTabs = 1"
        :class="this.showTabs===1?'el_click_white':''">
      跟单</strong>
      <strong class="el_optional_btn"
        @click="this.showTabs = 2"
        :class="this.showTabs===2?'el_click_white':''">
      自选</strong>
    </div>

    <!-- 自选 -->
    <div v-for="z in zxList | orderBy 'orderperiod' -1" track-by="$index">
      <div class="el_bill_box" v-if="z.docperiod > 0"
        :class="this.showTabs===2?'el_bill_box':'hide'">
        <div class="ul_bill_type">
          <span>多期订单</span>
        </div>
        <ul class="el_bill_number">
          <li v-for="n in z.nums.split(',')">{{n}}</li>
        </ul>
        <div class="el_bill_title">
          <span>2016.08.28&nbsp&nbsp22:22&nbsp/&nbsp起始期&nbsp16082908</span>
        </div>
        <div class="el_state_box">
          <span class="el_state">购买&nbsp<font color="#42c1b1">38</font>&nbsp期</span>
          <span class="el_process">已进行&nbsp<font color="#42c1b1">28</font>&nbsp期</span>
        </div>
        <div class="el_state_box">
          <span class="el_state">冻结金额&nbsp<font color="#42c1b1">640.00</font>&nbsp元</span>
          <span class="el_process">已使用金额&nbsp<font color="#42c1b1">64.00</font>&nbsp元</span>
        </div>
        <div class="el_button">
          <span class="el_stop_btn">
            {{z.bonus > 0 ? '中奖/' : '未中奖/'}}
            奖金{{z.bonus | currency '¥'}}
          </span>
        </div>
      </div>

      <div class="el_bill_box" v-if="z.docperiod === 1"
        :class="this.showTabs===2?'el_bill_box':'hide'">
        <div class="ul_bill_type">
          <span>单期订单</span>
        </div>
        <ul class="el_bill_number">
          <li v-for="n in z.nums.split(',')">{{n}}</li>
        </ul>
        <div class="el_bill_title">
          <span>2016.08.28&nbsp&nbsp22:22&nbsp/&nbsp起始期&nbsp16082908</span>
        </div>
        <div class="el_button">
          <span class="el_stop_btn">
            花费&nbsp<font color="#42c1b1">{{z.totalprice | currency '¥'}}</font>元
          </span>
        </div>
        <div class="el_button">
          <span class="el_stop_btn">
            {{z.bonus > 0 ? '中奖/' : '未中奖/'}}
            奖金{{z.bonus | currency '¥'}}
          </span>
        </div>
      </div>
    </div>
    <!-- 跟单 -->
    <div class="el_bill_box"
      v-for="g in gdList | orderBy 'orderDate' -1" track-by="$index"
      :class="this.showTabs===1?'el_bill_box':'hide'">
      <div class="ul_bill_type">
        <span>跟单</span>
      </div>
      <table width="100%" class="el_bill_number_table">
        <tr>
          <td v-for="n in g.nums | split ','">{{n}}</td>
        </tr>
      </table>
      <div class="el_bill_title">
        <span>{{g.orderDate}}&nbsp/&nbsp起始期&nbsp{{g.startPeriods}}</span>
      </div>
      <div class="el_state_box">
        <span class="el_state">
          购买&nbsp<font color="#42c1b1">{{g.totPeriods}}</font>&nbsp期
        </span>
        <span class="el_process">
          已进行&nbsp<font color="#42c1b1">{{g.alreadyPer}}</font>&nbsp期
        </span>
      </div>
      <div class="el_state_box">
        <span class="el_state">
          冻结金额&nbsp
          <font color="#42c1b1">{{g.frozeAccount | currency '¥'}}</font>
        </span>
        <span class="el_process">
          已使用金额&nbsp
          <font color="#42c1b1">{{g.nowTotAmount | currency '¥'}}</font>
        </span>
      </div>
      <div class="el_button">
        <span class="el_stop_btn">
          {{g.bonus > 0 ? '中奖/' : '未中奖'}}
          {{g.bonus > 0 ? '奖金' : ''}}
          {{g.bonus | currency '¥'}}
        </span>
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
    // 默认查询跟单
    this.getUserOrderGD()
  },
  data () {
    return {
      showTabs: 1,
      gdList: [],
      zxList: []
    }
  },
  methods: {
    /*
     * 跟单订单查询
     */
    getUserOrderGD () {
      let token = window.localStorage.getItem('token')
      // 获取跟单选购列表
      this.$http.get(api.userOrderGD, {}, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          this.gdList = data
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的订单(跟单)失败:' + e)
      })
    },
    /*
     * 自选订单查询
     */
    getUserOrderZX () {
      let token = window.localStorage.getItem('token')
      // 获取跟单选购列表
      this.$http.get(api.userORderZX, {
        pagenum: 1,
        pagesize: 10
      }, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          this.zxList = data
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的订单(自选)失败:' + e)
      })
    }
  },
  watch: {
    'showTabs': {
      handler: function (newVal, oldVal) {
        if (newVal === 1) {
          // 查询跟单订单
          this.getUserOrderGD()
        }
        else if (newVal === 2) {
          // 查询自选订单
          this.getUserOrderZX()
        }
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
.el_bill_box{
  width: 95%;
  background-color: #fff;
  overflow: hidden;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  border: 0.05rem solid #eaeaea;
}
.el_bill_title{
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_bill_title span{
  width: 100%;
  line-height: 1.3rem;
  display: block;
  text-align: center;
  font-size: 0.6rem;
}
.el_bill_number,.el_bill_number_table{
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
}
.el_bill_number_table tr td{
  line-height: 2.5rem;
  text-align: center
}
.el_bill_number li{
  width: 16.6%;
  float: left;
  display: block;
  line-height: 2.5rem;
  text-align: center
}
.el_proposal{
  height: 1.3rem;
  width: 100%;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_proposal span{
  width: 100%;
  display: block;
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.6rem;
}
.el_state_box{
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_process,.el_state{
  width: 50%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
}
.el_state{
  border-right: 0.05rem solid #f0f0f0;
}
.el_button{
  width:100%;
  height:2.5rem;
  border-top: 0.05rem solid #f0f0f0;
  background-color: #fff;
}
.el_see_btn,.el_documentary_btn{
  font-size: 0.7rem;
  width: 50%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
  float: left;
}
.el_see_btn{
  border-right: 0.05rem solid #f0f0f0;
}
.el_stop_btn{
  font-size: 0.7rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
}
.el_choice_box{
  width: 100%;
  height:2.5rem;
  background-color: #282828;
}
.el_documentary_btn,.el_optional_btn{
  width:50%;
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
.hide{
  display: none;
}
.ul_bill_type{
  width: 100%;
  height:1.8rem;
  background-color: white;
  border-bottom: 0.05rem solid #f0f0f0;
}
.ul_bill_type span{
  font-size: 0.6rem;
  line-height: 1.8rem;
  text-align: center;
  display: block;
}
</style>
