<script>
import formSerialize from 'form-serialize'
// import * as services from "services/x-publish/course/exercise"
import { getTask } from 'services/common'
import ExerciseInfo from './exerciseInfo'

export default {
  props: ['detailData', 'readOnly', 'exerciseDate', 'hourDate', 'services'],
  components: { ExerciseInfo },
  data() {
    return {
      information: {},
      exerciseDialog: false,
      classHour: this.hourDate,
      currentExerise: null,
      list: [],
      selecetArray: [],
    }
  },
  created() {
    this.exerciseDate.forEach(item => {
      this.$set(item, 'isShow', false)
    })
    this.list = [...this.exerciseDate, ...this.list]
    this.selecetArray = this.list.map(item => item.period_id)
  },
  methods: {
    getInfo() {
      this.services
        .getInfo({
          id: this.detailData.id,
        })
        .then(res => {
          this.information = res.data
          this.retailers = res.data.retailers
          this.xRead = res.data['x-read']
          this.metadata = res.data.pro_attributes
        })
    },
    openDetail(item) {
      this.currentExerise = item
      this.exerciseDialog = true
    },
    add() {
      // this.$set()
      this.list.push({
        name: '',
        id: '',
        is_auto: true,
        isShow: true,
        action: 'add',
      })
    },
    save(item) {
      if (!this.detailData.id) {
        return this.$message.warning('请先保存基本信息后再保存!')
      }
      this.services
        .save({
          ...item,
          course_id: this.detailData.id,
        })
        .then(res => {
          this.services.getList({ id: this.detailData.id }).then(res => {
            this.$emit('change')
          })
        })
    },
    delChoosen(id, index) {
      let ids = []
      if (!id) {
        this.list.splice(index, 1)
        return
      } else {
        ids.push(id)
      }
      if (ids.length > 0) {
        this.$confirm('是否删除?')
          .then(res => {
            this.services.del({ id: ids }).then(res => {
              this.$emit('change')
            })
          })
          .catch(res => {
            // 取消事件
          })
      }
    },
    modify(item) {
      if (item.id) {
        item.isShow = !item.isShow
      }
    },
    selecet(index, value) {
      this.list[index].is_auto = value
    },
    isDisabled(items, item) {
      return this.selecetArray.includes(items.id)
    },
    // isDisabled(items,item){
    //   let type = items.id == item.period_id
    //   if(type&&!this.selecetArray.includes(items.id)) {
    //     this.selecetArray.push(items.id)
    //   }
    //   if(!item.id) {
    //     type = !this.selecetArray.includes(items.id)
    //   }
    //   return !type
    // }
  },
  watch: {
    exerciseDate(data) {
      let array = []
      data.forEach(item => {
        if (item.id) {
          this.$set(item, 'isShow', false)
          array.push(item.period_id)
        }
      })
      this.selecetArray = array
      this.list = data
    },
    hourDate(data) {
      this.classHour = data
    },
  },
}
</script>

<template lang="pug">
.div
  ExerciseInfo(
    v-if="exerciseDialog"
    :detailData="detailData"
    :exerciseDialog.sync="exerciseDialog"
    :currentExerise="currentExerise"
    :services="services"
    :readOnly="readOnly"
  )
  table.table
    thead
      tr
        th 关联习题
        th 选择课时
        th(width=180) 操作
    tbody(v-if="list")
      tr(v-for="item,index in list")
        td
          span(v-if="!item.isShow") {{item.name}}
          input.form-control(v-model="item.name" v-if="item.isShow")
        td
          el-select(v-model="item.period_id" placeholder="请选择" :disabled="readOnly")
            el-option(
              v-for="items in classHour"
              :key="items.id"
              :label="items.name"
              :value="items.id"
              :disabled="isDisabled(items,item)"
            )
        td
          .btns
            Icon(size="mini" title="详情" v-if="item.id"  @click="openDetail(item)" type="icon-detail"  plain)
            Icon(size="mini" title="修改"  @click="modify(item)" type="icon-menu-publish"  plain v-if="!readOnly")
            Icon(size="mini" title="保存"  @click="save(item)" type="icon-upload"  plain v-if="!readOnly")
            Icon(size="mini" title="删除"  @click="delChoosen(item.id,index)" type="icon-delete"  plain v-if="!readOnly")
            el-checkbox(:value="item.is_auto==='true'||item.is_auto===true" label="true" @change="selecet(index,$event)" v-if="!readOnly") 自动阅卷
  .btns
    el-button(@click="add()" size="small" class="el-icon-plus" type="primary"  v-if="list.length<hourDate.length&&!readOnly") 新增习题
</template>


<style lang="stylus" scoped>
.btns
  margin-top 20px
.el-radio
  line-height inherit
.icon-menu-publish
  color #44c3aa
</style>
