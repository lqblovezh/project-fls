<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import Detail from './detail'
import { main } from '@/util/mixins'
import * as services from 'services/x-publish/erp'

export default {
  components: {
    Menu,
    Top,
    Detail,
  },
  mixins: [main],
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      detailDialog: false, // 详情框
      detailDialogType: 'xq', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
    }
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = null
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          ...query,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        })
    },
    async del(data) {
      return this.services.deleteBooks(data)
    },
    products(id) {
      this.services
        .products({
          id,
        })
        .then(res => {
          this.$message.success('生成成功!')
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
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
								el-input(placeholder="书籍名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="ISBN" name="isbn" clearable v-model="searchQuery.isbn")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								//- .btns
								//- 	el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
								//- 	el-button(size="mini" type="primary" @click="opnePublishDialog(false)"  plain ) 发布
								//- 	el-button(size="mini" type="primary"  @click="importSomething" plain) 导入
								//- 	el-button(size="mini" type="primary"  @click="exportSomething" plain) 导出
								//- 	el-button(size="mini" type="primary"  @click="exportSomething2" plain) 全部导出
								//- 	el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 名称
									th 作者
									th ISBN
									th.time 创建时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.bookname") {{item.bookname}}
									th
										.th-name(:title="item.writer") {{item.writer}}
									th
										.th-name(:title="item.isbn") {{item.isbn}}
									th
										.th-name {{item.create_time}}
									th
										.btns
											Icon( title="详情"   size="mini"  @click="opneDetailDialog('xq' , item)" type="icon-detail"  plain  )
						.pageWrap(v-if="page")
							el-pagination( :small="false" background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page.num"
							:page-sizes="[10, 50, 100]"
							:page-size="page.offset"
							layout="total, sizes, prev, pager, next, jumper"
							:total="page.total")
	.dialogs
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				Detail( 
          @detailBack="detailBack"
          :type="detailDialogType"
          v-if="detailDialog"
          :detailDialog.sync="detailDialog"
          :detailData="detailData"
        )
</template>


<style lang="stylus" scoped >
.tableWrap
  width 100%
  box-sizing border-box
</style>
