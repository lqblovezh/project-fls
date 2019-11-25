9<script>
import formSerialize from 'form-serialize'
// import * as services from "services/x-publish/course/hours"
import { getTask } from "services/common"
import planInfo from "./plan"

export default {
  components: {
    planInfo,
  },
  props: ['detailData', 'readOnly', 'currentHour', 'hourInfoDialog', 'services'],
  data() {
    return {
      information: {},
      planInfoDialog: false,
      currentPlan: null,
      list: [
        // {name:'计划一',id:'12'}
      ]
    };
  },
  created() {
    this.information = {...this.currentHour}
  },
  methods: {
    colse() {
      this.$emit('update:hourInfoDialog',false)
    },
    async showPlan(item) {
      if(item) {
        if(this.services){
          await this.services.getPlanInfo({id:item.id}).then(res => {
            this.currentPlan = res.data
          })
        }else{
          this.currentPlan = item
        }
      }else{
        this.currentPlan = {}
      }
      this.planInfoDialog = true
    },
    async submitInfo() { // 保存扩展信息
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) return //log("验证失败")
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      let data = {
        ...this.information,
        course_id: this.detailData.id
      }
      await this.services.save(data).then(res => {
        //上传信息
        loading.close()
        this.$message.success('操作成功!')
        this.$emit('saveok',res.data)
      }).catch(err => {
        loading.close()
        this.$message.error(err.message || '错误!');
      })
    },
    delChoosen(id) { // 删除计划
      let ids = []
      if(!id){
        let nodes = Array.from(document.querySelectorAll('input[name="ids"]:checked'))
        nodes.forEach(item => {
          ids.push(item.value)
        })
        if(!nodes.length ){
          this.$message.error('请先选中!');
          return
        }
      }else {
        ids.push(id)
      }
      if(ids.length > 0){
        this.$confirm("是否删除?").then(res=>{
          this.services.delPlan({id:ids}).then(res=>{
            this.$emit('restList')
          })
        }).catch(res=>{
          // 取消事件
        })
      }
    },
    updateList(data) {
      this.information = data
    }
  },
  watch: {
    currentHour(data) {
      this.information = data
    }
  }
};
</script>

<template lang="pug">
.div
  planInfo(
    v-if="planInfoDialog"
    :planInfoDialog.sync="planInfoDialog"
    :currentPlan="currentPlan"
    :currentHour="currentHour"
    :services="services"
    :readOnly="readOnly"
    :detailData="detailData"
    @saveok="$emit('restList')"
  )
  el-dialog.restBody2(
    :center="false"
    :visible="hourInfoDialog"
    top="50px"
    width="1200px"
    :show-close="false"
    append-to-body
  )
    .header(slot="title")
      div(class="el-icon-close" @click="colse")
      el-tabs(value="ff")
        el-tab-pane(label="知识点" name="ff")
    VaForm(ref="detailForm")
      form.detailForm
        fieldset(:disabled="readOnly")
          .group
            .label *知识点名称:
            input.form-control( v-va="{ type:'required'}" placeholder="请输入该课时的知识点名称" v-model="information.name" type="text" :disabled="readOnly")
          .group
            .label *知识点简介:
            textarea.textarea( v-va="{ type:'required'}" placeholder="请输入该课时所学知识点的简要介绍" v-model="information.abs" type="text" :disabled="readOnly")
          .group
            .label *学习项目:
            el-button(@click="showPlan()" style="float:right" size="small" class="el-icon-plus" plain type="primary" v-if="!readOnly&&information.id") 新增学习项目
            table.table
              thead
                tr
                  th 序号
                  th 学习项目名称
                  th(v-if="!readOnly") 排序
                  th.operate 操作
              tbody(v-if="information.teaching_plan")
                tr(v-for="item,index in information.teaching_plan")
                  td {{index+1}}
                    input(type="hidden" :value="item.id" name="ids" ref="ids")
                  td {{item.name}}
                  td(v-if="!readOnly")
                    Icon(size="mini" title="上移" type="el-icon-sort-up")
                    Icon(size="mini" title="下移" type="el-icon-sort-down")
                  td
                    .btns
                      Icon(size="mini" title="详情"  @click="showPlan(item)" type="icon-detail"  plain)
                      Icon(size="mini" title="删除"  @click="delChoosen(item.id)" type="icon-delete"  plain v-if="!readOnly")
    .footer(slot="footer" class="dialog-footer")
      el-button( @click="colse" type="info" ) 取消
      el-button( @click="submitInfo" type="primary" v-if="!readOnly") 确定
</template>


<style lang="stylus" scoped>
.el-icon-sort-up,
.el-icon-sort-down
  color #44c3aa
.form-control,
textarea
  max-width 40%
  resize none
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
</style>
