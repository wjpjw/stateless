<template>
  <el-dropdown class="userdropdown">
    <span class="el-dropdown-link">
      <avatar-circle id="avatar"> </avatar-circle>
      <div class="userleft">
        <p class="username"> {{username}} </p>
        <p class="privilege" v-if="isAdmin"> 系统管理员 </p> 
        <p class="privilege" v-else> 普通权限用户 </p>
      </div>
      <i class="el-icon-arrow-down userright"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item disabled>个人信息</el-dropdown-item>
      <el-dropdown-item disabled>消息中心</el-dropdown-item>
      <el-dropdown-item divided><div v-on:click="logoutnow">退出登录</div></el-dropdown-item> 
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style lang="less" scoped>
@import "~#/index.less";
@text-width:80%;
@username-height:60%;

// 头像
#avatar{
  .v-middle();
  left: 0%;
}

el-dropdown-link{
  .cover();
}
.userdropdown{
  position: absolute;
  right: 2%;
  width: 180px;
  height: 100%;
}
.username{
  margin-top: 0px;
  .upper(@username-height);
  font-size:16px;
  line-height: 2.8;
}
.privilege{
  position: absolute;
  top: 60%;
  left: 0%;
  right: 0%;
  height:40%;
  margin-top: 0px;
  font-size: 12px;
}
.userleft{
  position:absolute;
  left: 20px;
  top:0%;
  height: 100%;
  width: @text-width;
}
.userright{
  position:absolute;
  left:@text-width;
  right:0%;
  top:43%;
  height:100%;
}
</style>

<script>
  import AvatarCircle from './AvatarCircle'

  export default {
    components: {
      AvatarCircle
    },
    computed: {
      isAdmin () {return this.$store.state.AppStore.isAdmin},
      username() {return this.$store.state.AppStore.username}
    },
    methods: {
      logoutnow(){
        this.$store.commit('set_username', "尚未登录")
      }
    }
  }
</script>
