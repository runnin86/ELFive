<template>
<div class="content message" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">我的消息</h1>
  </header>
  <div class="content list" v-infinite-scroll="loadMore">
    <div class="list-block infinite-list">
      <ul v-for="ml in msglist" track-by="$index">
        <li class="item-content" @click="showMsg('m_' + $index,ml.msg_id,$event)">
          <!-- <div class="item-media"><i class="icon icon-dianji"></i></div> -->
          <div class="item-inner">
            <!-- <div class="item-after">{{ml.msg_id}}</div> -->
            <!-- <div class="item-after">{{ml.msg_title}}</div> -->
            <!-- <div class="item-after">{{ml.msg_content}}</div> -->
            <!-- <div class="item-after">{{ml.msg_createtime.replace('T', ' ').replace('.000Z', ' ')}}</div> -->
            <!-- <div class="item-after">{{ml.msg_isread}}</div> -->
            <!-- <div class="item-after">{{ml.msg_remark}}</div> -->
            <!-- <div class="item-after">{{ml.msg_touser}}</div> -->
            <!-- <div class="item-after">{{ml.msg_type}}</div> -->
            <div style="position:relative;">
              <i v-if="ml.msg_isread === 1"></i>
              <font style="margin-left:0.6rem;">{{ml.msg_title}}</font>
            </div>
            <div>{{ml.msgCreateTime}}</div>
          </div>
          <div class="btn" style="line-height:2.2rem;">删除</div>
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
</div>
</template>

<script>
import {loader} from '../../util/util'
import {userApi} from '../../util/service'
import $ from 'zepto'

window.addEventListener('load', function () {
  var initX
  var moveX
  var X = 0
  var objX = 0
  window.addEventListener('touchstart', function (event) {
    event.preventDefault()
    var obj = event.target.parentNode
    if (obj.className === 'item-content') {
      initX = event.targetTouches[0].pageX
      objX = (obj.style.WebkitTransform.replace(/translateX\(/g, '').replace(/px\)/g, '')) * 1
    }
    if (objX === 0) {
      window.addEventListener('touchmove', function (event) {
        event.preventDefault()
        var obj = event.target.parentNode
        if (obj.className === 'item-content') {
          moveX = event.targetTouches[0].pageX
          X = moveX - initX
          if (X > 0) {
            obj.style.WebkitTransform = 'translateX(' + 0 + 'px)'
          }
          else if (X < 0) {
            var l = Math.abs(X)
            obj.style.WebkitTransform = 'translateX(' + -l + 'px)'
            if (l > 80) {
              l = 80
              obj.style.WebkitTransform = 'translateX(' + -l + 'px)'
            }
          }
        }
      })
    }
    else if (objX < 0) {
      window.addEventListener('touchmove', function (event) {
        event.preventDefault()
        var obj = event.target.parentNode
        if (obj.className === 'item-content') {
          moveX = event.targetTouches[0].pageX
          X = moveX - initX
          if (X > 0) {
            var r = -80 + Math.abs(X)
            obj.style.WebkitTransform = 'translateX(' + r + 'px)'
            if (r > 0) {
              r = 0
              obj.style.WebkitTransform = 'translateX(' + r + 'px)'
            }
          }
          else {
            // 向左滑动
            obj.style.WebkitTransform = 'translateX(' + -80 + 'px)'
          }
        }
      })
    }
  })
  window.addEventListener('touchend', function (event) {
    event.preventDefault()
    var obj = event.target.parentNode
    if (obj.className === 'item-content') {
      objX = (obj.style.WebkitTransform.replace(/translateX\(/g, '').replace(/px\)/g, '')) * 1
      if (objX > -40) {
        obj.style.WebkitTransform = 'translateX(' + 0 + 'px)'
      }
      else {
        obj.style.WebkitTransform = 'translateX(' + -80 + 'px)'
      }
    }
  })
})

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
      loading: false
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
i{
  display:block;
  background: #f00;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.26rem;
  /*left:-0.2rem;*/
  position: absolute;
}

/**{ padding:0; margin:0; list-style: none;}
header{ background: #f7483b; border-bottom: 1px solid #ccc}
header h2{ text-align: center; line-height: 54px; font-size: 16px; color: #fff}
.list-ul{ overflow: hidden}
.list-li{ line-height: 60px; border-bottom: 1px solid #fcfcfc; position:relative;padding: 0 12px; color: #666;
  background: #f2f2f2;
  -webkit-transform: translateX(0px);
}*/
.btn{
  position: absolute;
  top: 0;
  right: -80px;
  text-align: center;
  background: #ffcb20;
  color: #fff;
  width: 80px
}
</style>
