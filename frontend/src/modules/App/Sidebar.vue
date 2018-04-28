<template>
<el-menu id="sidebar" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isNotCollapse" router>
    <!-- 侧边栏标题 -->
    <router-link :to="RouteLinks[0]" id="head-router-link">
      <template v-if="isNotCollapse"> <div id="logo-text"> <little-icon class="logo-img" :ImageSource="LogoSrc" :Size="LogoSize" /> <p id="logo-text-p"> {{this.$store.state.AppStore.appTitle}} </p> </div> </template>
      <template v-else> <little-icon class="logo-img-mid" :ImageSource="LogoSrc" :Size="LogoSize" /></template>
    </router-link>
    <!-- 侧边栏主体 -->
    <el-submenu index="1" class="menu-items">
      <template slot="title">  
        <router-link v-if="!isNotCollapse" :to="RouteLinks[1]" id="head-router-link">
          <i class="el-icon-location"></i>
        </router-link>
        <span slot="title"> <router-link :to="RouteLinks[1]" id="head-router-link">
          <i class="el-icon-location"></i> {{this.$store.getters.fullRouteToName(RouteLinks[1])}} </router-link> 
        </span>
      </template>
      <el-menu-item-group title="分组 1">  
        <el-menu-item :index="RouteLinks[2]">{{this.$store.getters.fullRouteToName(RouteLinks[2])}}</el-menu-item>
        <el-menu-item :index="RouteLinks[3]">{{this.$store.getters.fullRouteToName(RouteLinks[3])}}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组 2">
        <el-menu-item :index="RouteLinks[4]">{{this.$store.getters.fullRouteToName(RouteLinks[4])}}</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="/overview/pg4">
        <span slot="title">其他</span>
        <el-menu-item :index="RouteLinks[5]">{{this.$store.getters.fullRouteToName(RouteLinks[5])}}</el-menu-item>
        <el-menu-item :index="RouteLinks[6]">{{this.$store.getters.fullRouteToName(RouteLinks[6])}}</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item class="menu-items" :index="RouteLinks[7]">
      <i class="el-icon-menu"></i>
      <span slot="title"> {{this.$store.getters.fullRouteToName(RouteLinks[7])}} </span>
    </el-menu-item>
    <el-menu-item class="menu-items" :index="RouteLinks[8]">
      <i class="el-icon-document"></i>
      <span slot="title"> {{this.$store.getters.fullRouteToName(RouteLinks[8])}} </span>
    </el-menu-item>
    <!-- 侧边栏收缩开关 -->
    <el-tooltip content="控制侧边栏收放的开关" placement="right" effect="light">
      <el-switch class="collapsebox" v-model="isNotCollapse" active-color="#dcdfe6"></el-switch>
    </el-tooltip>

</el-menu>
</template>


<style lang="less" scoped>
@import "~#/index.less";

// 避免特殊化的颜色
.el-menu-item.is-active {
    color: @almost-black;
}
// 收起、展开的开关
.collapsebox{
  position: fixed;
  bottom: 20px;
  left: 0.5*@side-border-minus;
  margin-left: -15px;
}

/* 侧边栏标题 */
.logo-img{
  .v-middle();
  left: -16px;
}
.logo-img-mid{
  .center();
}
#logo-text-p{
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  font-size: 105%;
  font-weight: bold;
}
#logo-text{
  .center();
  margin-left: 5%;
  width: 80%;
  color: @almost-black;
}
#head-router-link{
  .upper(@nav-border);
  line-height: 4;
}

/* 侧边栏主体 */
.menu-items{
  position: relative;
  top: @nav-border;
}
// submenu字体大小
.el-submenu__title * {
    font-size: 100%;
}
// 顶层menuitem的字体大小，和submenu保持一致，最小宽度限制调得更低。
.el-menu-item * {
  font-size: 100%;
}
// 次级menuitem的字体大小，比上层略小一些。
.el-submenu .el-menu-item {
  font-size: 90%;
  min-width: 100px;
}
@media screen and (max-height: 500px) { 
  #head-router-link{
    height: @nav-border*@multiplier;
  }
  .menu-items{
    position: relative;
    top: @nav-border*@multiplier;
  }
  .collapsebox{
    left: 0.5*@side-border-minus*@multiplier;
  }
}
</style>

<script>
  import LittleIcon from '&/LittleIcon'
  import Logo from '^/logo.png'
  export default {
    data() {
      return {
        LogoSrc: Logo,
        LogoSize: "30px"
      }
    },
    computed: {
      RouteLinks(){return this.$store.state.AppStore.allRoutes},
      isAdmin () {return this.$store.state.AppStore.isAdmin},
      isNotCollapse: {
        get: function(){return !this.$store.state.AppStore.isCollapse},
        set: function(newValue){this.$store.commit('set_collapse', !newValue)} 
      },
      isHidden(){return this.$store.state.AppStore.isHidden}
    },
    components:{
      LittleIcon
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
