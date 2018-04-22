<template>
<el-menu class="navmenu" mode="horizontal" @select="handleSelect" router>
  <!-- 面包屑组件 -->
  <el-breadcrumb v-if="isNotHidden" class="breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.name" :to="item.route">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 标题组件 -->
  <div v-else class="thetitle">
    <img class="circle-avatar" :src="LogoSrc" :width="LogoSize" style="display:inline-block;margin-top:14%;"></img>
    <div style="letter-spacing: 0.04em;left: 61%;display:inline-block;position:absolute;width:200px;top:18%;font-size:23px">{{this.$store.state.AppStore.appTitle}} </div>
  </div>
  <!-- 用户组件 -->
  <user-dropdown id="user"></user-dropdown>
</el-menu>
</template>

<style lang="less" scoped>
  @import "~#/index.less";
  .thetitle{
    .v-middle();
    left:5%;
    font-size: 120%;
    font-weight: bold;
  }
  // 面包屑
  .breadcrumb{
    outline:none; //取消轮廓，这个轮廓很明显。
    .v-middle();
    left: 3%;
  }
</style>

<script>
  import Logo from '@/assets/logo.png'
  import UserDropdown from './UserDropdown'
  import LittleIcon from '&/LittleIcon'
  export default {
    data(){
      return {
        LogoSrc: Logo,
        LogoSize: "35px"
      }
    },
    components:{
      UserDropdown,
      LittleIcon
    },
    computed: {
      isNotHidden(){return !this.$store.state.AppStore.isHidden},
      isAdmin () {return this.$store.state.AppStore.isAdmin},
      // 将N-段url路由翻译成N个面包屑组件，人类可读，同时又链接到相应的前端路由。
      breadcrumbItems(){
        let path = this.$route.path
        let breadcrumbItems = path.split("/")
        if(breadcrumbItems[breadcrumbItems.length-1]==""){
          breadcrumbItems.length=breadcrumbItems.length-1;
        }
        let breadcrumbItemNames=new Array(breadcrumbItems.length)
        let base_route=""
        for(let i=0;i<breadcrumbItems.length;i++){
          base_route+=breadcrumbItems[i]+"/";
          breadcrumbItemNames[i]={
            "name":this.$store.getters.routeAlias(breadcrumbItems[i]), 
            "route":base_route
          }
        }
        return breadcrumbItemNames
      },
      currentRoute(){return this.$route.path},
      isNotHomePage(){return this.$route.path!="/"}
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>
