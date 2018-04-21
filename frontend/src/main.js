import Vue from 'vue'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
//先转个圈以示加载，等第一个组件加载出来再取消。
Loading.service({
  lock: true,
  text: '正在加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
});

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import RouteConst from './modules/consts/route'
import {AppStore} from './modules/App' 
import App from './modules/App' //必须在UI库后面引入

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  modules: {
    AppStore
  },
  strict: process.env.NODE_ENV !== 'production'
})
const router=new VueRouter({
  routes: RouteConst.routes
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

