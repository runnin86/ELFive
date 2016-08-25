<template>
<div class="content commission" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block">
    <ul v-for="t in list | orderBy 'order_id' -1">
      <li class="item-content2">
        <div class="item-inner"
          :style="{color:(t.commissionStatus===4?'#FF4500':'#DCDCDC')}">
          <div class="item-title2">
            <div>
              {{t.from_user_phone}}
              <font>({{t.commissionStatus===4
                ?
                '可提现'
                :
                (t.commissionStatus===1
                ?
                '已提现'
                :
                (t.commissionStatus===2
                ?
                '审核中'
                :
                t.commissionStatus===3
                ?
                '未达标'
                :''
                ))}})</font>
            </div>
            <div style="font-size:0.48rem;">
              <span>
                用户所属:{{t.oneLevelPhone === ''?'':'上级' + t.oneLevelPhone}}
              </span>
              <span>
                {{t.oneLevelPhone === ''?'直属上级':''}}
              </span>
            </div>
          </div>
          <div class="item-title2 pull-right" style="font-size:1rem;">
            {{t.total_fee}}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="list.length === 0"
    style="width:100%;height:100%;text-align:center;">
    <div>
      <img src="/img/专家方案/温馨提示.png" height="24" width="152">
    </div>
    <div style="font-size:0.38rem;color:#A9A9A9;">
      您还没有返佣记录哦
    </div>
  </div>
</div>
<div class="toolBarCart" v-if="list.length>0">
  <div class="list-block">
    <ul>
      <li class="item-content bottomLi">
        <div class="item-inner" style="padding-left:0.75rem;">
          <div class="item-title">共{{withDrawLength}}条可提现 总额:{{withDrawMoney}}</div>
          <div class="toPay-button">
            <button class="button button-fill button-success" @click="doWithDraw()">提现</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {userApi} from '../../util/service'
import md5 from 'md5'
import $ from 'zepto'

export default {
  ready () {
    this.load()
  },
  data () {
    return {
      title: '我的返佣',
      user: JSON.parse(window.localStorage.getItem('user')),
      list: [],
      withDrawLength: 0,
      withDrawMoney: 0
    }
  },
  methods: {
    load () {
      this.$http.post(userApi.commission, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.withDrawLength = 0
          this.withDrawMoney = 0
          // console.log(result)
          for (var i = 0; i < result.length; i++) {
            let ob = result[i]
            if (ob.commissionStatus === 4) {
              // commissionStatus:1已提现 2:提现审核中 3:未达标 4:可提现
              this.withDrawLength += 1
              this.withDrawMoney += ob.total_fee
            }
          }
          this.$set('list', result)
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取我的返佣失败:' + e)
      })
    },
    doWithDraw () {
      if (this.withDrawLength === 0 && this.withDrawMoney === 0) {
        $.toast('可提现金额为0')
        return
      }
      let wdModals = {
        title: '',
        text: '为保障您的财产安全,提取佣金前需要输入您的登录密码。',
        afterText: '<div class="widthDraw-input">' +
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
              let userPwd = this.user.user_pass
              if (md5(pwd) === userPwd) {
                $.confirm('提取所有佣金:' + this.withDrawMoney + '元?',
                  () => {
                    // 发送返佣提现请求
                    let token = window.localStorage.getItem('token')
                    this.$http.post(userApi.withdraw,
                      {
                        wtype: 2,
                        wmoney: this.withDrawMoney
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
                        this.load()
                      }
                      else {
                        $.toast('提现失败:' + msg)
                      }
                    }).catch((e)=>{
                      console.error('我的返佣提现失败:' + e)
                    })
                  },
                  () => {
                    // 取消
                  }
                )
              }
              else {
                $.toast('输入密码错误')
              }
            }
          }
        ]
      }
      $.modal(wdModals)
    }
  }
}
</script>

<style scoped>
.commission .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
.list-block {
  margin: 2.2rem 0;
  height: 2.9rem;
  font-size:0.72rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
}
.list-block .item-content2 {
  box-sizing: border-box;
  min-height: 2.2rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.list-block .item-title2 {
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  /*white-space: nowrap;*/
  position: relative;
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  max-width: 100%;
  padding-left: 0.4rem;
}
.list-block ul:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
.list-block .item-inner:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
.toolBarCart {
  position:absolute;
  bottom:-2.6rem;
  width:100%;
  text-align:center;
}
.toPay-button button {
  margin-right: 1rem;
  width: 112%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.bottomLi {
  background-color: #FFFFF0;
  font-size: 0.7rem;
  height: 2.46rem;
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
</style>
