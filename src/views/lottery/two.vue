<template>
  <!-- 防止ios自动获取电话号码 -->
  <meta name = "format-detection" content = "telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <div class="content" transition="bounce">
    <!-- 顶部操作栏 -->
    <div class="el_head">
      <a class="el_return_btn" v-link="{path: '/home', replace: true}">
        <img src="/img/11/return.png">
      </a>
      <strong>前二直选</strong>
      <div class="el_placeholder">&nbsp</div>
    </div>
    <div class="result">
      <span>最新开奖结果</span>
      <ul v-if="lastWinObj">
        <li v-for="num in lastWinObj.nums.split(',')" track-by="$index">{{num}}</li>
      </ul>
    </div>
    <div class="prompt">
      <span>玩法：按位猜中前2位，奖金<font color="#e23c3c">130</font>元</span>
    </div>
    <div class="first">
      <span>万位号码</span>
      <ul>
        <li z-name="ball" @click="choseNumber('m', '01', $event)">01</li>
        <li z-name="ball" @click="choseNumber('m', '02', $event)">02</li>
        <li z-name="ball" @click="choseNumber('m', '03', $event)">03</li>
        <li z-name="ball" @click="choseNumber('m', '04', $event)">04</li>
        <li z-name="ball" @click="choseNumber('m', '05', $event)">05</li>
        <li z-name="ball" @click="choseNumber('m', '06', $event)">06</li>
        <li z-name="ball" @click="choseNumber('m', '07', $event)">07</li>
        <li z-name="ball" @click="choseNumber('m', '08', $event)">08</li>
        <li z-name="ball" @click="choseNumber('m', '09', $event)">09</li>
        <li z-name="ball" @click="choseNumber('m', '10', $event)">10</li>
        <li z-name="ball" @click="choseNumber('m', '11', $event)">11</li>
      </ul>
    </div>
    <div class="last">
      <span>千位号码</span>
      <ul>
        <li z-name="ball" @click="choseNumber('k', '01', $event)">01</li>
        <li z-name="ball" @click="choseNumber('k', '02', $event)">02</li>
        <li z-name="ball" @click="choseNumber('k', '03', $event)">03</li>
        <li z-name="ball" @click="choseNumber('k', '04', $event)">04</li>
        <li z-name="ball" @click="choseNumber('k', '05', $event)">05</li>
        <li z-name="ball" @click="choseNumber('k', '06', $event)">06</li>
        <li z-name="ball" @click="choseNumber('k', '07', $event)">07</li>
        <li z-name="ball" @click="choseNumber('k', '08', $event)">08</li>
        <li z-name="ball" @click="choseNumber('k', '09', $event)">09</li>
        <li z-name="ball" @click="choseNumber('k', '10', $event)">10</li>
        <li z-name="ball" @click="choseNumber('k', '11', $event)">11</li>
      </ul>
    </div>

    <!-- 购买按钮 -->
    <div class="el_documentary_box">
      <span class="el_documentary_amount">共{{bets}}注 {{bets*2}}元</span>
      <div class="el_optional_btn">
      <span @click="buy()">购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'zepto'
import {api} from '../../util/service'
// import {getCombinationCount} from '../../util/util'

export default {
  ready () {
    $.init()
    // this.getLatelyNum()
  },
  data () {
    return {
      lastWinObj: null, // 上期中奖对象
      myriabitList: new Set(), // 万位号码组合
      kilobitList: new Set(), // 千位号码组合
      bets: 0
    }
  },
  methods: {
    /*
     * 获取上期中奖号码
     */
    getLatelyNum () {
      let token = window.localStorage.getItem('elToken')
      if (token) {
        this.$http.get(api.lastWinNum, {}, {
          headers: {
            'x-token': token
          }
        })
        .then(({data: {code, data, msg}})=>{
          // console.log(data)
          if (code === 1) {
            this.lastWinObj = data
          }
        }).catch((e)=>{
          console.error('获取上一期中奖号码失败:' + e)
        })
      }
    },
    /*
     * 选择号码
     */
    choseNumber (type, num, e) {
      // 判断是否已选
      if (type === 'm') {
        if (this.myriabitList.has(num)) {
          // 包含则删除
          this.myriabitList.delete(num)
          e.target.style.backgroundColor = ''
          e.target.style.color = ''
          e.target.style.border = ''
        }
        else {
          // 不包含则新增
          this.myriabitList.add(num)
          e.target.style.backgroundColor = '#e23c3c'
          e.target.style.color = 'white'
          e.target.style.border = 'none'
        }
      }
      else if (type === 'k') {
        if (this.kilobitList.has(num)) {
          // 包含则删除
          this.kilobitList.delete(num)
          e.target.style.backgroundColor = ''
          e.target.style.color = ''
          e.target.style.border = ''
        }
        else {
          // 不包含则新增
          this.kilobitList.add(num)
          e.target.style.backgroundColor = '#e23c3c'
          e.target.style.color = 'white'
          e.target.style.border = 'none'
        }
      }

      // 计算多少注
      this.bets = 0
      if (this.myriabitList.size > 0 && this.kilobitList.size > 0) {
        for (let m of this.myriabitList.keys()) {
          for (let k of this.kilobitList.keys()) {
            if (m !== k) {
              // getCombinationCount(this.kilobitList.size, 2)
              this.bets++
            }
          }
        }
      }
      else {
        this.$set('bets', 0)
      }
    },
    /*
     * 选中购买
     */
    buy () {
      if (this.myriabitList.size > 0 && this.kilobitList.size > 0) {
        if (window.localStorage.getItem('elUser')) {
          let nums = ''
          // 组装万位
          for (let item of this.myriabitList.keys()) {
            nums += item + ','
          }
          nums = nums.substr(0, nums.length - 1)
          nums += '|'
          // 组装千位
          for (let item of this.kilobitList.keys()) {
            nums += item + ','
          }
          nums = nums.substr(0, nums.length - 1)
          this.$route.router.go({
            name: 'payment',
            query: {
              number: nums,
              gameType: 'F2D',
              from: 'zx',
              price: this.bets * 2,
              s: 1
            },
            replace: false
          })
        }
        else {
          $.toast('你尚未登录')
          this.$route.router.go({path: '/login', replace: false})
        }
      }
      else {
        $.toast('本玩法万位,千位至少选择一个号码')
      }
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
  background-color: #e23c3c;
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
.result{
  height: 1.7rem;
  background-color: white;
  width: 100%;
  border-bottom: 0.05rem solid #e5e5e5;
}
.result span{
  display: block;
  float: left;
  width: 30%;
  padding-left: 0.6rem;
  font-size: 0.7rem;
  color: #333333;
  line-height: 1.7rem;
}
.result ul{
  width: 70%;
  display: block;;
  float: left;
  padding-left: 0.4rem;
}
.result ul li{
  float: left;
  font-size: 0.6rem;
  color: #e23c3c;
  line-height: 0.8rem;
  margin: 0.4rem 0.3rem;
  border: 0.05rem solid #e23c3c;
  text-align: center;
  width: 0.9rem;
  border-radius: 0.8rem;
}
.prompt{
  width: 100%;
  height: 2.5rem;
  background-color: white;
  border-bottom: 0.05rem solid #e5e5e5;
}
.prompt span{
  width: 100%;
  padding: 0 0.6rem;
  line-height: 2.5rem;
  display: block;
  font-size: 0.7rem;
  color: #666666;
}
.first,.last{
  width: 100%;
  overflow: hidden;
}
.last{
  margin-top: 0.8rem;
}
.first span,.last span{
  display: block;
  border: 0.05rem #999999 solid;
  width: 21%;
  line-height: 1.1rem;
  font-size: 0.6rem;
  height: 1.2rem;
  text-align: center;
  border-radius: 2rem;
  color: #666666;
  margin-top:0.6rem;
  margin-left: 0.6rem;
}
.first ul,.last ul{
  width: 100%;
  padding: 0 0.6rem;
}
.first ul li,.last ul li{
  width: 2rem;
  float: left;
  text-align: center;
  background-color: white;
  border: 0.05rem solid #cccccc;
  border-radius: 2.6rem;
  line-height: 1.9rem;
  margin-top: 0.6rem;
  margin-right: 0.4rem;
  color: #cccccc;
}
.el_documentary_box{
  width:100%;
  background-color: #fff;
  border-top:solid 0.05rem #e5e5e5;
  margin-top: 1rem;
}
.el_documentary_amount{
  display: block;
  font-size: 0.6rem;
  width:60%;
  text-align: center;
  line-height: 2.5rem;
  float:left;
  background-color: white;
}
.el_optional_btn{
  width:40%;
  background-color: white;
  float: left;
  height: 2.5rem;
}
.el_optional_btn span{
  display: block;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.7rem;
  color: white;
  background-color:#e23c3c;
  width: 5rem;
  margin-top: 0.4rem;
  margin-left: 0.8rem;
  border-radius: 0.1rem;
}
</style>
