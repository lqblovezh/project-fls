<script>
import Cascader from './cascader'
import * as services from 'services/x-library/columnSetting'
import { formatDate } from '@/util/util'
import { recursionTree } from '@/util/math'
import bus from './bus.js'
export default {
  data () {
    return {
      modalStatus: false,
      list: [],
      tid: '',
      categoryTemp: null,
      categoryStatus: false,
      options: [],
    }
  },
  mounted() {
    bus.$on('message', this.requestChildData)
    this.options = this.$parent.navTab
  },
  components: {
    Cascader
  },
  methods: {
    showModal(id) {
      this.tid = id
      this.getList()
      this.modalStatus = true
    },
    getList () {
      services.getCFList({
        id: this.tid,
        type: 'filter'
      }).then(res => {
        this.list = recursionTree(res.data, 'pid', 'root')
      })
    },
    append(data) {
      const newChild = {
        children: [],
        name: '',
        describe: {},
        detail: [],
        type: 'group',
        value: '',
        create_time: formatDate(new Date()),
      }
      if (!data.children) {
        this.$set(data, 'children', [])
			}
			this.$refs.tree.store.nodesMap[data.id].expanded = true
      data.children.push(newChild)
    },
    add() {
      this.list.push({
        children: [],
        pid: 'root',
        name: '',
        describe: {},
        detail: [],
        type: 'group',
        value: '',
        create_time: formatDate(new Date()),
      })
    },
    remove(node, data) {
      if (data.id) {
        services.del({ id: data.id }).then(res => {
					this.getList()
					this.$message.success('删除成功')
        })
      } else {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    },
    async save(data, node) {
      let parent = node.parent ? node.parent.data : {}
      let is_add = data.id ? 0 : 1
      let category_id = data.category_id_clone
      if (category_id && category_id !== -1) {
        data.category_id = category_id
      }
      try {
        await services.categoryFilterSave({
          id: data.id || this.tid,
          pid: parent.id,
          is_add,
          ...data
        })
        this.getList()
        this.$message.success('添加成功')
      } catch(e) {
        console.log(e.toString())
      }
    },
    openCategoryDia (d) {
      this.categoryTemp = d
      this.categoryStatus = true
    },
    async requestChildData (item) {
      const top = this.options.filter(o => o.checked)[0]
      try {
        const res = await services.getList({
          type: top.type || this.options[0].type,
          pid: item.id || 'root'
        })
        this.$set(item, 'children', res.data)
      } catch(e) {
        console.error('danger')
      }
    },
    handleClose (done) {
      this.clearSelect()
      done()
    },
    clearSelect () {
      const select = this.options.filter(o => o.checked)[0]
      select && this.$set(select, 'checked', false) && this.$set(select, 'children', null)
      this.categoryStatus = false
    },
    /*
    * 点击确定按钮
    * 将选择的分类id绑定到该数据下
     */
    bindCateToOption () {
      this.categoryTemp.category_id_clone = this.getVal(this.options)
      this.clearSelect()
    },
    getVal (array) {
      const selectItem = array.filter(i => i.checked)[0]
      if (!selectItem) {
        return -1
      } else if (!selectItem.children || !selectItem.children.length) {
        return selectItem.id
      } else {
        let temp = this.getVal(selectItem.children)
        return temp === -1 ? selectItem.id : temp
      }
    }
  }
}
</script>
<template lang="pug">
//- .column-modal
el-dialog(
  title="分类新增"
  :visible.sync="modalStatus"
  width="70%"
)
  .modal-btn-group
    el-button(class="el-icon-plus" type="primary" plain @click="add()") 添加顶级
  table.table.table1(ref="table")
    thead
      tr
        th 名称
        th 类型
        th 属性
        th.options 操作
  el-tree(
    :data="list"
    ref="tree"
    node-key="id"
  )
    div(class="custom-tree-node" slot-scope="{ node, data }")
      input.form-control(v-model="data.name" :disabled="data.type === 'cate'")
      span.options(style="float:right")
        .icon.el-icon-upload2(@click.stop="save(data,node)" title="保存")
        .icon.el-icon-plus(@click.stop="append(data)" v-if="data.id" title="添加")
        .icon.icon-delete(@click.stop="remove(node, data)" title="删除")
      span.code
        input.form-control(v-model="data.value" :disabled="data.type === 'group'")
        button(@click="openCategoryDia(data)" v-show="data.type === 'cate'") 分类
      .choice(@click.stop="")
        input(type="radio" :name="data.create_time" value="group" v-model="data.type")
        label 分组

        input(type="radio" :name="data.create_time" value="cate" v-model="data.type")
        label 分类

        input(type="radio" :name="data.create_time" value="time" v-model="data.type")
        label 时间
  span(slot="footer" class="dialog-footer")
    el-button(@click="modalStatus = false") 取 消
    el-button(type="primary" @click="modalStatus = false") 确 定
  el-dialog(
    title="选择分类"
    :visible.sync="categoryStatus"
    width="60%"
    :before-close="handleClose"
    append-to-body
  )
    .cascader-container
      .cascader-wrap
        Cascader(:options="options" @requestChildData="requestChildData")
      .cascader-foot
        el-button(@click="clearSelect") 取消
        el-button(type="primary" @click="bindCateToOption") 确定
</template>
<style lang="stylus">
.column-modal
  position fixed
  width 70%
  left 15%
  top 20%
  border-radius 10px
  border 1px solid #000
  box-shadow 0 0 3px #ccc
.modal-btn-group
  margin-bottom 10px
.tree
  position relative
  min-width 1300px
  .ib
    display inline-block
  .options
    width 170px
    text-align center
  .time, .keyword, .code
    float right
    width 230px
    line-height 40px
  padding 20px
  .btn
    margin 20px 0
  .choice
    margin-right 100px
    float right
  input[disabled]
    background-color #f5efef
    cursor not-allowed
  >>> .el-tree-node__content
    height 50px
    line-height 50px
    .custom-tree-node
      .form-control
        width 150px
      .code
        button
          border none
          outline none
          background-color transparent
.cascader-container
  padding 20px 0
  .cascader-wrap
    height 400px
    overflow-y auto
  .cascader-foot
    margin-top 10px
    text-align right
</style>