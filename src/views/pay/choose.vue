
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
    <div  class="el_record_box"
      v-for="doc in docList | orderBy 'numPayStatus' -1" track-by="$index">
      <div class="el_title_number">
        <div class="el_number">
          <span v-if="doc.dailyNo">
            {{doc.dailyNo.substr(4, 2)}}/{{doc.dailyNo.substr(6, 2)}} 推荐{{doc.dailyNo.substr(doc.dailyNo.length - 2, 2)}}
          </span>
        </div>
        <div class="el_section_box">
          <span>{{doc.recInfo}}</span>
        </div>
      </div>
      <ul class="el_documentary_state">
        <li>
          <span>进行期数 <font color="#e23c3c">{{doc.alreadyPer}}</font>/{{doc.totPeriods}}
          </span>
        </li>
        <li>
          <span>最低利润率 {{doc.minRatePer}}%</span>
        </li>
      </ul>
      <div class="el_passengers_box">
        <ul class="el_record_number_table">
            <li>
              <span>{{doc.nums | numberFilter doc.isToll doc.numPayStatus 0}}</span>
            </li>
            <li>
              <span>{{doc.nums | numberFilter doc.isToll doc.numPayStatus 1}}</span>
            </li>
            <li>
              <span
                :style="{
                  'color':
                  doc.isToll === 1
                  ?
                  (doc.numPayStatus === 1 ? '' : '#333333')
                  :
                  '',
                  'background-color':
                  doc.isToll === 1
                  ?
                  (doc.numPayStatus === 1 ? '' : 'white')
                  :
                  ''
                  }">
                {{doc.nums | numberFilter doc.isToll doc.numPayStatus 2}}
              </span>
            </li>
            <li>
              <span
              :style="{
                'color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : '#333333')
                :
                '',
                'background-color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : 'white')
                :
                ''
                }">
                {{doc.nums | numberFilter doc.isToll doc.numPayStatus 3}}</span>
            </li>
            <li>
              <span
              :style="{
                'color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : '#333333')
                :
                '',
                'background-color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : 'white')
                :
                ''
                }">
                {{doc.nums | numberFilter doc.isToll doc.numPayStatus 4}}</span>
            </li>
            <li>
              <span
              :style="{
                'color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : '#333333')
                :
                '',
                'background-color':
                doc.isToll === 1
                ?
                (doc.numPayStatus === 1 ? '' : 'white')
                :
                ''
                }">
                {{doc.nums | numberFilter doc.isToll doc.numPayStatus 5}}</span>
            </li>
        </ul>
        <div class="el_passengers">
          <span v-if="doc.totalPerson>0">
            {{
              doc.alreadyPer>50
              ?
              (doc.alreadyPer + doc.totalPerson)
              :
              doc.alreadyPer * 3 + (doc.totalPerson == null ? 0 : doc.totalPerson)
            }}人购买
          </span>
          <span v-else>
            0人购买
          </span>
        </div>
      </div>
      <div class="el_stop_btn">
        <span v-if="doc.isToll===1 && doc.numPayStatus===0"
          @click="this.showPayWindow=true,this.payRid=doc.rid">
          <font class="payment_btn">付费查看</font>
        </span>
        <span
          @click="doDocumentary(doc)"
          :style="{width: (doc.isToll===1 && doc.numPayStatus===0 ? '50%' : '100%')}">
          <font class="el_see_btn"
            :style="{'background-color': (doc.flag==='1' ? '#e23c3c' : '#e5e5e5')}">
            {{doc.flag==='1' ? '跟单' : '取消跟单'}}
          </font>
        </span>
      </div>
    </div>
    <!-- <div class="el_record_box"
      v-for="doc in docList | orderBy 'numPayStatus' -1" track-by="$index">
      <table class="el_record_number_table">
        <tr class="el_record_number_box">
          <td class="el_record_number">
            <span>{{$index+1}}</span>
          </td>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 0}}
          </th>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 1}}
          </th>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 2}}
          </th>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 3}}
          </th>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 4}}
          </th>
          <th>
            {{doc.nums | numberFilter doc.isToll doc.numPayStatus 5}}
          </th>
        </tr>
      </table>
      <div class="el_section_box">
        <span>{{doc.recInfo}}</span>
      </div>
      <ul class="el_documentary_state">
        <li style="border-right:0.05rem solid #f0f0f0">
          <span style="margin-top:0.3rem;">进行期数</span>
          <span>
            <font color="#42c1b1">{{doc.alreadyPer}}</font>/{{doc.totPeriods}}
          </span>
        </li>
        <li>
          <span style="margin-top:0.3rem;">最低利润率</span>
          <span>{{doc.minRatePer}}%</span>
        </li>
      </ul>
      <div class="el_stop_btn">
        <span v-if="doc.isToll===1 && doc.numPayStatus===0"
          class="el_see_btn" @click="this.showPayWindow=true,this.payRid=doc.rid">
          付费查看
        </span>
        <span @click="doDocumentary(doc)"
          :style="{width: (doc.isToll===1 && doc.numPayStatus===0 ? '50%' : '100%')}">
          <font color="#42c1b1">
            {{doc.flag==='1' ? '跟单' : '取消跟单'}}
          </font>
        </span>
      </div>
    </div>
  </div> -->

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

  <!-- 弹出窗口 -->
  <div :class="this.showCancelWindow?'el_eject_window_box':'hide'">
    <div class="el_eject_window">
      <div class="el_confirm_info">
        <span class="el_confirm_info_up">是否确认取消跟单?</span>
      </div>
      <div class="el_button">
        <span class="el_button_left" @click="this.showCancelWindow = false">
          取消
        </span>
        <span class="el_button_right" @click="this.cancelRec()">
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
      if (isPay === 1 || index < 2) {
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
        showCancelWindow: false,
        payRid: null,
        cancelDid: null
      }
    },
    methods: {
      /*
       * 获取跟单选购列表
       */
      getDocList () {
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
        // flag: "0"          -> 1 为可跟单，不可取消;0为不可跟单，可取消
        // numPayStatus: 0    -> 0 未付费查看;1 已付可看
        // isToll: 0          -> 0 免费;1 收费
        let nums = doc.nums
        if (doc.isToll === 1 && doc.numPayStatus === 0) {
          // 需要隐藏号码
          nums = '*,*,*,*,*,*'
        }
        if (doc.flag === '1') {
          // 跳转至模拟收益
          this.$route.router.go({
            name: 'payment',
            query: {
              number: nums,
              gameType: 'R6',
              from: 'gd',
              rid: doc.rid,
              s: doc.totPeriods - doc.alreadyPer
            },
            replace: false
          })
        }
        else if (doc.flag === '0') {
          // 取消跟单
          this.cancelDid = doc.did
          this.showCancelWindow = true
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
            if (code === 1) {
              if (data.paytype === 'wx_pub') {
                let payResult = false
                pingpp.createPayment(data.charge, function (result, err) {
                  if (result === 'success') {
                    // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                    $.toast('支付成功!')
                    payResult = true
                  }
                  else if (result === 'fail') {
                    // charge 不正确或者微信公众账号支付失败时会在此处返回
                    $.toast('支付失败!')
                  }
                  else if (result === 'cancel') {
                    // 微信公众账号支付取消支付
                    $.toast('支付取消!')
                  }
                })
                // 在支付完成后做操作
                setTimeout(function () {
                  this.showPayWindow = false
                  if (payResult) {
                    this.getDocList()
                  }
                }.bind(this), 1200)
              }
              else {
                // 账户金额支付
                $.toast(msg)
                this.showPayWindow = false
                this.getDocList()
              }
            }
            else {
              $.toast(msg)
            }
          }).catch((e)=>{
            console.error('付费查看失败:' + e)
          }).finally(()=>{
            this.payRid = null
          })
        }
      },
      cancelRec () {
        if (this.cancelDid) {
          // 发送取消跟单
          let token = window.localStorage.getItem('elToken')
          this.$http.post(api.cancelOrderByGD, {
            'did': this.cancelDid
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
          }).finally(()=>{
            this.showCancelWindow = false
            this.cancelDid = null
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
.el_stop_btn{
  font-size: 0.6rem;
  width: 100%;
  overflow: hidden;
  height: 2.2rem;
}
.el_stop_btn span{
  width: 50%;
  text-align: center;
  display: block;
  float: left;
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
..el_confirm_info{
  width:100%;
  height:5rem;
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
}{
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
.el_record_number_table{
  width: 42%;
  float: left;
  margin: 0 4%;
}
.el_record_number_table li{
  float: left;
  width: 16.6%;
}
.el_record_number_table li span{
  width: 1rem;
  height: 1rem;
  font-size: 0.6rem;
  color: white;
  text-align: center;
  display: block;;
  line-height: 1rem;
  background-color: #e23c3c;
  border-radius: 1rem;
  float: left;
  margin-top: 0.4rem;
}
.el_record_box{
  width: 96%;
  background-color: white;
  overflow: hidden;
  margin:0.5rem 2%;
  border: 0.05rem solid #e5e5e5;
}
.el_state_top_box{
  width: 100%;
  height: 2.5rem;
}
.el_state_top_box li{
  display: block;
  float: left;
}
.el_state_top_box li span{
  font-size: 0.6rem;
  display: block;
  margin-left: 0.6rem;
}
.el_section_box{
  width: 66%;
  float: left;
}
.el_section_box span{
  line-height: 2rem;
  text-align: left;
  display: block;
  font-size: 0.6rem;
}
.el_documentary_state{
  width: 100%;
  height: 2rem;
}
.el_documentary_state li{
  width: 50%;
  display: block;
  float: left;
  height: 2rem;
}
.el_documentary_state li span{
  font-size: 0.6rem;
  display: block;
  width: 100%;
  text-align: center;
  line-height: 2rem;
}
.el_title_number{
  width: 100%;
  height: 2rem;
  border-bottom: 0.05rem solid #f0f0f0;
}
.el_number{
  float: left;
  width: 34%;
}
.el_number span{
  font-size: 0.7rem;
  display: block;
  line-height: 2rem;
  text-align: center;
  font-weight: bold;
}
.el_passengers{
  width: 50%;
  float: left;
  height: 2rem;
}
.el_passengers span{
  width: 100%;
  display: block;
  line-height: 2rem;
  text-align: center;
  font-size: 0.6rem;
}
.el_passengers_box{
  width: 100%;
}
.payment_btn{
  width: 90%;
  height: 1.7rem;
  background-color: #16a8e5;
  display: block;
  color: white;
  line-height: 1.7rem;
  margin: 0 auto;
  border-radius: 0.1rem;
}
.el_see_btn{
  width: 90%;
  height: 1.7rem;
  display: block;
  color: white;
  line-height: 1.7rem;
  margin: 0 auto;
  border-radius: 0.1rem;
}
</style>
