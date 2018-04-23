# Stateless

一个前端解决方案。

[Demo](http://wjpjw.github.io "Stateless")
 
## 目标

1. 让前端开发更敏捷。
2. 把前端项目工作环境从脏乱差泥潭拯救出来，让代码本身呈现赏心悦目的建筑美感。
3. 从架构层次上解决三个技术问题：前端路由、模块分包懒加载、对用户隐匿源码。

## 工具链
1. 语言：ES6 + Less 
2. 开发环境依赖：参考package.json
3. 项目依赖：vue全家桶（vue、vue-router、vuex）、基于vue的UI库（element-ui、vue-d3-network）。


## Stateless采用了哪些技术方案
1. Vue提供了MVVM机制：基于数据进行渲染，修改数据触发页面变化。
2. Vue-router实现前端路由。
3. Vuex实现前端状态机的统一管理。
4. Element-UI是一个在vue基础上开发的UI库。
5. Webpack提供灵活强大的前端项目预处理加编译功能，与npm生态配合，事实上构成了一个完备的开发环境。
6. Less是一个外观清爽的css预处理语言，功能不如sass，但完全够用。
7. ES6是目前主流浏览器都支持的JavaScript标准，增加了很多特性，ES5相比之下就显得一无是处了。

上述方案的整合自然而然地隐喻了前后端分离——前端成为一个完全自给自足的严肃软件项目，所有隐式耦合与侵入式代码都被斩去；与此同时后端可以完全不必关心界面实现，只提供API接口。

## Stateless本身的新颖之处
### A) 将一颗路由树同时作为router和App的数据源。
前者是vue-router库提供的模块。后者是这个项目的顶级组件，可解析各层路由路径对应的地址和名称，自动生成有前端路由能力的侧边栏和导航栏。因此只需管理一份配置文件router.js即可，不必改了路由再去改侧边栏或导航栏代码。

### B) 真正实现组件模块化与信息隐藏。
原本vue是自带良好的单文件封装的，一个.vue文件由三部分组成：html模板、less样式、es6组件对象代码。但vuex引入的状态机管理破坏了这种封装，把原本属于某组件的状态变量放到了遥远的目录与文件里。

Stateless为了解决这个问题规定了一个编程范式：
1. 每个模块必须有一个独立文件夹，位置在modules下。
2. 主文件必须命名为index.vue。
3. index.vue包含4个部分：模板、样式、组件对象、组件状态(vuex module)。
4. 组件文件夹下的其他.vue文件是index.vue引用到的子组件——不同于组件库中的组件，这些子组件是有状态的，和index.vue共享状态变量。

也就是说Stateless不仅使用vuex的模块切割，还在代码层面将各个子状态机放入对应组件的.vue文件里。

### C) 清晰分离可重用代码与不可重用代码
Stateless工程最顶层的文件夹只有2个：buildingblocks、modules。

其中buildingblocks存放可重用的共性支撑代码，modules存放不可重用的终端产品代码。

前者不可引用后者，也不能拥有任何一个状态变量。

所有buildingblocks/components都是无状态的（Stateless正是得名于此），因此计算理论上不存在状态机变迁导致谬误的可能性。可重用组件的一切参数由调用者提供，从本质上来讲，无论它们多么复杂诡谲，都可以视作“函数”。

buildingblocks/assets存放静态资源，比如图片。这些资源可以直接在es6代码里import进内存，不会暴露在服务器某个公开可见的url上。

buildingblocks/index.less用一个文件整合了所有less的可重用代码。

上述代码需要精心设计，往往有严格的无状态约束、屏幕尺寸自动适配需求。

相比而言modules中各个组件是面向产品需求的，组件代码只要能实现功能就好，无论质量多差都会被永久隔离在它的文件夹下，不会被其他代码引用。此外，由于真正实现了模块化，某个模块的编写者无权也无需改动其他目录下的任何代码。这种设计可以维持大规模团队协作或者外包或者赶工时的整体健壮性。

## Stateless提供了哪些语法糖
### A) 给目录名定义别名减少书写量和代码长度。
1. &表示src/buildingblocks/components。
2. #表示src/buildingblocks。
3. @表示src。

### B) 把常用的mutation定义成API放到store.js里
1. 不再需要写 ```"this.$store.commit('set_collapse', !newValue)"``` 这么长的语句来提交mutation了。
2. 如果当前代码块并非vue组件（this没有$store属性），仍然可以提交mutation——这一点非常必要，比如把函数作为参数传递的时候，这个函数里用this往往不妥，时过境迁就会报错，用API更合理。

### C) 各种一键居中、图片切圆语句
看到```v-middle();```这种诡异的样式语句时不必疑惑，可查看index.less——这是其中定义的一个mixin，提供垂直居中功能。建议完全理解了各个mixin的实现之后再使用，因为它们的使用往往都是有条件的。

## 无状态组件的例子：StepByStep

``` html
<template>
  <div>
    <el-steps style="position:absolute;top:7%;left:5%;width:90%;text-align:left" :active="active">
      <el-step v-for="model in models" :key="model.title" :title="model.title" :description="model.description">
          <i slot="icon" :class="model.icon"> </i>
      </el-step> 
    </el-steps>
  </div>
</template>

<script>
export default {
    props:['active', 'models'],
}
</script>

```
这个组件叫做StepByStep，在页面上方固定位置显示一个步骤条，根据父组件的active值显示当前步骤，根据父组件提供的models显示各个步骤的标题、图标、描述。因此步骤的数目、具体形态都是灵活可配置的。

下面就是一个父组件里定义的models例子：

``` javascript
models:[ // 三个步骤的标题、图标、描述。
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
```

## 一个完整的模块化页面组件的例子：Page1

``` html
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

```
