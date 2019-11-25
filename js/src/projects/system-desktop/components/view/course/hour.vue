<script>
import { publickMixin } from '@/utils/mixins'
import defaultImage from '@/components/view/img/default.png'

export default {
  mixins: [publickMixin],
  data() {
    return {
      radio2: 1,
      defaultImage,
      detailInfo: {
        name: '',
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
  p.title 课时创建（必填）
  VaForm(ref="detailForm")
    form.detailForm
      .group
        .label.must 课时名称：
        input.small.form-control(v-va="{ type:'required' }" v-model='detailInfo.name' size='small')
      .group
        .label.must 知识点简介：
        textarea.small.textarea(v-va="{ type:'required' }" v-model='detailInfo.abs' size='small')
      .group
        .label
        span.tip
          span 预览只提供一个课时，创建更多课时前往
          el-button(type="text" @click="openXswitch()") 控制台
          span 创建
</template>

<style lang="stylus" scoped>
.tip
  font-size 14px
  color #999
  padding-left 10px
</style> 

