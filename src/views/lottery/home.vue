
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <div class="content">

    <!-- 顶部操作栏 -->
    <div class="el_head">
      <img src="/img/11/title.png" class="el_title">
      <a @click="targetUserCenter()">
        <img src="/img/11/user_icon.png" class="el_user_btn">
      </a>
    </div>

    <!-- 推荐号码 -->
    <div class="el_recommend">
        <span>推荐号码</span>
    </div>
    <div class="recommendation_number_box">
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[0] : ''}}
        </strong>
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[1] : ''}}
        </strong>
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[2] : ''}}
        </strong>
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[3] : ''}}
        </strong>
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[4] : ''}}
        </strong>
        <strong>
          {{recommendBalls ? recommendBalls.split(',')[5] : ''}}
        </strong>
    </div>
    <!-- 推荐号码即时状态 -->
    <table class="el_info" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-left:#fff;">
          <p>推荐期数</p>
          <p>
            {{totperiods}}
          </p>
        </td>
        <td>
          <p>已进行</p>
          <p>
            {{alreadyper === null ? '-':alreadyper}}
          </p>
        </td>
        <td>
          <p>最低利润</p>
          <p>{{alreadyper === null ? '-' : '25%'}}</p>
        </td>
        <td>
          <p>状态</p>
          <p>
            {{recommendStatus === '1' ? '进行中' : '-'}}
          </p>
        </td>
      </tr>
    </table>

    <!-- 跟单按钮 -->
    <div class="el_documentary_btn"
      v-link="{path: '/choose', replace: true}">
      <span>跟单</span>
    </div>

    <!-- 推荐记录/历史号码 -->
    <ul class="el_history_record_box">
        <li class="el_recommended_record" v-link="{path: '/record', replace: true}">
            <a><img src="/img/11/recommended_record.png"></a>
            <span>推荐记录</span>
        </li>
        <li class="el_history_record" v-link="{path: '/history', replace: true}">
            <a><img src="/img/11/history_record.png"></a>
            <span>历史号码</span>
        </li>
    </ul>

    <!-- 最新开奖号码 -->
    <div class="el_news" v-link="{ path: '/history', replace: true}">
      <img src="/img/11/horn.png" class="el_horn">
      <span v-if="lastWinObj">
        第&nbsp{{lastWinObj.periods}}&nbsp期中奖号码
        &nbsp{{lastWinObj.nums.split(',').join('&nbsp&nbsp')}}
      </span>
    </div>

    <!-- 自主选号区 -->
    <div class="el_pick_box">
      <div class="el_pick"
        @click="this.showSelect?this.showSelect=false:this.showSelect=true">
        <span>{{gameType | gameTypeFilter}}</span>
      </div>
      <div class="el_pick_all"
        :style="this.showSelect ? 'display:block' : 'display:none'">
        <span @click="selectGameType('R5', 5)">玩法-任选五</span>
        <span @click="selectGameType('R6', 6)">玩法-任选六</span>
        <span @click="selectGameType('R7', 7)">玩法-任选七</span>
      </div>
    </div>

    <!-- 选号区数字按钮 -->
    <table class="el_number_btn" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td><span z-name="ball" @click="choseNumber('01', $event)">01</span></td>
        <td><span z-name="ball" @click="choseNumber('02', $event)">02</span></td>
        <td><span z-name="ball" @click="choseNumber('03', $event)">03</span></td>
        <td><span z-name="ball" @click="choseNumber('04', $event)">04</span></td>
        <td><span z-name="ball" @click="choseNumber('05', $event)">05</span></td>
        <td><span z-name="ball" @click="choseNumber('06', $event)">06</span></td>
      </tr>
      <tr>
        <td><span z-name="ball" @click="choseNumber('07', $event)">07</span></td>
        <td><span z-name="ball" @click="choseNumber('08', $event)">08</span></td>
        <td><span z-name="ball" @click="choseNumber('09', $event)">09</span></td>
        <td><span z-name="ball" @click="choseNumber('10', $event)">10</span></td>
        <td><span z-name="ball" @click="choseNumber('11', $event)">11</span></td>
        <td>&nbsp</td>
      </tr>
    </table>

    <!-- 购买按钮 -->
    <div class="el_documentary_btn">
      <span @click="buy()">共{{bets}}注 {{bets*2}}元购买</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {api} from '../../util/service'
import {getCombinationCount} from '../../util/util'
import $ from 'zepto'

Vue.filter('gameTypeFilter', function (gt) {
  // 计算时间差
  let name = ''
  if (gt === 'R5') {
    name = '玩法-任选五'
  }
  else if (gt === 'R6') {
    name = '玩法-任选六'
  }
  else if (gt === 'R7') {
    name = '玩法-任选七'
  }
  return name
})
var refreshMsg
export default {
  ready () {
    $.init()
    if (window.localStorage.getItem('user')) {
      // 登录获取推荐号码
      this.getRecommendNum()
      // 获取上期中奖号码
      this.getLatelyNum()
      refreshMsg = setInterval(function () {
        this.getRecommendNum()
      }.bind(this), 15000)
    }
  },
  destroyed () {
    window.clearInterval(refreshMsg)
  },
  data () {
    return {
      serviceTime: '',
      bets: 0,
      maxWinC: 0, // 多选情况下最多可能中奖的组合数
      numberList: new Set(), // 用户选中的号码
      showSelect: false, // 玩法选择
      gameType: 'R5', // 玩法类型
      minBall: 5, // 玩法最少选择多少球
      recommendBalls: null, // 推荐号码
      recommendStatus: null, // 推荐号码的状态
      totperiods: null, // 推荐号码的总期数
      alreadyper: null, // 推荐号码已进行期数
      lastWinObj: null // 上期中奖对象
    }
  },
  methods: {
    selectGameType (t, min) {
      this.gameType = t
      this.minBall = min
      this.showSelect = false
      // 清空已选号码
      this.numberList.clear()
      // 重置注数和最多中奖可能数
      this.bets = 0
      this.maxWinC = 0
      // 清空已选号码样式
      $("[z-name='ball']").each((i)=>{
        let spanStyle = $("[z-name='ball']")[i].style
        spanStyle.backgroundColor = ''
        spanStyle.color = ''
        spanStyle.border = ''
      })
    },
    choseNumber (num, e) {
      // 判断是否已选
      if (this.numberList.has(num)) {
        // 包含则删除
        this.numberList.delete(num)
        e.target.style.backgroundColor = ''
        e.target.style.color = ''
        e.target.style.border = ''
      }
      else {
        // 不包含则新增
        this.numberList.add(num)
        e.target.style.backgroundColor = '#42c1b1'
        e.target.style.color = 'white'
        e.target.style.border = 'none'
      }
      // 数据转换
      let nums = []
      for (let item of this.numberList.keys()) {
        nums.push(item)
      }
      // 计算多少注
      if (this.numberList.size >= this.minBall) {
        this.bets = getCombinationCount(this.numberList.size, this.minBall)
        // 最多可能中奖的组合数
        let m = this.numberList.size - 5
        let n = this.numberList.size - this.minBall
        this.maxWinC = getCombinationCount(m, n)
      }
      else {
        this.$set('bets', 0)
      }
    },
    /*
     * 选中购买
     */
    buy () {
      if (this.numberList.size >= this.minBall) {
        if (window.localStorage.getItem('user')) {
          let nums = []
          for (let item of this.numberList.keys()) {
            nums.push(item)
          }
          this.$route.router.go({
            name: 'payment',
            query: {
              price: this.bets * 2,
              maxWinC: this.maxWinC
            },
            params: {
              number: nums,
              gameType: this.gameType,
              from: 'zx'
            },
            replace: false
          })
        }
        else {
          $.toast('你尚未登录')
          this.$route.router.go({path: '/login', replace: false})
        }
      }
      else {
        $.toast('本玩法至少选择' + this.minBall + '个号码')
      }
    },
    /*
     * 用户中心跳转
     */
    targetUserCenter () {
      if (window.localStorage.getItem('user')) {
        this.$route.router.go({path: '/user', replace: true})
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login', replace: false})
      }
    },
    /*
     * 获取推荐号码
     */
    getRecommendNum () {
      let token = window.localStorage.getItem('token')
      if (token) {
        this.$http.get(api.recommendNum, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1) {
            this.recommendBalls = data.nums
            this.totperiods = data.totperiods
            this.alreadyper = data.alreadyper
            this.recommendStatus = data.processtatus
          }
        }).catch((e)=>{
          console.error('获取推荐号码失败:' + e)
        })
      }
    },
    /*
     * 获取上期中奖号码
     */
    getLatelyNum () {
      let token = window.localStorage.getItem('token')
      if (token) {
        this.$http.get(api.lastWinNum, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1) {
            this.lastWinObj = data
          }
        }).catch((e)=>{
          console.error('获取上一期中奖号码失败:' + e)
        })
      }
    },
    /*
     * 获取服务器时间
     */
    getServiceTime () {
      this.$http.post(api.serviceTime, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        }
      })
      .then(({data: {code, data, msg}})=>{
        if (code === 1) {
          this.serviceTime = data
        }
      }).catch(()=>{
        console.error('无法连接服务器-获取时间')
      }).finally(()=>{
      })
    }
  }
}
</script>

<style scoped>
body,ul{
  margin:0;
  padding:0;
  background-color: #f0f0f0
}
.el_head {
  width:100%;
  height:50px;
  background-color: #282828;
  overflow:hidden;
  position: relative;
}
.el_title{
  display: block;
  color:#fff;
  line-height:2.5rem;
  text-align:center;
  margin:0.8rem auto;
  width:4rem;
}
.el_user_btn{
  position: absolute;
  right:0;
  top:0;
  padding:0.7rem 0.7rem;
  width:2.5rem;
  height:2.5rem;
}
.el_recommend{
  width:100%;
  height:1rem;
  background-color: #282828;
}
.el_recommend span{
  font-size:0.6rem;
  color: #fff;
  display: block;
  width:100%;
  line-height: 1rem;
  text-align: center;
}
.recommendation_number_box{
  width:100%;
  height:3rem;
  background-color: #282828;
}
.recommendation_number_box strong{
  color: #fff;
  line-height: 2.9rem;
  display: block;
  float: left;
  text-align: center;
  font-size: 1.4rem;
  width: 16.6%;
}
.el_info{
  margin: 0;
  padding: 0;
  width:100%;
  background-color: #fff;
  height:2.5rem;
}
.el_info tr{
  height:2.5rem;
}

.el_info tr td{
    width:25%;
    border-left:1px solid #f0f0f0;
}

.el_info tr td p{
  font-size: 0.6rem;
  line-height:0.4rem;
  width:100%;
  text-align: center;
}
.el_documentary_btn{
  width:100%;
  height:2.5rem;
  background-color: #fff;
  border-top:solid 0.05rem #f0f0f0;
}
.el_documentary_btn span{
  display: block;
  font-size: 0.7rem;
  width:100%;
  text-align: center;
  line-height: 2.5rem;
  color: #42c1b1;
}
.el_history_record_box{
  width:100%;
  background-color: #fff;
  margin-top:0.5rem;
  height:3.7rem;
}
.el_recommended_record,.el_history_record{
  width:50%;
  height:100%;
  float: left;
  list-style: none;
}
.el_recommended_record{
  border-right:0.05rem solid #f0f0f0;
}
.el_recommended_record span,.el_history_record span{
  width: 100%;
  display: block;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.5rem;
}
.el_recommended_record img,.el_history_record img{
  height:1.2rem;
  display: block;
  margin:0 auto;
  margin-top:0.8rem;
}
.el_news{
  width:100%;
  height:2.5rem;
  background-color: #fff;
  margin-top:0.5rem;
  position: relative;
}
.el_news span{
  display: block;
  line-height: 2.5rem;
  font-size: 0.7rem;
  margin-left: 1.7rem;
}
.el_horn{
  display: block;
  width: 0.8rem;
  top: 0.8rem;
  left: 0.5rem;
  position: absolute;
}
.el_pick_box{
  width: 100%;
  margin-top: 0.5rem;
  position: relative;
}
.el_pick{
  width: 100%;
  background-color: #fff;
}
.el_pick_all{
  box-shadow:0px 3px 3px #dbdbdb;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 1.8rem;
  left: 0;
}
.el_pick span{
  display: block;
  line-height: 1.8rem;
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
}
.el_pick_all span{
  display: block;
  line-height: 1.8rem;
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  border-top:0.05rem solid #f0f0f0;
}
.el_number_btn{
  background-color: #fff;
}
.el_number_btn tr{
  width: 100%;
  height: 2.5rem;
  border-top:0.05rem solid #f0f0f0;
}
.el_number_btn tr td{
  border-left:0.05rem solid #f0f0f0;
}
.el_number_btn tr td span{
  display: block;
  border:0.05rem solid #f0f0f0;
  width:1.8rem;
  height:1.8rem;
  line-height: 1.8rem;
  border-radius: 2rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0.7rem;
}
.el_number_click{
  display: block;
  width:1.6rem;
  height:1.6rem;
  line-height: 1.6rem;
  border-radius: 2rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0.7rem;
  background-color: red;
  color: white;
}
</style>
