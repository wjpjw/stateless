<template>
  <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-progress="startSpinner"
    :disabled="uploadModel.isDisabled">
    <template v-if="uploadModel.imageUrl">
      <img  :src="uploadModel.imageUrl" class="avatar">
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label>
    </template>
    <template v-else>
      <template v-if="uploadModel.isSpinning">
        <el-progress type="circle" :show-text="showText" style="margin-top: 28px;" :percentage="percentage"></el-progress>
      </template>
      <template v-else>
        <i class="el-icon-upload avatar-uploader-icon"></i>
        <div class="el-upload__text" style="text-align: center;"> 点击此处上传文件 </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2mb</div>
      </template>
    </template>
  </el-upload>
</template>

<style lang="less">
  @import "../index";
  .avatar-uploader{
      border: 1px solid #d9d9d9;
      border-radius: 0px;
      width: @upload-width + 15px;
      height: 12px + @upload-width * @golden-section/100 ;
  }
  .avatar-uploader-icon {
    font-size: 64px;
    color: #ced0d2;
    width: @upload-width;
    height: @upload-width*@golden-section/100;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    height: @upload-width*@golden-section/100;
    display: block;
    margin-left: 0.5*@upload-width;
    transform: translateX(-50%);
  }
</style>

<script>
  export default {
    props:["uploadModel"],  //真正的状态变量全部由父组件参数传入，故而stateless
    data() {
      return {
        showText: true,    //常量
        percentage: 1,     //本质是局部变量，每次用都会重新赋值，不存储状态。
        interval: 0
      }
    },
    methods: {
      startSpinner(event, file, fileList){
        this.uploadModel.isSpinning=true
        this.percentage=0
        this.interval=setInterval(
          () => {
            this.percentage+= 10
            if(this.percentage==100){
              clearInterval(this.interval)
            }
          }, 1)
      },
      handleAvatarSuccess(res, file) {
        this.uploadModel.isSpinning=false
        this.uploadModel.imageUrl = URL.createObjectURL(file.raw)
        this.uploadModel.isDisabled=true
        // active++ 
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' ||  file.type=== 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>