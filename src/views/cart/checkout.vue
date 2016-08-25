<template>
  <div class="container">
    <nav class="bar bar-nav">
      <h1 class="title color">结算</h1>
    </nav>
    <div class="content list" v-pull-to-refresh="refreshCart">
      <v-layer></v-layer>
      <div v-if="!showHpWarning" class="list-block infinite-list" style="margin-top:0.1rem;">
        <ul>
          <li class="item-content" id="cartRecord" style="padding-left:0rem;"
            v-for="item in items" track-by="$index">
            <div class="item-inner" style="padding:0.2rem;">
              <div class="item-media" style="width:2rem;">
                <div class="item-title-row">
                  <img :src="item.images| split ','| getArray 0" style="width:4rem;">
                </div>
              </div>
              <div class="item-title-sml" style="width:100%;margin-left:2.8rem;">
                <div style="font-size:0.74rem;font-weight:bold;">{{item.name}}</div>
                <div style="margin-top:-0.1rem;font-size:0.44rem;">
                  {{item.content}}
                </div>

                <div style="margin-top:0.3rem;">
                  <span style="font-size:0.68rem;">
                    需:<font class="redFont">{{item.amount}}元</font>
                  </span>
                  <span style="font-size:0.68rem;margin-left:1.2rem;">
                    总价:{{item.totalPrice}}.00元
                  </span>
                </div>
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
    </div>
  </div>
  <div class="toolBarCart" v-if="items.length>0">
    <div class="list-block">
      <ul>
        <li class="item-content bottomLi">
          <div class="item-inner" style="padding-left:0.75rem;">
            <div class="item-title">共{{items.length}}件商品,总计 {{totalItems}} 元</div>
            <div class="toPay-button">
              <button class="button button-fill" @click="validatePwd()">付款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import VLayer from '../../components/PullToRefreshLayer'
import {hpApi} from '../../util/service'
import $ from 'zepto'

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    $.init()
    document.title = '结算'
    this.refreshCart()
  },
  data () {
    return {
      token: this.$route.params.token,
      pwd: this.$route.params.pwd,
      items: [],
      totalItems: 0,
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
    refreshCart () {
      $.showIndicator()
      setTimeout(function () {
        // 获取乐夺宝购物车
        this.loadHPCart()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 500)
    },
    loadHPCart () {
      // 获取服务器中的乐夺宝购物车信息
      this.$http.get(hpApi.redisCart, {},
        {
          headers: {
            'x-token': this.token
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
    validatePwd () {
      let wdModals = {
        title: '',
        text: '<font style="font-size:0.68rem;">为保障您的财产安全</br>付款前需要验证您的登录密码</font>',
        afterText: '<div class="pwd-input">' +
                     '<input type="password" id="checkPwd" placeholder="密码">' +
                   '</div>',
        buttons: [
          {
            text: '取消'
          },
          {
            text: '确定',
            bold: true,
            onClick: ()=> {
              let pwd = document.getElementById('checkPwd').value
              if (md5(pwd) === this.pwd) {
                // 密码验证通过进入支付
                this.payHP()
              }
              else {
                $.toast('输入密码错误')
              }
            }
          }
        ]
      }
      $.modal(wdModals)
    },
    payHP () {
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
              'x-token': this.token
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
  },
  components: {
    VLayer
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
  padding-bottom: 2.5rem;
}
.toolBarCart {
  position:absolute;
  bottom:-0.3rem;
  width:100%;
  text-align:center;
}
.toPay-button button {
  width: 120%;
  line-height: 2rem !important;
  height: 2rem !important;
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
  font-weight:bold;
}
.pwd-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
</style>
