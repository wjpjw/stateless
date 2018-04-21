<template>
  <div class="home">
    <el-carousel height="100%" id="my-carousel">
      <el-carousel-item v-for="item in 5" :key="item">
        <img :src="pictures[item-1]" width="100%" height="100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="cards">
      <div class="card" v-on:click="jumpTo('/overview/pg1')">
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-newspaper"></i>
          <div style="padding-top: 16px;">
            <span>总览>第1页</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/overview/pg2')">                  
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-clock"></i>
          <div style="padding-top: 16px;">
            <span>总览>第2页</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/overview/pg3')">            
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-compass"></i>
          <div style="padding-top: 16px;">
            <span>总览>第3页</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/overview/pg4')">      
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-chart-bar"></i>
          <div style="padding-top: 16px;">
            <span>总览>第4页</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/overview/pg5')">
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-sun"></i>
          <div style="padding-top: 16px;">
            <span>总览>第5页</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/service')">
        <el-card class="transparent" shadow="hover">
          <i class="cardicon far fa-flag"></i>
          <div style="padding-top: 16px;">
            <span>服务</span>
          </div>
        </el-card>
      </div>
      <div class="card" v-on:click="jumpTo('/about')">
        <el-card class="transparent" shadow="hover" >
            <i class="cardicon fas fa-american-sign-language-interpreting"></i>
            <div style="padding-top: 16px;">
              <span>关于</span>
            </div>
        </el-card>
      </div>
    </div>
    <div class="footer">
      <p id="row1"> 地址：江苏省南京市秦淮区某某路27号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  电话：025-82364275 </p>
      <p id="row2"> Copyright ©2018中国某某某某集团公司某某某某部门</p>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "~#/index";

.cards{
  position:fixed;
  top:@golden-section;
  bottom:@footertop;
  left:0%;
  width:100%;
  height: @footertop - @golden-section;
}
.transparent{
  background-color: transparent;
  color: #303133;
  border: none;
}
.card{
  cursor: pointer;
  margin-left:2%;
  margin-top:20px;
  height: 100%;
  width: 12%;
  float: left;
  position: relative;
  border: none;
  background-color: transparent;
  color: #303133;
  -webkit-transition: .3s ease all;
  transition: .3s ease all;
  -moz-transition:.3s ease all;
}
.card .cardicon{
  font-size:3em; 
  color:Tomato; 
  padding-top: 14px;
}
.el-card.is-hover-shadow:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transform:translate(-5px,-5px);
    -moz-transform:translate(-5px,-5px);
}

.home{
  position:fixed;
  width:100%;
  height:100%;
  background-color: @almost-white!important;
}
.footer{
    position:fixed;
    top:@footertop;
    bottom:0%;
    left:0%;
    width:100%;
    background-color: @grey-black;
}

.footer p{
  font-size:70%;
  color: @subtle-grey;
}

#row2{
  margin-top:-8px;
}

#my-carousel {
  position:fixed;
  top:0%;
  z-index:500;
  height: @golden-section;
  width:100%;
}

@media screen and (max-width: 900px) { 
  .card .cardicon{
    font-size:2em; 
    color:Tomato; 
    padding-top: 10px;
  }
  .card{
      font-size: 60%;
      margin-top: -10px;
  }
}
@media screen and (max-height: 500px) { 
  .card .cardicon{
    font-size:2em; 
    color:Tomato; 
    padding-top: 10px;
  }
  .footer{
      top:@footertop - 4%;
  }
  .card{
      font-size: 60%;
      margin-top: -10px;
  }
  .footer p{
    font-size:40%;
  }
}

</style>

<script>
import cover1 from '@/assets/cover1.jpg'
import cover2 from '@/assets/cover2.jpg'
import cover3 from '@/assets/cover3.jpg'
import cover4 from '@/assets/cover4.jpg'
import cover5 from '@/assets/cover5.jpg'
export default {
  data () {
    return {
      pictures: [cover1, cover2, cover3, cover4, cover5]
    }
  },
  methods: {
    cancelHidden: function () {  //没用到，因为在App.vue > watch里写了。
      this.$store.commit('set_hidden', false)
    },
    jumpTo: function(url){  //比直接用router-link灵活些。
      this.$router.push(url)
    }
  },

}
</script>

