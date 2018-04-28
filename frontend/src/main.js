//加载Vue
import Vue from 'vue'
Vue.config.productionTip = false

//加载Element-UI
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//有了Element之后可以先转个圈以示加载，等第一个组件加载出来再取消。
// Loading.service({
//   lock: true,
//   text: '正在加载中...',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.7)'
// });
//暂时没有必要，加载得很快！

//使用vuex
import {store, API} from "@/store"

//使用vue-router
import VueRouter from 'vue-router'
import RouteConst from '@/route'
Vue.use(VueRouter)
const router=new VueRouter({
  routes: RouteConst.routes
})

//加载顶级组件App
import App from './modules/App' //必须在UI库后面引入

//加载全局filters
import * as filters from '@/buildingblocks/utils/filters' 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//创建Vue实例，开始渲染
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

