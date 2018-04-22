<template>
  <div class="loginpage">
    <img :src="background" width="100%" height="100%"> </img>
    <div class="thetitle">
        <img class="circle-avatar" style="display:inline-block;position:absolute;left:20%;top:22%;" :src="LogoSrc" :width="LogoSize"></img>
        <div style="letter-spacing: 0.06em;display:inline-block;position:absolute;left:36%;top:22%;color:#fff;font-size:30px">{{this.$store.state.AppStore.appTitle}} </div>
    </div>
    <div class="center">
      <div class="left">
        <img :src="cover" width="100%" height="100%"> </img>
      </div>
      <div class="right">
        <div class="formelm" style="font-size:110%;margin-top:15%"> 登录 </div>
        <div class="formelm" style="font-size:80%;margin-top:7.5%;margin-bottom:2.5%"> 用户名： </div>
        <el-input class="formelm" style="width:80%;margin-left: 0px;margin-top:-22.5%" label="用户名" type="text" placeholder="请输入用户名" prefix-icon="fas fa-user" v-model="usernameInput" clearable size="small">
        </el-input>
        <div class="formelm" style="font-size:80%;margin-top:7.5%;margin-bottom:2.5%"> 密码： </div>
        <el-input class="formelm" style="width:80%;margin-left: 0px;margin-top:-22.5%" label="密码" type="password" placeholder="请输入秘密" prefix-icon="fas fa-lock" v-model="passwordInput" clearable size="small">
        </el-input>
        <el-button class="formelm" style="margin-left: 4%" icon="fas fa-sign-in-alt" circle v-on:click="loginnow"></el-button>
        <el-checkbox class="formelm" v-model="remembered">记住密码</el-checkbox>
      </div>
    </div>
    <div class="footer">
      <p id="row1"> 地址：江苏省南京市秦淮区某某路27号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  电话：025-82364275 </p>
      <p id="row2"> Copyright ©2018中国某某某某集团公司某某某某部门</p>
    </div>
  </div>
</template>

<script>
  import cover1 from '@/assets/cover1.jpg'
  import background1 from '@/assets/background1.jpg'
  import Logo from '@/assets/logo.png'
  export default {
    data() {
      return {
        LogoSrc: Logo,
        LogoSize: "35px",
        cover: cover1,
        background: background1,
        usernameInput: this.$store.state.AppStore.rememberedUsername,
        passwordInput: this.$store.state.AppStore.rememberedPassword,
        remembered: true,
      }
    },
    mounted(){
      this.$loading().close();
      console.log("加载完成！")
      console.log(this.$store)
    },
    methods: {
      loginnow(){
        if(this.remembered){
          this.$store.commit('set_remembered_username', this.usernameInput)
          this.$store.commit('set_remembered_password', this.passwordInput)
        }
        else{
          this.$store.commit('set_remembered_username', '')
          this.$store.commit('set_remembered_password', '')
        }
        this.$store.commit('set_username', this.usernameInput)
      }
    }
  }
</script>

<style lang="less" scoped>
@import "~#/index";
.footer{
    position:fixed;
    top:@footertop;
    bottom:0%;
    left:0%;
    width:100%;
    background-color: transparent;
}
.footer p{
  font-size:70%;
  color: @subtle-grey;
}
#row2{
  margin-top:-8px;
}

.thetitle{
    .h-middle();
    top:8%;
    width:360px;
    height: 60px;
    font-size: 120%;
    font-weight: bold;
}
.loginpage{
  position:fixed;
  left: 0%;
  top: 0%;
  height: 100%;
  width: 100%;
  background-color: @almost-black;
}
.center{
  position:fixed;
  width: 720px;
  height: 360px;
  left: 50%;
	top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 8px 8px 30px 10px rgba(0,0,0,.5);
}
.left{
  position:absolute;
  left:0%;
  width:@golden-section;
  height:100%;
  background-color: black;
}
.right{
  background-color: @white;
  color: @almost-black;
  font-size: 16px;
  position:absolute;
  right:0%;
  width: 100% - @golden-section;
  height:100%;
}
.formelm{
  position: relative;
  margin-left: 10%;
  margin-top: 10%;
  text-align: left;
}

</style>