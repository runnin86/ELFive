<template>
  {{minute}}:{{second}}
</template>

<script>
export default {
  ready () {
    this.clock()
  },
  props: {
    counttime: '2016-09-10 00:00:00',
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  },
  methods: {
    clock () {
      var overa = new Date(this.counttime)
      var local = new Date()
      var intDiff = overa.getTime() - local.getTime()
      if (intDiff <= 0) {
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
        this.$set('day', day)
        this.$set('hour', hour)
        this.$set('minute', minute)
        this.$set('second', second)
        setTimeout(() => {
          let run = this.clock()
          if (run !== undefined) {
            console.log('运行到期执行方法!')
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
