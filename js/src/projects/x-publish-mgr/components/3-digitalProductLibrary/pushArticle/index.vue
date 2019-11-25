<script>
import formSerialize from 'form-serialize'

import Dispense from '@/components/common/Dispense'
import {
  HtmlDecode
} from '@/util/domUtil'

import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import GroupList from '@/components/common/GroupList'
import status from '@/util/status'
import MaskShow from '@/components/common/MaskShow'
import PreviewArticle from '@/components/common/previewArticle'
import Detail from './detail'

import * as services from "services/x-publish/push_articles"
import {
  main
} from '@/util/mixins'


// import * as services from "services/x-publish/common"

export default {
  mixins: [main],
  components: {
    Menu,
    Top,
    GroupList,
    Detail,
    Dispense,
    MaskShow,
    PreviewArticle
  },
  data() {
    return {
      list: null, //主数据
      page: null,
      groupList: null, // 组列表
      detailDialog: false, // 详情框
      detailDialoaType: "info", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      timePick: null, // 日期查询
      imgLinkDialog: false, //链接dialog
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      previewArticleDialog: false, // 预览
      toId: null, //移动到那一组
      status,
      services,
    }
  },
  methods: {
    // 主列表公用查询
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      services.listArticles({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        this.list = res.data
        this.page = res.page
      })
    },
    preArt(item) { //预览
      this.detailData = item;
      // item.preview = HtmlDecode(item.preview)
      // var {preview, name:title , author ,create_time:time } = item
      // this.html = {preview, title , author , time }
      this.previewArticleDialog = true
    },
    // 详情新增
    opneDetailDialogAdd(type) {
      this.detailDialog = true;
      this.detailDialoaType = type;
      this.detailData = null;
      this.metadata = null;
    },
    //详情回调
    detailBack() {
      log("返回")
      this.detailDialog = false;
      this.getList();
    },
    // 链接
    opneImgLinkDialog(item) {
      this.imgLinkDialog = true
      this.detailData = item
    },
    urgentCheck() { //加急审核
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
        this.services.urgent({
          id: ids
        }).then(res => this.$message.success("加急审核已提交"))
      }
    },

    async goEditor(articleId) { // 转跳编辑器
      // var res = await services.detailArticles({id:articleId})
      this.$router.push({
        path: "/contentLibrary/article/editor",
        query: {
          articleId,
          from: 'push',
          index: this.$route.path
        }
      })
    },
    //打开发布
    opnePublishDialog(item) {
      this.detailData = item;
      this.publishDialog = true;
    },
    //导出
    exportSomething(e) { //默认的事件对象
      log("导出操作!")
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
		clear(){
			document.getElementById("text").value=""
		},
		clear2(){
			document.getElementById("text2").value=""
		},
		clear3(){
			document.getElementById("text3").value=""
		},
  },

}
</script>

<template lang="pug">
.index.clearfix
	PreviewArticle(:item="detailData"   v-if="previewArticleDialog"  @cancle="previewArticleDialog = false" )
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/digitalProductLibrary/pushArticle")
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="文章名" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="作者" name="author" clearable v-model="searchQuery.author")
							span.group-inline
								el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control( name="status" style="width:110px")
									option(value="") 审核状态
									option(:value="index" v-for="vo,index in status") {{vo}}
							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="goEditor()") 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="audits()" plain ) 审核
									el-button(size="mini" type="primary" @click="urgentCheck"  plain ) 加急审核
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 文章名
									th 作者
									th 标签
									th.time 创建时间
									th(width=70) 审核状态
									th(width=70) 发布状态
									th 发布时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" ref="ids" name="ids")
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name(:title="item.author") {{item.author}}
									th
										.th-name(:title="item.tag") {{item.tag}}
									th
										.th-name {{item.create_time}}
									th
										.th-name(:class="getColor(item.status)")  {{item.status=="审核未通过"?"未通过":item.status}}
									th
										.th-name {{item.release_status_name }}
									th
										.th-name {{item.release_time||'-'}}
									th
										.btns
											Icon(size="mini" title="详情"  type="icon-detail"  plain   @click="goEditor(item.id)" )
											Icon(size="mini"  title="扩展属性"  type="icon-data"  @click="opneDetailDialog('data',  item)" plain )
											Icon(size="mini" title="审核"  @click="audits(item.id)" v-if="item.audits_status != 1"  type="icon-menu-publish"  plain  )
											Icon(size="mini" title="分发"  @click="opnePublishDialog(item)"  v-if="item.audits_status == '3'"  type="icon-fenfa"  plain)
											Icon(size="mini" title="删除"  type="icon-delete" v-if="item.audits_status != 1" @click="delChoosen(item.id)" plain)
						.pageWrap(v-if="page")
							el-pagination( :small="false" background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page.num"
							:page-sizes="[10, 50, 100]"
							:page-size="page.offset"
							layout="total,sizes ,prev, pager, next, jumper"
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
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			:lock-scroll = "true"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				el-tabs(value="detail")
					el-tab-pane(label="扩展属性" name="detail")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail( :type="detailDialoaType"  @detailBack="detailBack"
					v-if="detailDialog"   :currGroup="currGroup"
					:detailId="detailData.id || {}"    )
		//- 发布

		Dispense(
			:publishDialog.sync="publishDialog"
			:item="detailData"
			v-if="publishDialog"
			@dispenseOk="dispenseOk"
		)

		//- 链接
		el-dialog(
			:center="false"
			:visible.sync="imgLinkDialog"
			:close-on-click-modal="false"
			width="800px"
			)
			.content(slot="title" v-if="detailData")
				.imgWrap
					img(  :src="detailData.id", alt="alt")
				.btns
					el-button 下载图片
					el-button( @click="copyLink('copy'+detailData.id)" ) 复制链接
					input.zhide( :id="'copy'+detailData.id" :value="detailData.id"  )
			span.dialog-footer( slot="footer" class="")
				el-button( @click="imgLinkDialog = false" ) 返回
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
.icon-menu-publish
  color #44c3aa
.group-inline
  margin 0 10px
  display inline-block
.form-control
  width 200px
  // line-height: 38px;
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
.clear3
	position absolute
	top 95px
	left 850px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
</style>
