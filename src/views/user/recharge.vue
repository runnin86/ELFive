<template>
<div class="content rcag" transition="rcag-transition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      @click="this.$route.router.go({path: this.path, replace: true})">
      <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">充值</h1>
  </header>

  <div class="remind">
    	<span>请选择充值金额</span>
	</div>

  <div class="option_box">
		<div class="option_box_left">
  		<span @click="this.rechargeMoney=1000"
        :class="this.rechargeMoney===1000?'selected_check':''">
        1000元
      </span>
 		 	<span @click="this.rechargeMoney=3000"
        :class="this.rechargeMoney===3000?'selected_check':''">
        3000元
      </span>
  		<!-- <span @click="this.rechargeMoney=5000"
        :class="this.rechargeMoney===5000?'selected_check':''">
        5000元
      </span> -->
		</div>
  	<div class="option_box_right">
  		<span @click="this.rechargeMoney=2000"
        :class="this.rechargeMoney===2000?'selected_check':''">
        2000元
      </span>
  		<span @click="this.rechargeMoney=4000"
        :class="this.rechargeMoney===4000?'selected_check':''">
        4000元
      </span>
  		<!-- <span @click="this.rechargeMoney=6000"
        :class="this.rechargeMoney===6000?'selected_check':''">
        6000元
      </span> -->
  	</div>
  </div>

  <div class="payment_btn">
  	<span @click="doRecharge()"
      :class="this.isRecharge?'disabled':''">
      微信支付
    </span>
  </div>
</div>
</template>

<script>
import pingpp from 'pingpp-js'
// import {userApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    // 根据token获取用户信息
    // this.$http.get(userApi.smuser, {}, {
    //   headers: {
    //     'x-token': window.localStorage.getItem('token')
    //   },
    //   emulateJSON: true
    // })
    // .then(({data: {code, msg, info}})=>{
    //   if (code === 1) {
    //     console.log(info.user)
    //   }
    // })
  },
  data () {
    return {
      user: JSON.parse(window.localStorage.getItem('user')),
      path: '/' + this.$route.params.state.split('@')[0],
      rechargeMoney: 2000,
      uPhone: window.localStorage.getItem('localPhone'),
      openid: this.$route.params.state.split('@')[1],
      isRecharge: false
    }
  },
  methods: {
    tips (msg) {
      $.toast(msg)
    },
    doRecharge () {
      if (!this.user) {
        this.isRecharge = true
        $.toast('请登录后充值!')
      }
      if (!this.isRecharge) {
        this.isRecharge = true
        $.confirm('账号[' + this.user.user_phone + ']即将充值</br>￥' + this.rechargeMoney + '.00', '提示', ()=>{
          let url = 'http://reg.zqsml.com/pay/pingxxPay.do'
          // let url = 'http://192.168.1.22:8080/pay/pingxxPay.do'
          let spcarInfos = {
            chargeMoney: this.rechargeMoney.toString(),
            uPhone: this.user.user_phone,
            channel: 'wx_pub',
            payType: '2',
            openId: this.openid
          }
          // let postBody = JSON.stringify(spcarInfos)
          // console.log(spcarInfos)
          // console.log(postBody)
          this.$http.post(url, spcarInfos, {
            headers: {
              // 'x-token': token
            },
            emulateJSON: true
          })
          .then(({data: da})=>{
            // console.log(da.chargeObj)
            pingpp.createPayment(da.chargeObj, function (result, err) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                $.toast('支付成功!')
              }
              else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
                $.toast('支付失败!')
                setTimeout(function () {
                  this.isRecharge = false
                }.bind(this), 3000)
              }
              else if (result === 'cancel') {
                // 微信公众账号支付取消支付
                $.toast('支付取消!')
                this.isRecharge = false
              }
            })
          }).catch((e)=>{
            $.toast('支付异常!')
            setTimeout(function () {
              this.isRecharge = false
            }.bind(this), 3000)
            console.error('充值获取charge失败:' + e)
          })
        }, ()=>{
          // confirm取消
          this.isRecharge = false
        })
      }
    }
  }
}
</script>

<style>
.color {
  background-color: #ed8e07;
}
.disabled {
  background-color:#F5F5F5 !important;
  color:#c8c9cb !important;
}
.remind {
  width:100%;
	margin:0 auto;
  margin-top:2.2rem;
	height:60px;
	background-color:#FFF;
	overflow:hidden;
	border-bottom:#e6e6e6 solid 1px;
}
.remind span {
  display:block;
  color:#666666;
  font-size:16px;
  margin-left:20px;
  line-height:60px;
}
.option_box {
  width:100%;
	height:220px;
}

.option_box_left {
  width:44%;
	margin-left:10px;
	float:left;
}

.option_box_right {
  width:44%;
	margin-right:10px;
	float:right;
}

.option_box_right>span,.option_box_left>span{
  width:100%;
  border:1px solid #e6e6e6;
  height:80px;
  background-color:#fff;
  margin-top:16px;
  float:left;
  display:block;
  font-size:16px;
  color:#333333;
  text-align:center;
  line-height:80px;
  list-style:none;
  cursor:pointer;
}
.selected {
  width:100%;
	border:1px solid #e6e6e6;
  height:80px;
  background-color:#fff;
  margin-top:16px;
  float:left;
}
.selected_check {
  border: 1px solid #49cb99 !important;
  background-image:url('/img/check_icon.png');
	background-repeat: no-repeat;
	background-position:right bottom;
  background-size:14%;
}
.payment_btn {
  height:62px;
  width:94%;
  background-color:#49cb99;
  cursor:pointer;
  margin:0 auto;
  border: 1px solid #49cb99;
  border-radius:2px;
}
.payment_btn span {
  display:block;
  text-align:center;
  line-height:60px;
  font-size:16px;
  color:#FFF;
}
/*
 从右至左切入
 */
.rcag-transition-enter {
  animation: bounce-in .5s;
}
.rcag-transition-leave {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
	}
}
@keyframes bounce-out {
  0% {
		opacity: 0;
		-webkit-transform: translateX(0);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(100%);
	}
}
</style>
