<template>
  <div class="time" :id="'time_'+id">
      <span class="danwei_first"></span>
      <span style="display:none;"><img id="day_01" alt="" src="/img/allnum.png" width="20"></span>
      <span style="display:none;"><img id="day_02" alt="" src="/img/allnum.png" width="20"></span>
      <span class="danwei"></span>
      <span><img :id="'hour_01_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <span><img :id="'hour_02_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <span class="danwei">:</span>
      <span><img :id="'minute_01_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <span><img :id="'minute_02_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <span class="danwei">:</span>
      <span><img :id="'second_01_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <span><img :id="'second_02_'+id" alt="" src="/img/allnum.png" width="20"></span>
      <br class="clear">
  </div>
</template>

<script>
export default {
  ready () {
    this.clock1()
  },
  props: {
    counttime: '2016-04-05 00:00:00',
    id: 0
  },
  methods: {
    clock1 () {
      var overa = new Date(this.counttime)
      var local = new Date()
      var intDiff = overa.getTime() - local.getTime()
      if (intDiff <= 0) {
        document.getElementById('time_' + this.id)
        return false
      }
      var day = Math.floor(intDiff / (1000 * 60 * 60 * 24))
      var hour = Math.floor(intDiff / (1000 * 60 * 60)) - (day * 24)
      var minute = Math.floor(intDiff / (1000 * 60)) - (day * 24 * 60) - (hour * 60)
      var second = Math.floor(intDiff / 1000) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      if (day <= 9) day = '0' + day
      if (hour <= 9) hour = '0' + hour
      if (minute <= 9) minute = '0' + minute
      if (second <= 9) second = '0' + second
      try {
        // document.getElementById('day_01').style.marginTop = (day.toString().substr(0, 1)) * (-57) + 4 + 'px'
        // document.getElementById('day_02').style.marginTop = (day.toString().substr(1, 1)) * (-57) + 4 + 'px'
        document.getElementById('hour_01_' + this.id).style.marginTop = (hour.toString().substr(0, 1)) * (-57) + 4 + 'px'
        document.getElementById('hour_02_' + this.id).style.marginTop = (hour.toString().substr(1, 1)) * (-57) + 4 + 'px'
        document.getElementById('minute_01_' + this.id).style.marginTop = (minute.toString().substr(0, 1)) * (-57) + 4 + 'px'
        document.getElementById('minute_02_' + this.id).style.marginTop = (minute.toString().substr(1, 1)) * (-57) + 4 + 'px'
        document.getElementById('second_01_' + this.id).style.marginTop = (second.toString().substr(0, 1)) * (-57) + 4 + 'px'
        document.getElementById('second_02_' + this.id).style.marginTop = (second.toString().substr(1, 1)) * (-57) + 4 + 'px'
        setTimeout(() => {
          let run = this.clock1()
          if (run !== undefined) {
            // 此处可能会出现父节点下最后一个子节点没有refre方法
            this.$root.$children[this.$root.$children.length - 1].refresh()
          }
        }, 1000)
      }
      catch (e) {
      }
      finally {
      }
    }
  }
}
</script>

<style>
.time span {
  float: left;
  line-height: 1rem;
  height: 2.8rem;
  margin-top: 0.2rem;
  margin-bottom: -0.7rem;
  overflow: hidden;
  background-color: #FFFFFF;
}
.time span.danwei_first {
  padding-left: 1rem;
  padding-right: 1rem;
}
.time span.danwei {
  color: #C5C5C5;
  font-weight: bold;
  line-height: 1.8rem;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}
.clear {
  height: 0rem;
  clear: both;
  overflow: hidden;
}
</style>
