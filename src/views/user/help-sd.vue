<template>
<div class="content invite" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      @click="this.$root.back()">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block" style="margin: 2.35rem 0">
    <!-- <ul>
      <li class="item-content item-link" @click="showMsg('registerHelp',$event)">
        <div class="item-inner">
          <div class="item-title">注册不成功</div>
        </div>
      </li>
      <li class="item-content" id="registerHelp" style="display: none;background-color: #EEEEEE;">
        <div class="item-inner">
          <div class="helpMsgText">
            注册不成功注册不成功注册不成功注册不成功注册不成功注册不成功注册不成功
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link" @click="showMsg('rechargeHelp',$event)">
        <div class="item-inner">
          <div class="item-title">充值问题</div>
        </div>
      </li>
      <li class="item-content" id="rechargeHelp" style="display: none;background-color: #EEEEEE;">
        <div class="item-inner">
          <div class="helpMsgText">
            注充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题
            充值问题
            充值问题充值问题充值问题充值问题充值问题
          </div>
        </div>
      </li>
    </ul> -->
    <ul>
      <li class="item-content item-link" @click="showMsg('withdrawHelp',$event)">
        <div class="item-inner">
          <div class="item-title">提现问题</div>
        </div>
      </li>
      <li class="item-content" id="withdrawHelp" style="display: none;background-color: #FFECEC;">
        <div class="item-inner">
          <div class="helpMsgText">
            在个人中心可以对盈利进行提现，提现金额10元起。</br>
            1、提现成功</br>
            请您保持电话畅通，工作人员会在1~3个工作日与您联系</br>
            2、提现失败</br>
            请打电话和客服人员进行沟通，客服电话：<a href="tel:400-9988-231">400-9988-231</a>
          </div>
        </div>
      </li>
    </ul>
    <br>
    <div  style="width:100%;height:100%;text-align:center;margin-top:1rem;">
      <div>
        <img src="/img/专家方案/温馨提示.png" height="24" width="152">
      </div>
      <div style="font-size:0.58rem;color:#A9A9A9;">
        如果您的问题未能解决，您可以联系客服人员</br>
        客服电话：<a href="tel:400-9988-231">400-9988-231</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import $ from 'zepto'

export default {
  ready () {
  },
  data () {
    return {
      title: '帮助'
    }
  },
  methods: {
    showMsg (id, e) {
      if (document.getElementById(id).style.display === 'block') {
        document.getElementById(id).style.display = 'none'
      }
      else {
        document.getElementById(id).style.display = 'block'
      }
    }
  }
}
</script>

<style scoped>
.list-block {
  height: 2.9rem;
  font-size: 0.72rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
}
.helpMsgText {
  font-size: 0.6rem;
  color: gray;
}
.color {
  background-color: #ed8e07;
}
a:link {
  color: #000000;
  text-decoration: none;
}
a:visited {
  color: #000000;
  text-decoration: none;
}
a:hover {
  color: #999999;
  text-decoration: underline;
}
</style>
