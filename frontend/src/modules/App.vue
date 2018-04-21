<template>
  <div id="app">
    <template v-if="hasSignedIn">
      <sidebar class="side" :class="{sidehidden:isHidden}" />  
      <navbar class="nav right" :class="{hidden:isHidden, collapse:isCollapse}" />
      <transition name="normal-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="content right" :class="{hidden:isHidden, collapse:isCollapse}" />
        </keep-alive>
    	</transition>
    	<transition name="normal-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" class="content right" :class="{hidden:isHidden, collapse:isCollapse}" />
		  </transition>
    </template>
    <template v-else>
      <!-- Login Page -->  
      <login></login>
    </template>
  </div>
</template>


<script>
// 下面是组件状态变量定义，虽然是模块化的
// 却暂时没有采用独立的命名空间，所以命名时候要遵守规则避免冲突
// 命名空间在大规模的项目中可能是必要的，如果启用
// 则getter、setter、mutation路径都要加前缀，颇为麻烦。
import routeConst from "./consts/route"

const getters = {
    isCollapse: state=>state.isCollapse,
    isHidden: state=>state.isHidden,
    hasSignedIn: state=> (state.username!="尚未登录"),     /*  todo:持久化：记住用户信息。 */
    //返回一个函数：接受一个route中的某个字段作为参数，返回该path对应的标题
    routeAlias: (state) => (route_seg) => {
        return state.pageTitles[route_seg]   
    },
    //返回一个函数：接受完整路径，取其最末字段，将其对应标题返回。
    fullRouteToName:  (state)=>(route_path)=>{
        var segs=route_path.split("/")
        if(segs.length<2) return "不合法的路径！"
        var last_seg=segs[segs.length-1]
        if(last_seg=="")last_seg=segs[segs.length-2]
        return state.pageTitles[last_seg]
    }
}

const mutations= {
	set_collapse (state, newValue) {
		state.isCollapse = newValue;
	},
	set_hidden (state, newValue) {
		state.isHidden = newValue;
	},
	set_username (state, newValue) {
		state.username = newValue;
	},
	set_remembered_username(state, newValue){
		state.rememberedUsername = newValue;
	},
	set_remembered_password(state, newValue){
		state.rememberedPassword = newValue;
	}
}

const state = {
	appTitle: "某个管理平台",
	username: "尚未登录",
	rememberedUsername: "",
	rememberedPassword: "",
	isCollapse: false, // 收起侧边栏了吗？
	isAdmin: true, // 是admin吗？
	isHidden: true, // 藏起侧边栏了吗？ 
	routesConfig: routeConst.routes, // 所有路由信息的配置（树状信息，可以提供给vue-router）
	allRoutes: routeConst.getAllRoutes(), //所有路由的数组（sidebar需要这个数组）
	pageTitles: routeConst.getPageTitles() // 自动生成路由字段和该字段对应的页面名称的字典 (sidebar, navbar都要用)
}

const actions={}

const AppStore={state, getters, actions, mutations}
export {AppStore}

// 下面是组件定义，&是src/buildingblocks/components
import Sidebar from "&/Sidebar"
import Login from "&/Login"
import Navbar from "&/Navbar"
import "../../static/fontawesome-all.js"
import { mapGetters } from 'vuex'

export default{
  name: 'App',
  components: {
    Sidebar,
    Navbar,
    Login
  },
  // 首页的进入与离开需要触发侧边栏的隐藏与显示，这里用到observer机制
  watch: {  
    '$route' (to, from) {
        console.log(from.path+" -> "+to.path)
        if(to.path=="/" && from.path!="/"){
            this.$store.commit('set_hidden', true)
        }
        if(from.path=="/" && to.path!="/"){
            this.$store.commit('set_hidden', false)
        }
    }
  },
  computed: mapGetters([
      'hasSignedIn',
      'isCollapse',
      'isHidden'
  ]),

  
}
</script>

<!-- 修改UI框架的样式必须不加scoped，但这会导致潜在的生产构建时的样式加载顺序问题，最好统一放在App.vue下面 -->
<style lang="less">
@import "~#/index";
.el-upload__tip{
  position: absolute;
  font-size:50%;
  top: 67%;
  left: 50%;
  transform: translateX(-50%);
  height:40%;
}
.el-upload-list__item-status-label {
    position: absolute;
    display: block;
    z-index: 3000;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
    color: @white;
}
.el-upload-list__item-status-label i {
    font-size: 12.8px;
    margin-top: 11px;
    transform: rotate(-45deg);
}
  .el-upload__text{
    position: absolute;
    top: 60%;
    font-size: 12px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 0px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    left:7px;
    top:5px;
    width:@upload-width;
    height:@upload-width*@golden-section/100;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin-right: 100px;
    display: inline-block;
}

.el-step__icon {
    width: 36px!important;
    height: 36px!important;
    font-size: 1.4em!important;
}
.el-step.is-horizontal .el-step__line {
    height: 2px;
    top: 14px;
    left: 0;
    right: 0;
}
</style>

<style lang="less" scoped>
@import "~#/index";
@offset:0.9%;
//消退切屏动画
.normal-fade-enter-active, .normal-fade-leave-active {
	transition: opacity .1s;
}
.normal-fade-enter, .normal-fade-leave-active {
	opacity: 0;
}
//平移切屏动画
.slide-enter-active {
  transition: all .2s ease;
}
.slide-leave-active {
  transition: all .2s cubic-bezier(1.0, .5, .8, 1.0);
}
.slide-enter, .slide-leave-to{
  transform: translate(10000px, 0px);
  opacity: 1.0;
}
//弹跳切屏动画
.bounce-enter-active {
  animation: bounce-in .15s;
}
.bounce-leave-active {
  animation: bounce-in .15s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

//侧边栏
.side{
  overflow: auto;
  position: fixed;
  top: 0%;
  width: @side-border;
  height:100%;
  z-index: 1000;
}

//侧边栏收起后的宽度
.el-menu--collapse {
    width: @side-border-minus;
}

//右侧组件的位置
.right{
  position: fixed;
  left: @side-border + @offset;
}

//导航栏
.nav{
  top: 0%;
  right: 0%;
  z-index: 100;
  height: @nav-border;
}

//内容
.content{
  overflow: auto;
  top: @nav-border;
  height: 100%-@nav-border;
  right: 0%;
  background-color: @almost-white;
}

//右侧组件在侧边栏收缩时的位置
.collapse{
  left: @side-border-minus+@offset;
}

//顺手为手机做个适配吧
@media screen and (max-height: 500px) { 
  .nav{
    height: @nav-border*@multiplier;
  }
  .content{
    top: @nav-border*@multiplier;
  }
}

@media screen and (max-width: 1000px) { 
  .side{
    width: @side-border*@multiplier;
  }
  .el-menu--collapse {
    width: @side-border-minus*@multiplier;
  }
  .right{
    position: fixed;
    left: @multiplier*@side-border + @offset;
  }
  .collapse{
    left: @multiplier*@side-border-minus+@offset;
  }
}

//隐藏侧边栏
.sidehidden{
  display:none;
}
//侧边栏隐藏后右侧布局变动
.hidden{
  left:0%;
  background-color: @transparent-black;
  color: @white;
}

//App全局设置
#app{
  font-family: "Avenir", Helvetica, "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @almost-black;
  margin-top: 60px;
	text-decoration: none;
}
</style>
