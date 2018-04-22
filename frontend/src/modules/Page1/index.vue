<template>
  <div id="stpage">
    <step-by-step           id="steps" :active="active" :models="models" />  
    <upload                 id="up1"   :uploadModel="uploadFirst" />  
    <upload v-if="active>0" id="up2"   :uploadModel="uploadSecond"/>
    <start  v-if="active>1" id="startbtn" />
    <el-button plain        id="restart" @click="refresh">
      <i class="el-icon-refresh" /> 重新开始
    </el-button>
  </div>
</template>

<style lang="less" scoped>
@import "~#/index";
#stage{     position: absolute; width:100%; height:100%;}
#steps{     position: absolute; width:100%; height:100%}
#up2{       position: absolute; left:33%;   top:30%; text-align: left;}
#up1{       position: absolute; left:2%;    top:30%; text-align: left;}
#startbtn{  position: absolute; left:64%;   top:30%;}
#restart{   position:absolute;  left:3%;    bottom:3%}
</style>


<script>
//[0] 数据模块：全局共享状态变量
const getters = {}      // 如果只是单纯获取state的值，不做处理，则不用getter，直接通过this.$store.state访问 
const actions={}        // 异步操作放在这里    
const state = {
	active: 0,            // 当前激活的步骤
}
const mutations= {
	increase_active (state) {state.active++},
  reset_state_variables (state) {state.active=0}
}
const Page1Store={state, getters, actions, mutations}
export {Page1Store}
//[1] 组件模块：也有私有数据，
import StepByStep from '&/StepByStep'
import Upload from '&/Upload'
import Start from './StartButton'
import { mapState } from 'vuex'
import {API} from '@/store'
export default {
    computed:mapState({
        active: state => state.Page1Store.active,
    }),
    data() {
      return {
        uploadFirst:{         // 第一个上传组件
          "imageUrl":"",
          "isDisabled":false,
          "isSpinning":false,
          "nextwhat": function(){API.increase_active()}
        },
        uploadSecond:{        // 第二个上传组件
          "imageUrl":"",
          "isDisabled":false,
          "isSpinning":false,
          "nextwhat": function(){API.increase_active()}
        },
        models:[              // 三个步骤的标题、图标、描述。
          {
            "title":"步骤 1",
            "description":"请点击上传按钮，选择并上传一张图片。",
            "icon":"el-icon-upload"
          },
          {
            "title":"步骤 2",
            "description":"请点击上传按钮，选择并上传另一张图片。",
            "icon":"el-icon-upload"
          },
          {
            "title":"步骤 3",
            "description":"请点击合成按钮，让系统开始合成图片。注意，这一步会占用重要计算资源，请慎重选择。",
            "icon":"el-icon-picture"
          }
        ]
      }
    },
    mounted(){
      this.$store.commit('reset_state_variables')
    },
    components:{
      StepByStep,
      Upload,
      Start
    },
    methods: {
      refresh(){
        Object.assign(this.$data, this.$options.data())  //重新赋值
        this.$store.commit('reset_state_variables') //共享状态变量重新初始化
      }
    }
}
</script>
