<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content user" distance="55" :transition="pageTransition"
    v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <!-- 个人中心顶部信息栏 -->
    <div class="el_user_head_box">

      <!-- 顶部操作栏 -->
      <div class="el_head">
        <a class="el_return_btn"
          @click="goForward('/home', 'bounce', '')">
          <img src="/img/11/return.png">
        </a>
        <strong>个人中心</strong>
        <div class="el_placeholder">&nbsp</div>
      </div>

      <!-- 个人头像/名字 -->
      <div class="el_user_name_box">
        <img src="/img/11/head_icon.png">
        <span class="el_user_name">
          {{user.userName?user.userName:user.userPhone}}
        </span>
      </div>

      <!-- 个人财产信息 -->
      <div class="el_user_info_box">
        <div class="el_user_info_left">
          <span>可用余额</span>
          <span class="el_balance">
            {{userAccount?userAccount:0}}
          </span>
        </div>
        <div class="el_user_info_right">
          <span>冻结金额</span>
          <span class="el_balance">
            {{userFrozeAccount?userFrozeAccount:0}}
          </span>
        </div>
      </div>
    </div>

    <!-- 提现按钮/充值按钮 -->
    <div class="el_property_operation">
      <div class="el_withdrawals_btn">
        <strong @click="goForward('/withdrawals', 'fade', 'bounce')">提现</strong>
      </div>
      <div class="el_recharge_btn">
        <strong @click="recharge()">充值</strong>
      </div>
    </div>

    <!-- 账单 -->
    <div class="el_bill_box" v-link="{path: '/bill', replace: true}">
      <img src="/img/11/bill_icon.png" class="el_bill_icon">
      <span class="el_bill_tagging">账单</span>
      <div class="el_bill_remind">
        <img src="/img/11/go_icon.png" class="el_go_icon">
        <span class="el_transaction_info">所有交易信息</span>
      </div>
    </div>

    <!-- 订单 -->
    <div class="el_order_box" v-link="{path: '/order', replace: true}">
      <img src="/img/11/order_icon.png" class="el_order_icon">
      <span class="el_order_tagging">订单</span>
    </div>

    <!-- 修改密码 -->
    <div class="el_modify_pw" v-link="{path: '/modify', replace: true}" >
      <img src="/img/11/modify_pw.png" class="el_modify_icon">
      <span class="el_modify_pw_tagging">修改密码</span>
    </div>

    <!-- 我的二维码 -->
    <div class="el_mycode" @click="getQRCode()">
      <img src="/img/11/el_code_icon.png" class="el_code_icon">
      <span class="el_code_tagging">二维码</span>
    </div>

    <div class="el_exit">
      <span @click="logout(this.$route.router, this.$http)">退出登录</span>
    </div>

  </div>

  <div class="el_code_eject"
    :class="this.showQRCode?'el_code_eject':'hide'">
    <div class="el_code_off"
      @click="this.showQRCode = false">
      <img src="/img/11/el_code_off.png">
    </div>
    <div class="invite-card qr_code" v-if="QRData">
      <div class="invite-card-content" align="center">
        <v-qrcode :val="QRData"
          :size="QRsize" :bg-color="QRbgColor"
          :fg-color="QRfgColor"level="L"></v-qrcode>
      </div>
      <span>扫描二维码进行注册</span>
    </div>
    <div class="el_register_step">
      <span><font class="number_one">1</font>输入手机号<span>
    </div>
    <div class="el_register_step">
      <span><font class="number_one">2</font>输入本人支付宝账号及姓名<span>
    </div>
    <div class="el_register_step" style="padding-bottom:0.5rem;">
      <span><font class="number_one">3</font>注册完成<span>
    </div>
  </div>
</template>

<script>
  import VLayer from '../../components/PullToRefreshLayer'
  import VQrcode from '../../components/Qrcode'
  import {api} from '../../util/service'
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
      if (this.user) {
        // 获取账户信息
        this.getUserAccount()
      }
    },
    data () {
      return {
        pageTransition: this.$route.query.pageTransition,
        user: JSON.parse(window.localStorage.getItem('elUser')),
        userAccount: '-',
        userFrozeAccount: '-',
        showQRCode: false,
        QRData: '',
        QRbgColor: '#FFFFFF',
        QRfgColor: '#000000',
        QRsize: document.body.offsetWidth - 160
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
            // 获取账户信息
            this.getUserAccount()
            // 加载完毕需要重置
            $.pullToRefreshDone('.pull-to-refresh-content')
            $.hideIndicator()
          }.bind(this), 800)
        }
      },
      /*
       * 获取账户本金
       */
      getUserAccount () {
        let token = window.localStorage.getItem('elToken')
        this.$http.get(api.userAccount, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          if (code === 1) {
            this.userAccount = data.userAccount
            this.userFrozeAccount = data.userFrozeAccount
          }
          else {
            console.log('获取账户错误:' + msg)
          }
        }).catch((e)=>{
          console.error('获取账户信息失败:' + e)
        })
      },
      /*
       * 退出
       */
      logout (route, http) {
        var buttons1 = [
          {
            text: '确定退出登录?',
            label: true
          },
          {
            text: '确定',
            bold: true,
            color: 'danger',
            onClick: function () {
              let token = window.localStorage.getItem('elToken')
              http.delete(api.logout, {}, {
                headers: {
                  'x-token': token
                },
                emulateJSON: true
              })
              .then(({data: {code, msg}})=>{
                if (code === 1) {
                  window.localStorage.removeItem('elUser')
                  window.localStorage.removeItem('elToken')
                  window.localStorage.removeItem('elOpenid')
                  route.go({path: '/oauth', replace: true})
                }
                $.toast(msg)
              }).catch((e)=>{
                console.error('用户退出失败:' + e)
              })
            }
          }
        ]
        var buttons2 = [
          {
            text: '取消'
            // bg: 'danger'
          }
        ]
        var groups = [buttons1, buttons2]
        $.actions(groups)
      },
      /*
       * 获取并展示二维码
       */
      getQRCode () {
        let token = window.localStorage.getItem('elToken')
        this.$http.get(api.qrcode, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {data, code, msg}})=>{
          if (code === 1) {
            this.$set('QRData', data)
            // this.QRData = 'http://h5.zqsml.com/reg?uid=2'
            this.showQRCode = true
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('获取账户信息失败:' + e)
        })
      },
      /*
       * 充值
       */
      recharge () {
        $.toast('敬请期待!')
      },
      /*
       * 跳转
       */
      goForward (url, thisMod, nextMod) {
        this.$set('pageTransition', thisMod)
        setTimeout(function () {
          this.$route.router.go({path: url, query: { pageTransition: nextMod }, replace: false})
        }.bind(this), 100)
      }
    },
    components: {
      VLayer,
      VQrcode
    }
  }
</script>

<style scoped>
.user {
  top: -2.2rem !important;
}
body,ul{
  margin: 0;
  padding: 0;
}
ul,a,p{
  margin: 0;
  padding: 0;
  list-style: none;
}
.el_user_head_box{
  width: 100%;
  height: 8rem;
  background-image: url(/img/11/user_bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.el_head{
  width: 100%;
  height: 2.5rem;
  overflow: hidden;
}
.el_return_btn{
  display: block;
  width:10%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
  display: block;
  margin:0.85rem auto;
}
.el_head strong{
  width: 80%;
  text-align: center;
  display: block;
  line-height: 2.5rem;
  float: left;
  color: white;
}
.el_placeholder{
  width: 10%;
  height: 2.5rem;
  float: left;
}
.el_user_name_box{
  width: 100%;
  height: 3rem;
  overflow: hidden;
}
.el_user_name_box img{
  width: 1.7rem;
  height: 1.7rem;
  margin-top: 0.36rem;
  display: block;
  margin-left: 0.5rem;
}
.el_user_name_box img,.el_user_name_box span{
  float: left;
}
.el_user_name{
  line-height: 2.5rem;
  margin-left: 0.5rem;
  color: white;
}
.el_user_info_box{
  width: 100%;
  height: 2.5rem;
  background-image: url(/img/11/opacity_bg.png);
}
.el_user_info_left,.el_user_info_right{
  width: 50%;
  height: 1.6rem;
  float: left;
  margin-top: 0.45rem;
}
.el_user_info_left{
  border-right: 0.05rem #4c4c4c solid;
}
.el_user_info_left span,.el_user_info_right span{
  display: block;
  width: 100%;
  font-size: 0.6rem;
  color: white;
  text-align: center;
  line-height: 0.6rem;
}
.el_balance{
  margin-top:0.4rem;
}
.el_property_operation{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  overflow: hidden;
}
.el_withdrawals_btn,.el_recharge_btn{
  width: 50%;
  height: 2.5rem;
  overflow: hidden;
  float: left;
}
.el_withdrawals_btn{
  border-right: 0.05rem #f0f0f0 solid;
}
.el_withdrawals_btn strong,.el_recharge_btn strong{
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
  font-size: 0.7rem;
}
.el_recharge_btn strong{
  color: #3ec4a0;
}
.el_withdrawals_btn strong{
  color: #666666;
}
.el_bill_box{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.5rem;
  overflow: hidden;
  border: none;
}
.el_order_box,.el_modify_pw{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.05rem;
  overflow: hidden;
  border: none;
}
.el_mycode{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.5rem;
  overflow: hidden;
  border: none;
}
.el_bill_icon{
  height: 1.15rem;
  float: left;
  display: block;
  margin-left: 0.5rem;
  margin-top: 0.675rem;
}
.el_code_icon{
  height: 1rem;
  float: left;
  display: block;
  margin-left: 0.6rem;
  margin-top: 0.75rem;
}
.el_order_icon,.el_modify_icon{
  height: 1.15rem;
  float: left;
  display: block;
  margin-left: 0.62rem;
  margin-top: 0.675rem;
}
.el_transaction_info,.el_go_icon{
  float: right;
  display: block;
  margin-right: 0.5rem;
}
.el_go_icon{
  height: 0.6rem;
  margin-top: 0.95rem;
}
.el_bill_tagging{
  float: left;
  display: block;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  line-height: 2.5rem;
}
.el_order_tagging,.el_modify_pw_tagging{
  float: left;
  display: block;
  margin-left: 0.55rem;
  font-size: 0.7rem;
  line-height: 2.5rem;
}
.el_code_tagging{
  float: left;
  display: block;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  line-height: 2.5rem;
}
.el_bill_remind span{
  font-size: 0.6rem;
  color: #999999;
  line-height: 2.5rem;
}
.el_code_eject{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(/img/11/el_black_bg.png);
}
.el_code_off{
  background-color: white;
  height: 1.7rem;
  width: 70%;
  margin-top: 1rem;
  margin-left: 15%;
  margin-right: 15%;
  overflow: hidden;
  border-bottom: 0.05rem solid #f6f6f6;
}
.qr_code{
  width: 70%;
  background-color: white;
  margin-left: 15%;
  margin-right: 15%;
  padding-top: 1rem;
  padding-bottom: 0.4rem;
}
.qr_code span{
  width: 100%;
  display: block;
  line-height: 2rem;
  text-align: center;
  font-size: 0.7rem;
}
.el_code_off img{
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.6rem;
  margin-left: auto;
  margin-right: auto;
}
.el_register_step{
  background-color: #f6f8f7;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  overflow: hidden;
}
.el_register_step span{
  width:80%;
  text-align: left;
  display: block;
  line-height: 2.5rem;
  font-size: 0.6rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 2rem;
}
.number_one{
  background-color: #3dd555;
  border-radius: 2rem;
  height: 1rem;
  width: 1rem;
  display: block;
  float: left;
  margin-top: 0.7rem;
  text-align: center;
  line-height: 1rem;
  color: white;
  margin-right: 0.4rem;
}
.hide{
  display: none;
}
.el_exit{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  margin-top: 0.5rem;
}
.el_exit span{
  font-size: 0.7rem;
  text-align: center;
  display: block;
  line-height: 2.5rem;
}
</style>
