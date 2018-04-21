<template>
  <div>
    <h1>{{ msg }}</h1>
    <force-net></force-net>
  </div>
</template>

<script>
import ForceNet from '@/buildingblocks/components/ForceNet'
export default {
  data () {
    return {
      msg: 'Service'
    }
  },
  components: {
    ForceNet
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
