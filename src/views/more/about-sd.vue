<template>
<div class="content about" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">关于</h1>
  </header>
  <div class="list-block" style="margin-top:2.2rem;font-size:0.65rem;">
    <br/>
    <div class="invite-card">
        <div class="invite-card-content" style="height:100%;">
            <div class="center_code">
                <div class="wx_code" style="width:100%;height:100%;margin-top:.6rem;">
                    <img src="/img/logo-sd.png" height="64" width="64">
                </div>
            </div>
            <div class="url" style="margin-left: .4rem;height:auto;margin-bottom: .8rem;">
              <p style="font-size:0.52rem;margin-left:.8rem;margin-right:.8rem;">
                央米普惠网络科技有限公司，成立于2016年初，注册资金1001万元，坐落于齐鲁高新技术开发区中关村海淀园。
                公司主要运营计算机软件的开发与应用及足彩竞猜娱乐！</br>
                <font style="font-weight: bold;">分析团队：</font>
                团队成员至少拥有十年以上的看球与赛事分析经验，熟悉各大足球联赛体系，
                广视角、多层级、更深度组合出击，完美诠释直击赛果。为会员提供更好更准确的竞猜方案。</br>
                <font style="font-weight: bold;">公司文化：</font>
                聚焦会员需求，完美解决问题，维护会员利益，助力会员在各自领域获得成功，
                专注提供系统解决方案，综合性满足会员需求并超越原始期望！</br>
                <font style="font-weight: bold;">经营理念：</font>
                开放合作氛围-愿志同道合的伙伴实现价值分享，建设发展空间-关注并助力 员工实现个人梦想，
                真心关注会员成长，为其发挥其聪明才智和公司共同成长并获得与其能力匹配的价值回报。</br>
                <font style="font-weight: bold;">公司目标：</font>
                打造最专业、最精准的互联网足球赛事分析，建立国内最优秀的足球大数据资料库！</br>
                <font style="font-weight: bold;">公司愿景：</font>
                人人享有人生出彩机会！
              </p>
            </div>
        </div>
    </div>
    <br/>
    <ul>
      <a href="tel:400-8710-088">
        <li class="item-content item-link">
          <div class="item-inner">
            <div class="item-title" style="color:black;">
              客服电话
            </div>
            <div class="item-after">
              400-9988-231
            </div>
          </div>
        </li>
      </a>
    </ul>
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
      showImg: window.localStorage.getItem('imageSwitch') === 'true'
    }
  },
  methods: {
  }
}
</script>

<style>
.about .list-block {
  margin: 2.2rem 0 1rem 0;
  font-size: .65rem;
}
.color {
  background-color: #ed8e07;
}
.invite-card {
  padding: .1rem;
}
.invite-card .invite-card-content {
  width: 100%;
  /*height: 380.2666429px;*/
  border: 1px solid #B2B2B2;
  border-radius: 8px;
  background-color: #ffffff;
  /*padding-top: 26.666665px;*/
}
.invite-card .left_logo {
  width: 3rem;
  height: 3rem;
  float: left;
  margin-left: .8rem;
}
.center_code {
  width: 100%;
  margin: 0 auto;
  /*padding-top: 1rem;*/
}
.center_code .wx_code {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  height: 50%;
}
</style>
