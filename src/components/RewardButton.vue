<template>
  <div :class="['sml-actions-modal', show ? 'modal-in' : 'modal-out']"
    @click="$event.stopPropagation()">
    <div class="sml-actions-modal-group rewardBackground">
      <span class="sml-actions-modal-label"></span>
      <span class="sml-actions-modal-button sml-actions-modal-button-bold">
        <div class="sml-modal-buttons">
          <span @click="this.amount=8.8"
            :class="['sml-modal-button', amount===8.8 ? 'amountbg' : '']"
            :style="amount===8.8 ? 'color:red' : 'color:#f5d996'">
            8.8
          </span>
          <span @click="this.amount=18.8"
            :class="['sml-modal-button', amount===18.8 ? 'amountbg' : '']"
            :style="amount===18.8 ? 'color:red' : 'color:#f5d996'">
            18.8
          </span>
          <span @click="this.amount=88.8"
            :class="['sml-modal-button', amount===88.8 ? 'amountbg' : '']"
            :style="amount===88.8 ? 'color:red' : 'color:#f5d996'">
            88.8
          </span>
        </div>
      </span>
      <span class="sml-actions-modal-button">
        <div class="sml-modal-buttons">
          <span class="sml-modal-button" @click="this.amount<9?8.8:this.amount=parseFloat(this.amount)-1"
            style="width:20%;font-size:2.2rem;color:#f5d996;">-</span>
          <span class="sml-modal-button" style="width:60%">
            <input v-model="amount" readonly="true" type="text"
              style="height:1.8rem;width:100%;text-align:center;color:red;"/>
          </span>
          <span class="sml-modal-button" @click="this.amount=parseFloat(this.amount)+1"
            style="width:20%;font-size:1.6rem;color:#f5d996;">+</span>
        </div>
      </span>
      <span class="sml-actions-modal-label">
        赏&nbsp;<font style="color:#f5d996;">{{amount}}</font>&nbsp;元
      </span>
    </div>
    <div class="sml-actions-modal-group">
      <span class="sml-actions-modal-button bg-danger" @click="payReward(this.plan)">打赏</span>
    </div>
  </div>
</template>

<script>
import {planApi} from '../util/service'
import $ from 'zepto'
export default {
  props: {
    amount: 0,
    show: false,
    plan: ''
  },
  methods: {
    payReward: function (plan) {
      $.confirm('您要给[' + plan.expert_name + ']打赏</br>￥' + this.amount + '', '提示', ()=>{
        // 打赏
        this.$http.post(planApi.doreward,
          {
            'pid': plan.plan_id,
            'amount': this.amount
          },
          {
            headers: {
              'x-token': window.localStorage.getItem('elToken')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            this.$parent.closeRewardBtn()
          }
          // 结果信息
          $.toast(msg)
          this.$parent.showRewardBtn = false
        }).catch((e)=>{
          console.error('无法打赏:' + e)
        })
      }, ()=>{
        this.$parent.showRewardBtn = false
        // confirm取消
      })
    }
  }
}
</script>

<style scoped>
.icon-left {
  width: 1rem;
}
.rewardBackground{
  border-radius: 0.35rem;
  background:url('/img/专家方案/打赏背景.png');
  background-size:100%;
  /*background-image: url('/img/专家方案/打赏背景.png');*/
  /*overflow: hidden;*/
}
.amountbg {
  /*margin-top: 0.16rem;*/
  /*color: '#f6383a';*/
  /*background-image: url('/img/专家方案/打赏固定数额选中.png') no-repeat;*/
  /*background-size:100%;*/
  background:url('/img/专家方案/打赏固定金额选中.png') no-repeat;
  background-size: 100%;
}


.sml-modal-button {
  width: 5.2rem;
  padding: 0 0.25rem;
  height: 2.2rem;
  font-size: 0.85rem;
  line-height: 1.6rem;
  text-align: center;
  /*color: #f5d996;*/
  /*background: #e8e8e8;*/
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
.modal {
  width: 13.5rem;
  position: absolute;
  z-index: 11000;
  left: 50%;
  margin-left: -6.75rem;
  margin-top: 0;
  top: 50%;
  text-align: center;
  border-radius: 0.35rem;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0) scale(1.185);
  transform: translate3d(0, 0, 0) scale(1.185);
  -webkit-transition-property: -webkit-transform, opacity;
  transition-property: transform, opacity;
  color: #3d4145;
  display: none;
}
.modal.modal-in {
  opacity: 1;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0) scale(1);
  transform: translate3d(0, 0, 0) scale(1);
}
.modal.modal-out {
  opacity: 0;
  z-index: 10999;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: translate3d(0, 0, 0) scale(0.815);
  transform: translate3d(0, 0, 0) scale(0.815);
}
.modal-title {
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
}
.modal-title + .modal-text {
  margin-top: 0.25rem;
}
.sml-modal-buttons {
  height: 2.2rem;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.modal-button {
  width: 100%;
  padding: 0 0.25rem;
  height: 2.2rem;
  font-size: 0.85rem;
  line-height: 2.2rem;
  text-align: center;
  /*color: #0894ec;*/
  /*background: #e8e8e8;*/
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
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .modal-button:after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .modal-button:after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}
.modal-button:first-child {
  border-radius: 0 0 0 0.35rem;
}
.modal-button:last-child {
  border-radius: 0 0 0.35rem 0;
}
.modal-button:last-child:after {
  display: none;
}
.modal-button:first-child:last-child {
  border-radius: 0 0 0.35rem 0.35rem;
}
.modal-button.modal-button-bold {
  font-weight: 500;
}
.sml-actions-modal {
  font-family: "";
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 11000;
  width: 100%;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.sml-actions-modal.modal-in {
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.sml-actions-modal.modal-out {
  z-index: 10999;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.sml-actions-modal-group {
  margin: 0.4rem;
}
.sml-actions-modal-button, .sml-actions-modal-label {
  width: 100%;
  text-align: center;
  font-weight: normal;
  margin: 0;
  /*background: rgba(243, 243, 243, 0.95);*/
  box-sizing: border-box;
  display: block;
  position: relative;
}
.sml-actions-modal-button:after, .sml-actions-modal-label:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  /*background-color: #d2d2d6;*/
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .sml-actions-modal-button:after, .sml-actions-modal-label:after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .sml-actions-modal-button:after, .sml-actions-modal-label:after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}
.sml-actions-modal-button a, .sml-actions-modal-label a {
  text-decoration: none;
  color: inherit;
}
.sml-actions-modal-button b, .sml-actions-modal-label b {
  font-weight: 500;
}
.sml-actions-modal-button.sml-actions-modal-button-bold, .sml-actions-modal-label.sml-actions-modal-button-bold {
  font-weight: 500;
}
.sml-actions-modal-button.sml-actions-modal-button-danger, .sml-actions-modal-label.sml-actions-modal-button-danger {
  color: #f6383a;
}
.sml-actions-modal-button.color-danger, .sml-actions-modal-label.color-danger {
  color: #f6383a;
}
.sml-actions-modal-button.bg-danger, .sml-actions-modal-label.bg-danger {
  background: #f5d996;
  color: red;
}
.sml-actions-modal-button:first-child, .sml-actions-modal-label:first-child {
  border-radius: 0.2rem 0.2rem 0 0;
}
.sml-actions-modal-button:last-child, .sml-actions-modal-label:last-child {
  border-radius: 0 0 0.2rem 0.2rem;
}
.sml-actions-modal-button:last-child:after, .sml-actions-modal-label:last-child:after {
  display: none;
}
.sml-actions-modal-button:first-child:last-child, .sml-actions-modal-label:first-child:last-child {
  border-radius: 0.2rem;
}
.sml-actions-modal-button.disabled, .sml-actions-modal-label.disabled {
  opacity: 0.95;
  color: #8e8e93;
}
.sml-actions-modal-button {
  cursor: pointer;
  line-height: 2.15rem;
  font-size: 1rem;
  color: #0894ec;
}
.sml-actions-modal-label {
  font-size: 0.7rem;
  line-height: 1.3;
  min-height: 2.2rem;
  padding: 0.4rem 0.5rem;
  color: #f5d996;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
