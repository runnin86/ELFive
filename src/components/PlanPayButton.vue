<template>
  <div :class="['actions-modal', show ? 'modal-in' : 'modal-out']"
    @click="$event.stopPropagation()">
    <div class="actions-modal-group">
      <span class="actions-modal-label">请选择倍数</span>
      <span class="actions-modal-button actions-modal-button-bold">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount=5" :style="(this.amount===5?'color:#f6383a':'')">5</span>
          <span class="modal-button-sml" @click="this.amount=10" :style="(this.amount===10?'color:#f6383a':'')">10</span>
          <span class="modal-button-sml" @click="this.amount=20" :style="(this.amount===20?'color:#f6383a':'')">20</span>
          <span class="modal-button-sml" @click="this.amount=50" :style="(this.amount===50?'color:#f6383a':'')">50</span>
          <span class="modal-button-sml" @click="this.amount=100" :style="(this.amount===100?'color:#f6383a':'')">100</span>
        </div>
      </span>
      <span class="actions-modal-button">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount<2?1:this.amount-=1"
            style="width:20%;font-size:2rem;color:black;">-</span>
          <span class="modal-button-sml" style="width:60%">
            <input v-model="amount"
              type="number" min=1 max=9999
              style="ime-mode:disabled;height:1.8rem;width:100%;text-align:center;color:#f6383a"
              onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
              onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          </span>
          <span class="modal-button-sml" @click="this.amount+=1"
            style="width:20%;font-size:1.4rem;color:black;">+</span>
        </div>
      </span>
      <span class="actions-modal-label">
        需&nbsp;<font style="color:#f6383a">{{amount*plan.plan_amount}}</font>&nbsp;元
      </span>
    </div>
    <div class="actions-modal-group">
      <span class="actions-modal-button bg-danger" @click="payPlan(this.plan)">确认</span>
    </div>
  </div>
</template>

<script>
import {planApi} from '../util/service'
import $ from 'zepto'
export default {
  props: {
    amount: 1,
    show: false,
    plan: ''
  },
  methods: {
    payPlan (plan) {
      if (parseFloat(this.amount) <= 0) {
        $.toast('请输入有效倍数')
        return
      }
      // 组装请求消息体
      let planbinfo = {
        'pmp': this.amount,
        'pid': plan.plan_id
      }
      let postBody = JSON.stringify(planbinfo)
      $.confirm('总计' + this.amount * plan.plan_amount + '元,是否确认付款?', '提示', ()=>{
        // 发起支付请求
        this.$http.post(planApi.buyPlan, postBody,
          {
            headers: {
              'x-token': window.localStorage.getItem('elToken')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg, result}})=>{
          // console.log(code)
          // console.log(msg)
          // console.log(result)
          if (code === 1) {
            $.toast('购买成功!')
            this.$parent.closeModal()
          }
          else if (code === 2) {
            // 结算异常
            $.toast(msg)
            this.$parent.showPayBtn = false
          }
          else if (code === 0) {
            let errorTips = ''
            if (result) {
              let errObj = result[0]
              errorTips = (errObj.expert_name ? '专家[' + errObj.expert_name + '],' : '') + errObj.msg
            }
            else {
              errorTips = msg
            }
            $.toast(errorTips)
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
