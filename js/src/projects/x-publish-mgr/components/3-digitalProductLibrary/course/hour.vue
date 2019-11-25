<script>
import formSerialize from 'form-serialize'
// import * as services from "services/x-publish/course/hours"
import { getTask } from 'services/common'
import HourInfo from './hourInfo'

export default {
  props: ['detailData', 'readOnly', 'hourDate', 'services'],
  components: {
    HourInfo,
  },
  data() {
    return {
      hourInfoDialog: false,
      list: this.hourDate,
    }
  },
  created() {},
  methods: {
    //删除选中
    delChoosen(id) {
      let ids = []
      ids.push(id)
      if (ids.length > 0) {
        this.$confirm('是否删除?')
          .then(res => {
            this.services.del({ id: ids }).then(res => {
              this.$emit('change')
              this.$message.success('操作成功!')
            })
          })
          .catch(res => {
            // 取消事件
          })
      }
    },
    async showHour(item) {
      if (item) {
        this.currentHour = item
        if (this.services) {
          await this.getInfo()
        } else {
          this.currentHour = item
        }
      } else {
        if (!this.detailData.id) {
          return this.$message.warning('请先保存基本信息后再保存!')
        }
        this.currentHour = {}
      }
      this.hourInfoDialog = true
    },
    async getInfo() {
      await this.services.getInfo({ id: this.currentHour.id }).then(res => {
        if (this.hourInfoDialog) {
          this.$refs.info.updateList(res.data)
        }
        this.currentHour = res.data
      })
    },
    saveok(data) {
      if (!this.currentHour.id) {
        this.currentHour = data
      }
      this.hourInfoDialog = false
      this.$emit('change')
    },
    sort(item, type) {
      this.services
        .sort({
          course_id: this.detailData.id,
          course_period_id: item.id,
          type,
        })
        .then(res => {
          this.$emit('change')
          this.$message.success('操作成功!')
        })
    },
    restList() {
      this.getInfo()
      this.$emit('restprice')
    },
  },
  watch: {
    hourDate(data) {
      this.list = data
    },
  },
  filters: {
    formateText(val, num = 20) {
      if (val.length > num) {
        return val.substr(0, num) + '...'
      }
      return val
    },
  },
}
</script>

<template lang="pug">
.div
  HourInfo(
    v-if="hourInfoDialog"
    :hourInfoDialog.sync="hourInfoDialog"
    :currentHour="currentHour"
    :detailData="detailData"
    :services="services"
		:readOnly="readOnly"
    @saveok="saveok"
    @restList="restList"
    ref="info"
  )
  table.table
    thead
      tr
        th 序号
        th 知识点名称
        th 知识点简介
        th(v-if="!readOnly") 排序
        th.operate 操作
    tbody(v-if="list")
      tr(v-for="item,index in list")
        td {{index+1}}
          input(type="hidden" :value="item.id" name="ids" ref="ids")
        td {{item.name}}
        td(:title="item.ab") {{item.abs|formateText(33)}}
        td(v-if="!readOnly")
          Icon(size="mini" title="上移" @click="sort(item,'up')" type="el-icon-sort-up" v-if="index!=0")
          Icon(size="mini" title="下移" @click="sort(item,'down')" type="el-icon-sort-down" v-if="index!=list.length-1")
        td
          .btns
            Icon(size="mini" title="详情" @click="showHour(item)" type="icon-detail" plain)
            Icon(size="mini" title="删除" @click="delChoosen(item.id)" type="icon-delete" plain v-if="!readOnly")
  .btns
    el-button(@click="showHour()" size="small" class="el-icon-plus" type="primary"  v-if="!readOnly") 新增课时
</template>


<style lang="stylus" scoped>
.btns
  margin-top 20px
.el-icon-sort-up, .el-icon-sort-down
  color #44c3aa
.el-icon-sort-up
  position relative
  left -10px
</style>
