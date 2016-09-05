
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
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
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[0]) : ''}}
        </li>
        <li>
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[1]) : ''}}
        </li>
        <li>
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[2]) : ''}}
        </li>
        <li>
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[3]) : ''}}
        </li>
        <li>
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[4]) : ''}}
        </li>
        <li>
          {{doc.nums ? (doc.numPayStatus === 0 ? '*' : doc.nums.split(',')[5]) : ''}}
        </li>
      </ul>
      <div class="el_proposal">
        <span>{{doc.recInfo}}</span>
      </div>
      <div class="el_button">
        <span class="el_see_btn">
          付费查看
        </span>
        <a class="el_documentary_btn" @click="doDocumentary()">
         跟单
       </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {api} from '../../util/service'
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
      this.getDocList()
    },
    data () {
      return {
        docList: []
      }
    },
    methods: {
      /*
       * 获取跟单选购列表
       */
      getDocList () {
        let token = window.localStorage.getItem('token')
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
      doDocumentary () {
        console.log(3333)
        // /payment
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
.el_see_btn,.el_documentary_btn{
  font-size: 0.7rem;
  width: 50%;
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
</style>
