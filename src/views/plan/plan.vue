<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <!-- 轮播图 -->
    <slider :banner="$root.planBanner" :vertical="false" style="z-index:9999;"></slider>

    <!-- 快捷入口 -->
    <bar class="home-bar">
      <bar-item path="/plan/rank" label="周盈利排行" img="/img/专家方案/盈利排行.png" h=42 i=38></bar-item>
      <bar-item label="充值" img="/img/专家方案/充值.png" h=42 i=38 @click="recharge()"></bar-item>
      <bar-item path="/user/help" label="帮助" img="/img/专家方案/帮助.png" h=42 i=38></bar-item>
    </bar>
    <!-- 盈利滚动展示 -->
    <card type="content" class-name="scrollPlan">
      <div class="row">
        <div class="col-10" style="line-height:2rem;">
          <img src="/img/专家方案/喇叭.png" style="height:1rem;margin-left:0.2rem;margin-bottom:-0.2rem;">
        </div>
        <div class="col-90">
          <slider :banner="$root.planScrollMsg" :vertical="true" :animate-time=800 style="z-index:9999;height:2rem;"></slider>
        </div>
      </div>
    </card>

    <!-- 内容区 -->
    <div style="margin-bottom:4rem;">
      <v-card-container v-for="r in $root.rangeList | orderBy 'id' -1"
        style="margin: 0.18rem;background-color:#f9f9f9;">
        <div v-if="length>0">
          <card type="header" style="font-size:0.68rem;background-color:#ffffff;">
            <div style="width:180%;">
              <span class="icon-histogram" style="font-size:1rem;color:red;">
                <font style="font-size:0.68rem;color:black;">
                  {{r.range_name}}
                </font>
              </span>
              <span class="pull-right icon-piechart" style="font-size:1rem;color:red;">
                <font style="font-size:0.68rem;color:black;"
                  v-if="r.rangeSaleLimit-r.rangeSaled>=0">
                  限购剩余 {{r.rangeSaleLimit-r.rangeSaled}} 元
                </font>
                <!-- <font style="font-size:0.68rem;color:black;" v-else>
                  不限购
                </font> -->
                <font style="font-size:0.68rem;color:black;"
                  v-if="r.range_id === '005'">
                  个人限购区
                </font>
              </span>
            </div>
          </card>
          <card type="content">
            <div class="list-block infinite-list">
              <ul>
                <div v-for="p in r.plans | orderBy 'plan_status' 1">
                  <li class="item-content" style="margin-bottom:-0.6rem;"
                    v-for="l in $root.limitPlans"
                    v-if="p.plan_id === l.planId">
                    <div class="tipsDiv">
                      <span>
                        本次方案限购金额为您的可用余额的{{l.limitConfig*100}}%
                      </span>
                      <span class="pull-right">
                        当日可购
                        <font style="color:#FFD700">
                          {{l.limitAmount}}
                        </font>
                        元
                      </span>
                    </div>
                  </li>
                  <li class="item-content spliteLine"
                    v-link="{name: 'planDetail', params: { id: p.plan_id }, activeClass: 'active', replace: false}">
                    <div class="item-media">
                      <img :src="p.expert_photo" class="img-responsive"
                        style="margin-left:-0.28rem;"
                        width="42" height="46">
                    </div>
                    <div class="item-inner text-sml" style="font-size:0.68rem;margin-left:0.56rem;">
                      <div style="width: 22%;">
                        <div>{{p.expert_name}}</div>
                        <div>
                          <!-- planConfident:-1默认为3 -->
                          <img v-if="p.planConfident===-1 || p.planConfident>0" src="/img/专家方案/信心.png" width="12" height="12">
                          <img v-if="p.planConfident===-1 || p.planConfident>1" src="/img/专家方案/信心.png" width="12" height="12"
                            style="margin-left:-0.1rem;">
                          <img v-if="p.planConfident===-1 || p.planConfident>2" src="/img/专家方案/信心.png" width="12" height="12"
                            style="margin-left:-0.1rem;">
                          <img v-if="p.planConfident>3" src="/img/专家方案/信心.png" width="12" height="12"
                            style="margin-left:-0.1rem;">
                          <img v-if="p.planConfident>4" src="/img/专家方案/信心.png" width="12" height="12"
                            style="margin-left:-0.1rem;">
                        </div>
                      </div>
                      <div class="icon-golds" style="font-size:1rem;width: 26%;">
                        <font style="font-size:0.5rem;margin-left:-0.22rem;">
                          {{p.plan_amount}}.00 元
                        </font>
                      </div>
                      <div class="icon-clock2" style="font-size:1rem;width: 28%;">
                        <font style="font-size:0.5rem;margin-left:-0.12rem;">
                          <!-- 剩余时间通过服务器时间和deadline_time去计算 -->
                          {{p.deadline_time | residualTime}}
                        </font>
                      </div>
                      <div>
                        <img v-if="isValidate(p.deadline_time)" src="/img/专家方案/购物车-选中.png"
                          width="26" height="24" @click="addToCart(p.plan_id, $event)">
                        <img v-else="isValidate(p.deadline_time)" src="/img/专家方案/购物车.png"
                          width="26" height="24" @click="addToCart(0, $event)">
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </card>
        </div>
      </v-card-container>
    </div>
 </div>
</div>
</template>

<script>
import Vue from 'vue'
import Slider from '../../components/Slider'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'

import VButton from '../../components/Button'
import VPayButton from '../../components/PayButton'
import VIcon from '../../components/Iconfont'
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import {planApi} from '../../util/service'
import {getDateDiff} from '../../util/util'
import $ from 'zepto'

Vue.filter('residualTime', function (dtime) {
  // 计算时间差
  let filterTime = getDateDiff(this.serviceTime, dtime, 'minute')
  return filterTime > 0 ? filterTime + '分钟' : '已截止'
})

export default {
  init () {
    // console.log('初始化')
  },
  created () {
    // console.log('创建')
  },
  beforeCompile () {
    // console.log('编译之前')
  },
  compiled () {
    // console.log('编译结束')
  },
  attached () {
    // console.log('插入DOM')
  },
  detached () {
    // console.log('删除DOM')
  },
  beforeDestory () {
    // console.log('销毁之前')
  },
  destroyed () {
    // console.log('销毁')
  },
  ready () {
    // console.log('准备')
    $('.content').scrollTop(this.$root.planScrolltop)
    $.init()
    document.title = '购买方案'
    $.showIndicator()
    setTimeout(function () {
      // 每次进入需要重新读取方案列表
      this.$root.loadRangeList()
      // 加载完毕需要重置
      $.pullToRefreshDone('.pull-to-refresh-content')
      $.hideIndicator()
    }.bind(this), 100)
    $.refreshScroller()
    // 获取服务器时间
    this.$http.get(planApi.time, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        this.$set('serviceTime', result)
      }
    }).catch(()=>{
      console.error('无法连接服务器-获取服务器时间')
    })
  },
  data () {
    return {
      serviceTime: ''
    }
  },
  computed: {
    length () {
      return this.$root.rangeList.length
    }
  },
  methods: {
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        // 调用根节点的查询
        this.$root.loadBannerForPlan()
        this.$root.loadScrollMsgForPlan()
        this.$root.loadRangeList()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1345)
    },
    addToCart (pid, e) {
      e.stopPropagation()
      if (pid === 0) {
        $.toast('已截止,不可购买')
        return
      }
      if (window.localStorage.getItem('user')) {
        // 添加至购物车
        this.$http.post(planApi.addCart,
          {
            'pid': pid
          },
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            $.toast('已加入购物车')
            // 设置购物车图标
            this.$root.setCardBadge()
          }
          else {
            // 错误信息
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('无法加入购物车:' + e)
        })
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=plan', replace: true})
      }
    },
    recharge () {
      // $.toast('充值功能暂未开放,敬请期待!')
      // this.$route.router.go({path: '/recharge/49828/plan', replace: true})
      // 去微信鉴权
      let appid = 'wxadccc645716a9348'
      let redirect_uri = 'http://reg.zqsml.com/user/reChargeForward.do'
      let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
      'appid=' + appid +
      '&redirect_uri=' + redirect_uri +
      '&response_type=code&scope=snsapi_base&state=plan#wechat_redirect'
      window.location.href = oauthUrl
    },
    isValidate (dtime) {
      // 计算时间差
      let filterTime = getDateDiff(this.serviceTime, dtime, 'minute')
      if (filterTime > 0) {
        return true
      }
      else {
        return false
      }
    }
  },
  components: {
    Slider,
    Bar,
    BarItem,
    VButton,
    VPayButton,
    VIcon,
    VLayer,
    VCardContainer,
    Card
  }
}
</script>

<style>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.home-bar {
  background: #efeff4;
  height: auto;
  position: relative;
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.home-bar .tab-item {
  height: auto;
  padding-top: 0.1rem;
  padding-bottom: 0.2rem;
  background-color: white;
}
.list-block {
  margin: .5rem 0;
}
.list {
  bottom: 2.5rem;
  padding-bottom: 1rem;
}
.scrollPlan{
  background-color:#cb4a4a;
  /*height:1.6rem;*/
  z-index:10;
}
.scrollPlan:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
.scrollPlan:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
.text-sml{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scrollMsgText {
  font-size:0.72em;
  line-height:2rem;
  color:#FFFFFF;
}
.tipsDiv {
  width:100%;
  font-size:0.58rem;
  margin-left:-0.22rem;
  margin-right:0.42rem;
}
.spliteLine {
  border-bottom: 1px solid #C0C0C0;
}
</style>
