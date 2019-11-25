<script>
import { _addBooks } from 'services/x-publish/digitalbooks'
import formSerialize from 'form-serialize'
import { listGroup } from 'services/x-publish/question'

export default {
  props: {
    resourceDialog: {
      type: Boolean,
      default: false,
    },
    singleElection: {
      //是否单选
      type: Boolean,
      default: true,
    },
    type: {
      type: [String, Number],
      default: '1',
    },
    curSoucesList: {
      //当前选中数据
      type: Array,
      default: () => [],
    },
    isShowType: {
      //是否显示菜单切换栏目
      type: Boolean,
      default: false,
    },
    idName: String,
    isShowSearch: Boolean, //是否不显示搜索框
    isShowResource: Boolean, //是否显示资源
    isDebris: { default: false }, // 只选择碎片
    parameter: Object, //外部参数
  },
  data() {
    return {
      dataList: [], //列表信息
      page: null,
      currentType: null,
      contentType: [
        { name: '电子书', value: '1' },
        { name: '图片', value: '3' },
        { name: '音频', value: '4' },
        { name: '视频', value: '5' },
        { name: '3D内容', value: '6' },
        { name: 'VR', value: '7' },
        { name: 'AR', value: '8' },
        // {name: "共享资源",value: '22'},
      ], //内容属性
      query: {},
      answerLevel: [
        { label: '简单', value: 'easy' },
        { label: '一般', value: 'general' },
        { label: '困难', value: 'difficulty' },
      ], //题目类型
      groupList: [], // 习题分组
    }
  },
  created() {
    this.currentType = this.type || '1'
    if (this.isShowResource) {
      this.contentType.push({
        name: '共享资源',
        value: '22',
      })
    }
    if (this.type.includes('20')) {
      this.contentType = [
        { name: '权威案例', value: '20-1' },
        { name: '法律法规', value: '20-2' },
        { name: '法律观点', value: '20-3' },
        { name: '裁判文书', value: '20-4' },
        { name: '图书', value: '20-6' },
        { name: '文书范本', value: '20-7' },
      ]
    }
    if (this.type == 31) {
      this.getGroupList()
    }
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10
    ) {
      _addBooks({
        pageNum,
        pageOffset,
        type: this.currentType || this.type,
        ...this.parameter,
        ...this.query,
      }).then(res => {
        this.dataList = res.data || []
        this.page = res.page
      })
    },
    colse() {
      this.$emit('update:resourceDialog', false)
    },
    save() {
      let id = []
      this.$refs.dispense
        .querySelectorAll('input[type=checkbox]:checked')
        .forEach(element => {
          id.push(element.value)
        })
      if (!id.length) {
        this.$message.error('请选择你要发布的平台')
        return
      }
      this.$emit('dispenseSave', id)
    },
    search() {
      //条件查询
      this.getList(1, this.page.offset)
    },
    async addSelection() {
      //添加选中
      const page = document.querySelector('.addBookForm')
      const list = page.querySelectorAll('input[name="ids"]:checked')
      let array = []
      if (!list.length) {
        return this.$message.warning('请选择添加内容')
      }
      for (let item of list) {
        let index = this.curSoucesList.findIndex(items => {
          return items.id == item.value || items.b_id == item.value
        })
        if (index > -1) {
          continue
        }
        array.push({
          ...this.dataList.find(items => items.id == item.value),
          action: 'add',
        })
      }
      //  log(this.curSoucesList)
      this.$emit('select', [...array, ...this.curSoucesList])
    },
    checkAll(e, name) {
      //全选
      const parent = document.querySelector('.' + name)
      parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
        let Findex = this.curSoucesList.findIndex(
          items => items.id == item.value || items.b_id == item.value
        )
        if (e.target.checked) {
          if (Findex == -1) {
            this.curSoucesList.push({
              ...this.dataList.find(items => items.id == item.value),
              action: 'add',
            })
          }
        } else {
          this.curSoucesList.splice(Findex, 1)
        }
        item.checked = e.target.checked
      })
    },
    uncheckedAll(e, item) {
      let index = this.curSoucesList.findIndex(items => {
        if (this.idName) {
          return items[this.idName] == item[this.idName]
        }
        return items.id == item.id || items.b_id == item.id
      })
      if (e.target.checked) {
        if (index == -1) {
          this.curSoucesList.push(item)
        }
      } else {
        this.curSoucesList.splice(index, 1)
      }
      if (!this.singleElection) {
        this.$refs.ids.forEach(item => (item.checked = false))
        e.target.checked = true
      }
    },
    isChecked(item) {
      //选中状态
      if (
        this.curSoucesList.findIndex(items => {
          if (this.idName) {
            return items[this.idName] == item[this.idName]
          }
          return items.id === item.id || items.b_id === item.id
        }) > -1
      ) {
        return true
      }
      return false
    },
    handleSizeChange(val) {
      this.getList(1, val)
    },
    handleCurrentChange(val) {
      this.getList(val, this.page.offset)
    },
    getGroupList() {
      listGroup().then(res => {
        this.groupList = res.data
      })
    },
  },
  watch: {
    currentType(type) {
      this.getList()
    },
  },
}
</script>

<template lang="pug">
  div
    el-dialog.restBody2(
      :center="false"
      :visible.sync="resourceDialog"
      width="1200px"
      top="50px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        <i class="el-icon-close" @click="colse"></i>
        el-tabs(value="detail")
          el-tab-pane(label="添加" name="detail")
      el-form.addBookForm
        span.group-inline(style="margin:20px;margin-top:0" v-if="isShowType")
          el-radio-group(v-model="currentType")
            el-radio-button(v-for="item in contentType"  :key="item.id" :label="item.value") {{item.name}}
        .serachWrap(v-if="!isShowSearch")
          form#detailSearchForm
            span.group-inline
              input.form-control( placeholder="输入名称" v-model="query.name" name="name")
            span.group-inline(v-if="currentType!=31")
              input.form-control( placeholder="输入标签" v-model="query.tag" name="tag")
            //- span.group-inline(v-if="currentType==31")
            //-   input.form-control( placeholder="分值" v-model="query.score" name="name")
            //- span.group-inline(v-if="currentType==31")
            //-   el-select(v-model="query.level" placeholder="难易程度")
            //-     el-option(
            //-       v-for="item in answerLevel"
            //-       :key="item.value"
            //-       :label="item.label"
            //-       :value="item.value"
            //-     )
            span.group-inline(v-if="currentType==31")
              el-select(v-model="query.group_id" placeholder="标签分组" clearable)
                el-option(
                  v-for="item in groupList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                )
            span.group-inline
              TimePick(:inputsName="['start_time','end_time']")
            span.group-inline
              el-button(@click="search" type="primary" icon="el-icon-search" plain) 搜索
              el-button(@click="addSelection" type="primary" plain) 添加选中
        table.table(width="100%")
            thead
              tr
                th(width=80)
                  input(v-if="singleElection" type="checkbox" @click="checkAll($event,'addBookForm')")
                  span(v-text="singleElection?'全选':'选择'")
                th 名称
                th(v-if="currentType!=31&&currentType!='coures'") {{currentType==22?'所属资源':'标签'}}
                th(v-if="currentType==31") 难易程度
                th(v-if="currentType==31") 分值
                th(v-if="currentType=='coures'") 所属教师
                th 类型
                th 创建时间
            tbody(v-if="dataList.length")
              tr(v-for="item,index in dataList")
                td
                  input(type="checkbox" :data-type="item.status" @click="uncheckedAll($event,item)" :value="item.id" ref="ids" :checked="isChecked(item)" name="ids")
                td.namess(v-html="item.name||item.title || item.question")
                td(v-if="currentType!=31") {{currentType==22?item.share_resource_name:item.tag}}
                td(v-if="currentType==31") {{item.level_name}}
                td(v-if="currentType==31") {{item.score}}
                td(v-if="currentType=='coures'") {{item.teacher_name}}
                td {{item.type_name}}
                td {{item.create_time}}
            tbody(v-else)
              tr
                td(colspan=5 style="text-align:center;") 暂无数据
        .pageWrap(v-if="page")
          el-pagination( :small="false" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.num"
            :page-sizes="[10, 50, 100]"
            :page-size="page.offset"
            layout="total, sizes,prev, pager, next, jumper"
            :total="page.total"
          )
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="colse") 取消
        el-button(type="primary"  @click="addSelection") 确定
</template>


<style lang="stylus" scoped>
.pageWrap
  text-align center
  line-height 40px
.restBody2
  .serachWrap
    margin-top 0
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.namess
  >>>img
    max-height 35px
</style>
