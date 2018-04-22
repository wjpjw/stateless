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
