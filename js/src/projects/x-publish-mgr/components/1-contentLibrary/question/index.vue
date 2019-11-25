<script>
import formSerialize from 'form-serialize'
import * as commonServices from 'services/x-publish/common'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import { main } from '@/util/mixins'
import * as services from 'services/x-publish/question'
import ExerciseInfo from './examinations'

export default {
  components: {
    Menu,
    Top,
    Detail,
    GroupList,
    ExerciseInfo,
  },
  mixins: [main],
  data() {
    return {
      services,
      list: null, //主数据
      readerDialog: false, //阅读器dialog
      readerId: '', //
      page: null,
      recomId: null,
      groupList: null, // 组列表
      uploadDialog: false,
      detailDialog: false, // 详情框
      detailDialogType: 'xq', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      timePick: null, // 日期查询
      imgLinkDialog: false, //链接dialog
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      exerciseDialog: false,
      currentExerise: [],
    }
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = null
    ) {
      services
        .getList({
          pageNum,
          pageOffset,
          group_id: this.currGroup,
          ...query,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        })
    },
    openDetail(item) {
      this.currentExerise = item || {}
      this.exerciseDialog = true
    },
    save(data) {
      services.save(data).then(res => {
				this.getList()
	      this.getGroupList()
        this.exerciseDialog = false
      })
    },
  },
}
</script>

<template lang="pug">
.index.clearfix
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/contentLibrary/digitalBook")
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap( @keyup.enter="query()" )
						.title
						form#mainForm
							span.group-inline
								el-input(placeholder="请输入名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-button(size="mediu" type="primary" icon="el-icon-search" @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus" plain @click="openDetail()") 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 题目内容
									th 类型
									th 分组标签
									th 分值
									th 题目难度
									th.time 创建时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" :key="item.id" name="ids" ref="ids"  )
									th {{item.question}}
									th {{item.question_type_name}}
									th {{item.group_name}}
									th {{item.score}}
									th {{item.level_name}}
									th {{item.create_time}}
									th
										.btns
											Icon( title="详情"   size="mini"  @click="opneDetailDialog('xq' , item)" type="icon-detail"  plain  )
											Icon( title="修改"   size="mini"  @click="openDetail(item)" type="icon-data"  plain  )
											Icon( title="删除"   size="mini"  @click="delChoosen(item.id)"  type="icon-delete"  plain  )
						.pageWrap(v-if="page")
							el-pagination( :small="false" background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page.num"
							:page-sizes="[10, 50, 100]"
							:page-size="page.offset"
							layout="total, sizes, prev, pager, next, jumper"
							:total="page.total")
					.gruopList
						GroupList( :groupList="groupList" :currGroup="currGroup"
						@addGroup="addGroup"
						@updateGroup="updateGroup"
						@delGroup="delGroup"
						@groupChange="groupChange")
			//- .contentRight  数据统计
	.dialogs
		ExerciseInfo(
			v-if="exerciseDialog"
			:detailData="detailData"
			:exerciseDialog.sync="exerciseDialog"
			:currentExerise="currentExerise"
			:services="services"
      @save="save"
		)
		//- 详情
		Detail( @detailBack="detailBack" :type="detailDialogType" v-if="detailDialog" :detailDialog.sync="detailDialog" :detailData="detailData" )
		//- 移动分组
		el-dialog(
			:center="false"
			:visible.sync="moveToOtherDiaolog"
			:close-on-click-modal="false"
			title="移动分组"
			width="500px"
			)
			include ../../common/pug/moveGroupDialog.pug
</template>


<style lang="stylus" scoped >
.group-inline
  margin 0 10px
  display inline-block
.form-control
  width 200px
.cover-photo
  max-width 47px
  max-height 59px
  vertical-align middle
.th-name
  cursor default
.bookName
  width calc(100%)
  display inline-block
  padding-left 5px
  vertical-align middle
  >>>img
    max-width 60px !important
    max-height 60px !important
    vertical-align text-bottom
</style>
