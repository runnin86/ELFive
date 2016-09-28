<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">

  <div class="content" transition="bounce" v-infinite-scroll="loadMore">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>推荐记录</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <div class="el_record_box" v-for="doc in docList" track-by="$index">
      <div class="el_record_box_table">
        <table class="el_record_number_table">
          <tr class="el_record_number_box">
            <td class="el_record_number">
              <span>{{$index+1}}</span>
            </td>
            <th>
              <span>{{doc.nums | split ','| getArray 0}}</span>
            </th>
            <th>
              <span>{{doc.nums | split ','| getArray 1}}</span>
            </th>
            <th>
              <span>{{doc.nums | split ','| getArray 2}}</span>
            </th>
            <th>
              <span>{{doc.nums | split ','| getArray 3}}</span>
            </th>
            <th>
              <span>{{doc.nums | split ','| getArray 4}}</span>
            </th>
            <th>
              <span>{{doc.nums | split ','| getArray 5}}</span>
            </th>
          </tr>
        </table>
        <div class="el_passengers">
          <span>{{doc.totalPerson}}人购买</span>
        </div>
      </div>
      <ul class="el_state_top_box" style="border-top:solid #f0f0f0 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">起始期</span>
          <span>{{doc.startPeriods?doc.startPeriods.substr(2, 8):''}}</span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">终止期</span>
          <span>{{doc.endPeriods?doc.endPeriods.substr(2, 8):''}}</span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">进行期数</span>
          <span>{{doc.alreadyPer}}</span>
        </li>
      </ul>
      <ul class="el_state_top_box" style="border-top:solid #f0f0f0 0.05rem;">
        <li class="el_state_top_1">
          <span class="el_state_top_margin">中奖金额</span>
          <span><font color="#42c1b1">{{doc.winMount | currency '¥'}}</font></span>
        </li>
        <li class="el_state_top_2">
          <span class="el_state_top_margin">已使用金额</span>
          <span>
            {{doc.useMount | currency '¥'}}
          </span>
        </li>
        <li class="el_state_top_3">
          <span class="el_state_top_margin">利润率</span>
          <span>{{doc.winRate}}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import {loader} from '../../util/util'
import {api} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    this.getHistoryList()
  },
  data () {
    return {
      docList: [],
      pagenum: 1,
      pagesize: 10,
      loading: false
    }
  },
  methods: {
    /*
     * 获取跟单选购列表(分页未完成)
     */
    getHistoryList () {
      let token = window.localStorage.getItem('elToken')
      // 获取跟单选购列表
      this.$http.post(api.docHistory, {
        'pagenum': this.pagenum,
        'pagesize': this.pagesize
      }, {
        headers: {
          'x-token': token
        }
      })
      .then(({data: {code, data, msg}})=>{
        // console.log(data)
        if (code === 1) {
          if (data) {
            if (data.length === 0) {
              this.pagenum = -1
              return
            }
            for (let m of data) {
              this.docList.push(m)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取推荐历史失败:' + e)
      }).finally(()=>{
        this.loading = false
        loader.hide()
      })
    },
    /*
     * 读取更多数据
     */
    loadMore () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.pagenum === -1) {
        // 满足上述2条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.native-scroll')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.pagenum = this.pagenum + 1
        // 查询数据
        this.getHistoryList()
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
      }, 500)
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
/*.el_placeholder{
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
}*/
.el_record_number_table{
  width: 76%;
  overflow: hidden;
  float: left;
}

.el_record_box{
  width: 96%;
  margin: 0.5rem 2%;
  background-color: white;
}
.el_record_box tr{
  height: 2.5rem;
}
.el_record_box tr td{
  line-height: 2.5rem;
}
.el_record_number{
  width: 12%;
  padding-right: 0.3rem;
  text-align: center;
}
.el_record_number span{
  height: 1rem;
  background-color: #42c1b1;
  color: white;
  display: block;
  width: 1.4rem;
  line-height: 1rem;
  font-size: 0.7rem;
}
.el_state_top_box{
  width: 100%;
  height: 2.5rem;
  overflow: hidden;
}
.el_state_top_box li{
  display: block;
  float: left;
}
.el_state_top_box li span{
  font-size: 0.6rem;
  display: block;
  text-align: center;
}
.el_state_top_1{
  width: 33%;
  height: 2.5rem;
}
.el_state_top_3{
  width: 33%;
  height: 2.5rem;
}
.el_state_top_2{
  width: 34%;
  height: 2.5rem;
}
.el_state_top_margin{
  margin-top:0.3rem;
}
.el_record_box_table{
  width: 100%;
}
.el_passengers{
  width: 24%;
  float: left;
}
.el_passengers span{
  display: block;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.6rem;
}
.el_record_number_box th span{
  font-size: 0.6rem;
  line-height: 2.5rem;
}
</style>
