
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <div class="content" v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <!-- 顶部操作栏 -->
    <div class="el_head_box">
      <div class="el_head">
        <strong class="el_title">十一选五</strong>
        <a @click="targetUserCenter()">
          <img src="/img/11/user_icon.png" class="el_user_btn">
        </a>
      </div>

      <!-- 推荐号码 -->
      <div class="el_recommend">
        <span>推荐号码</span>
      </div>
      <div class="recommendation_number_box">
        <div>
          <span>
            {{recommendBalls | split ','| getArray 0}}
          </span>
        </div>
        <div>
          <span>
            {{recommendBalls | split ','| getArray 1}}
          </span>
        </div>
        <div>
          <span>
            {{recommendBalls | split ','| getArray 2}}
          </span>
        </div>
        <div>
          <span>
            {{recommendBalls | split ','| getArray 3}}
          </span>
        </div>
        <div>
          <span>
            {{recommendBalls | split ','| getArray 4}}
          </span>
        </div>
        <div>
          <span>
            {{recommendBalls | split ','| getArray 5}}
          </span>
        </div>
      </div>
      <!-- 推荐号码即时状态 -->
      <table class="el_info" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="border-left:#fff;">
            <p>推荐期数</p>
            <p>
              {{totperiods === null ? '-':totperiods}}
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
              {{recommendStatus === '1' ? '进行中' : recommendStatus==='2'? '已结束': '未开始'}}
            </p>
          </td>
        </tr>
      </table>

      <div class="el_recommend_state">
        <span>当前&nbsp{{currentPeriods?currentPeriods:'-'}}&nbsp期</span>
        <span>
          剩余时间&nbsp
          <font color="#c14242">
            {{countDown}}
          </font>
        </span>
      </div>

      <!-- 跟单按钮 -->
      <div class="el_documentary_btn"
        v-link="{path: '/choose', replace: true}">
        <span>跟单</span>
      </div>
    </div>

    <!-- 认购入口 -->
    <div class="subscription_box" v-link="{path: '/sub', replace: true}">
      <img src="/img/11/subscription_icon.png" class="subscription_icon">
      <div class="subscription_slogan">
        <h4>齐力夺金</h4>
        <h5>全民合力购买150期超长跟单</h5>
      </div>
      <img src="/img/11/new_icon.png" class="new_icon">
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
      <span v-if="lastWinObj" style="font-size: 0.6rem">
        第&nbsp{{lastWinObj.periods}}&nbsp期中奖号码
        <font style="background-color:#e23c3c;color:white; border-radius:1rem; margin-left:0.3rem; wdith:1rem; height:1rem; padding:0.1rem;" v-for="num in lastWinObj.nums.split(',')" track-by="$index">{{num}}</font>
      </span>
    </div>

    <!-- 自主选号区 -->
    <div class="el_pick_box">
      <div class="el_pick"
        @click="this.showSelect?this.showSelect=false:this.showSelect=true">
        <span>{{gameType ? '玩法-' : ''}}{{gameType | getGameTypeName}}<img src="/img/11/play_icon.png"></span>
      </div>
      <div class="el_pick_all"
        :style="this.showSelect ? 'display:block' : 'display:none'">
        <span @click="selectGameType('R3', 3)">玩法-任选三 (至少选择3个号码，单注奖金19元)</span>
        <span @click="selectGameType('R5', 5)">玩法-任选五 (至少选择5个号码，单注奖金540元)</span>
        <span @click="selectGameType('R6', 6)">玩法-任选六 (至少选择6个号码，单注奖金90元)</span>
        <span style="border-bottom:0.05rem #f0f0f0 solid" @click="selectGameType('R7', 7)">玩法-任选七 (至少选择7个号码，单注奖金26元)</span>
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
    <div class="el_documentary_box">
      <span class="el_documentary_amount">共{{bets}}注 {{bets*2}}元</span>
      <div class="el_optional_btn">
      <span @click="buy()">购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from '../../util/service'
import VLayer from '../../components/PullToRefreshLayer'
import {getCombinationCount, getAllPeriodsOneDay, dateFormat} from '../../util/util'
import $ from 'zepto'

var refreshMsg
export default {
  ready () {
    $.init()
    if (window.localStorage.getItem('elUser')) {
      // 根据服务器时间计算得出当前期和当前期的结束购买时间
      this.getCurrentInfoByServiceTime()
      // 登录获取推荐号码
      this.getRecommendNum()
      // 获取上期中奖号码
      this.getLatelyNum()
      // 设置定时去获取最新开奖号码
      refreshMsg = setInterval(function () {
        this.getRecommendNum()
      }.bind(this), 60000)
    }
  },
  destroyed () {
    window.clearInterval(refreshMsg)
  },
  data () {
    return {
      countDown: null,
      currentPeriods: null,
      currentStopTime: null, // 当前期结束购买时间
      serviceTime: null, // 服务器时间
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
    /*
     * 刷新
     */
    refresh () {
      $.showIndicator()
      if (window.localStorage.getItem('elUser')) {
        // 执行查询
        setTimeout(function () {
          // 根据服务器时间计算得出当前期和当前期的结束购买时间
          this.getCurrentInfoByServiceTime()
          // 登录获取推荐号码
          this.getRecommendNum()
          // 获取上期中奖号码
          this.getLatelyNum()
          // 加载完毕需要重置
          $.pullToRefreshDone('.pull-to-refresh-content')
          $.hideIndicator()
        }.bind(this), 800)
      }
    },
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
        e.target.style.backgroundColor = '#e23c3c'
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
        if (window.localStorage.getItem('elUser')) {
          let nums = ''
          for (let item of this.numberList.keys()) {
            nums += item + ','
          }
          nums = nums.substr(0, nums.length - 1)
          this.$route.router.go({
            name: 'payment',
            query: {
              number: nums,
              gameType: this.gameType,
              from: 'zx',
              price: this.bets * 2,
              maxWinC: this.maxWinC,
              s: 1
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
      if (window.localStorage.getItem('elUser')) {
        this.$route.router.go({path: '/user', query: { pageTransition: 'bounce' }, replace: false})
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
      let token = window.localStorage.getItem('elToken')
      if (token) {
        this.$http.get(api.recommendNum, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1 && data) {
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
      let token = window.localStorage.getItem('elToken')
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
     * 根据获得服务器时间,计算出当前期和当前期截止购买时间
     */
    getCurrentInfoByServiceTime () {
      let token = window.localStorage.getItem('elToken')
      this.$http.get(api.serviceTime, {}, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        if (code === 1) {
          // 根据服务器时间计算出全天的所有期
          let map = getAllPeriodsOneDay(data.replace(/\-/g, '/'))
          // console.log(map.size)
          // 获取当前期
          let currentPeriods = null
          let currentStopTime = null
          for (let [key, value] of map) {
            if (new Date(key.replace(/\-/g, '/')) > new Date(data.replace(/\-/g, '/'))) {
              // console.log(key, value)
              currentStopTime = key
              currentPeriods = value - 1
              break
            }
          }
          if (currentPeriods) {
            let t = parseInt(currentPeriods.toString().substr(8, 2), 0)
            if (t > 0 && t <= 78) {
              this.$set('serviceTime', data)
              this.$set('currentStopTime', currentStopTime)
              this.$set('currentPeriods', currentPeriods)
              window.localStorage.setItem('currentPeriods', currentPeriods)
            }
          }
        }
      }).catch((e)=>{
        // $.toast(e)
        console.error('无法连接服务器-获取时间:', e)
      }).finally(()=>{
        this.clock()
      })
    },
    clock () {
      if (this.currentStopTime === null || this.serviceTime === null) {
        return
      }
      var overa = new Date(this.currentStopTime.replace(/\-/g, '/'))
      var local = new Date(this.serviceTime.replace(/\-/g, '/'))
      var intDiff = overa.getTime() - local.getTime()
      if (intDiff <= 0) {
        return false
      }
      var day = Math.floor(intDiff / (1000 * 60 * 60 * 24))
      var hour = Math.floor(intDiff / (1000 * 60 * 60)) - (day * 24)
      var minute = Math.floor(intDiff / (1000 * 60)) - (day * 24 * 60) - (hour * 60)
      var second = Math.floor(intDiff / 1000) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      if (day <= 9) day = '0' + day
      if (hour <= 9) hour = '0' + hour
      if (minute <= 9) minute = '0' + minute
      if (second <= 9) second = '0' + second
      try {
        this.$set('countDown', minute + ':' + second)
        setTimeout(() => {
          local.setSeconds(local.getSeconds() + 1)
          this.serviceTime = dateFormat(local, 'yyyy-MM-dd HH:mm:ss')
          let run = this.clock()
          if (run !== undefined) {
            this.getCurrentInfoByServiceTime()
            // this.countDown = null
            // setTimeout(() => {
            //   this.getCurrentInfoByServiceTime()
            // }, 10000)
          }
        }, 1000)
      }
      catch (e) {
      }
      finally {
      }
    }
  },
  components: {
    VLayer
  }
}
</script>

<style scoped>
body,ul{
  margin:0;
  padding:0;
  background-color: #f0f0f0
}
h1,h2,h3,h4,h5,h6{
  margin: 0;
  padding: 0;
  font-weight: normal;
}
.el_head {
  width:100%;
  height:50px;
  overflow:hidden;
  position: relative;
}
.el_title{
  display: block;
  color:#fff;
  line-height:2.5rem;
  text-align:center;
  margin:0 auto;
  width:6rem;
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
}
.el_recommend span{
  font-size:0.6rem;
  color: #fff;
  display: block;
  width:20%;
  margin: 0 40%;
  line-height: 1rem;
  text-align: center;
}
.recommendation_number_box{
  width:100%;
  height:3rem;
}
.recommendation_number_box div{
  float: left;
  width: 16.6%;
}
.recommendation_number_box div span{
  background-image: url(/img/11/ball.png);
  background-size: 100%;
  width: 1.8rem;
  display: block;
  color: #333333;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.8rem;
  font-weight: bold;
  margin: 0.6rem auto;
  border-radius: 0.9rem;
}
.el_info{
  height: 2.5rem;
  margin: 0;
  padding: 0;
  width: 100%;
  background-image: url(/img/11/el_info_black_bg.png);
}
.el_info tr{
}

.el_info tr td{
    width: 25%;
    color: #f5f5f5;
}

.el_info tr td p{
  font-size: 0.6rem;
  line-height:0.3rem;
  width:100%;
  text-align: center;
}
.el_documentary_box{
  width:100%;
  background-color: #fff;
  border-top:solid 0.05rem #f0f0f0;
}
.el_documentary_amount{
  display: block;
  font-size: 0.6rem;
  width:60%;
  text-align: center;
  line-height: 2.5rem;
  float:left;
  background-color: white;
}
.el_documentary_btn{
  width:100%;
  background-color: white;
  height: 2.5rem;
  overflow: hidden;
}
.el_documentary_btn span{
  width: 90%;
  height: 1.7rem;
  background-color: #e23c3c;
  color: white;
  font-size: 0.7rem;
  display: block;
  border-radius: 0.1rem;
  text-align: center;
  line-height: 1.7rem;
  margin:0.2rem auto;
}
.el_optional_btn{
  width:40%;
  background-color: white;
  float: left;
  height: 2.5rem;
}
.el_optional_btn span{
  display: block;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.7rem;
  color: white;
  background-color:#e23c3c;
  width: 5rem;
  margin-top: 0.4rem;
  margin-left: 0.8rem;
  border-radius: 0.1rem;
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
  border-bottom:solid #f0f0f0 0.05rem;
}
.el_pick{
  width: 100%;
  background-color: #fff;
}
.el_pick img{
  width: 0.5rem;
  margin: 0.1rem 0.2rem;
}
.el_pick_all{
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
}
.el_number_btn tr td span{
  display: block;
  width:1.8rem;
  height:1.8rem;
  line-height: 1.8rem;
  border-radius: 2rem;
  text-align: center;
  margin: 0 auto;
  font-size: 0.7rem;
  border:0.05rem solid #f0f0f0;
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
.el_recommend_state{
  width: 100%;
  height: 1.6rem;
  background-color: white;
}
.el_recommend_state span{
  width:50%;
  line-height: 1.6rem;
  display: block;;
  text-align: center;
  font-size: 0.6rem;
  float: left;
}
.el_head_box{
  width: 100%;
  overflow: hidden;
  background-image: url(/img/11/home_bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.subscription_box{
  height: 3.7rem;
  width: 100%;
  background-color: white;
  margin-top:0.5rem;
  position:relative;
}
.subscription_icon{
  display: block;
  float: left;
  height: 2.4rem;
  margin: 0.65rem 1rem;
}
.subscription_slogan{
  height: 3.7rem;
  float: left;
}
.subscription_slogan h4{
  margin-top:0.6rem;
}
.subscription_slogan h5{
  color: #999999;
  margin-top: 0.1rem;
}
.new_icon{
  display: block;
  position: absolute;
  right: 0.4rem;
  width: 1rem;
  top: 0.4rem;
}
</style>
