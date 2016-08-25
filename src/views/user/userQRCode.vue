<template>
<div class="content qrcode" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="content-padded" style="background: white;">
    <p class="color-gray"></p>
    <v-content type="block" >
      <div class="invite-card" v-if="qrUrl">
          <div class="invite-card-content" align="center" style="height:100%;width:100%;">
            <v-qrcode :val="qrUrl"
              :size="size" :bg-color="bgColor"
              :fg-color="fgColor" level="L"></v-qrcode>
          </div>
      </div>
    </v-content>
  </div>
</div>
</template>

<script>
import VContent from '../../components/Content'
import VQrcode from '../../components/Qrcode'
import {userApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    this.$http.post(userApi.qrcode, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        this.$set('qrUrl', result)
      }
      else {
        $.toast(msg)
      }
    }).catch((e)=>{
      console.error('获取用户二维码失败:' + e)
    })
  },
  data () {
    return {
      title: '我的二维码',
      qrUrl: '',
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      size: document.body.offsetWidth - 110
    }
  },
  components: {
    VContent,
    VQrcode
  }
}
</script>

<style scoped>
.qrcode .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.invite-card {
  padding: .1rem;
}
.invite-card .invite-card-content {
  width: 100%;
  height: 380.2666429px;
  border: 1px solid #B2B2B2;
  border-radius: 8px;
  background-color: #ffffff;
  padding-top: 0.4rem;
}
.color {
  background-color: #ed8e07;
}
</style>
