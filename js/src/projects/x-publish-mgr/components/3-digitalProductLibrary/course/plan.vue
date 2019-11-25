9<script>
import formSerialize from 'form-serialize'
// import * as services from "services/x-publish/course/hours"
import { getTask } from 'services/common'
import Resource from '@/components/common/Resource'

export default {
  props: [
    'currentPlan',
    'readOnly',
    'currentHour',
    'planInfoDialog',
    'services',
    'detailData',
  ],
  components: { Resource },
  data() {
    return {
      information: {
        resources: [],
      },
      previewImgUrl: null,
      resourceDialog: false,
      parameter: null,
    }
  },
  created() {
    this.information = {
      ...this.currentPlan,
      resources:
        this.currentPlan.constitute ||
        this.currentPlan.teaching_plan_info ||
        [],
    }
    this.information.time = (this.information.time / 60).toFixed(2)
  },
  methods: {
    colse() {
      this.$emit('update:planInfoDialog', false)
    },
    submitInfo() {
      // 保存扩展信息
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) return //log("验证失败")
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let newDate = { ...this.information }
      newDate.resources = this.information.resources.map(item => {
        return { id: item.id, type: item.type }
      })
      delete newDate.constitute
      newDate.time = newDate.time * 60
      let data = {
        ...newDate,
        period_id: this.currentHour.id,
        course_id: this.detailData.id,
      }
      this.services
        .savePlan(data)
        .then(res => {
          //上传信息
          loading.close()
          this.$message.success('操作成功!')
          this.$emit('update:planInfoDialog', false)
          this.$emit('saveok', res.data)
        })
        .catch(err => {
          loading.close()
          this.$message.error(err.message || '错误!');
        })
    },
    addSelcet(data) {
      log(data)
      this.information.resources = data
      // this.information.resources = [...this.information.resources,...data]
      this.resourceDialog = false
    },
    delChoosen(id) {
      let index = this.information.resources.findIndex(item => item.id === id)
      if (index > -1) {
        this.information.resources.splice(index, 1)
      }
    },
    relation() {
      this.parameter = {
        course_id: this.detailData.id,
      }
      this.resourceDialog = true
    },
  },
}
</script>

<template lang="pug">
.div
  Resource(
    v-if="resourceDialog"
    :resourceDialog.sync="resourceDialog"
    :curSoucesList="information.resources"
    :singleElection="true"
    :isShowType="true"
    :isShowResource="false"
    :parameter="parameter"
    @select="addSelcet"
  )
  el-dialog.restBody2(
    :center="false"
    :visible="planInfoDialog"
    top="50px"
    width="1200px"
    :show-close="false"
    append-to-body
  )
    .header(slot="title")
      div(class="el-icon-close" @click="colse")
      el-tabs(value="ff")
        el-tab-pane(label="学习项目" name="ff")
    VaForm(ref="detailForm")
      form.detailForm
        fieldset(:disabled="readOnly")
          .group
            .label *名称:
            input.form-control( v-va="{ type:'required'}" v-model="information.name" placeholder="请输入该学习项目的名称" type="text" :disabled="readOnly")
          .group
            .label *简介:
            textarea.textarea( v-va="{ type:'required'}" v-model="information.abs" placeholder="请输入该学习项目的简要介绍" type="text" :disabled="readOnly")
          .group
            .label *学习时长:
            input.form-control.time( v-va="{ type:'required'}" v-model="information.time" type="text" placeholder="学习该项目所需时间" :disabled="readOnly")
            span 分
          .group
            .label 资源
            ul.preview
              li(v-for="item in information.resources")
                img.previewImgUrl(:src="item.img_src||item.preview_path")
                p.name(:title="item.name") {{item.name}}
                Icon( title="删除"  @click="delChoosen(item.id)" type="icon-delete" v-if="!readOnly")
            el-button.margin(size="mini" type="primary" @click="relation()" v-if="!readOnly") 关联
    .footer(slot="footer" class="dialog-footer")
      el-button( @click="colse" type="info" ) 取消
      el-button( @click="submitInfo" type="primary" v-if="!readOnly") 确定
</template>


<style lang="stylus" scoped>
.time
  width 150px
.margin
  margin-left 20px
.el-icon-sort-up, .el-icon-sort-down
  color #44c3aa
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.preview
  max-width 1000px
  display inline-block
  li
    display inline-block
    margin-right 20px
    text-align center
    positon relative
    .name
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      cursor pointer
  .previewImgUrl
    width 180px
    height 200px
    object-fit contain
.form-control, textarea
  max-width 40%
  resize none
</style>
