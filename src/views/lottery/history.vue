<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <div class="content" transition="bounce" v-infinite-scroll="loadMore">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>历史号码</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>

    <!-- 历史号码 -->
    <div class="el_history_box">
    <table class="el_history_table"  width="100%" border="0" cellpadding="0"  cellspacing="0">
      <tr>
        <th width="30%" style="border-right:0.05rem solid #f0f0f0">期号</th>
        <th colspan="5">号码</th>
      </tr>
      <tr align="center" v-for="item in list">
        <td style="border-right:0.05rem solid #f0f0f0">{{item.periods?item.periods.substr(2, 8):''}}</td>
        <td class="history_number">
          <span :style="{'background-color': '#f26438'}">
            {{item.nums | split ','| getArray 0}}
          </span>
        </td>
        <td class="history_number">
          <span :style="{'background-color': '#acb07c'}">
            {{item.nums | split ','| getArray 1}}
          </span>
        </td>
        <td class="history_number">
          <span :style="{'background-color': '#ea8f3d'}">
            {{item.nums | split ','| getArray 2}}
          </span>
        </td>
        <td class="history_number">
          <span :style="{'background-color': '#acb07c'}">
            {{item.nums | split ','| getArray 3}}
          </span>
        </td>
        <td class="history_number">
          <span :style="{'background-color': '#f26438'}">
            {{item.nums | split ','| getArray 4}}
          </span>
        </td>
      </tr>
    </table>
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
      list: [],
      pagenum: 1,
      pagesize: 20,
      loading: false
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
              this.list.push(m)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取历史开奖号码失败:' + e)
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
  height: 100%;
}
.el_history_table{
  background-color: white;
}
.el_history_table tr th,.el_history_table tr td{
  height: 2.5rem;
  font-size: 0.7rem;
}
.el_history_table tr{
  border-bottom: 0.05rem solid #f0f0f0;
}
.history_number span{
  /*background-color: #e23c3c;*/
  display: block;
  color: white;
  border-radius: 01rem;
  width: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.6rem;
}
</style>
