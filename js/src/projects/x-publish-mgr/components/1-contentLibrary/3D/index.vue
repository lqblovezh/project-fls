<script>
import formSerialize from 'form-serialize'

import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import UploadAll from '@/components/common/UploadAll'
import Msg from '@/components/common/Msg'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import * as services from "services/x-publish/content"
import {
  main
} from '@/util/mixins'


export default {
  mixins: [main],
  components: {
    Menu,
    Top,
    GroupList,
    Detail,
    UploadAll,
    Msg
  },
  beforeCreate() {},
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      msg: '',
      groupList: null, // 组列表
      uploadDialog: false, // 文件上传框
      msgDialog: false, // 消息提示框
      detailDialog: false, // 详情框
      detailDialoaType: "xq", //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      timePick: null, // 日期查询
      imgLinkDialog: false, //链接dialog
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      detailImgDialog: false,
      detailSrc: null, // 图片放大预览src

    }
  },
  methods: {
    // 主列表公用查询
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 12, query = null) {
      // log({ pageNum , size , group_id: this.currGroup , ...query})
      services.listContent({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        log(33, res)
        this.list = res.data
        this.page = res.page
      })
    },




    // 详情
    opneDetailDialog(type, item) {
      this.detailDialog = true;
      this.detailData = item
      this.detailDialoaType = type;
    },
    // 详情新增 , 重置详情
    opneDetailDialogAdd(type) {
      this.detailDialog = true;
      this.detailDialoaType = type;
      this.detailData = null;
      this.metadata = null;
    },

    showMsgDialog(msg) {
      // this.msgDialog = true
      console.log(msg)
      // this.msg = msg
    },
    hideMsgDialog() {
      this.uploadDialog = false
    },

    //打开发布
    opnePublishDialog(item) {
      this.detailData = item;
      this.publishDialog = true;
    },

    async del(data) {
      return this.services.deleteContent(data);
    },
    openDetailImgDialog(item) { //图片放大预览
      this.detailSrc = item;
      this.detailImgDialog = true;
    },
    clear() {
      document.getElementById("text").value = ""
    },
    clear2() {
      document.getElementById("text2").value = ""
    },
  },

}
</script>

<template lang="pug">
.index.clearfix
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/contentLibrary/3D")
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap( @keyup.enter="query()" )
						.title
						form#mainForm
							include ../../common/pug/videoSearch.pug
					.tableWrap
						.div(v-if="list")
							.tableTop
								.title.vel-line
									span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
									input(type="checkbox" @click="checkAll($event)")
									.btns
										el-button(size="mini" type="primary"  @click="moveToOther"  plain) 移动分组
										el-button(size="mini" type="primary"  @click="importSomething" plain) 导入
										el-button(size="mini" type="primary"  @click="exportSomething" plain) 导出
										el-button(size="mini" type="primary"  @click="exportSomething2" plain) 全部导出
										el-button(size="mini" type="primary" @click="delChoosen(false)"  plain) 删除
							.mediaList
								ul
									li.itemWrap(v-for="item in list")
										.imgWrap
											.name
												span
													input(type="checkbox" :value="item.id" name="ids"  )
												span(v-text="item.name" :title="item.name")
											.imgcontent(@click="openDetailImgDialog(item)")
												img(  :src="item.img_src")
												.cover
													.tag
														.div 标签:
														.name {{item.tag}}
													.time {{item.create_time}}
										.btns
											include ../../common/pug/videoBtns.pug
							.pageWrap
								el-pagination( :small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[12,48,96]"
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
	.myDialogWrap(v-if="detailImgDialog")
		.content
			span.imgWrap
				video( :src="detailSrc.preview"  :poster="detailSrc.img" controls)
				span.closeBtn(@click="detailImgDialog = false")
	.dialogs
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			:lock-scroll = "true"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail( :type="detailDialoaType"  @detailBack="detailBack"
					v-if="detailDialog"   :currGroup="currGroup"
					:detailDialog.sync="detailDialog"
					:detailData="detailData || {}"   )
		el-dialog(
			:center="false"
			:visible.sync="uploadDialog"
			:close-on-click-modal="false"
			top="100px"
			)
			.content(slot="title")
				UploadAll(
					ref="upload"
					@upload="importFiles"
				)
		el-dialog(
			:center="false"
			:visible.sync="msgDialog"
			:close-on-click-modal="false"
			top="100px"
			width="500px"
			)
			.content(slot="title")
				Msg(@showMsg="showMsgDialog" :msg="msg")
		//- 发布
		el-dialog(
			:center="false"
			:visible.sync="publishDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			span 发布内容
			span.dialog-footer( slot="footer" class="")
				el-button( @click="publishDialog = false" ) 返回
		//- 链接
		LinkDialog(v-if="imgLinkDialog"  :imgLinkDialog="imgLinkDialog"
			@back="imgLinkDialog= false"   :imgSrc="linkDialogObj.img_src" :link="linkDialogObj.link" )

		//- 移动分组
		el-dialog(
			:center="false"
			:visible.sync="moveToOtherDiaolog"
			:close-on-click-modal="false"
			title="移动分组"
			width="500px"
			)
			span(v-text=""  )
			.group
				.label 移动到
				select.form-control(  ref="moveToId"   placeholder="请选择")
					option( v-for="(item,index) in groupList" v-if="item.id != currGroup && item.id!=''"
						v-text="item.name "  :value="item.id")
			span.dialog-footer( slot="footer" class="")
				el-button( @click="moveToOtherDiaolog = false" type="info" ) 返回
				el-button( @click="moveToSubmit" type="primary"  )  确定
</template>


<style lang="stylus" scoped >
.group-inline
  margin 0 10px
  display inline-block
.form-control
  width 200px
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
