<script>
import formSerialize from "form-serialize"
import Menu from "@/components/common/Menu"
import Top from "@/components/common/Top"

import * as dataServices from 'services/x-publish/data'
import {
  publicMixin
} from '@/util/mixins'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      page: null,
      query: null,
      path: 'dataRelation',
      activeName: "bie",
      timeValue: null,
      detailVisible: false,
      detailDate: {
        id: '',
        name: '',
        tags: '',
        nick: []
      },
    };
  },
  methods: {
    async getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, searchQuery) { //获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery
      };
      await dataServices.listNickName(data).then(res => {
        this.page = res.page
        this.pageList = res.data
      })
    },
		clear() {
			document.getElementById("text").value = ""
		},
		clear2() {
			document.getElementById("text2").value = ""
		},
    showDetaile(id) { //查看详情
      this.detailDate.id =
        this.detailDate.tags =
        this.detailDate.name =
        this.detailDate.appellation = ''
      this.detailDate.nick = []
      if (!id) {
        this.detailVisible = true
        return
      } else {
        dataServices.detailNickName({
          id
        }).then(res => {
          let detail = this.pageList.find(item => item.id === id)
          this.detailDate.id = id
          this.detailDate.tags = detail.tags
          this.detailDate.name = detail.name
          this.detailDate.nick = res.data
          this.detailVisible = true
        });
      }
    },
    deleteHandeler(id = []) { //删除
      if (!id.length) {
        Array.from(document.querySelectorAll("[name='checkbox']:checked")).forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！')
      }
      this.$confirm("确认删除？")
        .then(_ => {
          let {total,start,num} = this.page // 处理删除最后一页数据返回上页数据
          if((total-id.length) == start){
            this.page.num = !start?1:num-1
          }
          dataServices.deleteNickName({
            id
          }).then(res => {
            this.getList()
          })
        })
        .catch(_ => {})
    },
    addNickname() { //添加别称
      let index = this.detailDate.nick.length + 1
      this.detailDate.nick.push({
        index,
        id: '',
        name: '',
        action: 'add',
      })
    },
    deleteTraditional(id, index) {
      let findIndex = id ? this.detailDate.nick.filter(v => v.action != 'del').findIndex(item => item.id === id) : index
      this.$set(this.detailDate.nick.filter(v => v.action != 'del')[findIndex], 'action', 'del')
    },
    save() {
      const id = this.detailDate.id
      const findError = this.detailDate.nick.findIndex(item => !item.nick)
      if (findError > -1) {
        this.$message.warning('请输入完整信息');
        return
      }
      if (!id) {
        //新增
        dataServices.addNickName({
          ...this.detailDate,
          nick: this.detailDate.nick.filter(v => v.action != 'del').map(item => item.nick),
        }).then(res => {
          this.$message.success('新增成功')
          this.getList()
          this.detailVisible = false
        }).catch(({
          payload
        }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
        return
      }
      //修改
      dataServices.modifyNickName(this.detailDate).then(res => {
        this.$message.success('修改成功')
        this.getList()
        this.detailVisible = false
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    }
  },
  components: {
    Menu,
    Top
  }
};
</script>

<template lang="pug">
.indexs
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/dataRelation")
	.mainRight
		.maindata
			.serachWrap
				.NavList
					el-tabs(v-model="activeName" @tab-click="handleNavClick")
						el-tab-pane(label="繁简字管理" name="fan")
						el-tab-pane(label="异体字管理" name="yi")
						el-tab-pane(label="别称管理" name="bie")
				form#mainForm
					span.group-inline
						el-input(placeholder="输入主称谓搜索" name="name" clearable v-model="searchQuery.name")
					span.group-inline
						el-input(placeholder="输入标签搜索" name="tags" clearable v-model="searchQuery.tags")
					span.group-inline
						TimePick(:inputsName="['start_time','end_time']")
					span.group-inline(:span="9")
						el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
						el-button(type="primary" icon="el-icon-plus" @click="showDetaile()" plain) 新增
						el-button(type="primary" icon="el-icon-delete" @click="deleteHandeler()" plain) 删除
			.tableWrap
				table.table
					thead
						tr
							th 全选
								input(type="checkbox" name='AllCheckbox' @click="selcetAll")
							th ID
							th 主称谓
							th 别称
							th 标签
							th 创建时间
							th 操作
					tbody(v-if="pageList.length")
						tr(v-for="item in pageList")
							td
								input(type="checkbox" :value='item.id' name="checkbox" ref="ids")
							td(v-text='item.id')
							td(v-text='item.name' :title="item.name")
							td(v-text='item.nicks' :title="item.nicks")
							td(v-text='item.tags' :title="item.tags")
							td(v-text='item.create_time')
							td
								Icon(type="icon-detail" title="详情" plain size="mini" @click="showDetaile(item.id)")
								Icon(type="icon-delete" title="删除" plain size="mini" @click="deleteHandeler([item.id])")
			.pageWrap(v-if="page")
				el-pagination( :small="false" background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page.num"
				:page-sizes="[10, 50, 100]"
				:page-size="page.offset"
				layout="total, sizes, prev, pager, next, jumper"
				:total="page.total")
		//- 详情dialog
		el-dialog(:visible.sync="detailVisible")
			.header(slot="title")
				el-tabs(value="detail")
					el-tab-pane(label="详情" name="detail")
			el-form
				el-form-item(label="主称谓:" label-width="120px")
					input.form-control(v-model="detailDate.name")
				el-form-item(label="标签:" label-width="120px")
					input.form-control(v-model="detailDate.tags")
					el-button.addNew(type="primary" size="mini" @click="addNickname" plain) 新增
				table.table(width="100%")
					thead
						tr
							th 序号
							th 别称
							th 操作
					tbody(v-if="detailDate.nick.length")
						tr(v-for="item,index in detailDate.nick.filter(v => v.action != 'del')")
							td(align="center" v-text='index+1')
							td(align="center")
								input(type="text" v-model="item.nick" v-if="item.index")
								span(v-text='item.nick' v-if="!item.index")
							td(align="center")
								el-button(type="danger" plain size="mini" @click="deleteTraditional(item.id,index)") 删除
			div(slot="footer" class="dialog-footer")
				el-button(type="info"  @click="detailVisible = false") 取消
				el-button(type="primary"  @click="save") 确定
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
.serachWrap
  margin-bottom 15px
.addNew
  float right
.el-form-item__label
  text-align left
.clear
	position absolute
	top 150px
	left 355px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
.clear2
	position absolute
	top 150px
	left 520px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
</style>
