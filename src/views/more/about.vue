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
                    <img src="/img/64X64.png" height="64" width="64">
                </div>
            </div>
            <div class="url" style="margin-left: .4rem;height:auto;margin-bottom: .8rem;">
              <p style="font-size:0.52rem;margin-left:.8rem;margin-right:.8rem;">
                足彩收米拉致力为用户提供最专业的足球分析服务，打造最精准的赛事分析。</br>
                <font style="font-weight: bold;">强大的分析团队：</font>
                团队成员至少拥有十年以上的看球和赛事分析经验，熟悉各大足球联赛体系，
                广视角、多层级、更深度组合出击，完美诠释直击赛果。</br>
                <font style="font-weight: bold;">先进的管理团队：</font>
                公司管理层长期浸淫互联网，准确把脉互联网+的发展方向，
                简洁高效的扁平化管理，缜密多元的发展计划。</br>
                <font style="font-weight: bold;">工作环境：</font>
                窗明几净宽敞大气的办公室，配长期无节制的点心饮料，无障碍的员工间沟通，
                合理化建议的快速实施，融洽多彩的的工作氛围。</br>
                <font style="font-weight: bold;">公司目标：</font>
                打造最专业、最精准的互联网足球赛事分析，建立国内最优秀的足球大数据资料库。</br>
                <font style="font-weight: bold;">公司愿景：</font>
                携手足球爱好者完成足球资讯大社区的组建。
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
              400-8710-088
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
