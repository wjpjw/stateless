<template>
  <div id="test">
    <h1>{{ msg }}</h1>
    <editable-table />
  </div>
</template>

<script>
import EditableTable from '&/EditableTable'
export default {
  data () {
    return {
      msg: 'page 2'
    }
  },
  components:{
    EditableTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
