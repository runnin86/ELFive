<template>
<div class="content" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
      <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">我的订单</h1>
  </header>
  <div class="order" distance="55"
    v-pull-to-refresh="refresh" v-infinite-scroll="loadMore"
    :style="(!this.user?'background-color:white':'')">
    <v-layer></v-layer>
    <!-- 内容区 -->
    <v-tabs type="tab" class-name="article-tabs" style="margin-top:0.1rem;">
      <v-tab name="tab-planList" status="active" title="我的方案">
        <div style="margin-top:0.1rem;" class="list">
          <div class="list-block">
            <ul>
              <li class="border"
                v-for="p in planList | orderBy 'purchase_date' -1"
                v-link="{name: 'planDetail', params: { id: p.plan_id }, activeClass: 'active', replace: false}">
                <div class="row" style="margin-right:0.4rem;">
                  <div class="col-50">
                    <div style="margin-left:0.4rem;">
                      &nbsp;{{p.expert_name}}
                      <font style="font-size:0.48rem;">[{{p.plan_name}}]</font>
                    </div>
                  </div>
                  <div class="col-50">
                    <font class="icon-clock2 pull-right">
                      <font style="font-size:0.58rem;margin-top:0.18rem;color:#FF4500;">
                        {{p.purchase_date}}
                      </font>
                    </font>
                  </div>
                </div>
                <div class="text-center" style="margin:0.38rem;font-size:0.56rem;">
                  <img v-if="p.plan_result==='中奖'" src="/img/个人中心/胜利2.png"
                    width=43 height=32>
                  <font v-if="p.plan_result===null">
                      &nbsp;等待开奖&nbsp;
                  </font>
                  <font v-else>
                      &nbsp;{{p.plan_result}}&nbsp;
                  </font>
                </div>
                <div class="row"
                  :style="{'background-color': p.plan_result==='中奖'?'#FF4500':'#f9f9f9' }"
                  style="font-size:0.50rem;margin:0.1rem;">
                  <div class="col-40">
                    购买金额:{{p.totalPrice}}
                  </div>
                  <div class="col-20">
                    倍数:{{p.totalMultiple}}
                  </div>
                  <div class="col-40">
                    <font class="pull-right" style="margin-right:0.2rem;">
                      收益:{{p.totalBonus>p.totalPrice?Math.round(parseFloat(p.totalBonus-p.totalPrice)*100)/100:0}}
                    </font>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div :style="{display:planTips}"
          style="width:100%;height:100%;text-align:center;">
          <div>
            <img src="/img/专家方案/温馨提示.png" height="24" width="152">
          </div>
          <div style="font-size:0.38rem;color:#A9A9A9;">
            您还没有方案记录,赶快去购买方案吧
          </div>
        </div>
      </v-tab>

      <v-tab name="tab-hpList" title="一元夺宝">
        <div style="margin-top:0.1rem;" class="list">
          <v-card-container v-for="p in hpList | orderBy 'id' -1" style="margin: 0.18rem;">
            <div class="row">
              <div v-if="showImg" class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img :src="p.images| split ','| getArray 0" style="width: 130%;height:130%;">
              </div>
              <div v-else class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img src="/img/乐夺宝/产品图片默认.png" style="width: 130%;height:130%;">
              </div>
              <div class="col-78">
                <card type="content-inner" style="margin-bottom:0.1rem;">
                  <div style="font-size:.8rem;">{{'第'+p.number+'期 '+p.name}}</div>
                  <div style="font-size:.6rem;">
                    本期参与人次:<font color="red"> {{p.payCount}}</font>
                  </div>
                  <div v-if="p.status==0 && !this.isShowTime(p.publicTime).show" class="row"
                    :style="(p.userId!==user.user_id?'background-color:#EEEEEE':'')" style="margin-top: 0.2rem;">
                    <div style="margin:0.2rem 0.2rem 0.2rem 0.4rem;">
                      <span id="knowResult">
                        <div>
                          中奖号码: <font color="red"> {{p.luckCode}}</font>
                        </div>
                        <div>
                          <span>获奖者: {{p.user_name}}<span>
                          <span class="pull-right" style="margin-right: 0.6rem;padding: .1rem;">
                            <font v-if="p.userId!==user.user_id" color="green">已揭晓</font>
                            <img v-if="p.userId===user.user_id" src="/img/个人中心/胜利2.png"
                              width=43 height=32>
                          <span>
                        </div>
                        <div>
                          人次: <font color="red"> {{p.userPayCount}}</font>
                        </div>
                        <div>
                          日期: {{p.publicTime}}
                        </div>
                      </span>
                    </div>
                  </div>
                  <div v-if="p.status==0 && this.isShowTime(p.publicTime).show" class="row">
                    <span style="margin-top: -2rem;">
                      <div style="margin-left:0.4rem;">揭晓倒计时</div>
                      <v-count-down :countTime="this.isShowTime(p.publicTime).time" :id="p.id"></v-count-down>
                      <div>
                      </div>
                    </span>
                  </div>
                  <div v-if="p.status==1" class="row" style="margin-top: 0.2rem;">
                    <div class="col-90">
                      <card type="content-inner" style="padding:0.1rem">
                        <div class="progress" style="height:10px;">
                          <span v-if="parseFloat((p.totalCount-p.remainingAmount)/p.totalCount) > 0"
                            class="blue"
                            :style="{ height: '8px', width: parseFloat((p.totalCount-p.remainingAmount)/p.totalCount)*100 + '%' }"></span>
                        </div>
                      </card>
                      <card type="header" style="margin-bottom:-0.68rem;">
                        <span style="font-size:.6rem;">
                          <div>{{p.totalCount}}</div><div>总需</div>
                        </span>
                        <span style="font-size:.6rem;">
                          <div>{{p.remainingAmount}}</div><div>剩余</div>
                        </span>
                      </card>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </v-card-container>
        </div>
        <div :style="{display:hpTips}"
          style="width:100%;height:100%;text-align:center;margin-top:3rem">
          <div>
            <img src="/img/专家方案/温馨提示.png" height="24" width="152">
          </div>
          <div style="font-size:0.38rem;color:#A9A9A9;">
            您还没有乐夺宝记录,赶快去夺宝吧
          </div>
        </div>
      </v-tab>
    </v-tabs>
  </div>
</div>
</template>

<script>
import VTabs from '../../components/Tabs'
import VTab from '../../components/Tab'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import VCountDown from '../../components/Countdown'
import VLayer from '../../components/PullToRefreshLayer'
import {loader} from '../../util/util'
import {hpApi, planApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    this.refresh()
    // $('.buttons-tab').fixedTab({offset: 644})
    $('.order').on('scroll', function () {
      let top1 = $('.order').scrollTop()
      $('.buttons-tab').css({
        top: top1 - 2,
        'z-index': 100
      })
    })
  },
  data () {
    return {
      loading: false,
      user: JSON.parse(window.localStorage.getItem('user')),
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      userate: 0,
      coinmeter: 0,
      planList: [],
      planListPageNum: 0,
      planTips: 'none',
      hpList: [],
      hpListPageNum: 0,
      hpTips: 'none'
    }
  },
  computed: {
    length () {
      return this.hpList.length
    }
  },
  methods: {
    /*
     * 刷新
     */
    refresh () {
      if (this.user) {
        $.showIndicator()
        // 执行查询
        setTimeout(function () {
          // 需要清空分页信息
          this.hpList = []
          this.hpListPageNum = 0
          this.planList = []
          this.planListPageNum = 0
          // 获取用户方案记录
          this.getPlanList(1)
          // 获取用户夺宝记录
          this.getHpList(this.user.user_id, 0)
          // 加载完毕需要重置
          $.pullToRefreshDone('.pull-to-refresh-content')
          $.hideIndicator()
        }.bind(this), 500)
      }
      else {
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
      }
    },
    /*
     * 加载更多
     */
    loadMore () {
      let activeTab = $('.active.button.tab-link')[0].hash
      if (activeTab === '#tab-planList') {
        // this.loadMorePlan()
      }
      else if (activeTab === '#tab-hpList') {
        this.loadMoreHp()
      }
    },
    loadMoreHp () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.hpListPageNum === -1 ||
        (this.hpList.length < (this.hpListPageNum + 1) * 10)) {
        // 满足上述3条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.hpListPageNum = this.hpListPageNum + 1
        this.getHpList(this.user.user_id, this.hpListPageNum)
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    loadMorePlan () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.planListPageNum === -1 ||
        (this.planList.length < (this.planListPageNum + 1) * 10)) {
        // 满足上述3条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.planListPageNum = this.planListPageNum + 1
        this.getPlanList(this.planListPageNum)
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    /*
     * 获取用户方案记录
     */
    getPlanList (num) {
      this.$http.post(planApi.myplan + '?pagenum=' + num, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        // console.log(msg + '->' + result)
        if (code === 1) {
          if (result.length === 0) {
            this.$set('planTips', 'block')
            this.planListPageNum = -1
            return
          }
          for (var i = 0; i < result.length; i++) {
            this.planList.push(result[i])
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.log('获取用户方案记录失败:')
        console.error(e)
      })
    },
    /*
     * 获取用户的所有参与(乐夺宝)
     */
    getHpList (uid, num) {
      if (this.user.user_id) {
        this.$http.get(hpApi.userOneBuyOrder + '?userId=' + uid + '&pagenum=' + num)
        .then(({data: {code, msg, results}})=>{
          if (code === 1) {
            if (results.list.length === 0) {
              this.$set('hpTips', 'block')
              this.hpListPageNum = -1
              return
            }
            for (var i = 0; i < results.list.length; i++) {
              this.hpList.push(results.list[i])
            }
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('获取用户参与记录失败:' + e)
        })
      }
    },
    /*
     * 是否展示倒计时
     */
    isShowTime (time) {
      let pubTime = new Date(Date.parse(time.replace(/-/g, '/')))
      let now = new Date()
      // pubTime.setHours(pubTime.getHours() + 9)
      // now.setMinutes(now.getMinutes() + 15)
      if (now < pubTime) {
        // 展示倒计时
        return {show: true, time: pubTime}
      }
      else {
        // 展示结果
        return {show: false, time: pubTime}
      }
    }
  },
  components: {
    VTabs,
    VTab,
    VCardContainer,
    Card,
    VLayer,
    VCountDown
  }
}
</script>

<style scoped>
.order {
  top: 0rem !important;
}
#knowResult{
  font-size: 0.48rem;
}
.color {
  background-color: #ed8e07;
}
.list-block {
  margin: 0rem 0;
  height: 2.9rem;
  font-size:0.72rem;

  ul {
    height: 2.9rem;
  }
}
.border {
  margin-bottom: .1rem;
  /*border-top: 1px dotted;
  border-bottom: 2px solid transparent;*/
  border: 1px solid #a0a0a0;
  border-radius: 0.25rem;
}
</style>
