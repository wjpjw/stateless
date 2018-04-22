import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {AppStore} from './modules/App' 
import {Page1Store} from './modules/Page1'

const store = new Vuex.Store({
    modules: {
      AppStore,
      Page1Store
    },
    strict: process.env.NODE_ENV !== 'production'
})

//在这汇总一下各模块中有必要暴露出来的API。
//这个API模块可供各种各样的代码调用，比如说不是vue实例或子组件的各种代码块（this.$store不存在）。
//语法上也做了简化。
const increase_active= ()=>store.commit('increase_active')
const API={
    increase_active
}
export　{store,API}