<script>
import formSerialize from 'form-serialize'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import Dispense from '@/components/common/Dispense'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import * as themeServices from 'services/x-publish/theme'
import * as services from 'services/x-publish/theme'
import {
  getDispense
} from 'services/x-publish/dispense'
import {
  publicMixin,
  main
} from '@/util/mixins'

export default {
  mixins: [main],
  components: {
    Menu,
    Top,
    GroupList,
    Detail,
    Dispense
  },
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      querys: null,
      groupList: null, // 组列表
      detailDialog: false, // 详情框
      detailDialoaType: "info", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      publishDialog: false, //发布dialog
      dispenseItem: null, //当前发布列表
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      pushType: { //审核状态
        list: [{
            name: "已通过",
            value: '3'
          },
          {
            name: "待审核",
            value: '1'
          },
          {
            name: "未通过",
            value: '2'
          },
          {
            name: "未审核",
            value: '0'
          }
        ],
        value: '', //发布值
      },
      themeType: { //主题类型
        value: '',
        list: ['混合主题', '阅读主题', '视频主题', '音频主题'],
      },
      publishList: null, //分发平台数据
      currGroup: '', //当前组id
    }
  },
  methods: {
    // 主列表公用查询
    async getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      await themeServices.ListTheme({
        pageNum,
        pageOffset,
        ...query,
        group_id: this.currGroup,
        status: this.pushType.value,
      }).then((res) => {
        this.list = res.data
        this.page = res.page
      })
    },
    urgentAudit() { //加急审核
      const id = []
      const list = Array.from(document.querySelectorAll("input[name='ids']:checked"))
      // const list = this.getChecked();
      log(list)
      if (!list.length) {
        return this.$message.error('请勾选你要加急的内容！')
      }
      list.forEach(item => {
        if (item.getAttribute('data-type') == '待审核') {
          id.push(item.value)
        }
      })
      if (!id.length) {
        return this.$message.error('加急审核只对待审核有效！')
      }
      themeServices.detailUrgent({
        id
      }).then(res => {
        this.$message.success('加急成功!')
        this.getGroupList() // 重新查询分组
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    //打开分发模态框
    opnePublishDialog(item) {
      this.publishDialog = true
      this.dispenseItem = item
    },
    dispenseSave(id) { //分发
      themeServices.detailDistribute({
        id,
      }).then(res => {
        this.$message.success('分发成功')
        this.getList()
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    updateList() { //更新列表数据
      this.getList()
      this.getGroupList()
    },
    //删除选中
    delChoosens(id) {
      var ids = []
      if (!id) {
        var nodes = Array.from(document.querySelectorAll('input[name="ids"]:checked'))
        nodes.forEach(item => {
          ids.push(item.value)
        })
        if (!nodes.length) {
          this.$message.error('请先选中!');
          return
        }
      } else {
        ids.push(id)
      }
      if (ids.length > 0) {
        this.$confirm("是否删除?").then(res => {
          var query = formSerialize(document.querySelector("#mainForm"), {
            hash: true
          }); // 分页带参数
          this.services.del({
            id: ids
          }).then(_ => {
            this.getList(this.page.num, this.page.offset, query)
            this.getGroupList()
          }).catch(({
            payload
          }) => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
        }).catch(res => {
          // 取消事件
        })
      }
    },
  },
}
</script>

<template lang="pug">
.index.clearfix
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/digitalProductLibrary/themeLibary")
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							//- span.group-inline
							//- 	el-select(v-if="themeType" v-model="themeType.value" name="type" placeholder="主题类型" clearable)
							//- 		el-option(
							//- 			v-for="item in themeType.list"
							//- 			:key="item"
							//- 			:label="item"
							//- 			:value="item"
							//- 		)
							span.group-inline
								select.form-control( name="audits_status" style="width:110px")
									option(value="") 审核状态
									option(value="0") 未审核
									option(value="1") 待审核
									option(value="2") 未通过
									option(value="3") 已通过	
							span.group-inline
								el-button(size="mediu" type="primary" icon="el-icon-search" @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="opneDetailDialog('info')" ) 新建

					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="audits()" plain ) 审核
									el-button(size="mini" type="primary" @click="urgentAudit" plain) 加急审核
									el-button(size="mini" type="primary" @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn(style="text-align:left")
										input(type="checkbox" @click="checkAll")
									th 名称
									//- th(width=70) 主题类型
									th 主题所含数量
									th 标签
									th 创建时间
									th(width=70) 审核状态
									th(width=70) 发布状态
									th.time 分发时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									td(style="text-align:left")
										input(type="checkbox" :data-type="item.status" :value="item.id" name="ids" ref="ids")
									td
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									//- td(:title="item.type") {{item.type}}
									td {{item.theme_number}}
									td(:title="item.tag") {{item.tag}}
									td {{item.create_time}}
									td(:class="getColor(item.status)") {{item.status}}
									td {{item.release_status_name}}
									td {{item.release_time||'-'}}
									td
										.btns
											Icon(size="mini" title="详情"  @click="opneDetailDialog('info', item)" type="icon-detail"  plain)
											Icon(size="mini" title="审核"  @click="audits(item.id)" v-if="item.audits_status != 1"  type="icon-menu-publish"  plain  )
											Icon(size="mini" title="分发"  @click="opnePublishDialog(item)"  v-if="item.audits_status == '3'"  type="icon-fenfa"  plain)
											Icon(size="mini" title="删除" @click="delChoosen(item.id)" v-if="item.audits_status != 1" type="icon-delete"  plain)
						.pageWrap(v-if="page")
							el-pagination( :small="false" background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page.num"
							:page-sizes="[10, 50, 100]"
							:page-size="page.offset"
							layout="total, sizes,prev, pager, next, jumper"
							:total="page.total")
					.gruopList
						GroupList( :groupList="groupList" :currGroup="currGroup"
						@addGroup="addGroup"
						@updateGroup="updateGroup"
						@delGroup="delGroup"
						@groupChange="groupChange")
			//- .contentRight  数据统计
	.dialogs
		Examine(:examineDialog.sync="examineDialog" @saveExamine="saveExamine")
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1100px"
			)
			.content(slot="title")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail(
					:type="detailDialoaType"
					v-if="detailDialog"
					:detailDialog.sync="detailDialog"
					:detailData="detailData"
					@updateList="updateList"
					:readOnly="readOnly"
				)

		//- 分发
		Dispense(
			:publishDialog.sync="publishDialog"
			:item="dispenseItem"
			v-if="publishDialog"
			@dispenseOk="dispenseOk"
		)

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


<style lang="stylus" scoped>
@import "~common/stylus/mixin"

.icon-menu-publish
  color #44c3aa
.tableTop
  height 50px
  line-height 50px
.tableTop >.title
  text-indent 0
.icon-know.active:before
  // color #afafaf
.group-inline
  margin 0 10px
  display inline-block
.form-control
  width 200px
.notPush
  color #CF2424
.pushed
  color #4AC4AC
.noPush
  color #D64848
.pushing
  color #4AC472
.clear
	position absolute
	top 95px
	left 410px
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
	top 95px
	left 630px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
</style>
