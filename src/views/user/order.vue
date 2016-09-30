<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce" v-infinite-scroll="loadMore">
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
        @click="resizeQuery(1)"
        :class="this.showTabs===1?'el_click_white':''">
      跟单</strong>
      <strong class="el_optional_btn"
        @click="resizeQuery(2)"
        :class="this.showTabs===2?'el_click_white':''">
      自选</strong>
      <strong class="el_optional_single_btn"
        @click="resizeQuery(3)"
        :class="this.showTabs===3?'el_click_white':''">
      自选单注</strong>
    </div>

    <!-- 跟单 -->
    <div class="el_record_box"
      v-for="g in gdList | orderBy 'orderDate' -1" track-by="$index"
      :class="this.showTabs===1?'el_bill_box':'hide'">
      <table class="record_number_table">
        <tr class="record_number_box">
          <td class="record_number">
            <span>{{g.dailyNo.substr(4,2)}}/{{g.dailyNo.substr(6,2)}} 推荐{{g.dailyNo.substr(8,2)}}</span>
          </td>
          <td v-for="n in g.nums | split ','">
            <span class="record_number_span">{{g.payStatus === 1 ? n : '*'}}</span>
          </td>
        </tr>
      </table>
      <ul class="el_state_top_box">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">起始期</span>
          <span>{{g.startPeriods}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">进行</span>
          <span><font color="#42c1b1">{{g.alreadyPer}}</font>/{{g.totPeriods}}期</span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">中奖金额</span>
          <span>
            <font color="#42c1b1">{{g.bonus | currency '¥'}}</font>
          </span>
        </li>
      </ul>
      <ul class="el_state_top_box" style="border-top:solid #f5f5f5 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">冻结金额</span>
          <span>{{g.frozeAccount | currency '¥'}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">已使用金额</span>
          <span>{{g.nowTotAmount | currency '¥'}}</span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">利润率</span>
          <span>{{g.ratePercent}}%</span>
        </li>
      </ul>
      <div class="el_state_box">
        <span v-if="g.docStatus===1" style="color:#42c1b1">
          进行中
        </span>
        <span v-if="g.docStatus===0" style="color:#999999">
          订单已取消
        </span>
        <span v-if="g.docStatus===2">
          已结束
        </span>
      </div>
    </div>

    <!-- 自选追号 -->
    <div class="el_record_box"
      v-for="more in zxListMore" track-by="$index"
      :class="this.showTabs===2?'el_bill_box':'hide'">
      <div class="el_title_rule">
        <span>{{more.gameType | getGameTypeName}}</span>
      </div>
      <table class="el_record_number_table">
        <tr class="el_record_number_box">
          <td class="el_record_number">
            <span>{{$index+1}}</span>
          </td>
          <th v-if="more.nums" v-for="n in more.nums.split(',')">{{n}}</th>
        </tr>
      </table>
      <ul class="el_state_top_box" style="border-top:solid #f5f5f5 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">起始期</span>
          <span>{{more.startPeriods}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">进行</span>
          <span>
            <font color="#42c1b1">{{more.alreadyPer}}</font>/{{more.totPeriods}}期
          </span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">中奖金额</span>
          <span>
            <font color="#42c1b1">{{more.bonus | currency '¥'}}</font>
          </span>
        </li>
      </ul>
      <ul class="el_state_top_box" style="border-top:solid #f5f5f5 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">冻结金额</span>
          <span>{{more.totMount - more.nowTotAmount | currency '¥'}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">已使用金额</span>
          <span>{{more.nowTotAmount | currency '¥'}}</span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">利润率</span>
          <span>{{more.ratePercent}}%</span>
        </li>
      </ul>
      <div class="el_state_box">
        <span v-if="more.docStatus==1" style="color:#42c1b1">
          进行中
        </span>
        <span v-if="more.docStatus==0" style="color:#999999">
          订单已取消
        </span>
        <span v-if="more.docStatus==2">
          已结束
        </span>
      </div>
      <div class="el_stop_btn" v-if="more.docStatus==='1'" @click="cancelZX(more.did)">
        <span>
          终止追单
        </span>
      </div>
    </div>


    <!-- 自选单注 -->
    <div class="el_record_box"
      v-for="one in zxListOne" track-by="$index"
      :class="this.showTabs===3?'el_bill_box':'hide'">
      <div class="el_title_rule">
        <span>{{one.gametype | getGameTypeName}}</span>
      </div>
      <table class="el_record_number_table">
        <tr class="el_record_number_box">
          <td class="el_record_number">
            <span>{{$index+1}}</span>
          </td>
          <th v-for="n in one.nums | split ','">{{n}}</th>
        </tr>
      </table>
      <ul class="el_state_top_box"  style="border-top:solid #f5f5f5 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">期数</span>
          <span>{{one.orderperiod}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">使用金额</span>
          <span>{{one.totalprice | currency '¥'}}</span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">中奖金额</span>
          <span v-if="one.orderstatus === 1">
            {{one.bonus | currency '¥'}}
          </span>
          <span v-else>
            进行中
          </span>
        </li>
      </ul>
      <div class="el_state_box">
        <span v-if="one.orderstatus==0" style="color:#42c1b1">
          进行中
        </span>
        <span v-if="one.orderstatus==1">
          已结束
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import {loader} from '../../util/util'
import {api} from '../../util/service'

let num = 1
let size = 10
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
      zxListOne: [],
      zxListMore: [],
      pagenum: num,
      pagesize: size,
      loading: false
    }
  },
  methods: {
    /*
     * 跟单订单查询
     */
    getUserOrderGD () {
      // 无分页默认不加载更多
      this.loading = false
      loader.hide()
      this.pagenum = -1
      let token = window.localStorage.getItem('elToken')
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
     * 自选订单查询(单注)
     */
    getUserOrderZXOne () {
      let token = window.localStorage.getItem('elToken')
      // 获取跟单选购列表
      this.$http.get(api.userORderZXOne, {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          if (data) {
            if (data.length === 0) {
              this.pagenum = -1
              return
            }
            for (let m of data) {
              this.zxListOne.push(m)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的订单(自选单注)失败:' + e)
      }).finally(()=>{
        this.loading = false
        loader.hide()
      })
    },
    /*
     * 自选订单查询(追号)
     */
    getUserOrderZXMore () {
      let token = window.localStorage.getItem('elToken')
      // 获取跟单选购列表
      this.$http.get(api.userORderZXMore, {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          if (data) {
            if (data.length === 0) {
              this.pagenum = -1
              return
            }
            for (let m of data) {
              this.zxListMore.push(m)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的订单(自选跟单)失败:' + e)
      }).finally(()=>{
        this.loading = false
        loader.hide()
      })
    },
    /*
     * 自选跟单取消
     */
    cancelZX (did) {
      $.confirm('是否终止跟单,终止后不可恢复?', '提示', ()=>{
        let token = window.localStorage.getItem('elToken')
        this.$http.post(api.cancelOrderByZX, {
          did: did
        }, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            this.getUserOrderZXMore()
          }
          $.toast(msg)
        }).catch((e)=>{
          console.error('用户自选跟单取消失败:' + e)
        })
      }, ()=>{
        // 取消事件
      })
    },
    /*
     * 切换时重新设置查询
     */
    resizeQuery (t) {
      this.$set('showTabs', t)
      // 分页
      this.$set('pagenum', num)
      this.$set('pagesize', size)
      this.$set('loading', false)
      // 数据
      this.$set('gdList', [])
      this.$set('zxListOne', [])
      this.$set('zxListMore', [])
    },
    /*
     * 读取更多数据
     */
    loadMore () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.pagenum === -1) {
        // 满足上述2条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.native-scroll')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.pagenum = this.pagenum + 1
        // 需要判断执行哪个查询
        switch (this.showTabs)
        {
          case 1:
            this.getUserOrderGD()
            break
          case 2:
            this.getUserOrderZXMore()
            break
          case 3:
            this.getUserOrderZXOne()
            break
          default:
            this.loading = false
            loader.hide()
            break
        }
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
      }, 500)
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
          // 查询自选订单(跟单)
          this.getUserOrderZXMore()
        }
        else if (newVal === 3) {
          // 查询自选订单(单注)
          this.getUserOrderZXOne()
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
}
.el_bill_title{
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
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
  border-top: 0.05rem solid #f5f5f5;
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
  border-top: 0.05rem solid #f5f5f5;
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
  border-right: 0.05rem solid #f5f5f5;
}
.el_button{
  width:100%;
  height:2.5rem;
  border-top: 0.05rem solid #f5f5f5;
  background-color: #fff;
}
.el_order_status_box{
  width:100%;
  height:2.5rem;
  border-top: 0.05rem solid #f5f5f5;
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
  border-right: 0.05rem solid #f5f5f5;
}
.el_stop_btn,.el_order_status{
  font-size: 0.7rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
}
.el_stop_btn{
  border-top:0.05rem solid #f5f5f5;
}
.el_choice_box{
  width: 100%;
  height:2.5rem;
  background-color: #282828;
}
.el_documentary_btn{
  width: 33%;
}
.el_optional_btn{
  width: 34%;
}
.el_optional_single_btn{
  width: 33%;
}
.el_documentary_btn,.el_optional_btn,.el_optional_single_btn{
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
  border-bottom: 0.05rem solid #f5f5f5;
}
.ul_bill_type span{
  font-size: 0.6rem;
  line-height: 1.8rem;
  text-align: center;
  display: block;
}
.record_number_table{
  width: 100%;
  background-color: #42c1b1;
  height: 2.5rem;
}
.el_record_number_table{
  width: 100%;
  overflow: hidden;
}
.el_record_box{
  width: 96%;
  margin: 0.5rem 2%;
  background-color: white;
}
.el_record_number{
  width: 12%;
  text-align: center;
  padding-right: 0.3rem;
}
.el_record_number span{
  height: 1rem;
  background-color: #42c1b1;
  color: white;
  display: block;
  line-height: 1rem;
  font-size: 0.7rem;
}
.record_number{
  width: 36%;
  text-align: center;
}
.record_number span{
  color: white;
  display: block;
  font-size: 0.7rem;
}
.el_state_top_box{
  width: 100%;
  height: 2.5rem;
}
.el_state_top_box li{
  display: block;
  float: left;
}
.el_state_top_box li span{
  font-size: 0.6rem;
  display: block;
  text-align: center;
}
.el_state_top_1{
  width: 33%;
  height: 2.5rem;
}
.el_state_top_3{
  width: 33%;
  height: 2.5rem;
}
.el_state_top_2{
  width: 34%;
  height: 2.5rem;
}
.el_state_top_margin{
  margin-top:0.3rem;
}
.el_title_rule{
  width: 100%;
  height: 1.6rem;
  border-bottom: solid #f5f5f5 0.05rem;
}
.el_title_rule span{
  display: block;
  line-height: 1.6rem;
  text-align: center;
  font-size: 0.6rem;
}
.el_state_box{
  width: 100%;
  background-color: white;
}
.el_state_box span{
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.7rem;
  display: block;
}
.record_number_span{
  width: 100%;
  font-size: 0.7rem;
  color: white;
  text-align: left;
  display: block;;
  font-weight: bold;
  line-height: 2.5rem;
}
</style>
