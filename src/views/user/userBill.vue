<template>
<div class="content bill" :transition="pageTransition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
       @click="goForward('/user', 'bounce')">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block" style="margin-top:2.2rem;font-size:0.65rem;">
    <ul>
      <li class="item-content item-link"
        @click="goForward('/user/bill/plan', 'fade')">
        <div class="item-inner">
          <div class="item-title">
            方案记录
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        @click="goForward('/user/bill/withdraw', 'fade')">
        <div class="item-inner">
          <div class="item-title">
            提现
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        @click="goForward('/user/bill/recharge', 'fade')">
        <div class="item-inner">
          <div class="item-title">
            充值
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        @click="goForward('/user/bill/reward', 'fade')">
        <div class="item-inner">
          <div class="item-title">
            打赏
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
// import {userApi} from '../../util/service'

export default {
  ready () {
  },
  // route: {
  //   data ({from, to, next}) {
  //     next()
  //   }
  // },
  data () {
    return {
      pageTransition: this.$route.query.pageTransition,
      title: '我的账单',
      oneLevelNum: 0,
      twoLevelNum: 0,
      threeLevelNum: 0,
      oneLevelUsers: []
    }
  },
  methods: {
    goForward (url, mod) {
      this.$set('pageTransition', mod)
      setTimeout(function () {
        this.$route.router.go({path: url, replace: false})
      }.bind(this), 100)
    }
  }
}
</script>

<style scoped>
.bill .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
</style>
