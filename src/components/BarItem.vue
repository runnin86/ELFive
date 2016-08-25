<template>
  <a class="tab-item" v-link="{path: path, activeClass: 'active', replace: false}"
    @click="initTop()">
    <span v-if="img" :style="{ height: h + 'px',top: -1*t + 'rem'}" class="icon">
      <img v-if="img" :src="img" :basepath="img" :focuspath="focusimg" class="text-center"
        :style="{ height: i + 'px',width: i + 'px'}">
    </span>
    <span v-else class="icon" :class="iconClass"></span>
    <span class="tab-label" v-text="label" :style="{top: t + 'rem'}"></span>
    <span class="badge" v-if="b>0" v-text="b>99?'99':b"></span>
  </a>
</template>
<script>
export default {
  props: {
    path: '',
    icon: '',
    label: '',
    img: '',
    focusimg: '',
    h: 0,
    t: 0,
    i: 38,
    b: 0
  },
  methods: {
    initTop () {
      this.$root.planScrolltop = 0
      this.$root.hpScrolltop = 0
    }
  },
  computed: {
    iconClass () {
      return `icon-${this.icon}`
    }
  }
}
</script>
<style scoped>
.tab-item.active {
  color:  #ed8e07 !important;
  /*color: #0894ec;*/
  /*color: rgb(216, 65, 65);*/
}
.tab-item.inactive {
}
</style>
