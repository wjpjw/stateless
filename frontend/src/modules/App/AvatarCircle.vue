<template>
<img class="circle-avatar" :src="avatars[avatarIndex]"></img>
</template>

<script>
  import adminAvatar from '@/assets/admin-avatar.png'
  import userAvatar from '@/assets/user-avatar.png'
  export default {
    data() {
      return {
        avatars: [adminAvatar, userAvatar]
      };
    },
    computed: {
      avatarIndex () {
        if(this.$store.state.AppStore.isAdmin) return 0
        return 1
      },
    },
  }
</script>

<style lang="less" scoped>
@import "~#/index.less";
.circle-avatar{
  .circular-squareP(45px);
}
</style>
