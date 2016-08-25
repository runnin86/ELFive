<template>
<div class="rank" transition="bounce">
  <v-nav :path="path" :title="title" class="color"></v-nav>
  <div v-pull-to-refresh="refresh" v-infinite-scroll="loadMore">
    <v-layer></v-layer>
    <v-list type="media" class-name="inset">
      <li class="item-content" v-for="rank in ranks">
        <div v-if="showImg" class="item-media">
          <img :src="rank.images| split ','| getArray 0" style="width: 2.8rem;">
        </div>
        <div v-else class="item-media">
          <img src="/img/乐夺宝/产品图片默认.png" style="width: 2.8rem;">
        </div>
        <div class="item-inner">
          <div style="font-size:.8rem;" class="text-sml">
            第{{rank.number}}期 {{rank.name}}
          </div>
          <div v-if="rank.status==0 && this.isShowTime(rank.publicTime).show" class="row">
            <span style="margin-top: -2rem;">
              <div style="margin-left:0.6rem;font-size:.6rem;">揭晓倒计时</div>
              <v-count-down :countTime="this.isShowTime(rank.publicTime).time"></v-count-down>
              <div>
              </div>
            </span>
          </div>
          <div v-if="rank.status==0 && !this.isShowTime(rank.publicTime).show"
            class="row" style="background-color: #EEEEEE;margin-top: 0.2rem;font-size:.4rem;">
            <div style="margin:0.2rem 0.2rem 0.2rem 0.8rem;">
              <span id="knowResult">
                <div>
                  中奖号码: <font color="red"> {{rank.luckCode}}</font>
                </div>
                <div>
                  <span>获奖者: {{rank.user_name}}<span>
                  <span class="pull-right" style="margin-right: 0.6rem;padding: .1rem;border: 1px solid #929292;">
                    <font color="blue">已揭晓 </font>
                  <span>
                </div>
                <div>
                  人次: <font color="red"> {{rank.payCount}}</font>
                </div>
                <div>
                  日期: {{rank.publicTime}}
                </div>
              </span>
            </div>
          </div>
        </div>
      </li>
    </v-list>
  </div>
  <div v-cloak v-if="ranks.length===0" style="width:100%;height:100%;text-align:center;margin-top:6rem;">
    <div>
      <img src="/img/专家方案/温馨提示.png" height="24" width="152">
    </div>
    <div style="font-size:0.38rem;color:#A9A9A9;">
      揭晓内容敬请期待
    </div>
  </div>
</div>
</template>

<script>
import $ from 'zepto'
import VNav from '../../components/Nav'
import VList from '../../components/List'
import VLayer from '../../components/PullToRefreshLayer'
import VCountDown from '../../components/Countdown'
import {hpApi} from '../../util/service'
import {loader} from '../../util/util'

export default {
  ready () {
    $.init()
    this.getLatest(0)
  },
  data () {
    return {
      title: '最新揭晓',
      path: '/happyPurchase',
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      loading: false,
      pagenum: 0,
      ranks: []
    }
  },
  methods: {
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        // 获取最新揭晓记录
        this.getLatest(0)
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1000)
    },
    loadMore () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.pagenum === -1 ||
        (this.ranks.length < (this.pagenum + 1) * 10)) {
        // 满足上述3条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.inset')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.pagenum = this.pagenum + 1
        this.getLatest(this.pagenum)
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    getLatest (num) {
      this.$http.get(hpApi.oneBuyNewPublic + '?pagenum=' + num)
      .then(({data: {code, msg, results}})=>{
        if (code === 1) {
          if (results.list.length === 0) {
            this.pagenum = -1
            return
          }
          for (var i = 0; i < results.list.length; i++) {
            this.ranks.push(results.list[i])
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取最新揭晓失败:' + e)
      })
    },
    /*
     * 是否展示倒计时
     */
    isShowTime (time) {
      let pubTime = new Date(Date.parse(time.replace(/-/g, '/')))
      let now = new Date()
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
    VNav,
    VList,
    VLayer,
    VCountDown
  }
}
</script>

<style>
.rank {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.rank .inset {
  margin-left: .35rem;
  margin-right: .35rem;
  margin-top: .35rem;
}
.rank .rank-num {
  float: right;
  min-width: 1.2rem;
  line-height: 1.2rem;
  border-radius: 50%;
  padding-left: .35rem;
  color: white;
  margin-top: -.7rem;
  vertical-align: top;
  display: inline-block;
  font-size: .8rem;
}
#knowResult{
  font-size: 0.48rem;
}
.color {
  background-color: #ed8e07;
}
</style>
