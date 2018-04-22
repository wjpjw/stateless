<template>
  <div style="position:absolute;">
    <template v-if="this.$route.path=='/overview' || this.$route.path=='/overview/' ">
      <h1>{{ msg }}</h1>
      <a href="https://github.com/wjpjw/antique"><i class="fab fa-github"></i> github项目地址 </a>
    </template>
    <router-view v-else style="position:absolute;width:100%;height:100%"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Antique App '
    }
  }
}
</script>

<style scoped>

</style>
