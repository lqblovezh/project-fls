<script>
import {
  imgUploadBtn,
  videoUploadBtn,
  voiceUploadBtn,
} from 'projects/x-publish-mgr/components/1-contentLibrary/article/UEBtns'
import UeUpload from 'projects/x-publish-mgr/components/1-contentLibrary/article/UeUpload'
import { close, closeSync } from 'fs'

export default {
  props: ['item', 'name', 'id', 'isImage'],
  components: { UeUpload },
  data() {
    return {
      uploadDialog: false, //图片上传
      uploadType: 'img', //上传类型
      ue: null, // title编辑器
      editerConfig: {
        toolbars: [['Source', 'Undo', 'Redo', 'bold', 'test','kityformula']],
        iframeCssUrl: '/cdn/Editor/themes/iframe.css', // 引入css
        initialFrameHeight: 200,
        initialFrameWidth: 500,
        wordCount: false,
        elementPathEnabled: false,
      },
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.UeUploadBtn()
      this.ue = UE.getEditor(this.id, this.editerConfig)
      this.ue.addListener('ready', () => {
        this.ue.execCommand('insertHtml', this.item[this.name])
      })
      this.ue.addListener('contentChange', () => {
        this.$emit('uechange', this.item, this.name, this.ue.getContent())
      })
    })
  },
  destroyed() {
    this.ue.destroy() // 必须销毁
  },
  methods: {
    UeUploadBtn() {
      if (this.isImage) {
        imgUploadBtn(this, 5, this.id) //位置影响按钮排序
      }
      // videoUploadBtn(this)
      // voiceUploadBtn(this)
    },
    openUploadDialog(type) {
      this.uploadType = type
      this.uploadDialog = true
      console.log(this.uploadDialog)
    },
  },
  computed: {
    switchTypeName() {
      switch (this.uploadType) {
        case 'img':
          return '图片'
        case 'video':
          return '视频'
        case 'voice':
          return '音乐'
      }
    },
  },
}
</script>

<template lang="pug">
.editor-wapper
  el-dialog(
    :center="false"
    :visible.sync="uploadDialog"
    :close-on-click-modal="false"
    v-if="uploadDialog"
    append-to-body
    top="50px"
    width="800px"
    :title="'上传'+ switchTypeName"
  )
    UeUpload(:ue="ue" :type="uploadType"  @cancle="uploadDialog = false")
  .editor(:id="this.id")
</template>


<style lang="stylus" scoped>
.editor-wapper
  display inline-block
  .editor
    line-height 1
    border 1px solid #ddd
    >>>.edui-editor-toolbarbox
      position static !important
    >>>.edui-editor-iframeholder
      >>>img
        max-width 100% !importent
</style>
