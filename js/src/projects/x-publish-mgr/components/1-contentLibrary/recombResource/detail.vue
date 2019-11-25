<script>
import * as myServices from 'services/x-publish/book'
import Resource from '@/components/common/Resource'
import * as services from 'services/x-publish/recom'
import { setTimeout } from 'timers'
export default {
  props: ['detailDialog', 'detailData', 'type'],
  components: { Resource },
  data() {
    return {
      ml: [], //目录
      resourceDialog: false,
      id: 10000,
      metadata: [],
      currMulu: [], // 当前点击的目录
      currChild: {}, // 当前点击节点
      recomDetailData: {
        name: '',
        tag: '',
        catalogs: [],
      }, //当前重组资源详情
      currentType: null,
      isSingle: false,
      defaultProps: {
        children: 'children',
        chapters: 'chapters',
        chapter_name: 'chapter_name',
      },
    }
  },
  created() {
    if (this.detailData && this.detailData.id) {
      this.getRecomDbris()
    }
  },
  methods: {
    //重组资源详情
    getRecomDbris() {
      services
        .detailRecom({
          id: this.detailData.id,
        })
        .then(res => {
          this.recomDetailData = res.data
          this.metadata = res.data.attributes
          this.ml = res.data.catalogs
          this.currMulu = res.data.catalogs[0]
            ? res.data.catalogs[0].chapters
            : []
        })
    },
    renderContent() {
      // 插入一级
      this.ml.push({
        chapters: [],
        children: [],
        chapter_name: '',
      })
      if (this.ml.length == 1) {
        this.ml[0].chapters = this.currMulu
      }
    },
    selectCurrent(node, data) {
      this.currMulu = data.chapters
      console.log(node, data)
    },
    muluSort(item, index, type) {
      let indexs =
        this.currMulu.findIndex(items => items.id == item.id) || index
      let num = type == 'up' ? -1 : 1
      let currMulu = this.currMulu
      currMulu.splice(
        indexs,
        1,
        ...currMulu.splice(indexs + num, 1, currMulu[indexs])
      )
    },
    async submitDetail() {
      let catalogs = [...this.ml]
      catalogs = this.filterDate(catalogs)
      let data = {
        name: this.recomDetailData.name,
        tag: this.recomDetailData.tag,
        id: this.detailData ? this.detailData.id : null,
        attributes: this.metadata,
        catalogs,
      }
      try {
        await services.save(data).then(res => {
          this.$emit('saveok', res.data)
        })
        this.$emit('detailBack')
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    filterDate(data) {
      data.forEach(element => {
        element.chapters = element.chapters.map(item => item.id)
        if (element.children) {
          this.filterDate(element.children)
        }
      })
      return data
    },
    append(data) {
      const newChild = { chapter_name: '', children: [], chapters: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addSelcet(data) {
      if (this.currentType == '9') {
        data.map(item => this.currMulu.push(item))
      } else {
        services
          .detailRecom({
            id: data[0].id,
          })
          .then(res => {
            if (!this.currChild.chapter_name) {
              res.data.catalogs.map(item => this.ml.push(item))
            } else {
              if (this.currChild.children) {
                res.data.catalogs.map(item =>
                  this.currChild.children.push(item)
                )
              } else {
                this.$set(this.currChild, 'children', res.data.catalogs)
              }
            }
          })
      }
      this.resourceDialog = false
    },
    del(item) {
      let index = this.currMulu.findIndex(items => item.id === items.id)
      this.currMulu.splice(index, 1)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.chapter_name === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    Import(data) {
      this.currChild = {}
      if (data) {
        this.currChild = data
      }
      this.addShow()
    },
    allowDrag(draggingNode) {
      return draggingNode.data.chapter_name.indexOf('三级 3-2-2') === -1
    },
    addShow(type) {
      if (type) {
        this.currentType = type
        this.isSingle = true
      } else {
        this.currentType = '10'
        this.isSingle = false
      }
      this.resourceDialog = true
    },
  },
  watch: {
    ml: {
      handler(newName, oldName) {
        // console.log(newName, oldName)
        // this.ml = newName
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<template lang="pug">
.box
	Resource(
		v-if="resourceDialog"
		:type="currentType"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="[]"
		:singleElection="isSingle"
		@select="addSelcet"
	)
	.div
		//-  重组资源
		el-tabs(value="ml")
			el-tab-pane( label="重组碎片" name="ml" )
				VaForm(ref="detailForm")
					form.detailForm(ref="detailForm")
						fieldset()
							.group
								.label *重组名称:
								input.form-control( type="text" maxlength="20" v-model="recomDetailData.name")
							.group
								.label *标签:
								input.form-control(v-va="{ type:'required' }" type="text"  maxlength="10" v-model="recomDetailData.tag")
				.muluWrap
					.left
						.root
							table.table.table1(ref="table")
								thead
									tr
										th  名称
										th  操作
						el-tree(
							:data="ml"
							ref="tree"
							node-key="id"
							default-expand-all
							:highlight-current="true"
							:expand-on-click-node="false"
							draggable
							:allow-drop="allowDrop"
							:allow-drag="allowDrag"
						)
							span(class="custom-tree-node" slot-scope="{ node, data }" @click="selectCurrent(node,data)")
								input.form-control(v-model="data.chapter_name")
								span.options(style="float:right")
									.icon.el-icon-upload(@click.stop="() => Import(data)" title="导入")
									.icon.el-icon-plus(@click.stop="() => append(data)" title="添加")
									.icon.icon-delete(@click.stop="() => remove(node, data)" title="删除")
						.btn()
							el-button(class="el-icon-plus" type="primary" plain @click="renderContent()") 添加顶级
							el-button(class="el-icon-upload" type="primary" plain @click="Import()") 导入顶级
					.right
						fieldset()
							table.table(ref="table")
								thead
									tr
										th(width=50)  序号
										th  名称
										th  调序
										th(width=70)  操作
								tbody(id="tbody" ref="tbody" v-if="currMulu")
									tr(v-for="(item,index) in currMulu" id="tr")
										td(id="number")
											el-input( v-text="index+1")
										td.th-name(id="name")
											span(v-text="item.name")
										td(id="btns")
											.div(ref="btns")
												el-button.iconRotate.up( @click="index!=0&&muluSort(item, index ,'up')" icon="el-icon-back" size="mini" :disabled="index==0")
												el-button.iconRotate.down(icon="el-icon-back" size="mini" :disabled="(index+1)==currMulu.length" @click="(index+1)!=currMulu.length&&muluSort(item, index ,'down')")
										td
											.div
												.icon.icon-delete(@click="del(item)" title="删除")
							.btn(v-if="ml.length")
								el-button(type="primary" class="el-icon-plus" plain @click="addShow('9')") 添加内容
					.btns
						el-button( type="info" @click="$emit('update:detailDialog', false)") 取消
						el-button( type="primary" @click="submitDetail()") 确定
			//- 扩展属性
			el-tab-pane( label="扩展属性" name="data" )
				MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)")
</template>

<style lang="stylus" scoped>
.table1
  th
    text-align center
.muluWrap
  >>> .icon
    color #44c3aa
  .left
    width 400px
    display inline-block
    overflow auto
  min-height 300px
  .root
    span
      font-size 14px
      color #333
      display inline-block
      width 60%
      margin-left 20px
    button
      margin-left 30px
  .custom-tree-node
    flex 1
    display flex
    align-items center
    justify-content space-between
    font-size 14px
    padding-right 8px
  .right
    width calc(100% - 420px)
    display inline-block
    min-height 300px
    float right
  .btn
    text-align center
    .el-button
      margin 10px auto
      margin-right 20px
.btns
  width 100%
  float right
  display block
  text-align right
</style>
