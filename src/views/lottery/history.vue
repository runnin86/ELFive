<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>历史号码</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 历史号码 -->
    <table class="el_history_box"  width="100%" border="0" cellpadding="0"  cellspacing="0">
      <tr>
        <th width="30%">期号</th>
        <th colspan="5">号码</th>
      </tr>
      <tr align="center" v-for="item in list">
        <td>{{item.periods?item.periods.substr(2, 8):''}}</td>
        <td>{{item.nums | split ','| getArray 0}}</td>
        <td>{{item.nums | split ','| getArray 1}}</td>
        <td>{{item.nums | split ','| getArray 2}}</td>
        <td>{{item.nums | split ','| getArray 3}}</td>
        <td>{{item.nums | split ','| getArray 4}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {api} from '../../util/service'
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
      this.getHistoryList()
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      /*
       * 获取开奖号码的历史记录(分页未完成)
       */
      getHistoryList () {
        let token = window.localStorage.getItem('elToken')
        // 获取跟单选购列表
        this.$http.post(api.winNumHistory, {
          'pagenum': 1,
          'pagesize': 30
        }, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1) {
            this.list = data
          }
          else {
            $.toast(msg)
          }
        }).catch((e)=>{
          console.error('获取历史开奖号码失败:' + e)
        })
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
  width:10%;
  height:2.5rem;
  float: left;
}
.el_return_btn img{
  height:0.8rem;
  display: block;
  margin:0.85rem auto;
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
.el_history_box{
  background-color: white;
}
.el_history_box tr th,.el_history_box tr td{
  border: 0.05rem solid #f0f0f0;
  height: 2.5rem;
  font-size: 0.7rem;
}

</style>
