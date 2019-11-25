<script>
import Nav from './index'
import * as services from 'services/x-library/columnSetting'
import { recursionTree } from '@/util/math.js'
import Resource from '@/components/common/Resource'
import Modal from './modal'

export default {
  props: ['dataList'],
  components: { Resource, Nav, Modal },
  data() {
    return {
      data: [...this.dataList],
      currMulu: [],
      relationsDialog: false,
      detailDialog: false,
      currentDescribe: {},
      currentDate: {},
      currentNode: {},
      list: [],
      resourceDialog: false,
      resourceType: null,
      navTab: [], // 顶级导航菜单
    }
  },
  computed: {
    currentType() {
      return this.$route.query.type || (this.navTab[0] && this.navTab[0].type)
    },
  },
  async mounted() {
    await this.getNav()
    this.getList()
  },
  methods: {
    // 获取顶级导航菜单
    async getNav () {
      try {
        const res = await services.getTopCategory()
        if (res.data) {
          res.data.forEach(item => {
            this.navTab.push({
              txt: item.name,
              type: item.type,
            })
          })
        }
      } catch(e) {
        console.error(`[getNav]：${e.toString()}`)
      }
    },
    append(data) {
      const newChild = {
        children: [],
        name: '',
        describe: {},
        detail: [],
        keyword: '',
        code: '',
        create_time: this.formatDate(new Date()),
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.$refs.tree.store.nodesMap[data.id].expanded = true
      data.children.push(newChild)
    },
    remove(node, data) {
      if (data.id) {
        services.del({ id: data.id }).then(res => {
          this.getList()
        })
      } else {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    },
    getList() {
      console.log(this.currentType)
      services.getList({ type: this.currentType }).then(res => {
        this.data = recursionTree(res.data, 'pid', 'root')
      })
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.name === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.name.indexOf('三级 3-2-2') === -1
    },
    add() {
      this.data.push({
        children: [],
        pid: 'root',
        name: '',
        describe: {},
        detail: [],
        keyword: '',
        code: '',
        create_time: this.formatDate(new Date()),
      })
    },
    save(data, node) {
      let parent = node.parent ? node.parent.data : {}
      services
        .save({
          ...data,
          type: this.currentType,
          pid: parent.id,
        })
        .then(res => {
          this.$message.success('成功')
          this.getList()
          this.relationsDialog = false
        })
      // this.$emit('save', this.data)
    },
    selectCurrent(node, data) {
      // this.currMulu = data.chapters
    },
    describe(node, data) {
      this.currentNode = node
      this.currentDate = data
      if (!data.describe) {
        this.$set(data, 'describe', {})
      }
      this.currentDescribe = data.describe||{}
      this.relationsDialog = true
    },
    async showDetail(node, data) {
      this.currentDate = data
      await this.getDetailList()
      this.detailDialog = true
    },
    async getDetailList() {
      await services
        .detail({
          type: this.currentType,
          category_id: this.currentDate.id,
        })
        .then(res => {
          this.list = res.data || []
        })
    },
    muluSort(item, sort) {
      services
        .sort({ id: item.id, sort })
        .then(res => {
          this.getList()
        })
        .catch(payload => {
          this.$message.error(payload.message)
        })
    },
    formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return fmt
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    },
    addSelcet(data, array) {
      // console.log(data, array)
      services
        .add({
          category_id: this.currentDate.id,
          rel_id: array.map(item => item.product_id),
          type: this.currentType,
        })
        .then(res => {
          this.getDetailList()
          this.resourceDialog = false
        })
        .catch(({ payload }) => {
          this.$message.error(payload.message)
        })
    },
    del(id) {
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked()
        if (!ids) {
          return
        }
      }
      this.$confirm('是否删除？')
        .then(_ => {
          services
            .dels({
              rel_id: ids,
              type: this.currentType,
              category_id: this.currentDate.id,
            })
            .then(res => {
              this.$message.success('删除成功')
              this.getDetailList()
            })
            .catch(({ payload }) => {
              this.$message.error(payload.message)
            })
        })
        .catch(_ => {})
    }, //删除或多个单个
    openResource() {
      if (this.type == 'subject') {
        this.resourceType = 'series'
      }
      this.resourceDialog = true
    },
    // 上传
    uploadTreeFile(data, node) {
      this.currTreeData = data
      this.currNode = node
      this.$refs.treeImgInp.click()
    },
    // 上传
    async treeImgInpChange(e) {
      let file = this.$isFileBig(e, 1)
      if (!file) return
      let data = await this.$globalUpdateFile(file)
      console.log(data)
      this.currTreeData.img_src = data.url
      this.currTreeData.img = data.path
      this.save(this.currTreeData, this.currNode)
    },
    saveDescribe() {
      this.save(this.currentDate,this.currentNode)
      // services.saveDescribe(this.currentDescribe).then(res => {
      //   this.$message.success('保存成功')
      //   this.relationsDialog = false
      // })
    },
  },
}
</script>

<template lang="pug">
.tree
	Resource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="list"
		:currentType='resourceType'
		@select="addSelcet"
	)
	el-dialog(
		width="1000px"
		title="描述与关系"
		:visible.sync="relationsDialog"
		v-if="relationsDialog"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		append-to-body
	)
		VaForm( ref="detailForm")
			form.detailForm( ref="detailForm")
				.group
					.label 事实描述:
					input.form-control(v-model="currentDescribe.desc" type="text" maxlength="100")
				.group
					.label 引发关系:
					input.form-control(v-model="currentDescribe.initiation" type="text" maxlength="100")
				.group
					.label 关联关系:
					input.form-control(v-model="currentDescribe.relation" type="text" maxlength="100")
				.group
					.label 对比关系:
					input.form-control(v-model="currentDescribe.contrast" type="text"  maxlength="100")
				.group
					.label 交互关系:
					input.form-control( v-model="currentDescribe.interactive" type="text" maxlength="100")
				.group
					.label 代表词:
					input.form-control( v-model="currentDescribe.represent" type="text" maxlength="100")
		.btns(slot="footer")
			el-button( type="info" @click="relationsDialog=false") 取消
			el-button(@click="saveDescribe" type="primary") 确定
	el-dialog.detailDialog(
		width="1000px"
		title="关联产品"
		:visible.sync="detailDialog"
		v-if="detailDialog"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		append-to-body
	)
		table.table
			thead
				tr
					th.table-check
						input(type="checkbox" @click="$checkAll($event)")
					th 名称
					th 创建时间
					th 发布时间
					th(width=100) 操作
			tbody
				tr(v-for="item in list")
					th
						input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
					th
						img.cover-photo()
						.th-name.bookName(:title="item.name") {{item.name}}
					th
						.th-name {{item.create_time}}
					th
						.th-name
					th
						.btns
							Icon(type='icon-delete' title="删除" @click="del(item.rel_id)")
		.btn
			el-button(type="primary" plain @click="openResource" size="mini") 添加关联
		.btns(slot="footer")
			el-button( type="info" @click="detailDialog=false") 取消
			el-button(@click="detailDialog=false" type="primary") 确定
	Nav(ref="nav" :navTab="navTab")
	.btn
		el-button(class="el-icon-plus" type="primary" plain @click="add()") 添加顶级
	table.table.table1(ref="table")
		thead
			tr
				th(style="padding-left:80px")  名称
				th(width=220) 编号
				th(width=150) 简介
				th(v-if="currentType=='keyword'" width=200)  关键词
				th(width=150) 图片
				th(width=150)  创建时间
				th.options  操作
	//- el-tree(
	//- 	:data="data"
	//- 	ref="tree"
	//- 	node-key="id"
	//- 	default-expand-all
	//- 	draggable
	//- 	:allow-drop="allowDrop"
	//- 	:allow-drag="allowDrag"
	//- )
	el-tree(
		:data="data"
		ref="tree"
		node-key="id"
	)
		span(class="custom-tree-node" slot-scope="{ node, data }")
			input.form-control(v-model="data.name")
			span.options(style="float:right")
				.icon.el-icon-plus( @click.stop="$refs.modal.showModal(data.id)" title="添加关系")
				.icon.up.el-icon-back( @click.stop="muluSort(data,'up')" v-if="data.id"  title="上移")
				.icon.down.el-icon-back( @click.stop="muluSort(data, 'down')" v-if="data.id"  title="下移")
				.icon.el-icon-edit-outline( @click.stop="describe(node,data)" v-if="currentType=='keyword'" title="描述与关系")
				.icon.icon-detail( @click.stop="showDetail(node,data)" v-if="currentType!='keyword'&&data.id"  title="详情")
				.icon.el-icon-upload2( @click.stop="save(data,node)" title="保存")
				.icon.el-icon-plus( @click.stop="append(data)" v-if="data.id" title="添加")
				.icon.icon-delete( @click.stop="remove(node, data)" title="删除")
			span.time( @click.stop=" " v-text="data.create_time")
			div.time(@click.stop=" ")
				el-button(size="small" type="primary" @click.stop="uploadTreeFile(data, node)") 上传
				img.tree-img( :src="data.img_src" )
			span.time(@click.stop=" ")
				input.form-control( v-model="data.abs")
			span.time
				input.form-control(v-if="currentType=='keyword'" v-model="data.keyword")
			span.keyword
			span.code(@click.stop=" ")
				input.form-control(v-model="data.code")
	input.hide(type="file" @change="treeImgInpChange" ref="treeImgInp")
	Modal(ref="modal")
</template>

<style lang="stylus" scoped>
.detailDialog
  >>> .btn
    margin 20px 0
.icon.up
  transform rotate(90deg)
  display inline-block
.icon.down
  transform rotate(-90deg)
  display inline-block
.textarea
  width 100%
  resize none
.tree-img
  height 40px
  margin-left 50px
  .icon
    color #44c3aa
.tree
  position relative
  min-width 1300px
  .options
    width 170px
    text-align center
    .icon
      color #44c3aa
  .time, .keyword, .code
    float right
    width 200px
    line-height 40px
  padding 20px
  .btn
    margin 20px 0
  >>> .el-tree-node__content
    height 50px
    line-height 50px
    .custom-tree-node
      width 100%
      .form-control
        width 150px
</style>
