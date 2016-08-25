<template>
  <div class="container">
    <nav class="bar bar-nav">
      <h1 class="title color">购物车</h1>
    </nav>
    <div class="content list" v-pull-to-refresh="refreshCart">
      <v-layer></v-layer>
      <v-tabs type="tab" class-name="article-tabs" style="margin-top:0.1rem;" @click="selectTab($event)">
        <v-tab name="tab-planList" status="active" title="方案">
          <div v-if="!showPlanWarning" class="list-block infinite-list" style="margin-top:0.1rem;">
            <ul>
              <li class="item-content" id="cartRecord" style="padding-left:0rem;"
                v-for="plan in plans" track-by="$index">
                <div class="item-inner" style="padding:0.2rem;">
                  <div class="item-media">
                    <div class="item-title-row">
                      <div class="text-center" style="padding-right:0.2rem;">
                        <img :src="plan.expertHead" class="img-responsive"
                          style="margin:0 0.6rem 0 0.6rem;"
                          width="42" height="46">
                      </div>
                      <div class="text-center" style="padding-right:0.2rem;">
                        {{plan.expertName}}
                      </div>
                    </div>
                  </div>
                  <div class="item-title-sml" style="margin-left:-1.6rem;">
                    <div style="margin-top:0.2rem;">
                      <span>
                        {{plan.planName}}
                      </span>
                      <span class="pull-right" style="margin-right:1rem;">
                        {{plan.addTime}}
                      </span>
                    </div>
                    <div class="buttons-row" style="margin-top:0.3rem;text-align:center;">
                      <span class="button" @click="reducePlan(plan)"
                        style="width:2rem;font-size:1.6rem;">-</span>
                      <span class="button" style="width:24%;">
                        <input :value="plan.amount" v-on:blur='cartPriceCheckPlan(plan, $event)'
                          type="tel" min=1 max=9999
                          style="ime-mode:disabled;text-align:center;height:100%;font-size:.7rem;"
                          onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
                          onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
                      </span>
                      <span class="button" @click="augmentPlan(plan)"
                        style="width:2rem;font-size:1.2rem;">+</span>
                    </div>
                    <div style="margin-top:0.3rem;">
                      <span class="icon-histogram"
                        style="font-size:1rem;color:red;">
                        <font style="font-size:0.58rem;color:black;">
                          {{plan.rangeName}}
                        </font>
                      </span>
                      <span class="icon-golds"
                        style="font-size:1rem;margin-left:1.2rem;">
                        <font style="font-size:0.58rem;">
                          {{plan.planAmount}}元
                        </font>
                      </span>
                    </div>
                  </div>
                  <div class="item-title-sml" style="margin-left:-7.6rem;">
                      {{plan.planAmount * plan.amount}}元
                  </div>
                  <div class="item-after" @click="delCartPlan(plan.pid)">
                    <img src="/img/购物车/删除.png" width="32">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-cloak v-if="showPlanWarning" style="width:100%;height:100%;text-align:center;margin-top:2rem;">
            <div>
              <img src="/img/专家方案/温馨提示.png" height="24" width="152">
            </div>
            <div style="font-size:0.38rem;color:#A9A9A9;">
              购物车空空如也,赶快去购买方案吧!
            </div>
          </div>
        </v-tab>
        <v-tab name="tab-hpList" title="一元夺宝">
          <div v-if="!showHpWarning" class="list-block infinite-list" style="margin-top:0.1rem;">
            <ul>
              <li class="item-content" id="cartRecord" style="padding-left:0rem;"
                v-for="item in items" track-by="$index">
                <div class="item-inner" style="padding:0.2rem;">
                  <div class="item-media" style="width:2rem;">
                    <div class="item-title-row">
                      <div v-if="showImg" class="text-center" style="padding-right:0.2rem;">
                        <img :src="item.images| split ','| getArray 0" style="width:4rem;">
                      </div>
                      <div v-else class="text-center" style="padding-right:0.2rem;">
                        <img src="/img/乐夺宝/产品图片默认.png" style="width:4rem;">
                      </div>
                    </div>
                  </div>
                  <div class="item-title-sml" style="width:100%;margin-left:2.8rem;">
                    <div style="margin-bottom:0.3rem;font-size:0.68rem;">{{item.name}}</div>
                    <div style="margin-top:-0.4rem;font-size:0.44rem;">
                      {{item.content}}
                    </div>
                    <div class="buttons-row" style="margin-top:0.1rem;width: 7.6rem;">
                      <span class="button" @click="reduceHP(item)"
                        style="width:2rem;font-size:1.6rem;">-</span>
                      <span class="button">
                        <input :value="item.amount" v-on:blur='cartPriceCheckHP(item, $event)'
                          type="tel" min={{item.price}} max={{item.totalCount}}
                          style="ime-mode:disabled;text-align:center;height:100%;font-size:.7rem;"
                          onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
                          onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
                      </span>
                      <span class="button" @click="augmentHP(item)"
                        style="width:2rem;font-size:1.2rem;">+</span>
                    </div>
                    <div style="margin-top:0.3rem;">
                      <span style="font-size:0.5rem;">
                        需:<font class="redFont">{{item.amount}}元</font>
                      </span>
                      <span style="font-size:0.5rem;margin-left:1.2rem;">
                        总价:{{item.totalPrice}}.00元
                      </span>
                    </div>
                  </div>
                  <div class="item-after" @click="delCartHP(item.id, item.number)">
                    <img src="/img/购物车/删除.png" width="32">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-cloak v-if="showHpWarning" style="width:100%;height:100%;text-align:center;margin-top:2rem;">
            <div>
              <img src="/img/专家方案/温馨提示.png" height="24" width="152">
            </div>
            <div style="font-size:0.38rem;color:#A9A9A9;">
              购物车空空如也,赶快去夺宝吧!
            </div>
          </div>
        </v-tab>
      </v-tabs>
    </div>
  </div>
  <div class="toolBarCart" v-if="plans.length>0 && showTab === 'plan'">
    <div class="list-block">
      <ul>
        <li class="item-content bottomLi">
          <div class="item-inner" style="padding-left:0.75rem;">
            <div class="item-title redFont">共{{plans.length}}件方案,总计 {{totalPlans}} 元</div>
            <div class="toPay-button">
              <button class="button button-fill button-danger" @click="payPlan()">付款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="toolBarCart" v-if="items.length>0 && showTab === 'hp'">
    <div class="list-block">
      <ul>
        <li class="item-content bottomLi">
          <div class="item-inner" style="padding-left:0.75rem;">
            <div class="item-title">共{{items.length}}件商品,总计 {{totalItems}} 元</div>
            <div class="toPay-button">
              <button class="button button-fill" @click="payHP()">付款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VLayer from '../../components/PullToRefreshLayer'
import VTabs from '../../components/Tabs'
import VTab from '../../components/Tab'
import {hpApi, planApi} from '../../util/service'
import $ from 'zepto'

Vue.filter('cartPriceValidate', function (value, price) {
  console.log(price)
  return value
})

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    $.init()
    document.title = '购物车'
    this.refreshCart()
  },
  data () {
    return {
      plans: [],
      totalPlans: 0,
      items: [],
      totalItems: 0,
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      showTab: 'plan',
      loading: false,
      showPlanWarning: false,
      showHpWarning: false
    }
  },
  watch: {
    // 'items': {
    //   handler: function (val, oldVal) {
    //     // console.log('进入深度观察')
    //   },
    //   deep: true
    // }
  },
  computed: {
    length () {
      return this.items.length
    }
  },
  methods: {
    selectTab (e) {
      if (e.target.href) {
        let unActiveTab = $('.active.button.tab-link')[0].hash
        if (unActiveTab === '#tab-hpList') {
          this.$set('showTab', 'plan')
        }
        else if (unActiveTab === '#tab-planList') {
          this.$set('showTab', 'hp')
        }
      }
    },
    refreshCart () {
      $.showIndicator()
      setTimeout(function () {
        // 获取方案购物车
        this.loadPlanCart()
        // 获取乐夺宝购物车
        this.loadHPCart()
        // 设置购物车图标
        this.$root.setCardBadge()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 500)
    },
    loadPlanCart () {
      // 获取服务器中的方案购物车信息
      this.$http.post(planApi.queryCart, {},
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.plans = []
          this.totalPlans = 0
          if (result.length > 0) {
            this.$set('showPlanWarning', false)
            for (let p of result) {
              this.totalPlans += (p.planAmount * p.amount)
              this.plans.push(p)
            }
          }
          else {
            this.$set('showPlanWarning', true)
          }
        }
        else {
          $.toast(msg)
          // console.error('获取乐夺宝购物车失败:' + msg)
        }
      }).catch((e)=>{
        console.error('无法获取方案购物车:' + e)
      })
    },
    loadHPCart () {
      // 获取服务器中的乐夺宝购物车信息
      this.$http.get(hpApi.redisCart, {},
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg, info}})=>{
        if (code === 1) {
          this.items = []
          this.totalItems = 0
          if (info.length > 0) {
            this.$set('showHpWarning', false)
            for (let i of info) {
              this.totalItems += i.amount
              this.items.push(i)
            }
          }
          else {
            this.$set('showHpWarning', true)
          }
        }
        else {
          $.toast(msg)
          // console.error('获取乐夺宝购物车失败:' + msg)
        }
      }).catch((e)=>{
        console.error('无法获取乐夺宝购物车:' + e)
      })
    },
    /*
     * ------------------------乐夺宝相关---------------------------
     */
    cartPriceCheckHP: function (item, e) {
      if (e.target.value % item.price > 0) {
        let validAmount = e.target.value - (e.target.value % item.price)
        // 防止金额小于价格
        validAmount = validAmount < item.price ? item.price : validAmount
        e.target.value = validAmount
        this.changeAmountHP(item, validAmount)
        $.toast('必须是' + item.price + '的倍数,已为你调整为' + validAmount, 500)
      }
      else if (e.target.value === '' || parseFloat(e.target.value) === 0) {
        e.target.value = item.amount
      }
    },
    delCartHP (id, number) {
      this.$http.delete(hpApi.redisCart + '/' + id + '_' + number, {},
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          // 删除成功
          this.refreshCart()
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('删除购物车异常:' + e)
      })
    },
    payHP () {
      if (window.localStorage.getItem('user')) {
        // 刷新购物车
        this.refreshCart()
        // 购物车商品数组
        let spcarlist = []
        for (let i of this.items) {
          spcarlist.push({
            'name': i.name,
            'number': i.number,
            'payCount': i.amount,
            'projectId': i.id,
            'recharge_money': i.amount
          })
        }
        // 组装请求消息体
        let spcarInfos = {
          'spcarInfos': {
            'totalmoney': this.totalItems,
            'spcarlist': spcarlist
          }
        }
        let postBody = JSON.stringify(spcarInfos)
        $.confirm('总计' + this.totalItems + '元,是否确认付款?', '提示', ()=>{
          // console.log(postBody)
          // 发起支付请求
          this.$http.post(hpApi.cartPay, postBody,
            {
              headers: {
                'x-token': window.localStorage.getItem('token')
              },
              emulateJSON: true
            })
          .then(({data: {code, msg}})=>{
            if (code === 1) {
              $.toast(msg)
              setTimeout(function () {
                // 清空购物车
                this.items = []
                this.totalItems = 0
                // 刷新购物车
                this.refreshCart()
              }.bind(this), 500)
            }
            else {
              $.toast(msg)
            }
          }).catch((e)=>{
            $.alert('服务器连接中断...')
            console.error(e)
          })
        }, ()=>{
          // confirm取消
        })
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=shopCart', replace: true})
      }
    },
    augmentHP (item) {
      // 数量相加
      let augmentAmount = item.amount + item.price
      this.changeAmountHP(item, augmentAmount)
    },
    reduceHP (item) {
      // 数量加减
      let reduceAmount = (item.amount - item.price) < item.price ? item.price : (item.amount - item.price)
      this.changeAmountHP(item, reduceAmount)
    },
    changeAmountHP (item, amount) {
      this.$http.put(hpApi.redisCart + '/' + item.id,
        {
          'number': item.number,
          'amount': amount
        },
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          let initAmount = item.amount
          item.amount = msg.amount
          this.totalItems = this.totalItems - initAmount + amount
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('购物车数量加减异常:' + e)
      })
    },
    /*
     * ------------------------方案相关---------------------------
     */
    cartPriceCheckPlan: function (plan, e) {
      let validAmount = 0
      if (e.target.value > 0) {
        validAmount = parseFloat(e.target.value)
      }
      else if (e.target.value === '' || parseFloat(e.target.value) === 0) {
        e.target.value = 1
        validAmount = 1
      }
      this.changeAmountPlan(plan, validAmount)
    },
    delCartPlan (id) {
      // Body :{"dellist":[{"pid":"1ee6d76ff3094c8a82b948def322da58"}]}
      // 组装请求消息体
      let dellist = {
        'dellist': [{'pid': id}]
      }
      let deleteBody = JSON.stringify(dellist)
      this.$http.delete(planApi.delCart, deleteBody,
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
     .then(({data: {code, msg}})=>{
       if (code === 1) {
         // 删除成功
         this.refreshCart()
       }
       else {
         $.toast(msg)
       }
     }).catch((e)=>{
       console.log('删除购物车异常:')
       console.error(e)
     })
    },
    payPlan () {
      if (window.localStorage.getItem('user')) {
        // 刷新购物车
        this.refreshCart()
        // 购物车方案数组
        let spcarlist = []
        // {"planbinfo":{"totalmoney":2.0,
        //  "spcarlist":[{"multipy":1,"name":"飞鹰计划","pid":"31","sum":2.0}]}}
        for (let i of this.plans) {
          spcarlist.push({
            'multipy': i.amount,
            'name': i.expertName,
            'pid': i.pid,
            'sum': i.amount * i.planAmount
          })
        }
        // 组装请求消息体
        let planbinfo = {
          'planbinfo': {
            'totalmoney': this.totalPlans,
            'spcarlist': spcarlist
          }
        }
        let postBody = JSON.stringify(planbinfo)
        $.confirm('总计' + this.totalPlans + '元,是否确认付款?', '提示', ()=>{
          // 发起支付请求
          this.$http.post(planApi.cartPay, postBody,
            {
              headers: {
                'x-token': window.localStorage.getItem('token')
              },
              emulateJSON: true
            })
          .then(({data: {code, msg, result}})=>{
            if (code === 1) {
              $.toast('购买成功!')
              setTimeout(function () {
                // 清空购物车
                this.plans = []
                this.totalPlans = 0
                // 刷新购物车
                this.refreshCart()
              }.bind(this), 500)
            }
            else if (code === 2) {
              // 结算异常
              $.toast(msg)
            }
            else if (code === 0) {
              let errObj = result[0]
              let errorTips = errObj.expert_name ? '专家[' + errObj.expert_name + '],' : '' + errObj.msg
              $.toast(errorTips)
            }
          }).catch((e)=>{
            $.alert('服务器连接中断...')
            console.error(e)
          })
        }, ()=>{
          // confirm取消
        })
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=shopCart', replace: true})
      }
    },
    augmentPlan (plan) {
      // 数量相加
      this.changeAmountPlan(plan, parseFloat(plan.amount) + 1)
    },
    reducePlan (plan) {
      // 数量加减
      if (parseFloat(plan.amount) - 1 >= 1) {
        this.changeAmountPlan(plan, parseFloat(plan.amount) - 1)
      }
    },
    changeAmountPlan (plan, amount) {
      this.$http.post(planApi.upCart,
        {
          'pid': plan.pid,
          'amt': amount
        },
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          plan.amount = result.amount
          // 重新计算总和
          this.totalPlans = 0
          if (this.plans.length > 0) {
            for (let p of this.plans) {
              this.totalPlans += (p.planAmount * p.amount)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('购物车数量加减异常:' + e)
      })
    }
  },
  components: {
    VLayer,
    VTabs,
    VTab
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.list-block .item-title-sml {
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  /*white-space: nowrap;*/
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.list-block {
  margin: .3rem 0;
}
.list {
  bottom: .5rem;
  padding-bottom: 4.4rem;
}
.toolBarCart {
  position:absolute;
  bottom:2.2rem;
  width:100%;
  text-align:center;
}
.toPay-button button {
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
.bottomLi {
  background-color: #FFFFF0;
  font-size: 0.7rem;
  height: 2.4rem;
}
#cartRecord>div{
  font-size: 0.48rem;
}
.redFont {
  color: red;
}
</style>
