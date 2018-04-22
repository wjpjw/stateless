<template>
  <div>
    <h1>{{ msg }}</h1>
    <h3 class="ccc"> Antiue提供了一个由侧边栏、导航栏、用户块、具体页面显示器等高层组件构成的顶层组件。 </h3>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="完全解耦的具体页面" name="1">
        <div class="www">Antique将所有高层组件全部与具体页面解耦，避免具体页面开发者受迫进行任何侵入式修改。</div>
        <div class="www">以导航栏为例，它会自动监测当前路由路径，自动地把/overview/pg1这种路径识别成 首页 > 总览 > 第1页 这种人类可读的导航链接。</div>
      </el-collapse-item>
      <el-collapse-item title="数据驱动的顶层界面" name="2">
        <div class="www">用Antique编写顶层界面时，不再需要逐一修改侧边栏的各个链接和文字，也不需要关心导航栏的实现，只需要改改配置文件里的数据。</div>
        <div class="www">高层组件统一由一个静态的前端路由表派生——这个路由表不仅给vue-router提供参数实现了前端路由，还为Antique内置的sidebar、navbar等组件提供参数，让它们自动生成内容，自动更新内容。</div>
      </el-collapse-item>
      <el-collapse-item title="尽在掌握的状态机" name="3">
        <div class="www">设计上避免插槽式的内容分发，避免一切对界面的直接修改，所有界面渲染都应该基于数据——这样整个前端项目就可以归约为状态机模型，从而可以进行更正规的规格设计，也能进行正确性验证。</div>
        <div class="www">以侧边栏为例，它是收起还是展开，是管理员还是普通用户，都以全局贡献状态变量的形式记录在vuex的store中，其兄弟组件、父组件都可以实时感知这些状态的迁移，并响应式地做出变化。</div>
      </el-collapse-item>
      <el-collapse-item title="工具链" name="4">
        <div class="www">主要工具依赖：less、es6、babel、webpack。</div>
        <div class="www">主要项目依赖：element、vue、vuex、vue-router。</div>
      </el-collapse-item>
      <el-collapse-item title="组件设计上的倡议" name="5">
        <div class="www">编程风格上，鼓励将组件细分，尽可能缩小单一组件的规模，最好能在一屏范围内完成结构、风格和数据的定义。代码块的顺序是template、style、script，这样在写样式时还可以看到template里的html定义，更方便；至于es6代码逻辑，离界面远一些是无妨的，本来就应该明确界限，彼此避嫌。</div>
        <div class="www">此外，组件设计应基于数据驱动，尽量避免插槽和内容分发。可重用的组件应该尽量设计成无状态的，页面则应该是有状态的。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '数据驱动，解除耦合',
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
