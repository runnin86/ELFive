<template>
  <nav class="bar bar-nav">
    <h1 class="title" v-text="title"></h1>
    <a class="button button-link button-nav pull-left back"
      v-link="{path: path, replace: replace}">
      <span class="icon icon-left"></span>
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    title: '',
    path: '',
    replace: true
  }
}
</script>

<style scoped>
.icon-left {
  width: 1rem;
}
</style>
