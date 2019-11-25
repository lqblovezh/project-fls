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
      activeName: "fan",
      timeValue: null,
      detailVisible: false,
      detailDate: {
        id: '',
        simp: '',
        trad: []
      },
    };
  },
  methods: {
    async getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, searchQuery) { //获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
      };
      await dataServices.listFont(data).then(res => {
        this.page = res.page
        this.pageList = res.data
      })
    },
		clear(){
			document.getElementById("text").value=""
		},
    showDetaile(id, simp) { //查看详情
      this.detailDate.trad = []
      this.detailDate.id =
        this.detailDate.simp = ''
      if (!id) {
        this.detailVisible = true
        return
      } else {
        dataServices.detailFont({
          id
        }).then(res => {
          this.detailDate.id = id
          this.detailDate.simp = simp
          this.detailDate.trad = res.data
          this.detailVisible = true
        })
      }
    },
    deleteHandeler(id = []) { //删除
      if (!id.length) {
        Array.from(document.querySelectorAll("[name='checkbox']:checked")).forEach(item => {
          id.push(item.value)
        });
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
          dataServices.deleteFont({
            id
          }).then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
        })
        .catch(_ => {})
    },
    addTraditional() { //添加简体字对应繁体字
      let index = this.detailDate.trad.length + 1
      this.detailDate.trad.push({
        index,
        id: '',
        trad: '',
        action: 'add'
      })
    },
    deleteTraditional(id, index) { //详情删除
      let findIndex = id ? this.detailDate.trad.filter(v => v.action != 'del').findIndex(item => item.id === id) : index
      this.$set(this.detailDate.trad.filter(v => v.action != 'del')[findIndex], 'action', 'del')
    },
    save() { //保存
      const id = this.detailDate.id
      const findError = this.detailDate.trad.findIndex(item => !item.trad)
      if (findError > -1) {
        this.$message.warning('请输入完整信息');
        return
      }
      if (!id) {
        //新增
        dataServices.addFont({
          simp: this.detailDate.simp,
          trad: this.detailDate.trad.filter(v => v.action != 'del').map(item => item.trad)
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
      log(this.detailDate)
      dataServices.modifyFont(this.detailDate).then(res => {
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
						el-input(placeholder="输入简体搜索" name="simp" clearable v-model="searchQuery.simp")
					span.group-inline
						TimePick(:inputsName="['start_time','end_time']")

					span.group-inline(:span="10")
						el-button(type="primary" icon="el-icon-search" plain @click="seareHandeler") 搜索
						el-button(type="primary" icon="el-icon-plus" plain @click="showDetaile()") 新增
						el-button(type="primary" icon="el-icon-delete" plain @click="deleteHandeler()") 删除
			.tableWrap
				table.table
					thead
						tr
							th 全选
								input(type="checkbox" name='AllCheckbox' @click="selcetAll")
							th ID
							th 简体
							th 繁体
							th 创建时间
							th 操作
					tbody(v-if="pageList.length")
						tr(v-for="item in pageList")
							td
								input(type="checkbox" :value='item.id' name="checkbox" ref="ids")
							td(v-text='item.id')
							td(v-text='item.simp' :title="item.simp")
							td(v-text='item.trads' :title="item.trads")
							td(v-text='item.create_time')
							td
								Icon(type="icon-detail" title="详情" plain size="mini" @click="showDetaile(item.id,item.simp)")
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
				el-form-item(label="简体字:" label-width="120px")
					input.form-control(v-model="detailDate.simp")
					el-button.addNew(type="primary" size="mini" plain @click="addTraditional()") 新增
				el-form-item(label="" label-width="120px")
					table.table(width="100%")
						thead
							tr
								th 序号
								th 繁体字
								th 操作
						tbody(v-if="detailDate.trad.length")
							tr(v-for="item,index in detailDate.trad.filter(v => v.action != 'del')")
								td(align="center" v-text='index+1')
								td(align="center")
									input(type="text" v-model="item.trad" v-if="item.index")
									span(v-text='item.trad' v-if="!item.index")
								td(align="center")
									el-button(type="danger" plain size="mini" @click="deleteTraditional(item.id,index)") 删除
			div(slot="footer" class="dialog-footer")
				el-button(type="info"  @click="detailVisible = false") 取消
				el-button(type="primary"  @click="save()") 确定
</template>


<style lang="stylus" scoped>
.serachWrap
  margin-bottom 15px
.addNew
  float right
  float right
  position relative
  top 7px
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
</style>
