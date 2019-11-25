<script>
import formSerialize from 'form-serialize'
import * as commonServices from "services/x-publish/common"
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import UploadAll from '@/components/common/UploadAll'
import Reader from '@/components/common/Reader'
import ReleaseWork from './releaseWork'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'
import {main} from '@/util/mixins'
import * as services from "services/x-publish/recom"

export default {
  components: {
    Menu,
    Top,
		Detail,
    GroupList,
    ReleaseWork,
    Reader,
    UploadAll,
  },
  mixins: [main],
  data() {
    return {
      services,
      list: null, //主数据
      readerDialog: false, //阅读器dialog
      readerId: "", //
      page: null,
			recomId:null,
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
			recomResource:false, //更多重组资源
			type:{
				list:[
					{
						name:"全部",
						value:"0",
					},
					{
						name:"文本",
						value:"1",
					},
					{
						name:"图片",
						value:"2",
					},
				]
			},
			detailType:{
				list:[
					{
						name:"文本",
						value:"0",
					},
					{
						name:"图片",
						value:"1",
					}
				]
			},
    }
  },
  methods: {
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      this.services.recomList({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        this.list = res.data
        this.page = res.page
      })
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
		//发布到作品池
		opnePublishDialog(value,type) {
			this.recomId=value.id
			this.publishDialog = true
			this.detailDialogType = type
			// this.detailData = null
			this.metadata=null
		},
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
		saveok(data){
			this.getList()
      this.getGroupList()
		},
    releaseBack(type) { //发布返回
      this.publishDialog = false;
    },
    openReader(item) { // 打开阅读器
      this.readerId = item.id;
      this.readerDialog = true
    },
    async del(data) {
      return this.services.deleteRecom(data);
    },
		//删除选中
		async delChoosen(id){
			let ids = []
			if(!id){
				let nodes = Array.from(document.querySelectorAll('input[name="ids"]:checked'))
				nodes.forEach(item => {
					ids.push(item.value)
				})
				if(!nodes.length ){
					this.$message.error('请先选中!');
					return
				}
			}else {
				ids.push(id)
			}
			if(ids.length > 0){
				this.$confirm("是否删除?").then(res=>{
					let service = this.services.del?this.services.del:this.del
					service({id:ids,confirm:"1"}).then(res=>{
						let query = formSerialize(document.querySelector("#mainForm" ), {hash:true}); // 分页带参数
						let {total,start,num} = this.page // 处理删除最后一页数据返回上页数据
						if((total-ids.length) == start){
							this.page.num = !start?1:num-1
						}
						if (typeof this.getList !== 'undefined') {
							this.getList(this.page.num , this.page.offset , query)
						}
						this.getGroupList();
					})
				}).catch(res=>{
					//取消
				})
			}
		},
		recomVis(){
			this.recomResource=true
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
								el-input(placeholder="请输入名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="请输入标签" name="author" clearable v-model="searchQuery.author")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								el-select(v-if="type" v-model="type.value" name="status" placeholder="类型" clearable)
									el-option(
										v-for="item in type.list"
										:key="item.value"
										:label="item.name"
										:value="item.value"
									)
							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="openDetailDialogAdd('xq',true)"  ) 新建重组
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
									th 名称
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
										.th-name(:title="item.tag") {{item.tag}}
									th
										.th-name {{item.create_time}}
									th
										.btns
											Icon( title="详情"   size="mini"  @click="opneDetailDialog('xq' , item)" type="icon-detail"  plain  )
											Icon( title="发布到作品池" size="mini"  @click="opnePublishDialog(item, 'xq')"  type="icon-upload"  plain  )
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
		//- 详情
		el-dialog(
			:center="false"
			:visible.sync="detailDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				Detail( @detailBack="detailBack" :type="detailDialogType" v-if="detailDialog"  :detailDialog.sync="detailDialog" :detailData="detailData")
		//- 发布
		el-dialog(
			:center="false"
			:visible.sync="publishDialog"
			:close-on-click-modal="false"
			v-if="publishDialog"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				ReleaseWork(
					@detailBack="detailBack"
					:type="detailDialogType"
					v-if="publishDialog"
					:publishDialog.sync="publishDialog"
					:recomId="recomId"
					)
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
