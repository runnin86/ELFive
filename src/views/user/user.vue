<template>
<div class="content user" distance="55" v-pull-to-refresh="refresh"
  :style="(!this.user?'background-color:white':'')">
  <v-layer></v-layer>
  <!-- <div v-if="!user" class="submit-button">
    <button @click="this.$route.router.go({path: '/login?from=user', replace: true})"
      class="button button-big button-fill">
      登录
    </button>
  </div> -->
  <div v-else>
    <div class="list-block" style="margin-top:0rem;margin-bottom:0rem;">
      <ul style="background-image: url('/img/个人中心/个人背景图片.png')">
        <li class="item-content">
          <div style="width:100%;color:#FFFFFF;font-size:1.2rem;">
            <a v-link="{ path: '/user/setting', replace: false}">
              <span class="pull-right r08">
                <img src="/img/个人中心/设置按钮.png" class="img-responsive"
                  width="22" height="22">
              </span>
            </a>
            <a v-link="{ path: '/user/message', replace: false}">
              <span class="pull-right r08">
                <img src="/img/个人中心/信息按钮.png" class="img-responsive"
                  width="27" height="18">
              </span>
              <span class="pull-right badge-user"
                v-if="this.$root.userUnreadMsg>0"
                v-text="this.$root.userUnreadMsg>99?'99':this.$root.userUnreadMsg"></span>
            </a>
          </div>
        </li>
        <li class="item-content" style="margin-top:-0.4rem;margin-left:-0.76rem;">
          <div class="center2">
            <img src="/img/个人中心/默认头像.png" class="img-responsive"
              style="border:solid 1px #e32;border-radius: 50px;overflow:hidden;"
              width="64" height="64">
          </div>
        </li>
        <li class="item-content" style="margin-top:-0.4rem;margin-left:-0.76rem;">
          <div class="name_txt center2" v-if="user">
            <span class="name">{{user.user_nickname?user.user_nickname:user.user_name}}</span>
          </div>
        </li>
        <li class="item-content" style="margin-top:-0.4rem;">
          <div style="margin-left:-0.4rem;width:48%;">
            <a class="button button-dark" @click="doWithDraw()"
              style="color:#FFFFFF;border-color:#FFFFFF">
              提现
            </a>
          </div>
          <div class="r04" style="width:48%;">
            <a class="button button-dark" @click="doRecharge()"
              style="background-color:#FFFFFF;border-color:#ef494a;color:#ef494a">
              充值
            </a>
          </div>
        </li>
        <li class="item-content"
          style="background-color:#3c3d42;font-size:0.68rem;color:#FFFFFF;">
          <div class="pull-left" style="margin-left:0.2rem;margin-top:0.4rem;">
            <div class="text-center">
              <img src="/img/个人中心/我的本金.png" width="32" height="32">
            </div>
            <div>本金 {{user?(coinmeter?coinmeter:0):'...'}}</div>
          </div>
          <div class="center2" style="margin-top:0.4rem;">
            <div class="text-center">
              <img src="/img/个人中心/我的盈利.png" width="32" height="32">
            </div>
            <div>盈利 {{user?(userate?userate:0):'...'}}</div>
          </div>
          <div v-if="showsales === 'now'" @click="showsales='last'"
            class="pull-right r08" style="margin-top:0.4rem;">
            <div class="text-center">
              <img src="/img/个人中心/本月.png" width="80" height="32">
            </div>
            <div>销量 {{user?(usersales?usersales:0):'...'}}</div>
          </div>
          <div v-if="showsales === 'last'" @click="showsales='now'"
            class="pull-right r08" style="margin-top:0.4rem;">
            <div class="text-center">
              <img src="/img/个人中心/上月.png" width="80" height="32">
            </div>
            <div>销量 {{user?(lastsales?lastsales:0):'...'}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list-block" style="margin-top:0rem;font-size:0.65rem;">
      <ul>
        <li class="item-content item-link"
          v-link="{ path: '/user/bill', query: { pageTransition: 'bounce' }, replace: false}">
          <div class="item-inner">
            <div class="icon-filling item-title">
              我的账单
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li class="item-content item-link"
          v-link="{ path: '/user/order', replace: false}">
          <div class="item-inner">
            <div class="icon-order item-title">
              我的订单
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li class="item-content item-link"
          v-link="{ path: '/user/commission', replace: false}">
          <div class="item-inner">
            <div class="icon-golds2 item-title">
              我的返佣
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li class="item-content item-link"
          v-link="{ path: '/user/team', replace: false}">
          <div class="item-inner">
            <div class="icon-team item-title">
              我的团队
            </div>
          </div>
        </li>
      </ul>
      <ul style="margin-top:0.8rem;">
        <li class="item-content item-link" v-link="{ path: '/user/qrCode', replace: false}">
          <div class="item-inner">
            <div class="icon-qrcode item-title">
              我的二维码
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li class="item-content item-link" v-link="{ path: '/user/changePwd', replace: false}">
          <div class="item-inner">
            <div class="icon-pwd item-title">
              修改密码
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="item-link item-content">
              <div class="item-inner" v-link="{ path: '/more/about', replace: false}">
                  <div class="icon-about item-title">
                    关于
                  </div>
              </div>
          </div>
        </li>
      </ul>
      <br>
    </div>
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
import {userApi} from '../../util/service'
// import pingpp from 'pingpp-js'
import $ from 'zepto'
var refreshMsg
export default {
  ready () {
    $.init()
    document.title = '个人中心'
    if (!this.user) {
      this.$route.router.go({path: '/login?from=user', replace: true})
    }
    else {
      this.refresh()
    }
    refreshMsg = setInterval(function () {
      // 30秒定时查询
      // 从vuex中获取用户未读消息
      this.$root.loadUserUnreadMsg()
    }.bind(this), 15000)
  },
  destroyed () {
    // console.log('销毁')
    window.clearInterval(refreshMsg)
  },
  data () {
    return {
      loading: false,
      user: JSON.parse(window.localStorage.getItem('user')),
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      showsales: 'now',
      userate: 0, // 盈利
      coinmeter: 0, // 本金
      usersales: 0, // 本月销量
      lastsales: 0 // 上月销量
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
          let token = window.localStorage.getItem('token')
          // 获取账户本金
          this.getCoinmeter(token)
          // 获取用户盈利
          this.getUserate(token)
          // 获取用户销量
          this.getUsersales(token)
          // 获取用户销量(上月)
          this.getLastsales(token)
          // 从vuex中获取用户未读消息
          this.$root.loadUserUnreadMsg()
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
     * 获取用户账户的盈利
     */
    getUserate (token) {
      this.$http.post(userApi.useRate, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.userate = result.rateAccount
        }
        else {
          console.log('获取用户利润失败:' + msg)
          $.alert(msg, ()=>{
            window.localStorage.clear()
            window.localStorage.setItem('imageSwitch', true)
            this.$route.router.go({path: this.path, replace: true})
            this.$route.router.go({path: '/login?from=user', replace: true})
          })
        }
      }).catch((e)=>{
        console.error('获取账户盈利失败:' + e)
      })
    },
    /*
     * 获取账户本金
     */
    getCoinmeter (token) {
      this.$http.post(userApi.coinmeter, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.coinmeter = result.coinmeter
        }
        else if (code === 0) {
          console.log('获取用户本金失败:' + msg)
        }
        else if (code === 3) {
          $.alert(msg, ()=>{
            window.localStorage.clear()
            window.localStorage.setItem('imageSwitch', true)
            this.$route.router.go({path: '/login?from=user', replace: true})
          })
        }
      }).catch((e)=>{
        console.error('获取账户本金失败:' + e)
      })
    },
    /*
     * 获取用户销量
     */
    getUsersales (token) {
      this.$http.post(userApi.userSales, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.usersales = result.userFlow
        }
        else {
          console.log('获取用户销量失败:' + msg)
          // $.alert('会话失效,请重新登录', ()=>{
          //   window.localStorage.clear()
          //   window.localStorage.setItem('imageSwitch', true)
          //   this.$route.router.go({path: '/login?from=user', replace: true})
          // })
        }
      }).catch((e)=>{
        console.error('获取账户本金失败:' + e)
      })
    },
    /*
     * 获取用户销量(上月)
     */
    getLastsales (token) {
      this.$http.post(userApi.lastSales, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.lastsales = result.userFlow
        }
        else {
          console.log('获取用户上月销量失败:' + msg)
          // $.alert('会话失效,请重新登录', ()=>{
          //   window.localStorage.clear()
          //   window.localStorage.setItem('imageSwitch', true)
          //   this.$route.router.go({path: '/login?from=user', replace: true})
          // })
        }
      }).catch((e)=>{
        console.error('获取账户本金失败:' + e)
      })
    },
    doRecharge () {
      // $.toast('充值功能暂未开放,敬请期待!')
      // this.$route.router.go({path: '/recharge?from=user', replace: true})
      // 去微信鉴权
      let appid = 'wxadccc645716a9348'
      let redirect_uri = 'http://reg.zqsml.com/user/reChargeForward.do'
      let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
      'appid=' + appid +
      '&redirect_uri=' + redirect_uri +
      '&response_type=code&scope=snsapi_base&state=user#wechat_redirect'
      window.location.href = oauthUrl
    },
    doWithDraw () {
      let wdModals = {
        title: '请输入提现金额',
        text: '您可以提现的金额为:' + this.userate + '元',
        afterText: '<div class="widthDraw-input">' +
                     '<input id="widthDrawMoney" type="number" placeholder="请输入金额" min=10 max=99999>' +
                   '</div>',
        buttons: [
          {
            text: '取消'
          },
          {
            text: '确定',
            bold: true,
            onClick: ()=> {
              let money = document.getElementById('widthDrawMoney').value
              if ((Math.round(parseFloat(money) * 100) / 100) < 10) {
                $.toast('提现金额不能少于10元')
              }
              else {
                let token = window.localStorage.getItem('token')
                this.$http.post(userApi.withdraw,
                  {
                    wtype: 1,
                    wmoney: money
                  }, {
                    headers: {
                      'x-token': token
                    },
                    emulateJSON: true
                  })
                .then(({data: {code, msg, result}})=>{
                  if (code === 1) {
                    // $.toast('恭喜您，提现成功！(请您保持电话畅通，工作人员会在3个工作日内与您联系)')
                    $.toast('恭喜您，提现成功!</br>工作人员会在3个工作日内与您联系', 2000, 'hightToast')
                    this.getUserate(token)
                  }
                  else {
                    $.toast('提现失败:' + msg)
                  }
                }).catch((e)=>{
                  console.error('个人中心盈利提现失败:' + e)
                })
              }
            }
          }
        ]
      }
      $.modal(wdModals)
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

<style>
.user {
  top: -2.2rem !important;
}
.banner {
  width: 100%;
  background-color: white;
  /*padding: 12.7999992px;*/
}
.banner .logo {
  background-image: url('/img/个人中心/个人背景图片.png');
  /*border-radius: 10px;*/
  width: 100%;
  height: 110px;
  padding: 20.2666654px 21.333332px 5.333333px;
  box-shadow: 0 .0rem .8rem rgba(0,0,0,.3);
}
.banner .logo .logo_img {
  margin-top: 0px;
  width: 58.666663px;
  height: 58.666663px;
  float: left;
  margin-left: -0.6rem;
  display: inline-block;
}
.name_txt {
  margin-top: 0rem;
  margin-left: 0.6rem;
  float: left;
  text-align: right;
}
.name_txt .name {
  color: #ffffff;
  font-size: 15.999999px;
}
.banner .logo .logo_txt {
  margin-top: -0.6rem;
  float: right;
  text-align: right;
}
.banner .logo .logo_txt .yue {
  color: #ffffff;
  font-size: 10.999999px;
}
.banner .logo .logo_txt .amount {
  display: block;
  margin-top: -8px;
  color: #ffffff;
  font-size: 20.8666638px;
}
.user-tab {
  background: #efeff4;
  height: 3rem;
  position: relative;
}
.user-tab .tab-item {
  height: 3rem;
  background-color: white;
}
.user-tab:before {
  background-color: white;
}
#knowResult{
  font-size: 0.48rem;
}
.submit-button {
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.r04 {
  margin-right:0.4rem;
}
.r08 {
  margin-right:0.8rem;
}
.center2 {
  margin-left: auto;
  margin-right: auto;
}
.icon-golds2:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e653";
}
.icon-filling:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e645";
}
.icon-order:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e651";
}
.icon-team:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e648";
}
.icon-pwd:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e64f";
}
.icon-about:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e603";
}
.icon-qrcode:before {
  font-family: iconfont-sml !important;
  font-size: 1rem;
  content: "\e602";
}
.widthDraw-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-top: .8rem;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
.hightToast {
  height: 4rem;
  font-size: 0.68rem;
  /*margin: 0 auto;*/
  /*text-align: center;*/
}
.badge-user {
  display: inline-block;
  padding: 0.15rem 0.28rem 0.15rem;
  margin-right: -1.7rem;
  font-size: 0.6rem;
  line-height: 1;
  color: #000000;
  /*background-color: #FFF4C1;*/
  background-color: #ed8e07;
  border-radius: 5rem;
}
.badge-user.badge-inverted {
  /*padding: 0 0.25rem 0 0;
  background-color: transparent;*/
}
</style>
