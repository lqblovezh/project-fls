<script>
import formSerialize from 'form-serialize'
import * as commonServices from "services/x-publish/common"
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import UploadAll from '@/components/common/UploadAll'
import Reader from '@/components/common/Reader'
import Release from '@/components/common/release'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import {main} from '@/util/mixins'
import * as services from "services/x-publish/book"

export default {
  components: {
    Menu,
    Top,
    GroupList,
    Detail,
    Release,
    Reader,
    UploadAll
  },
  mixins: [main],
  data() {
    return {
      services,
      commonServices,
      list: null, //主数据
      readerDialog: false, //阅读器dialog
      readerId: "", //
      page: null,
      groupList: null, // 组列表
      uploadDialog: false,
      detailDialog: false, // 详情框
      detailDialogType: "xq", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      timePick: null, // 日期查询
      imgLinkDialog: false, //链接dialog
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      fabuIds: [], //
    }
  },
  methods: {
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      this.services.listBooks({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        this.list = res.data
        this.page = res.page
      })
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
    // 详情
    opneDetailDialog(type, item) {
      this.detailData = item
      this.detailDialogType = type;
      this.detailDialog = true;
    },
    // 详情新增
    openDetailDialogAdd(type) {
      this.detailDialogType = type;
      this.detailDialog = true;
      this.detailData = null;
      this.metadata = null;
    },
    // 链接
    // opneImgLinkDialog(item){
    //   this.imgLinkDialog = true
    //   commonServices.commonPreviewCode({entity_type:'book',entity:item}).then(res => {
    //     log(res)
    //     this.linkDialogObj.img_src = res.data.qr_url
    //     this.linkDialogObj.link = res.data.preview_url
    //   }).catch(err => {
    //     throw err
    //     // log(err)
    //   })
    // },
    delGroup(id) { // 删除分组
      log("删除分组", id)
      this.services.deleteGroup({
        id
      }).then(res => {
        if (id === this.currGroup) {
          this.$router.push({
            path: this.$route.path,
            query: {
              id: 'non'
            }
          })
        }
        this.getGroupList() // 重新查询分组
      })
    },

    //打开发布
    opnePublishDialog(item) {
      this.detailData = item;
      if (item) { //单个发布
        this.fabuIds.push(item.id)
      } else { //多个发布
        this.fabuIds = this.$getChecked("ids", this);
      }
      if (this.fabuIds && this.fabuIds.length > 0) {
        this.publishDialog = true;
      }
    },
    releaseBack(type) { //发布返回
      this.publishDialog = false;
    },
    openReader(item) { // 打开阅读器
      this.readerId = item.id;
      this.readerDialog = true
    },
    async del(data) {
      return this.services.deleteBooks(data);
    },
    products(id) {
      this.services.products({
        id
      }).then(res => {
        this.$message.success('生成成功!')
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
								el-input(placeholder="书名" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="作者" name="author" clearable v-model="searchQuery.author")
							span.group-inline
								el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="openDetailDialogAdd('xq',true)"  ) 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="opnePublishDialog(false)"  plain ) 发布
									el-button(size="mini" type="primary"  @click="importSomething" plain) 导入
									el-button(size="mini" type="primary"  @click="exportSomething" plain) 导出
									el-button(size="mini" type="primary"  @click="exportSomething2" plain) 全部导出
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 名称
									th 作者
									th 标签
									th.time 创建时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
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
										.btns
											Icon( title="详情"   size="mini"  @click="opneDetailDialog('xq' , item)" type="icon-detail"  plain  )
											Icon( title="预览"   size="mini"  @click="openReader(item)"  type="icon-preview"  plain  )
											Icon( title="链接"   size="mini"  @click="opneImgLinkDialog(item)" type="icon-link"  plain   )
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
		Reader(
			:readerDialog.sync="readerDialog"
			:readerId="readerId"
			version="draft"
			v-if="readerDialog"
		)
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail( @detailBack="detailBack" :type="detailDialogType" v-if="detailDialog"  :detailDialog.sync="detailDialog"   :detailData="detailData"    )
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
		//- 发布
		el-dialog(
			:center="false"
			:visible.sync="publishDialog"
			:close-on-click-modal="false"
			v-if="publishDialog"
			top="50px"
			width="1000px"
			title="发布"
			)
			Release( :ids="fabuIds" @cancle=" publishDialog = false " )
		//- 链接
		LinkDialog(v-if="imgLinkDialog"   :imgLinkDialog="imgLinkDialog"
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
					option( v-for="(item,index) in groupList" v-if="item.id != currGroup && item.id != '' "
						v-text="item.name "  :value="item.id")
			span.dialog-footer( slot="footer" class="")
				el-button( @click="moveToSubmit" type="primary" )  确定
				el-button( @click="moveToOtherDiaolog = false" ) 返回
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
  width calc(100% - 70px)
  display inline-block
  padding-left 5px
  vertical-align middle
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
