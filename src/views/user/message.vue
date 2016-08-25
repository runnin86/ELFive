<template>
<div class="content message" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
      <span class="icon icon-left"></span>
    </a>
    <button @click="editList()"
      style="margin-right:0.1rem;font-size:0.78rem;color:#2F0000;"
      class="button button-link button-nav pull-right">
      {{editDesc}}
    </button>
    <h1 class="title color">我的消息</h1>
  </header>
  <div class="content list" v-infinite-scroll="loadMore">
    <div class="list-block infinite-list">
      <ul v-for="ml in msglist" track-by="$index">
        <li class="item-content"
          @click="showMsg('m_' + $index,ml.msg_id,$event)">
          <label class="label-checkbox item-content"
            style="width:100%;padding-left:0rem;">
            <input type="checkbox" :value="ml.msg_id" v-model="ids">
            <div class="item-media" v-if="checkBox">
              <i class="icon icon-form-checkbox"></i>
            </div>
            <div class="item-inner">
              <!-- <div class="item-after">{{ml.msg_id}}</div> -->
              <!-- <div class="item-after">{{ml.msg_title}}</div> -->
              <!-- <div class="item-after">{{ml.msg_content}}</div> -->
              <!-- <div class="item-after">{{ml.msg_createtime.replace('T', ' ').replace('.000Z', ' ')}}</div> -->
              <!-- <div class="item-after">{{ml.msg_isread}}</div> -->
              <!-- <div class="item-after">{{ml.msg_remark}}</div> -->
              <!-- <div class="item-after">{{ml.msg_touser}}</div> -->
              <!-- <div class="item-after">{{ml.msg_type}}</div> -->
              <div class="item-title">
                <i v-if="ml.msg_isread === 1" class="redPoint"></i>
                <font style="margin-left:0.6rem;">{{ml.msg_title}}</font>
              </div>
              <div class="item-after">{{ml.msgCreateTime}}</div>
            </div>
          </label>
        </li>
        <li class="item-content" :id="'m_' + $index" style="display: none;background-color: #FFF7FB;">
          <div class="item-inner">
            <div class="msgContent">{{{ml.msg_content}}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-cloak v-if="msglist.length===0" style="width:100%;height:100%;text-align:center;margin-top:2rem;">
      <div>
        <img src="/img/专家方案/温馨提示.png" height="24" width="152">
      </div>
      <div style="font-size:0.38rem;color:#A9A9A9;">
        暂时没有消息哦!
      </div>
    </div>
  </div>
  <div class="toolBarDel" v-if="checkBox">
    <div class="list-block">
      <ul>
        <li class="item-content del-bottomLi">
          <label class="label-checkbox item-content"
            style="width:2rem;padding-left:0rem;">
            <input type="checkbox" v-model="checkAll" @change="doCheckAll()">
            <div class="item-media" v-if="checkBox">
              <i class="icon icon-form-checkbox"></i>
            </div>
          </label>
          <div class="item-inner">
            <div class="item-title">全选</div>
            <div class="del-button">
              <button class="button button-fill button-danger" @click="doDel()">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {loader} from '../../util/util'
import {userApi} from '../../util/service'
import $ from 'zepto'

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    this.msglist = []
    this.getMessage()
  },
  data () {
    return {
      msglist: [],
      pagenum: 1,
      pagesize: 10,
      loading: false,
      checkBox: false,
      checkAll: false,
      editDesc: '编辑',
      ids: []
    }
  },
  computed: {
    length () {
      return this.msglist.length
    }
  },
  methods: {
    getMessage () {
      let token = window.localStorage.getItem('token')
      let param = '?pagenum=' + this.pagenum + '&pagesize=' + this.pagesize
      this.$http.get(userApi.userMessage + param, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          if (result.msglist) {
            if (result.msglist.length === 0) {
              this.pagenum = -1
              return
            }
            for (let m of result.msglist) {
              // 时间需要转换,参见util里的dateFormat
              // let utcDate = new Date(m.msg_createtime)
              // m.msg_createtime = dateFormat(utcDate, 'yyyy-MM-dd HH:mm:ss')
              // 需要模拟msg_content字段
              m.msg_content = ''
              this.msglist.push(m)
            }
          }
        }
        else {
          $.toast(msg)
        }
      }).catch((e)=>{
        console.error('获取用户消息失败:' + e)
      })
    },
    showMsg (id, mid, e) {
      if (this.checkBox) {
        // checkBox选择状态时,不做展开操作
        return
      }
      if (document.getElementById(id).style.display === 'block') {
        document.getElementById(id).style.display = 'none'
      }
      else {
        let token = window.localStorage.getItem('token')
        this.$http.get(userApi.queryMessage + '?msgid=' + mid, {}, {
          headers: {
            'x-token': token
          },
          emulateJSON: true
        })
        .then(({data: {code, msg, result}})=>{
          if (code === 1) {
            for (let m of this.msglist) {
              //  成功则遍历设置该消息已读,去除头部红点
              if (m.msg_id === result.msg_id) {
                m.msg_isread = result.msg_isread
                m.msg_content = result.msg_content
              }
            }
          }
        }).catch((e)=>{
          console.error('获取用户消息失败:' + e)
        })
        document.getElementById(id).style.display = 'block'
      }
    },
    loadMore () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.pagenum === -1) {
        // 满足上述2条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.pagenum = this.pagenum + 1
        this.getMessage()
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 500)
    },
    editList () {
      if (!this.checkBox) {
        this.editDesc = '完成'
        this.checkBox = true
      }
      else {
        this.editDesc = '编辑'
        this.checkBox = false
      }
    },
    doCheckAll () {
      this.ids = []
      if (this.checkAll) {
        // 全选情况下收集所有的id
        for (let m of this.msglist) {
          this.ids.push(m.msg_id)
        }
      }
    },
    doDel () {
      if (this.ids.length > 0) {
        let delJson = {'msgids': this.ids}
        let deleteBody = JSON.stringify(delJson)
        this.$http.delete(userApi.delMessage, deleteBody,
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
       .then(({data: {code, msg, result}})=>{
         if (code === 1) {
           $.toast('操作成功!')
           // 删除成功
           this.checkBox = false
           this.editDesc = '编辑'
           this.msglist = []
           this.getMessage()
         }
         else {
           $.toast(msg)
         }
       }).catch((e)=>{
         console.log('删除我的消息异常:')
         console.error(e)
       })
      }
    }
  },
  watch: {
    'ids': {
      handler: function (newVal, oldVal) {
        if (newVal.length === this.length) {
          this.checkAll = true
        }
        else {
          this.checkAll = false
        }
      }
    }
  }
}
</script>

<style>
.message .list-block {
  margin: 0.1rem 0 1rem 0;
  font-size: .65rem;
}
.message .list-block .item-subtitle {
  font-size: .65rem;
}
.message .list-block .item-input {
  margin-top: .06rem;
  margin-bottom: .06rem;
}
.message .list-block input {
  font-size: .65rem;
}
.message .list-block select {
  font-size: .65rem;
}
.message .list-block textarea {
  font-size: .65rem;
}
.message .list-block .item-title.label  {
  width: 30%;
}
.msgContent span {
  font-size: .60rem !important;
}
.color {
  background-color: #ed8e07;
}
.redPoint {
  display:block;
  background: #f00;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.26rem;
  /*left:-0.2rem;*/
  position: absolute;
}
.toolBarDel {
  position:absolute;
  bottom:-1rem;
  width:100%;
  text-align:center;
}
.del-button button {
  width: 100%;
  /*line-height: 2.1rem !important;
  height: 2.1rem !important;*/
}
.del-bottomLi {
  background-color: #FFFFF0;
  font-size: 0.7rem;
  height: 2.4rem;
}
</style>
