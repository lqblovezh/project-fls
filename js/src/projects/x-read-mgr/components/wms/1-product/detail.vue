<script>
import Knowledge from './knowledge'
import * as nowledgServices from 'services/x-publish/nowledges'
import Info from './info'
import Group from 'projects/x-publish-mgr/components/3-digitalProductLibrary/release/group'

export default {
	components:{Knowledge,Info,Group},
	props: {
		type: String,
		detailData:Object,
		isTheme:{
			type: Boolean,
			default: false,
		},
		services:Object,
		typeDetail:{
			type:String,
			default:"图书"
		},
		isCourse:{
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			list: null,
			gList: null,
			currGroup: null,
			currType: '1',
			currIndex: 'books',
			detailDataOwn: null,
			isKnowledge: false,
			infoDialog: false,//详情模态框
			infoData: {},//详情数据
			infoValue: 'xq',
			bookInfo:{},
			groupDialog:false,//组信息
		};
	},
	created () {
		this.bookInfo = this.detailData.books_info
		if(this.bookInfo.knowledge&&this.bookInfo.knowledge.length){
			this.isKnowledge = true
			let knowledge = this.bookInfo.knowledge
			this.gList = knowledge
			this.currGroup = knowledge[0]
			this.list = knowledge[0]?knowledge[0].nowledge_info:''
		}
		if(this.isTheme){
			this.detailDataOwn = this.bookInfo.components
		}else{
			if(this.typeDetail=='视读'||this.typeDetail=='课件'){
				this.currIndex ="videos"
			}else if(this.typeDetail=='听读'){
				this.currIndex ="audios"
			}
			this.detailDataOwn = this.bookInfo.components[this.currIndex]
			log(this.detailDataOwn)
		}
	},
	methods: {
		handleClick(tab, event) {},
		submit() {
			this.$emit("back");
		},
		handKnowledgeClick(item) {
			this.list = item.nowledge_info
		},
		change(index,type) {
			//nav切换
			this.currType = type
			this.currIndex = index
			this.detailDataOwn = this.bookInfo.components[this.currIndex]
		},
		preview(item, type) {//详情内的预览
			log(1111,item)
			if(typeof(type) == 'object'){
				this.currentItem = item
				this.groupDialog = true
				return
			}
			this.infoValue = 'xq'
			log(this.currType)
			// return
			this.services.preview({
				product_id:this.bookInfo.id,
				resource_id:item.id,
				type:this.currType==2?14:item.type,
			}).then(res => {
				this.infoData = res.data
				this.infoDialog = true
			}).catch( ({payload}) => {
				for(let i in payload.messages){
					this.$message.error(payload.messages[i])
					break
				}
			})
		},
	},
	watch: {
		detailData(data) {
			this.bookInfo = data.books_info
			if(this.bookInfo.knowledge&&this.bookInfo.knowledge.length){
				this.isKnowledge = true
				let knowledge = this.bookInfo.knowledge
				this.gList = knowledge
				this.currGroup = knowledge[0]
				this.list = knowledge[0]?knowledge[0].nowledge_info:''
			}
			if(this.isTheme){
				this.detailDataOwn = data.books_info.components
				return
			}
			this.detailDataOwn = data.books_info.components[this.currIndex]
		}
	}
};
</script>

<template lang="pug">
.div
	//- 详情
	Group(
		:item='currentItem'
		:detailData="detailData"
		:groupDialog.sync="groupDialog"
		:onlyShow="true"
		v-if="groupDialog"
		ref="group"
		@detail="preview"
	)
	el-dialog(
		:visible.sync="infoDialog"
		width="1000px"
		top="50px"
		append-to-body
		)
		.header(slot="title")
			Info(
				v-if="infoDialog"
				:type="infoValue"
				:infoDialog="infoDialog"
				:infoData='infoData'
				:typeDetail="typeDetail"
			)
		div(slot="footer" class="dialog-footer")
				el-button(type="info" @click="infoDialog = false" ) 取消
	.choiceVersion(v-if="detailData.version_list")
		span 版本选择
		select(@change="$emit('change',$event,bookInfo)")
			option(v-for="items,key in detailData.version_list" :value="items" :selected="detailData.version_id==key") {{key}}
		el-button(size="mini" @click="$emit('delete',detailData)" v-if="detailData.status!='1'" type="primary" plain) 删除当前版本
	el-tabs( :value="type" @tab-click="handleClick")
		el-tab-pane( label="详情" name="xq")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm( ref="detailForm"  )
						.group
							.label 名称:
							input.form-control( v-va="{ type:'required' }"  v-model="bookInfo.name"   type="text" disabled)
						.group
							.label 类型:
							input.form-control(v-if='isTheme' v-va="{ type:'required' }"  v-model="bookInfo.theme_type"   type="text" disabled)
							input.form-control(v-if='!isTheme' v-va="{ type:'required' }"  :value="typeDetail"   type="text" disabled)
						.group
							.label 作者:
							input.form-control(    v-model="bookInfo.author"    type="text" disabled)
						.group
							.label 标签:
							input.form-control( v-model="bookInfo.tag"   type="text"  disabled)
						.group
							.label 简介:
							textarea.textarea(  v-model="bookInfo.abs"   type="text"  disabled)
						.group.detailmain
							.label 封面
							span.wrap
								img.coverImg(:src="bookInfo.img_src||bookInfo.img"   disabled)
						.group.constiuteGroup(v-if="!isTheme")
							.label {{typeDetail}}构成:
							span.constiute
								template(v-if="typeDetail!='视读'&&typeDetail!='听读'&&typeDetail!='课件'")
									span.li(@click="change('books','1')" :class="{isCurrType: currType == '1' }"  ) 阅读
									span.li(@click="change('resources','2')" :class="{isCurrType: currType == '2' }") 资源
									//- span.li(@click="change('pictures','3')" :class="{isCurrType: currType == '3' }") 图片
									span.li(@click="change('audios','4')" :class="{isCurrType: currType == '4' }" ) 音频
									span.li(@click="change('videos','5')" :class="{isCurrType: currType == '5' }")  视频
						.group.constiuteGroup(v-if="isTheme")
							.label 主题构成:
						.grouping(v-if="typeDetail=='课件'")
							table.table
								thead
									tr
										th 组名称
										th(width=100) 操作
							el-tree(
								:data="bookInfo.components.videos"
								node-key="id"
								default-expand-all
								:expand-on-click-node="false"
							)
								span(class="custom-tree-node" slot-scope="{ node, data }")
									span {{ data.name }}
									span.options(style="float:right")
										.icon.icon-detail(@click="preview(data, data.children)" title="详情")
						.tableWrap(v-if="detailDataOwn&&typeDetail!='课件'")
							table.table
								thead
									tr
										th 名称
										th 标签
										th 类型
										th 创建时间
										th 操作
								tbody
										tr(v-for="(item,index) in detailDataOwn" )
											td
												.th-name {{item.name}}
											td
												.th-name {{item.tag}}
											td
												.th-name {{item.type_name}}
											td
												.th-name {{item.create_time}}
											td
												.th-name
													el-button(size="mini" @click="preview(item)" type="primary"  plain) 预览
		el-tab-pane( label="元数据" name="data" v-if="")
			.meta
				.group.rowWrap( v-for="(item, index) in bookInfo.attributes" )
					span( v-text="index+1")
					span.left( v-text="item.key")
					span.right( v-text="item.value")
		el-tab-pane( label="知识点" name="know")
			.KnowledgeWrap(v-if="list")
				ul.left
					li(v-for="item in gList" @click="handKnowledgeClick(item)") {{item.name}}
				.right
					p.name(v-text="currGroup.name")
					table.table
						thead
							tr
								th 知识点名称
								th 数量
								th 创建时间
						tbody()
							tr(v-for="item in list")
								th {{item.name}}
								th {{item.num}}
								th {{item.create_time}}


</template>


<style lang="stylus" scoped>
.choiceVersion
	color #303133
	position absolute
	left 50%
	margin-left -55px
	line-height 28px
	top 15px
	z-index 2
	text-align center
	select
		position relative
		top -1px
	button
		margin-left 20px
.grouping
	>>> .custom-tree-node
		width 100%
	>>> .el-tree-node__content
		height 40px
		line-height 40px
	.options
		float right
		width 110px
.rowWrap
	.left
		width 150px
		min-width 150px
	.right
		width 350px
		margin-left 10px
	>span
		no-wrap()
		min-width 100px
		text-align center
		height 35px
		line-height 35px
		display inline-block
.KnowledgeWrap
	border 1px solid #dcdfe6
	overflow hidden
	.left
		float left
		width 30%
		min-height 50px
		padding 0 20px
		box-sizing border-box
		position relative
		left 1px
		border-right 1px solid #dcdfe6
		li
			cursor pointer
			font-size 14px
			color #555
			line-height 50px
			border-bottom 1px dashed #e3e6ec
			&:last-child
				border none
	.right
		float right
		width 70%
		border-left 1px solid #dcdfe6
		box-sizing border-box
		.name
			color #424857
			font-size 15px
			line-height 50px
			padding-left 20px
			text-align left
			border-bottom 1px solid #ddd
		.el-tabs--border-card
			border none
			box-shadow none
			border-top 1px solid #dcdfe6
		.list
			margin-top -15px
			li
				border-bottom 1px solid #dcdfe6
				line-height 40px
				&:last-child
					border none
.constiute .li
	cursor pointer
.isCurrType
	color #44c3aa
</style>
