<script>
import Menu from "@/components/common/Menu";
import Top from "@/components/common/Top";
import GroupList from "@/components/common/GroupList";
import Detail from "../../1-contentLibrary/database/detail";
import VideoDetail from "../../3-digitalProductLibrary/theme/detail";
import AddResource from "./addResource";
import { main } from "@/util/mixins";
import * as services from "services/x-publish/articles";
import { detailResource } from "services/x-publish/database";
import Dispense from "@/components/common/Dispense";

export default {
  components: {
    Menu,
    Top,
    GroupList,
    Dispense,
    Detail,
    VideoDetail,
    AddResource
  },
  mixins: [main],
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      groupList: null, // 组列表
      detailDialog: false, // 详情框
      VideodetailDialog: false, //新增音频模态框
      detailDialogType: "info", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      addDialog: false, //文章产品新建
      options: [
        {
          name: "权威实务集刊",
          value: "0"
        },
        {
          name: "地方实务集刊",
          value: "1"
        }
      ],
      detailType: null,
      resourceDate: null
    };
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
          group_id: this.currGroup,
          ...query
        })
        .then(res => {
          this.list = res.data;
          this.page = res.page;
        });
    },
    // 详情
    // opneDetailDialog(type, item) {
    //   this.detailType = item.type
    //   this.detailData = item
    // 	this.detailDialogType = type
    // 	this.resourceDate = null
    //   this.detailDialog = true
    // },
    // 新建
    openDetailDialogAdd() {
      this.addDialog = true;
    },
    saveok(data) {
      this.getList();
      this.getGroupList();
    },
    //加急审核
    urgentDigital() {
      var ids = this.$getChecked();
      for (var i = 0, len = ids.length; i < len; i++) {
        for (var j = 0, jlen = this.list.length; j < jlen; j++) {
          if (this.list[j].id == ids[i]) {
            //当前选项
            if (this.list[j].audits_status != 1) {
              this.$message.error("只能勾选待审核数据");
              return;
            }
          }
        }
      }
      if (ids) {
        this.services
          .urgentDigital({
            id: ids
          })
          .then(res => this.$message.success("已提交加急审核"));
      }
    },
    //打开发布
    opnePublishDialog(item) {
      this.detailData = item;
      this.publishDialog = true;
    },
    addVideos(type) {
      this.detailData = {};
      this.detailType = type;
			this.VideodetailDialog = true;
			this.addDialog = false;
    },
    slecet(data, type) {
      detailResource({ id: data[0].id }).then(res => {
        this.addDialog = false;
        this.detailType = type;
        this.detailData = {};
        this.detailDialog = true;
        this.resourceDate = res.data;
      });
      console.log(data, type);
    },
    async SendVideo(data,previewImgUrl) {
			console.log(data)
			let resource = data.constitute.map(element => {
				return {
					res_id:element.id,
					type:element.type==5?'video':'audio'
				}
			})
      await this.services.save({
				...data,
				标题:data.标题||'',
				专辑演播者:data.专辑演播者||'',
				专辑责任者:data.专辑责任者||'',
				专辑简介:data.专辑简介||'',
				专业类别:data.专业类别||'',
				专业类别编号:data.专业类别编号||'',
				内容原作者:data.内容原作者||'',
				出版时间:data.出版时间||'',
				关联资源:data.关联资源||'',
				节目数:data.节目数||'',
				品类维度:data.品类维度||'',
				品类维度编号:data.品类维度编号||'',
				节目内容来源:data.节目内容来源||'',
				价格:data.价格||'',
				type:8,
				封面:previewImgUrl||'',
				resource
			})
			this.getList()
		},
		openDialogOwn(item){
			console.log(item)
			if(item.type==8){
			this.readOnly = item && item.audits_status == 1 ? true : false
      this.detailData = item || {}
      this.detailDialoaType = 'info'
      this.resourceDate = null
      this.detailType = item && item.info
				this.VideodetailDialog = true
			}else{
				this.opneDetailDialog('info' , item)
			}
		}
  }
};
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
								el-select(placeholder="类别" v-model="options.value")
									el-option(v-for="item in options"
									:key="item.value"
									:label="item.name"
									:value="item.value")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control( name="audits_status" style="width:110px")
									option(value="") 审核状态
									option(value="0") 未审核
									option(value="1") 待审核
									option(value="2") 未通过
									option(value="3") 已通过	
							span.group-inline
								el-button( type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button( type="primary" icon="el-icon-plus" @click="openDetailDialogAdd") 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="urgentDigital" plain ) 加急审核
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 名称
									th 类别
									th(width=70) 审核状态
									th(width=70) 发布状态
									th.time 分发时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									td
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									td
										img.cover-photo(:src="item.img_src")
										.bookName(:title="item.name") {{item.name}}
									td
										.th-name(:title="item.tag") {{item.type_name}}
									td
										.th-name() {{item.status}}
									td
										.th-name() {{item.release_status_name}}
									td
										.th-name {{item.release_time || '_'}}
									td
										.btns
											Icon(size="mini" title="详情"  @click="openDialogOwn(item)" type="icon-detail"  plain)
											Icon(size="mini" title="审核"  @click="audits(item.id)" v-if="item.audits_status != 1"  type="icon-menu-publish"  plain  )
											Icon(size="mini" title="分发"  @click="opnePublishDialog(item)"  v-if="item.audits_status == 3"  type="icon-fenfa"  plain)
											Icon(size="mini" title="删除"  @click="delChoosen(item.id)" v-if="item.audits_status != 1" type="icon-delete"  plain)
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
				Detail(
					@detailBack="detailBack"
					:type="detailDialogType"
					v-if="detailDialog"
					:detailDialog.sync="detailDialog"
					:detailData="detailData"
					:detailType="detailType"
					:services="services"
					:defaultData="resourceDate"
					:readOnly="readOnly"
				)
		el-dialog(
			:center="false"
			:visible.sync="VideodetailDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			)
			.content(slot="title")
				VideoDetail(
					type="info"
					:isNewVideo='true'
					v-if="VideodetailDialog"
					:detailDialog.sync="VideodetailDialog"
					:detailData="detailData"
					:readOnly="readOnly"
					@addVideo="SendVideo"
					@upList="getList"
				)
		//- 新建
		el-dialog(
			:center="false"
			:visible.sync="addDialog"
			:close-on-click-modal="false"
			top="50px"
			width="700px"
			)
			AddResource(@slecet="slecet" @addVideos="addVideos")
		Examine(:examineDialog.sync="examineDialog" @saveExamine="saveExamine")
		//- 分发
		Dispense(
			:publishDialog.sync="publishDialog"
			:item="detailData"
			v-if="publishDialog"
			:is_release="false"
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


<style lang="stylus" scoped >
.icon-menu-publish {
	color: #44c3aa;
}

.group-inline {
	margin: 0 10px;
	display: inline-block;
}

.form-control {
	width: 200px;
}

.cover-photo {
	max-width: 47px;
	max-height: 59px;
	vertical-align: middle;
}

.th-name {
	cursor: default;
}

.bookName {
	width: calc(100% - 70px);
	display: inline-block;
	padding-left: 5px;
	vertical-align: middle;
}
</style>
