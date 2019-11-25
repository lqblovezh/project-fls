<script>
import { makeMixin, publickMixin } from '@/utils/mixins'
import defaultImage from '@/components/view/img/default-v.png'
import { addBooks, fastLibrary } from 'services/x-publish/book'
import ImageCropper from 'projects/x-publish-mgr/components/common/ImageCropper'
import Store from 'store2'
import { setTimeout } from 'timers'

export default {
  mixins: [makeMixin, publickMixin],
  components: { ImageCropper },
  data() {
    return {
      radio2: 2,
      defaultImage,
      book_id: '',
      detailInfo: {},
      previewImgUrl: null,
      makeType: 'read',
    }
  },
  created() {
    this.task_id = Store.session(this.makeType + '_task_id')
    this.getTaskId().then(res => {
      if (res) {
        this.getProgress(0).then(res => {
          this.getBookDetail()
        })
      }
    })
  },
  methods: {
    // async getTask() {
    //   this.task_id = Store.session(this.makeType + '_task_id')
    //   // this.getToken()
    //   if (this.task_id) {
    //     this.getTaskId().then(res => {
    //       this.getProgress(0).then(res => {
    //         this.getBookDetail()
    //       })
    //     })
    //   }
    // },
    async openXswitch() {
      await this.getTaskId().then(res => {
        if (res) {
          this.getProgress(0).then(res => {
            this.getBookDetail()
          })
        }
      })
      this.xswitchOpen()
    },
    async openFile() {
      this.$refs.updateFile.click()
    },
    async previewFile(e) {
      let node = e.target
      let file = node.files[0]
      const { url, path } = await this.$globalUpdateFile(file)
      let progress = this.$progress()
      fastLibrary({
        tmp: path,
        task_id: this.task_id,
        type: 1,
      }).then(res => {})
      this.getProgress(0, res => {
        if (parseInt(res.data.info.speed) != 100) {
          progress.percentage = parseInt(res.data.info.speed || 1)
        }
      }).then(
        res => {
          this.getBookDetail()
          progress.close()
        },
        err => {
          progress.close()
        }
      )
    },
  },
}
</script>

<template lang="pug">
.switch
  ImageCropper(
    v-if="imageCropperDialog"
    ref="imageCropper"
    :imageCropperDialog.sync="imageCropperDialog"
    :imgFile="imgFile"
    :autoCropWidth="292"
    :autoCropHeight="400"
    @preview="preview"
  )
  p.title xml电子书文件（选填）
  VaForm(ref="detailForm")
    form.detailForm
      .group
        .label 上传模式：
        el-radio-group(v-model="radio2")
          el-radio(:label="1") xml文件
          el-radio(:label="2") word文件
      .group(v-if="radio2==2")
        .label 
        el-button(type="text" @click="openXswitch()") x-switch转档工具下载
        el-button(type="text") word规范文档下载
      .group(v-if="radio2==1")
        .label(:class='{"must":radio2==1}') 选择文件：
        el-button(type="text" @click="openFile" :disabled="!task_id") 文件上传
        input.hide(type="file" @change="previewFile($event)" ref="updateFile" accept=".zip")
      .group(v-if="radio2==2")
        .label
        el-input.small(size='small' v-model='book_id' disabled)
      .group(v-if="radio2==2")
        .label 书籍名称：
        el-input.small(size='small' v-model='detailInfo.name')
      .group(v-if="radio2==2")
        .label 作者：
        el-input.small(size='small' v-model='detailInfo.author')
      .group(v-if="radio2==2")
        .label 标签：
        el-input.small(size='small' v-model='detailInfo.tag')
      .group(v-if="radio2==2")
        .label 简介：
        el-input.small(size='small' v-model='detailInfo.abs')
      .group(v-if="radio2==1")
        .label.must 书籍名称：
        input.small.form-control(v-va="{ type:'required' }" size='small' v-model='detailInfo.name')
      .group(v-if="radio2==1")
        .label.must 作者：
        input.small.form-control(v-va="{ type:'required' }" size='small' v-model='detailInfo.author')
      .group(v-if="radio2==1")
        .label.must 标签：
        input.small.form-control(v-va="{ type:'required' }" size='small' v-model='detailInfo.tag')
      .group(v-if="radio2==1")
        .label.must 简介：
        input.small.form-control(v-va="{ type:'required' }" size='small' v-model='detailInfo.abs')
      .group
        .label(:class='{"must":radio2==1}') 封面上传：
        img.preveImage(:src="detailInfo.img_src||defaultImage")
        el-button(type="primary" plain size="small" @click="$refs.updateImg.click()") 浏览
        input.hide(type="file" @change="previewImg($event)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
</template>

<style lang="stylus" scoped></style> 

