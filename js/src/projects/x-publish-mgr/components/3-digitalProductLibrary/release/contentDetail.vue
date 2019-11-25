<script>

export default {
  props: ['infoData','mediaType','infoDialog'],
  data () {
    return {
      metadata: this.infoData.attributes||[]
    }
  },
  computed: {
    hassVideo() {
      if(this.infoData.type == 6 || this.infoData.type == 5 || this.infoData.type == 8){
        return true
      }
      return false
    }
  },
  methods: {
    detailType(){
      return this.infoData.img_status
    },
  },
  created () {
  }
}

</script>

<template lang="pug">
.div
  el-dialog.restBody2(
    :center="false"
    :visible="infoDialog"
    top="50px"
    width="1200px"
    :show-close="false"
    append-to-body
    )
    .header(slot="title")
      <i class="el-icon-close" @click="$emit('update:infoDialog',false)"></i>
      el-tabs(value="ff")
        el-tab-pane(label="详情" name="ff")
    form.infoForm( ref="infoForm"  )
      .group
        .label 名称:
        input.form-control( v-model="infoData.name"   type="text" disabled)
      .group
        .label 类型:
        span.types
          span  {{infoData.type_name}}
          span  创建时间: {{infoData.create_time}}
      //- .group
      //-   .label 作者:
      //-   input.form-control( v-model="infoData.author" type="text" disabled)
      .group
        .label 标签:
        input.form-control( v-model="infoData.tag"   type="text" disabled)
      .group
        .label 简介:
        textarea.textarea(  v-model="infoData.abs"   type="text" disabled)
      .group
        .label 详情:
      //- 外链输入
      .group.wailianinput(v-if="detailType && infoData.type != 3" )
        .label
        span
          input.form-control( :value="infoData.preview" ref="otherImgInput" disabled)
      //- 外链
      .group.detailmain.wailian(v-if="hassVideo||infoData.type==4")
        .label
        span.wrap
          video( :src="infoData.preview" controls v-if="hassVideo")
          audio( :src="infoData.preview" controls v-if="infoData.type==4")
          span.msg
            .type 格式:
              span.val(v-text="infoData.format")
            .size 大小:
              span.val(v-text="((this.infoData.size||0) / 1024).toFixed(2) +'KB'")
      //- 封面预览
      .group.detailmain
        .label
        span.wrap
          img.coverImg(:src="infoData.preview_path" v-if="infoData.type == 3")
          img.coverImg(:src="infoData.img_src||infoData.img" else-if)
      .group.line
        .label 扩展属性
      .group
        MetaData(:metadata="metadata" :isShowBtn='false' :isOption="false")
    .footer(slot="footer" class="dialog-footer")
        el-button( @click="$emit('update:infoDialog',false)" type="info" ) 取消
</template>

<style lang="stylus" scoped>

.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.line
  font-size 16px
  border-bottom 1px solid #ddd
</style>
