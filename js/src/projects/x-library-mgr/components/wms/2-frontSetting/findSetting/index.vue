<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-library/fondSetting'
import { mapMutations, mapState } from 'vuex'
import Detail from './detail'
import Resource from '@/components/common/Resource'

export default {
  components: {
    Detail,
    Resource,
  },
  mixins: [main],
  data() {
    return {
      services,
      detailVisible: false, // 详情框
      detailAddDialog: false, //新增
      detailDialoaType: 'xq', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      pustSetDialog: false, // 上架dialog
      currentPut: null, // 上架信息
      fabuIds: [], //
    }
  },
  methods: {
    addSelection(addDate) {
      //添加选中
      log(addDate)
      services
        .save({ id: addDate })
        .then(res => {
          this.getList()
          this.detailAddDialog = false
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    setList(data) {
      //设置列表
      this.setMediaThemelist(data)
    },
    setPage(data) {
      //设置页码
      this.setMediaThemelistPage(data)
    },
    saveOk() {
      this.detailVisible = false
      this.getList()
    },
    ...mapMutations(['setMediaThemelist', 'setMediaThemelistPage']),
  },
  computed: {
    ...mapState({
      list: state => state.mediaTheme.list,
      page: state => state.mediaTheme.page,
    }),
  },
}
</script>


<template lang="pug">
.index.clearfix
	.dialogs
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailVisible"
			v-if="detailVisible"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				Detail(
					:detailData="detailData"
          @saveOk='saveOk'
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
								el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary"   icon="el-icon-plus"  @click="opneDetailDialog('xq')" plain ) 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th 创建时间
									th(width=100) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
									th
										img.cover-photo()
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name {{item.create_time}}
									th
										.btns
											Icon(type="icon-detail" title="详情" @click="opneDetailDialog('xq' , item.id)")
											Icon(type='icon-delete' title="删除" @click="delChoosen(item.id)")
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
		//- 选择已上架资源
		Resource(:detailAddDialog.sync="detailAddDialog" v-if="detailAddDialog" :curSoucesList="list" @select="addSelection")
</template>


<style lang="stylus" scoped>
.tableWrap
  width 97.5%
</style>
