<template>
<img class="little-icon" :src="ImageSource" :width="Size" :height="Size"></img>
</template>

<script>
  export default {
    /*
      这个组件专门用于展示icon，将它当成一个大字符来处理即可    
      注意，这个imgsrc不是字符串，必须用import引进来。
      比如 import adminAvatar from '@/assets/admin-avatar.png'。
    */
    props: ['ImageSource', 'Size'],
  }
</script>

<style scoped>
.little-icon{
  display:inline-block;
}
</style>