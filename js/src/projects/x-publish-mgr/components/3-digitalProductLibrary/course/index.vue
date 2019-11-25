<script>
import formSerialize from 'form-serialize'
import Dispense from '@/components/common/Dispense'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import status from '@/util/status'
import { main } from '@/util/mixins'
import * as services from "services/x-publish/course"
import * as hourSever from "services/x-publish/course/hours"
import * as exerciseSever from "services/x-publish/course/exercise"

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
      hourSever,
      exerciseSever,
      list: null, //主数据
      page: null,
      groupList: null, // 组列表
      detailDialog: false, // 详情框
      detailDialoaType: "info", //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      status,
    }
  },
  methods: {
    // 主列表公用查询
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      services.getList({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        this.list = res.data
        this.page = res.page
      })
    },
    urgentDigital() { //加急审核
      var ids = this.getChecked()
      for (var i = 0, len = ids.length; i < len; i++) {
        for (var j = 0, jlen = this.list.length; j < jlen; j++) {
          if (this.list[j].id == ids[i]) { //当前选项
            if (this.list[j].audits_status != 1) {
              this.$message.error("只能勾选待审核数据")
              return
            }
          }
        }
      }
      if (ids) {
        this.services.urgentDigital({
          id: ids
        }).then(res => this.$message.success("已提交加急审核"));
      }
    },
    //打开发布
    opnePublishDialog(item) {
      this.detailData = item
      this.publishDialog = true
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
    KnowledgeClick(name) { //点击知识点跳转到指定位置
      this.detailDialoaType = name
    },
    saveOk(data) {
      if (!this.detailData.id) {
        this.detailData = data
      }
      this.getList()
      this.getGroupList()
    },
    clear() {
      document.getElementById("text").value = ""
    },
    async opneDetailDialog(type , item){
      this.detailData = {}
      if(item){
        await services.getAllInfo(item.id).then(res => {
          this.readOnly = item&&item.audits_status==1?true:false
          // this.readOnly = true
          this.detailData = res
        })
      }
      this.detailDialog = true
    },
  },

}
</script>

<template lang="pug">
.index.clearfix
	Top(currentPlant='X-PUBLISH')
	Menu
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="课程名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control( placeholder="状态" name="status" style="width:110px")
									option(value="") 审核状态
									option(:value="index" v-for="vo,index in status") {{vo}}
							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="opneDetailDialog('info')") 新建

					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="auditsPass()" plain ) 审核
									el-button(size="mini" type="primary"  @click="urgentDigital" plain ) 加急审核
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 名称
									//- th 内容
									th 所属用户
									th(width=80) 审核状态
									th(width=70) 分发状态
									th.time 分发时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									td
										input(type="checkbox"  :value="item.id" name="ids" ref="ids")
									td
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									//- td 内容
									td {{item.owner_name}}
									td(:class="getColor(item.status)") {{item.status}}
									td {{item.release_status_name||'-'}}
									td {{item.release_time||'-'}}
									td
										.btns
											Icon(size="mini" title="详情"  @click="opneDetailDialog('info' , item)" type="icon-detail"  plain)
											Icon(size="mini" title="审核"  @click="auditsPass(item.id)" v-if="item.audits_status != 1"  type="icon-menu-publish"  plain  )
											Icon(size="mini" title="分发"  @click="opnePublishDialog(item)"  v-if="item.audits_status == 3"  type="icon-fenfa"  plain)
											Icon(size="mini" title="删除"  @click="delChoosen(item.id)" v-if="item.audits_status != 1" type="icon-delete"  plain)
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
		//- 分发
		Dispense(
			:publishDialog.sync="publishDialog"
			:item="detailData"
			v-if="publishDialog"
			@dispenseOk="dispenseOk"
		)

		//- 详情
		el-dialog.no-footer(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			@close="getList"
			top="50px"
			width="1200px"
			)
			.content(slot="title")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail(
					@saveok="saveOk"
					@Knowledgeclick='KnowledgeClick'
					:type="detailDialoaType"
					v-if="detailDialog"
					:detailDialog.sync="detailDialog"
					:detailData="detailData"
					:services="services"
          :hourSever="hourSever"
          :exerciseSever="exerciseSever"
					:media="2"
					:readOnly="readOnly"
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


<style lang="stylus" scoped >
.inputBoxs
  display inline-block
  line-height 40px
  height 40px
  >input,span
    vertical-align middle
    height 20px
    width 20px
  >input
    height 15px
.icon-menu-publish
  color #44c3aa
.group-inline
  margin 0 10px
  display inline-block
  // width 180px
.form-control
  width 160px
.mediaList
  >li
    margin-left 5px
    float left
    color grey
  .had
    color black
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
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
	left 370px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
</style>
