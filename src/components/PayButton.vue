<template>
  <div :class="['actions-modal', show ? 'modal-in' : 'modal-out']"
    @click="$event.stopPropagation()">
    <div class="actions-modal-group">
      <span class="actions-modal-label">请选择参与人次</span>
      <span class="actions-modal-button actions-modal-button-bold">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount=10" :style="(this.amount===10?'color:#f6383a':'')">10</span>
          <span class="modal-button-sml" @click="this.amount=20" :style="(this.amount===20?'color:#f6383a':'')">20</span>
          <span class="modal-button-sml" @click="this.amount=50" :style="(this.amount===50?'color:#f6383a':'')">50</span>
          <span class="modal-button-sml" @click="this.amount=100" :style="(this.amount===100?'color:#f6383a':'')">100</span>
          <span class="modal-button-sml" @click="this.amount=300" :style="(this.amount===300?'color:#f6383a':'')">300</span>
        </div>
      </span>
      <span class="actions-modal-button">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount>this.item.price?(this.amount-=this.item.price):this.item.price"
            style="width:20%;font-size:2rem;color:black;">-</span>
          <span class="modal-button-sml" style="width:60%">
            <input v-model="amount"
              type="number" min={{item.price}} max={{item.codeCount}}
              style="ime-mode:disabled;height:1.8rem;width:100%;text-align:center;color:#f6383a"
              onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
              onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          </span>
          <span class="modal-button-sml" @click="this.amount=parseFloat(this.amount)+parseFloat(this.item.price)"
            style="width:20%;font-size:1.4rem;color:black;">+</span>
        </div>
      </span>
      <span class="actions-modal-label">
        需&nbsp;<font style="color:#f6383a">{{amount}}</font>&nbsp;元
      </span>
    </div>
    <div class="actions-modal-group">
      <span class="actions-modal-button bg-danger" @click="payHP(this.item)">确认</span>
    </div>
  </div>
  <!-- <nav class="bar bar-nav">
    <h1 class="title" v-text="title"></h1>
    <a class="button button-link button-nav pull-left"
      v-link="{path: path, replace: true}">
      <span class="icon icon-left"></span>
    </a>
  </nav> -->
</template>

<script>
import {hpApi} from '../util/service'
import $ from 'zepto'
export default {
  props: {
    amount: 10,
    show: false,
    item: ''
  },
  methods: {
    payHP (item) {
      if (parseFloat(this.amount) % parseFloat(item.price) > 0) {
        $.toast('参与人次必须是' + item.price + '的倍数')
        return
      }
      else if (parseFloat(this.amount) > parseFloat(item.codeCount)) {
        $.toast('最多可参与人次' + item.codeCount)
        return
      }
      else if (parseFloat(this.amount) <= 0) {
        $.toast('请输入有效金额')
        return
      }
      // 购物车商品数组
      let spcarInfos = {
        'recharge_money': this.amount,
        'projectId': item.id,
        'payCount': this.amount,
        'phone': '',
        'userId': '',
        'number': item.number
      }
      let postBody = JSON.stringify(spcarInfos)
      $.confirm('总计' + this.amount + '元,是否确认付款?', '提示', ()=>{
        // console.log(postBody)
        // 发起支付请求
        this.$http.post(hpApi.ptpay, postBody,
          {
            headers: {
              'x-token': window.localStorage.getItem('elToken')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            $.toast(msg)
            this.$parent.closeModal()
          }
          else {
            $.toast(msg)
            this.$parent.showPayBtn = false
          }
        }).catch((e)=>{
          $.alert('结算异常...')
          console.error(e)
        })
      }, ()=>{
        // confirm取消
        this.$parent.showPayBtn = false
      })
    }
  }
}
</script>

<style scoped>
.icon-left {
  width: 1rem;
}
.modal-button-sml {
  width: 100%;
  padding: 0 0.25rem;
  height: 2.2rem;
  font-size: 0.85rem;
  line-height: 2.2rem;
  text-align: center;
  color: #0894ec;
  background: #e8e8e8;
  display: block;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
}
.modal-button-sml:after {
  /*content: '';
  position: absolute;
  right: 0;
  top: 0;
  left: auto;
  bottom: auto;
  width: 1px;
  height: 100%;
  background-color: #b5b5b5;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;*/
}
</style>
