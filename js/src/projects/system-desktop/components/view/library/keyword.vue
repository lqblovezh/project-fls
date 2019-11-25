<script>
import { keyword } from 'services/x-publish/course'
import Store from 'store2'

export default {
  data() {
    return {
      keyword: [],
      name: '',
    }
  },
  props: {
    taskId: {
      type: Function,
      default: '',
    },
  },
  mounted() {},
  methods: {
    add() {
      if (this.keyword.includes(this.name)) {
        return this.$message.warning('关键词已存在')
      }
      keyword({ task_id: this.taskId(), name: this.name }).then(res => {
        this.keyword.push(this.name)
        this.name = ''
      })
      this.keyword.push()
    },
    handleClose(tag) {
      keyword({ task_id: this.taskId(), name: tag, delete: true }).then(
        res => {
          this.keyword.splice(this.keyword.indexOf(tag), 1)
        },
        err => {
          this.$message.error('删除失败')
        }
      )
    },
  },
}
</script>

<template lang="pug">
.info
  p.title 关键词聚类（可跳过）
  VaForm(ref="detailForm")
    form.detailForm
      //- .keyword
      //-   el-button(type="primary" @click="") 自动聚类关键词
      //-   .tip 系统将可自动聚类多个文件中的20个高频关键词提供快速查询
      .group
        .label 关键词输入：
        el-input.small(size='small' v-model="name")
        el-button(type="primary" size="small" @click="add") 手动聚类
      .group
        .label
        span.tip 你也可以手动聚类，和自动聚类不冲突
      .group
        .label 关键词表：
        el-tag(
          :key="tag"
          v-for="tag in keyword"
          closable
          type="warning"
          :disable-transitions="false"
          @close="handleClose(tag)"
        ) {{tag}}
      //- .group
      //-   .label 正在聚类
      //-   el-progress.small(:text-inside="true" :stroke-width="18" :percentage="70")
      .btns
        input.hide(type="file" @change="previewFile($event)" ref="updateFile" accept=".zip")
        //- el-button(type="primary" icon="el-icon-plus" size="mini" @click="add") 新增
</template>

<style lang="stylus" scoped>
.el-tag+.el-tag
  margin-left 10px
.detailForm
  width 700px
  margin 0 auto
  text-align left
  .group
    .tip
      font-size 14px
      color #999
  .keyword
    text-align center
    margin 40px auto
    .tip
      font-size 14px
      color #999
      margin-top 15px
.small
  display inline-block
</style> 

