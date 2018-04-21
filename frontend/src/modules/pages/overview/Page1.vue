<template>
  <div id="stpage">
    <step-by-step style="position:absolute;width:100%;height:100%" :active="active" :models="models" />
    <upload id="up1" :uploadModel="uploadFirst" />
    <upload v-if="active>0" id="up2" :uploadModel="uploadSecond" />
    <div v-if="active>1" class="kick-it-off"> 
      <div class="inner"> 
        <i class="icon el-icon-picture" />
        <div class="el-upload__text" style="text-align: center;"> 点击此处合成图片！ </div>
        <div class="el-upload__tip" slot="tip">可能需要2分钟，请耐心等待</div>
      </div>
    </div>
    <el-button plain style="position:absolute;left:3%;bottom:3%" @click="refresh">
      <i class="el-icon-refresh"></i> 重新开始
    </el-button>
  </div>
</template>

<style lang="less" scoped>
@import "~#/index";
#stage{ position: absolute; width:100%; height:100%;}
#up2{   position: absolute; left:33%; top:30%; text-align: left;}
#up1{   position: absolute; left:2%; top:30%; text-align: left;}
.icon{
    font-size: 64px;
    color: #ced0d2;
    width: @upload-width;
    height: @upload-width*@golden-section/100;
    line-height: 150px;
    text-align: center;
}
.inner{
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #d9d9d9;
    border-radius: 0px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    left:7px;
    top:5px;
    width:@upload-width;
    height:@upload-width*@golden-section/100;
}
.kick-it-off{
    position: absolute;
    left: 64%;
    top: 30%;
    text-align: left;
    border: 1px solid #d9d9d9;
    border-radius: 0px;
    width: @upload-width + 15px;
    height: 12px + @upload-width * @golden-section/100 ;
}
</style>


<script>
import StepByStep from '&/StepByStep'
import Upload from '&/Upload'

export default {
    data() {
      return {
        active: 0,            // 当前激活的步骤
        uploadFirst:{         // 第一个上传组件
          "imageUrl":"",
          "isDisabled":false,
          "isSpinning":false
        },
        uploadSecond:{        // 第二个上传组件
          "imageUrl":"",
          "isDisabled":false,
          "isSpinning":false
        },
        models:[              // 三个步骤
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
            "description":"请点击下一步，让系统开始合成图片。注意，这一步会占用重要计算资源，请慎重选择。",
            "icon":"el-icon-picture"
          }
        ]
      }
    },
    components:{
      StepByStep,
      Upload
    },
    methods: {
      refresh(){
        console.log(this.$options)
        Object.assign(this.$data, this.$options.data())  //重新赋值
      }
    }
}
</script>
