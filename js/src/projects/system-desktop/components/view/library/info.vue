<script>
import { publickMixin } from '@/utils/mixins'
import defaultImage from '@/components/view/img/default-v.png'

export default {
  mixins: [publickMixin],
  data() {
    return {
      radio2: 1,
      defaultImage,
      detailInfo: {
        img_src: '',
        img: '',
        abs: '',
      },
      xRead: {}, // x-read信息
    }
  },
  mounted() {},
  methods: {},
}
</script>

<template lang="pug">
.info
  ImageCropper(
    v-if="imageCropperDialog"
    ref="imageCropper"
    :imageCropperDialog.sync="imageCropperDialog"
    :imgFile="imgFile"
    :autoCropWidth="260"
    :autoCropHeight="350"
    @preview="preview"
  )
  p.title 基本信息（必填）
  VaForm(ref="detailForm")
    form.detailForm
      .group
        .label.must 产品名称：
        input.small.form-control(v-va="{ type:'required' }" v-model='detailInfo.name' size='small')
      .group
        .label.must 简介：
        textarea.small.textarea(v-va="{ type:'required' }" v-model='detailInfo.abs' size='small')
      .group
        .label.must 封面上传：
        img.preveImage(:src="detailInfo.img_src||defaultImage")
        el-button(type="primary" plain size="small" @click="$refs.updateImg.click()") 浏览
        input.hide(type="file" @change="previewImg($event,0.74)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
</template>

<style lang="stylus" scoped></style> 

