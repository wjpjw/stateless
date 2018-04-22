<template>
  <div>
    <h1> 高效、整洁、低耦合的开发模式 </h1>
    <h3 class="ccc"> Stateless是一个开箱即用的前端解决方案。 </h3>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="将一颗路由树同时作为router和App的数据源" name="1">
        <div class="www">前者是vue-router库提供的模块。后者是这个项目的顶级组件，可解析各层路由路径对应的地址和名称，自动生成有前端路由能力的侧边栏和导航栏。因此只需管理一份配置文件router.js即可，不必改了路由再去改侧边栏或导航栏代码。
</div>
        <div class="www">以导航栏为例，它会自动监测当前路由路径，自动地把/overview/pg1这种路径识别成 首页 > 总览 > 第1页 这种人类可读的导航链接。</div>
      </el-collapse-item>
      <el-collapse-item title="真正实现组件模块化与信息隐藏" name="2">
        <div class="www">原本vue是自带良好的单文件封装的，一个.vue文件由三部分组成：html模板、less样式、es6组件对象代码。但vuex引入的状态机管理破坏了这种封装，把原本属于某组件的状态变量放到了遥远的目录与文件里。</div>
        <div class="www">Stateless为了解决这个问题规定了一个编程范式：</div>
        <div class="www"> 1. 每个模块必须有一个独立文件夹，位置在modules下。</div>
        <div class="www"> 2. 主文件必须命名为index.vue。</div>
        <div class="www"> 3. index.vue包含4个部分：模板、样式、组件对象、组件状态(vuex module)。</div>
        <div class="www"> 4. 组件文件夹下的其他.vue文件是index.vue引用到的子组件——不同于组件库中的组件，这些子组件是有状态的，和index.vue共享状态变量。</div>
        <div class="www">也就是说Stateless不仅使用vuex的模块切割，还在代码层面将各个子状态机放入对应组件的.vue文件里。
</div>
      </el-collapse-item>
      <el-collapse-item title="清晰分离可重用代码与不可重用代码" name="3">
        <div class="www">Stateless工程最顶层的文件夹只有2个：buildingblocks、modules。</div>
        <div class="www">其中buildingblocks存放可重用的共性支撑代码，modules存放不可重用的终端产品代码。前者不可引用后者，也不能拥有任何一个状态变量。</div>
      </el-collapse-item>
      <el-collapse-item title="工具链" name="4">
        <div class="www">主要工具依赖：less、es6、babel、webpack。</div>
        <div class="www">主要项目依赖：element、vue、vuex、vue-router。</div>
      </el-collapse-item>
      <el-collapse-item title="编程范式上的倡议" name="5">
        <div class="www">鼓励将组件细分，尽可能缩小单一组件的规模，最好能在一屏范围内完成结构、风格和数据的定义。</div>
        <div class="www">组件设计应基于数据驱动，尽量避免插槽和内容分发。可重用的组件应该尽量设计成无状态的，页面则应该是有状态的。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: '1'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "~@/buildingblocks/index";
.el-collapse-item{
    text-align: left;
}
.el-collapse-item__header{
    padding-left: 20px;  
    font-weight: bold;
    font-size: 110%;
    color: @almost-black;
}
.www{
    padding-left: 20px;  
}
.ccc{
    text-align: left;
    padding-left: 20px;
    background-color: transparent;
}
</style>
