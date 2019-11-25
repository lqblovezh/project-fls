<script>
import GroupList from 'projects/x-read-mgr/components/common/GroupList'
import MoveGroup from 'projects/x-read-mgr/components/wms/1-product/moveGroup'
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-library/article'
import Detail from 'projects/common/readOnlyDetail'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Detail,
    GroupList,
    MoveGroup,
  },
  mixins: [main],
  data() {
    return {
		fullscreenLoading: false, //loading
		services,
		detailVisible: false, // 详情框
		detailDialoaType: 'info', //详情tabs类型
		detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
		pustSetDialog: false, // 上架dialog
		currentPut: null, // 上架信息
		moveToOtherDiaolog: false, // 移动分组dialog
		moveIds: null, // 需要移动的id
		toId: null, //移动到那一组
		detailType: null,
		caseType: true,
		columnList: [],
    }
  },
  methods: {
    setList(data) {
      this.setArtList(data)
    }, //设置列表
    setGroupList(data) {
      this.setArtGroupList(data)
    }, //设置分组
    setPage(data) {
      this.setArtListPage(data)
    }, //设置页码
    shelfClass(data) {
      console.log({ ...data, id: this.currentShelf.id })
      services
        .putSave({
          category_ids: [data.class_id],
          id: this.currentShelf.product_id,
          book_price: data.book_price,
        })
        .then(res => {
          this.$message.success('成功')
          this.upShelfDiaolog = false
          this.getList()
        })
    },
    pustSetSave() {
      this.services
        .putSave({
          id: this.currentPut.id,
          price: this.currentPut.books_price,
        })
        .then(res => {
          this.pustSetDialog = false
          this.getList()
        })
	}, //上架设置
	exported(){
		const loading = this.$loading({
          lock: true,
          text: '请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
		})
		this.services.exported().then(res=>{
			if(res.status){
				if(res.data.path==''){
					setTimeout(()=>{
						this.exported()
					},3000)
				}else{
					loading.close()
					window.location=res.data.path
					this.$message.success('成功')
				}
			}else{
				loading.close()
				this.$message.error(res.message)
			}
		}, err => {
			loading.close()
		});
		
	},
    ...mapMutations(['setArtList', 'setArtListPage', 'setArtGroupList']),
  },
  computed: {
    ...mapState({
      list: state => state.article.list,
      page: state => state.article.page,
      groupList: state => state.article.groupList,
    }),
  },
}
</script>


<template lang="pug">
.index.clearfix
	.dialogs
		MoveGroup( v-if="moveToOtherDiaolog"
			@back="moveToOtherDiaolog=false"
			@submit="moveToSubmit"
			:currGroup="currGroup" :groupList="groupList" )
		Grounding(
			v-if="upShelfDiaolog"
			@back="upShelfDiaolog=false"
			@upShelf="shelfClass"
			:optionsType="true"
			:currentShelf="currentShelf"
			:columnList="columnList"
			type="column"
		)
		//- 详情
		Detail(
			:type="detailDialoaType"
			:detailVisible.sync="detailVisible"
			:defaultData="detailData"
			:detailType="detailType"
			detailValue="info"
			v-if="detailVisible"
		)
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control.width-small( placeholder="标签" name="status")
									option(value="") 选择状态
									option(value="1") 已上架
									option(value="0") 未上架
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary"  @click="exported" plain ) 导出
									el-button(size="mini" type="primary" @click="moveToOther" plain ) 移动分组
									//- el-button(size="mini" type="primary" @click="showUpShelf()" plain) 上架
									el-button(size="mini" type="primary" @click="downShelf()"  plain ) 下架
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th(width=150) 类型
									th 创建时间
									th 上架状态
									th(width=70) 使用版本
									th(width=100) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
									th
										img.cover-photo(:src="item.books_info.img_src")
										.th-name.bookName(:title="item.books_info.name")  {{item.books_info.name}}
									th
										.th-name(:title="item.books_info.components.type_name") {{item.books_info.components.type_name}}
									th
										.th-name {{item.books_info.create_time}}
									th
										.th-name {{item.status_name}}
									th 
										.th-name(v-if="item.status!='0'") {{item.version_id}}
										.th-name(v-if="item.status=='0'")
											select(@change="versionChage($event,item)")
												option(v-for="items,key in item.version_list" :value="items" :selected="item.version_id==key") {{key}}
									th
										.btns
											//- Icon(type="icon-wms_msgComment" @click="putSet(item)" title="修改价格")
											Icon(type="icon-reject" v-if="item.status!='0'" title="下架" @click="downShelf(item.id)")
											Icon(type="icon-upload" v-if="item.set=='1'&&item.status!='1'" title="上架" @click="upShelf(item.id)")
											Icon(type="el-icon-setting" title="设置" @click="showUpShelf(item,'column')")
											Icon(type="icon-detail" title="详情" @click="opneDetailDialog(11, item.id)")
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[10, 50, 100]"
								:page-size="page.offset"
								layout="total, sizes,prev, pager, next, jumper"
								:total="page.total"
							)
					//- 分组
					.gruopList()
						GroupList(
							:groupList="groupList"
							:currGroup="currGroup"
							@addGroup="addGroup"
							@updateGroup="updateGroup"
							@delGroup="delGroup"
							@groupChange="groupChange"
						)
						//- 上架设置
						el-dialog(
							title="价格设置"
							:visible.sync="pustSetDialog"
							v-if="pustSetDialog"
							width="300px"
						)
							.formWrap
								VaForm(ref="pustSetForm")
									form#pustSetForm
										input.form-control.info(v-va="{ type:'required' }" v-model="currentPut.books_price")
							span.dialog-footer( slot="footer" class="")
								el-button(size="small" type="info" @click="pustSetDialog = false" ) 取消
								el-button(size="small" type="primary" @click="pustSetSave") 确定
</template>


<style lang="stylus" scoped>
#pustSetForm
  span
    display inline-block
    input
      max-width 100%
    &.left
      width 40%
    &.right
      text-align left
      width 50%
.form-control
  width 170px
.width-small
  width 100px
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
</style>
