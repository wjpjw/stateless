<template>    
    <div id="startbtn"> 
      <div class="inner"> 
        <i class="icon el-icon-picture" />
        <div class="el-upload__text" style="text-align: center;"> 点击此处合成图片</div>
        <div class="el-upload__tip" slot="tip">可能需要2分钟，请耐心等待</div>
      </div>
    </div>
</template>

<style lang="less" scoped>
@import "~#/index";
.icon{
    font-size: 64px;
    color: @icon-grey;
    width: @upload-width;
    height: @upload-width*@golden-section/100;
    line-height: 150px;
    text-align: center;
}
.inner{
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed @border-grey;
    border-radius: 0px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    left:7px;
    top:5px;
    width:@upload-width;
    height:@upload-width*@golden-section/100;
    font-weight: normal;
}
.inner:hover{
  color: @nice-blue;
  font-weight: bold;
}
.inner:hover .icon{
  color: @nice-blue;
}
#startbtn{
    text-align: left;
    border: 1px solid @border-grey;
    border-radius: 0px;
    width: @upload-width + 15px;
    height: 12px + @upload-width * @golden-section/100 ;
}
</style>
