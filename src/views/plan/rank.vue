<template>
<div class="rank" transition="bounce">
  <v-nav :path="path" :title="title" class="headerColor"></v-nav>
  <v-tab name="rankTable" title="周盈利排行" status="active"
    distance="55" v-pull-to-refresh="refreshRank">
    <v-layer></v-layer>
    <div class="topTips" v-if="length>0">
      <div class="list-block">
        <ul>
          <li class="topLi">
            <div class="item-title">您上周的盈利金额为{{userRank.winBonus>0?userRank.winBonus:'0 未上榜'}}</div>
          </li>
        </ul>
      </div>
    </div>
    <v-content type="block-title" v-if="length>0">
      <span style="float:left;margin-left: .2rem;">方案收益</span>
      <span style="float:right;margin-right: .2rem;">排名</span>
    </v-content>
    <v-list type="media" class-name="inset">
      <li class="item-content" v-for="rank in ranks" track-by="$index">
        <div class="item-media">
          <img src="/img/个人中心/默认头像.png" style='width: 2.2rem;'>
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title" v-text="rank.nickName"></div>
          </div>
          <div class="rank-num" :style="$index+1 | color">{{ $index+1 }}</div>
          <div class="item-subtitle" style="font-size:0.68rem;max-width:90%;">
            <span style="width:42%;display:inline-block;">方案数:{{rank.pNum}}</span>
            <span style="width:40%;">收益:{{rank.winBonus}}</span>
          </div>
        </div>
      </li>
    </v-list>
    <div style="width:100%;text-align:center;margin-top:2rem;margin-bottom:6rem;">
      <div>
        <img src="/img/专家方案/温馨提示.png" height="24" width="152">
      </div>
      <div v-cloak v-if="showWarning"  style="font-size:0.38rem;color:#A9A9A9;">
        暂时没有排行信息
      </div>
      <div v-cloak v-else style="font-size:0.38rem;color:#A9A9A9;">
        本排行榜为周排行,每周一凌晨更新上周的排名信息
      </div>
    </div>
  </v-tab>
</div>
</template>

<script>
import Vue from 'vue'
import $ from 'zepto'
import VNav from '../../components/Nav'
import VContent from '../../components/Content'
import VList from '../../components/List'
import VTab from '../../components/Tab'
import VLayer from '../../components/PullToRefreshLayer'
import {planApi} from '../../util/service'

Vue.filter('color', function (val) {
  let col = '#95CACA'
  let left = '0.35rem'
  if (val > 9) {
    left = '0.15rem'
  }
  switch (val)
  {
    case 1:
      col = 'red'
      break
    case 2:
      col = 'blue'
      break
    case 3:
      col = 'purple'
      break
    default:
      break
  }
  return [{'background': col, 'padding-left': left}]
})

/*
 * 隐藏手机号码中间四位
 */
Vue.filter('phone', function (val) {
  let phone = val.substr(3, 4)
  let lphone = val.replace(phone, '****')
  return lphone
})

export default {
  ready () {
    $.init()
    this.getRank()
  },
  data () {
    return {
      title: '周盈利排行',
      path: '/plan',
      showWarning: false,
      userRank: '',
      ranks: [
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'A',
        //   planCount: 550,
        //   rate: 193819,
        //   color: 'background: red;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'B',
        //   planCount: 310,
        //   rate: 128901,
        //   color: 'background: blue;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'C',
        //   planCount: 420,
        //   rate: 8888,
        //   color: 'background: purple;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'D',
        //   planCount: 39,
        //   rate: 6666,
        //   color: 'background: gray;'
        // }
      ]
    }
  },
  methods: {
    refreshRank () {
      $.showIndicator()
      setTimeout(function () {
        this.getRank()
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1500)
    },
    getRank () {
      // 获取排名信息
      this.$http.get(planApi.rankweek, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        // console.log(data)
        // rankList->pNum,userId,winbonus
        // userRank->bs_userId,winBonus
        if (result.rankList.length > 0) {
          // console.log(result)
          this.$set('showWarning', false)
          this.$set('ranks', result.rankList)
          this.$set('userRank', result.userRank[0])
        }
        else {
          this.$set('showWarning', true)
        }
      }).catch(()=>{
        console.error('无法连接服务器-获取盈利排行')
      })
    }
  },
  components: {
    VNav,
    VContent,
    VList,
    VTab,
    VLayer
  },
  computed: {
    length () {
      return this.ranks.length
    }
  }
}
</script>

<style scoped>
.rank {
  font-family: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.rank .content-block-title {
  margin: 1.25rem .75rem -1rem;
}
.rank .list-block.inset {
  margin-left: .35rem;
  margin-right: .35rem;
}
.rank .rank-num {
  float: right;
  min-width: 1.2rem;
  line-height: 1.2rem;
  border-radius: 50%;
  color: white;
  margin-top: -.7rem;
  vertical-align: top;
  display: inline-block;
  font-size: .8rem;
}
#rankTable  {
  top: .42rem;
}
.headerColor {
  background-color: #ed8e07;
}
.topTips {
  position:absolute;
  top: 0.36rem;
  width:100%;
}
.topLi {
  background-color: #616268;
  color: #FFFFF0;
  font-size: 0.58rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align:center;
}
.list-block {
  margin: 1.4rem 0;
}
</style>
