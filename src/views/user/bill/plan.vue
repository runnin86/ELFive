<template>
<div class="content plan" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      v-link="{path: '/user/bill', query: { pageTransition: 'fade' }, replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <!-- 搜索框 -->
  <div class="bar bar-header-secondary">
    <div class="searchbar">
      <a class="searchbar-cancel">取消</a>
      <div class="search-input">
        <label class="icon icon-search" for="search"></label>
        <input type="text" id='search' placeholder='选择时间...'/>
      </div>
    </div>
  </div>
  <!-- 列表 -->
  <div class="list-block">
    <ul v-for="t in list" track-by="$index">
      <li class="item-content2">
        <div class="item-inner">
          <div class="item-title2" style="width:10rem;">
              {{t.planName}}
            <!--{{t.exType}} -->
          </div>
          <div class="item-title2" style="margin-left:-11rem;">
            {{t.exDate}}
          </div>
          <div class="item-title2">
            {{t.money}}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-cloak v-if="showWarning" style="width:100%;height:100%;text-align:center;">
    <div>
      <img src="/img/专家方案/温馨提示.png" height="24" width="152">
    </div>
    <div style="font-size:0.38rem;color:#A9A9A9;">
      您还没有方案记录可供查看
    </div>
  </div>
</div>
</template>

<script>
import {userApi} from '../../../util/service'
import {dateFilter} from '../../../filters'
import $ from 'zepto'

export default {
  ready () {
    $('#search').calendar({
      value: [new Date()],
      dateFormat: 'yyyy年mm月dd日',
      // minDate: '2015-06-01',
      // maxDate: '2018-06-01',
      // onOpen: (obj)=>{
      //   obj.params.input[0].value = '32323'
      //   console.log(obj)
      // },
      onClose: (obj)=>{
        this.queryByDate(obj.value[0])
      },
      onChange: (obj, val, text)=>{
        // console.log(val + '->' + text)
        // this.queryByDate(text)
      }
    })
    this.loadData()
  },
  data () {
    return {
      title: '方案记录',
      list: [],
      showWarning: false
    }
  },
  methods: {
    queryByDate (d) {
      let qd = dateFilter(d / 1000, 2)
      console.log(qd)
    },
    /*
     * 读取数据
     */
    loadData () {
      $.showIndicator()
      this.$http.post(userApi.myplan, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          // console.log(result)
          if (result.length > 0) {
            this.$set('showWarning', false)
            this.$set('list', result)
          }
          else {
            this.$set('showWarning', true)
          }
        }
        else {
          $.toast(msg)
        }
        $.hideIndicator()
      }).catch((e)=>{
        console.error('获取我的账单(方案记录)失败:' + e)
      })
    }
  }
}
</script>

<style scoped>
.plan .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
.list-block {
  margin: 4.4rem 0;
  height: 2.9rem;
  font-size:0.66rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
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
</style>
