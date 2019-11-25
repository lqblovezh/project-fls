<script>
import GroupList from 'projects/x-read-mgr/components/common/GroupList'
import MoveGroup from 'projects/x-read-mgr/components/wms/1-product/moveGroup'
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-library/series'
import Detail from 'projects/common/readOnlyDetail'

import { mapMutations, mapState } from 'vuex'

export default {
  components: { Detail, GroupList, MoveGroup },
  mixins: [main],
  data() {
    return {
      services,
      detailVisible: false, // 详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      pustSetDialog: false, // 上架dialog
      currentPut: null, // 上架信息
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      columnBook: null, // 栏目图书列表
      columnList: [],
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setGroupList(data) {
      //设置分组
      this.setSeriesGrouplist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
    },
    putSet(item) {
      //上架设置详情
      this.currentPut = {
        theme_extend_list: item.theme_extend_list,
      }
      this.pustSetDialog = true
    },
    //获取栏目图书列表
    getColumn() {
      this.services.getColList().then(res => {
        this.columnBook = res.data
      })
    },
    pustSetSave() {
      this.services.putSave(this.currentPut).then(res => {
        this.pustSetDialog = false
        this.getList()
      })
    }, //上架设置
    shelfClass(data) {
      console.log({ ...data, id: this.currentShelf.id })
      services
        .putSave({
          category_ids: [data.class_id],
          id: this.currentShelf.product_id,
        })
        .then(res => {
          this.$message.success('成功')
          this.upShelfDiaolog = false
          this.getList()
        })
    },
    ...mapMutations([
      'setSerieslist',
      'setSerieslistPage',
      'setSeriesGrouplist',
    ]),
  },
  computed: {
    ...mapState({
      list: state => state.series.list,
      page: state => state.series.page,
      groupList: state => state.series.groupList,
    }),
  },
}
</script>


<template lang="pug">
.index.clearfix
	.dialogs
		MoveGroup( v-if="moveToOtherDiaolog"
			@back="moveToOtherDiaolog=false"
			@submit="moveToSubmit"
			:currGroup="currGroup" :groupList="groupList" )
		//- 上架
		Grounding(
			v-if="upShelfDiaolog"
			@back="upShelfDiaolog=false"
			@upShelf="shelfClass"
			:columnList="columnList"
			type="subject"
		)
		//- 详情
		Detail(
			:type="detailDialoaType"
			:detailVisible.sync="detailVisible"
			:defaultData="detailData"
			detailValue="info"
			v-if="detailVisible"
		)
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control.width-small( placeholder="标签" name="status")
									option(value="") 选择状态
									option(value="1") 已上架
									option(value="0") 未上架
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									//- el-button(size="mini" type="primary" @click="showUpShelf()" plain) 上架
									el-button(size="mini" type="primary" @click="downShelf()"  plain ) 下架
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th 类型
									th 创建时间
									th(width=150) 上架状态
									th(width=70) 使用版本
									th(width=80) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
									th
										img.cover-photo(:src="item.books_info.img_src")
										.th-name.bookName(:title="item.books_info.name") {{item.books_info.name}}
									th
										.th-name(:title="item.books_info.components.category_name") {{item.books_info.components.category_name}}
									th
										.th-name {{item.books_info.create_time}}
									th
										.th-name {{item.status_name}}
									th 
										.th-name(v-if="item.status!='0'") {{item.version_id}}
										.th-name(v-if="item.status=='0'")
											select(@change="versionChage($event,item)")
												option(v-for="items,key in item.version_list" :value="items" :selected="item.version_id==key") {{key}}
									th
										.btns
											//- Icon(type="icon-wms_msgComment" @click="putSet(item.id)" title="设置")
											Icon(type="icon-reject" v-if="item.status!='0'" title="下架" @click="downShelf(item.id)")
											Icon(type="icon-upload" v-if="item.set=='1'&&item.status!='1'" title="上架" @click="upShelf(item.id)")
											Icon(type="el-icon-setting" title="设置" @click="showUpShelf(item,'subject')")
											Icon(type="icon-detail" title="详情" @click="opneDetailDialog(10, item.id)")
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[10, 50, 100]"
								:page-size="page.offset"
								layout="total, sizes,prev, pager, next, jumper"
								:total="page.total"
							)
						//- 分组
					.gruopList()
						GroupList(
							:groupList="groupList"
							:currGroup="currGroup"
							@addGroup="addGroup"
							@updateGroup="updateGroup"
							@delGroup="delGroup"
							@groupChange="groupChange"
						)
						//- 上架设置
						el-dialog(
							title="价格设置"
							:visible.sync="pustSetDialog"
							v-if="pustSetDialog"
							width="500px"
						)
							.formWrap
								VaForm(ref="pustSetForm")
									form#pustSetForm
										.group
											span.left 版本
											span.right 价格
											input.hide(name="id" :value="currentPut.id")
										.group(v-for="item,index in currentPut.theme_extend_list")
											span.left(v-text="item.version_id")
											span.right
												input.form-control.info(name="prices" v-model="item.price" :disabled="item.is_put")
												input.hide(name="ids" :value="item.xread_book_id" :disabled="item.is_put")
							span.dialog-footer( slot="footer" class="")
								el-button(size="small" type="info" @click="pustSetDialog = false" ) 取消
								el-button(size="small" type="primary" @click="pustSetSave") 确定
</template>


<style lang="stylus" scoped>
.form-control
  width 170px
.width-small
  width 100px
.el-dialog__wrapper
  .form-control
    margin-right 10px
    width 100px
    min-width @width
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
</style>
