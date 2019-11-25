<script>
import formSerialize from 'form-serialize'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import Release from '@/components/common/release'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'

import * as services from "services/x-publish/mult_book"
import { main } from '@/util/mixins'

export default {
  mixins: [main],
  components: {
    Menu,
    Top,
    GroupList,
    Detail,
    Release
  },
  data() {
    return {
      services,
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
      toId: null, //移动到那一组
    }
  },
  methods: {
    // 主列表公用查询
    getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query = null) {
      services.list({
        pageNum,
        pageOffset,
        group_id: this.currGroup,
        ...query
      }).then(res => {
        log('list', res)
        this.list = res.data
        this.page = res.page
      })
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
    //打开发布
    opnePublishDialog(item) {
      log(item)
      if (item.status === 1) {
        location.href = item.path_src
      } else {
        this.$message.error("导出失败")
      }
    },
    //导出
    exportSomething(e) { //默认的事件对象
      var query = formSerialize(document.querySelector("#mainForm"), {
        hash: true
      })
      var ids = this.getChecked2();
      if (ids) {
        query.id = ids
      }
      this.services.educe(query).then(res => {
        location.href = res.data.url
      }).catch(res => {
        this.$message.error("导出失败!")
      })
    },
    //删除选中
    delChoosens(id) {
      var ids = []
      log(id)
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
          }).then(res => {
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
		}
  },

}
</script>

<template lang="pug">
.index.clearfix
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/digitalProductLibrary/polymorph")
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="书名" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								el-input(placeholder="作者" name="author" clearable v-model="searchQuery.author")
							span.group-inline
								el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
							span.group-inline
								select.form-control( name="type")
									option(value="") 选择形态
									option(value="epub") epub
									option(value="mobi") mobi
									option(value="pdf") pdf
									option(value="word") word
									option(value="html") html
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")

							span.group-inline
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
									el-button(size="mini" type="primary"  @click="exportSomething" plain) 导出
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.allBtn
										input(type="checkbox" @click="checkAll($event)")
									th 书名
									th 作者
									th 标签
									th 形态
									th.time 创建时间
									th.operate 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids"  ref="ids")
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name(:title="item.author") {{item.author}}
									th
										.th-name(:title="item.tag") {{item.tag}}
									th
										.th-name(:title="item.type") {{item.type}}
									th
										.th-name {{item.create_time}}
									th
										.btns
											Icon(size="mini" title="详情"  @click="opneDetailDialog('info' , item)" type="icon-detail"  plain  )
											Icon(size="mini" title="导出"   @click="opnePublishDialog(item)" type="el-icon-download"  plain   )
											Icon(size="mini" title="删除"    @click="delChoosen(item.id)"  type="icon-delete"  plain  )
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
			width="1000px"
			)
			.content(slot="title")
				//- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
				Detail( @detailBack="detailBack" :type="detailDialoaType" v-if="detailDialog"  :detailDialog.sync="detailDialog"   :detailData="detailData"    )

		//- 发布
		el-dialog(
			:center="false"
			:visible.sync="publishDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			title="发布"
			)
			Release( @cancle=" publishDialog = false " )
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
.group-inline
  margin 0 10px
  display inline-block
.form-control
  width 200px
.el-icon-download
  color #44c3aa
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
