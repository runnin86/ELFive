<template>
  <div id="islider"></div>
</template>

<script>
import ISlider from '../assets/js/iSlider'

export default {
  data () {
    return {
      slider: null
    }
  },
  props: {
    banner: [],
    vertical: false,
    animateTime: 2000
  },
  ready () {
    setTimeout(() => {
      if (this.banner.length === 0) {
        this.banner.push({
          content: '/img/乐夺宝/banner背景.png'
        })
      }
      let self = this
      this.slider = new ISlider({
        dom: self.$el,
        data: this.banner,
        animateTime: this.animateTime,
        isVertical: this.vertical, // 垂直滑动
        isLooping: true, // 循环播放
        isDebug: false,
        isAutoplay: true, // 自动播放
        isOverspread: true // 背景平铺
      })
    }, 100)
  }
}
</script>

<style lang="sass">
#islider {
  height: 135px;
  width: 100%;
  overflow: hidden;
  position: relative;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
}

#islider li {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-pack: start;
  list-style: none;
}

#islider li img{
  width: 100%;
  height: auto;
}
</style>
