
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>跟单选购区</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 跟单票未购买状态 -->
    <div class="el_bill_box"
      v-for="doc in docList | orderBy 'numPayStatus' -1" track-by="$index">
      <div class="el_bill_title">
        <span>推荐号码</span>
      </div>
      <ul class="el_bill_number">
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 0}}
        </li>
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 1}}
        </li>
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 2}}
        </li>
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 3}}
        </li>
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 4}}
        </li>
        <li>
          {{doc.nums | numberFilter doc.isToll doc.numPayStatus 5}}
        </li>
      </ul>
      <div class="el_proposal">
        <span>{{doc.recInfo}}</span>
      </div>
      <div class="el_button">
        <span v-if="doc.isToll===1 && doc.numPayStatus===0"
          class="el_see_btn" @click="this.showPayWindow=true,this.payRid=doc.rid">
          付费查看
        </span>
        <a @click="doDocumentary(doc)"
          class="el_documentary_btn"
          :style="{width: (doc.isToll===1 && doc.numPayStatus===0 ? '50%' : '100%')}">
         {{doc.isCanQuit==='1' ? '取消跟单' : '跟单'}}
       </a>
      </div>
    </div>
  </div>

  <!-- 弹出窗口 -->
  <div :class="this.showPayWindow?'el_eject_window_box':'hide'">
    <div class="el_eject_window">
      <div class="el_confirm_info">
        <span class="el_confirm_info_up">总计消费500.00元</span>
      </div>
      <div class="el_button">
        <span class="el_button_left" @click="this.showPayWindow = false">
          取消
        </span>
        <span class="el_button_right" @click="this.buyViewRec()">
          确定
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {api} from '../../util/service'
  import Vue from 'vue'
  import $ from 'zepto'
  import pingpp from 'pingpp-js'

  Vue.filter('numberFilter', function (value, isFree, isPay, index) {
    // isFree: 0 免费  1收费
    // isPay: 0 未付费   1 已付
    let num = '*'
    if (isFree === 0) {
      // 免费的直接可看
      num = value.split(',')[index]
    }
    else if (isFree === 1) {
      if (isPay === 1) {
        // 收费的付款后可看
        num = value.split(',')[index]
      }
    }
    return num
  })

  export default {
    ready () {
      $.init()
      this.getDocList()
    },
    data () {
      return {
        docList: [],
        showPayWindow: false,
        payRid: null
      }
    },
    methods: {
      /*
       * 获取跟单选购列表
       */
      getDocList () {
        // isCanDoc: "1"      -> 1 可跟   0 不可跟
        // isCanQuit: "0"     -> 1 可以取消  0 不能取消
        // numPayStatus: 0    -> 0 未付费查看   1 已付可看
        // isToll: 0          -> 0 免费      1收费
        // nums: "01,03,04,06,07,08"
        // recInfo: "推荐期号2016090540-2016090662(100期)"
        let token = window.localStorage.getItem('elToken')
        // 获取跟单选购列表
        this.$http.get(api.recRecord, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1) {
            // // 模拟可取消
            // data[0].isCanQuit = '1'
            this.docList = data
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('获取跟单选购列表失败:' + e)
        })
      },
      /*
       * 跟单事件
       */
      doDocumentary (doc) {
        // isCanDoc: "1"      -> 1 可跟   0 不可跟
        // isCanQuit: "0"     -> 1 可以取消  0 不能取消
        // numPayStatus: 0    -> 0 未付费查看   1 已付可看
        // isToll: 0          -> 0 免费      1收费
        let nums = doc.nums
        if (doc.isToll === 1 && doc.numPayStatus === 0) {
          // 需要隐藏号码
          nums = '*,*,*,*,*,*'
        }
        if (doc.isCanDoc === '1' && doc.isCanQuit === '0') {
          // 跳转至模拟收益
          this.$route.router.go({
            name: 'payment',
            query: {
              rid: doc.rid
            },
            params: {
              number: nums,
              gameType: 'R6',
              from: 'gd'
            },
            replace: false
          })
        }
        if (doc.isCanQuit === '1') {
          $.confirm('确认取消跟单?', '提示', ()=>{
            // 发送取消跟单
            let token = window.localStorage.getItem('elToken')
            this.$http.post(api.cancelOrderByGD, {
              'did': doc.rid
            }, {
              headers: {
                'x-token': token
              }
            })
            .then(({data: {code, msg}})=>{
              if (code === 1) {
                this.getDocList()
              }
              $.toast(msg)
            }).catch((e)=>{
              console.error('取消跟单失败:' + e)
            })
          }, ()=>{
            // confirm取消
          })
        }
      },
      /*
       * 付费查看支付
       */
      buyViewRec () {
        if (this.payRid) {
          // 付费查看
          let openid = window.localStorage.getItem('elOpenid')
          let token = window.localStorage.getItem('elToken')
          this.$http.post(api.payViewRec, {
            'rid': this.payRid,
            'price': 500,
            'openid': openid
          }, {
            headers: {
              'x-token': token
            }
          })
          .then(({data: {data, code, msg}})=>{
            // console.log(data)
            if (data.paytype === 'wx_pub') {
              pingpp.createPayment(data.charge, function (result, err) {
                if (result === 'success') {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  $.toast('支付成功!')
                  setTimeout(function () {
                    this.getDocList()
                  }.bind(this), 1200)
                }
                else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  $.toast('支付失败!')
                }
                else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                  $.toast('支付取消!')
                }
                setTimeout(function () {
                  this.showPayWindow = false
                }.bind(this), 1000)
              })
            }
            else {
              // 账户金额支付
              $.toast(msg)
              this.showPayWindow = false
              this.getDocList()
            }
          }).catch((e)=>{
            console.error('付费查看失败:' + e)
          }).finally(()=>{
            this.payRid = null
          })
        }
      }
    }
  }
</script>

<style scoped>
body,ul{
  margin: 0;
  padding: 0;
}
ul,a,p{
  margin: 0;
  padding: 0;
  list-style: none;
}
.el_head{
  width: 100%;
  height: 2.5rem;
  background-color: #282828;
  overflow: hidden;
}
.el_return_btn{
  display: block;
  width: 10%;
  height: 2.5rem;
  float: left;
}
.el_return_btn img{
  height: 0.8rem;
  display: block;
  margin: 0.85rem auto;
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
.el_bill_box{
  width: 95%;
  background-color: #fff;
  overflow: hidden;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
}
.el_bill_title{
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
}
.el_bill_title span{
  width: 100%;
  line-height: 1.3rem;
  display: block;
  text-align: center;
  font-size: 0.6rem;
}
.el_bill_number{
  width: 100%;
  height: 2.2rem;
  background-color: #fff;
}
.el_bill_number li{
  width: 16.6%;
  float: left;
  display: block;
  line-height: 2rem;
  text-align: center
}
.el_proposal{
  height: 1.3rem;
  width: 100%;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_proposal span{
  width: 100%;
  display: block;
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.6rem;
}
.el_state_box{
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  border-top: 0.05rem solid #f0f0f0;
}
.el_process,.el_state{
  width: 50%;
  text-align: center;
  line-height: 2.5rem;
  display: block;
  float: left;
  font-size: 0.7rem;
}
.el_state{
  border-right: 0.05rem solid #f0f0f0;
}
.el_button{
  width: 100%;
  height: 2.5rem;
  border-top: 0.05rem solid #f0f0f0;
  background-color: #fff;
}
.el_see_btn{
  width: 50%;
}
.el_see_btn,.el_documentary_btn{
  font-size: 0.7rem;
  line-height: 2.5rem;
  text-align: center;
  display: block;
  float: left;
}
.el_see_btn{
  border-right: 0.05rem solid #f0f0f0;
}
.el_stop_btn{
  font-size: 0.7rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  display: block;
}
.hide{
  display: none;
}
.el_eject_window_box{
  display: block;
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top:0;
  background-image: url(/img/11/el_black_bg.png);
}
.el_eject_window{
  width: 80%;
  background-color: white;
  height: 7.5rem;
  margin: 50% 10%;
}
.el_confirm_info{
  width:100%;
  height:5rem;
  border-bottom:solid 0.05rem #f0f0f0;
  overflow: hidden;
}
.el_confirm_info_up{
  text-align: center;
  line-height:3rem;
  display: block;
}
.el_confirm_info_up{
  font-size: 0.8rem;
  margin-top: 0.9rem;
}
.el_confirm_info_lower{
  font-size: 0.6rem;
}
.el_button{
  width:100%;
  height:2.5rem;
  overflow: hidden;
}
.el_button_left,.el_button_right{
  width: 50%;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.7rem;
  display: block;
  float: left;
}
.el_button_left{
  border-right: 0.05rem #f0f0f0 solid;
}
</style>
