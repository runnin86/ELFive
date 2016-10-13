
<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn"
        v-link="{path: '/reg', replace: true, query:{uid: this.$route.query.uid}}">
        <img src="/img/11/return.png">
      </a>
      <strong>提现规则</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>
    <div class="el_rule_content">
      <span>1.提款时间：每周一到周五（法定节假日除外），10:00进行第一次提现，13:00进行第二次提现，15:00进行第三次提现，17:00进行第四次提现，17:00以后的提现次日10:00处理，节假日提款请求将顺延至节后第一个工作日。如遇法定节假日，提款处理时间公告通知用户。 温馨提示：首次提现的用户客服会与您电话核实信息，请您保持手机畅通，无法联系到您时系统会自动驳回提现申请。</span>
      <span>2.消费金额（出票为准）不足充值金额（不含奖金）的20%，充值收取10%的异常提款手续费。充值金额以上一次提现时间至本次提现时间，消费金额以上一次提现后首次充值时间至本次提现时间为准，正常情况收取提款金额的3%的手续费用。</span>
    </div>
  </div>
</template>

<script>
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
    },
    data () {
      return {
        showTabs: 1
      }
    },
    methods: {
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
  width:10%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
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
.el_rule_content{
  width: 100%;
  background-color: white;
  height: 100%;
  overflow: hidden;
  padding-top:0.4rem;
}
.el_rule_content span{
  display: block;
  width: 86%;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  line-height: 1.2rem;
}
</style>
