<script>
import formSerialize from 'form-serialize'
import * as services from "services/x-publish/mixProduct"
import * as digitalServices from "services/x-publish/digitalbooks"
import ContentDetail from './contentDetail'
import {
  _themeDetail
} from 'services/x-publish/theme'
import Knowledge from '../theme/knowledge'
import Book from './book'
import EBook from './eBook'
import Group from './group'
import Tab from './tab'
import Audio from './audio'

export default {
  props: ['detailData', "readOnly", "defaultData"],
  components: {
    Tab,
    Book,
    Group,
    ContentDetail,
    EBook,
    Audio,
    Knowledge
  },
  data() {
    return {
      type: 'book',
      soucesType: '1',
      audioInfo: {},
      detailAddDialog: false, // 添加资源模态框
      bookDialog: false, // 纸质书模态框
      groupDialog: false, // 听读组模态框
      infoDialog: false, // 资源详情模态框
      currentItem: {}, // 当前资源信息
      curSoucesList: {}, // 当前资源列表
      dataList: [], //图书所有列表
      page: null, //分页数据
      infoData: {}, // 资源详情信息
      mediaType: null,
      optional: [], //纸质书类型可选项
      singleElection: true, //单选
      defaultBList: null, //默认纸质书
      defaultEList: null, //默认电子书
      defaultAList: null, //默认听读
      defaultVList: null, //默认视频
      defaultRList: null, //默认资源
    };
  },
  created() {
    if (this.detailData && this.detailData.id) {
      this.check()
    }
    if (this.defaultData) {
      this.defaultBList = this.defaultData.structure.book
      this.defaultEList = this.defaultData.structure.ebooks[0]
      this.defaultAList = this.defaultData.structure.audios
      this.defaultVList = this.defaultData.structure.videos
      this.defaultRList = this.defaultData.structure.resources
    }
    // this.getAudio()
  },
  computed: {
    isShowBtn() {
      return this.optional.length > 0
    }
  },
  methods: {
    handleClick(tab) {
      this.type = tab.name
    },
    check() { // 获取纸书选中状态
      if (!this.detailData) return
      services.check({
        id: this.detailData.id
      }).then(res => {
        this.optional = res.data
      })
    },
    getAudio() { // 获取听读组信息
      services.groupList({
        id: this.detailData.id,
        type: '1'
      }).then(res => {
        this.audioList = res.data
      })
    },
    detail(item, type) {
      if (this.type == 'book') {
        this.addBook(item)
        return
      } else if (this.type == 'audio' && typeof(type) == 'object') {
        this.addVideo(item)
        return
      }
      this.bookDetailInfo(item, item.type)
    },
    del(item, type) { //删除功能
      services.del({ ...item,
        type: this.type
      }).then(res => {
        this.getList()
      })
    },
    bookDetailInfo(item, type, Ptype) { //详情内的详情
      const {
        id,
        c_id,
      } = item
      _themeDetail({
        c_id,
        id,
        type,
      }).then(res => {
        this.infoData = res.data
        this.infoDialog = true
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    getList() {
      this.$refs[this.type].getList(this.type)
      this.check()
    },
    query() { //条件查询
      let query = formSerialize(document.querySelector("#detailSearchForm"), {
        hash: true
      })
      this.getAddList(1, this.page.offset, query)
    },
    async openResources(type) { //选择资源弹出层
      this.singleElection = true
      this.soucesType = type
      this.dataList = []
      this.page = null
      if (this.type == 'audio') {
        this.curSoucesList = this.$refs.group.list
      } else if (this.type == 'e-book') {
        this.singleElection = false
        this.curSoucesList = []
      } else {
        this.curSoucesList = this.$refs[this.type].list
      }
      await this.getAddList()
      this.detailAddDialog = true
    },
    getAddList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, query) {
      let type = this.soucesType
      let resource = this.$refs.resource.type
      if (type == 14) {
        switch (resource) {
          case "1":
            type = '3'
            break;
          case "2":
            type = '5'
            break;
          case "3":
            type = '4'
            break;
          default:
            type = '3'
            break;
        }
      }
      digitalServices._addBooks({
        pageNum,
        pageOffset,
        type,
        ...query
      }).then(res => {
        this.dataList = res.data
        this.page = res.page
      })
    },
    async addBook(item) { //添加纸质书
      await this.check()
      this.currentItem = item || {}
      this.bookDialog = true
    },
    addVideo(item) { //新增组
      if (this.detailData && !this.detailData.id) {
        return this.$message.error('请保存产品信息后再做添加')
      }
      if (!item) {
        this.curSoucesList = []
      }
      this.currentItem = item || {}
      this.groupDialog = true
    },
    saveOk() {
      this.bookDialog = false
      this.getList()
    },
    handleSizeChange(val) { //处理size变化
      let query = formSerialize(document.querySelector("#detailSearchForm"), {
        hash: true
      })
      this.getAddList(1, val, query)
    },
    handleCurrentChange(val) { //处理页码变化
      let query = formSerialize(document.querySelector("#detailSearchForm"), {
        hash: true
      })
      this.getAddList(val, this.page.offset, query)
    },
    isChecked(id) { //选中状态
      if (this.curSoucesList.findIndex(item => item.id === id) > -1) {
        return true
      }
      return false
    },
    checkAll(e, name) { //全选
      const parent = document.querySelector('.' + name)
      parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
        item.checked = e.target.checked
      })
    },
    async addSelection() { //添加选中
      if (!this.detailData.id) {
        return this.$message.error('请保存产品信息后再做添加')
      }
      const page = document.querySelector(".addBookForm")
      const list = page.querySelectorAll('input[name="ids"]:checked')
      if (!list.length) {
        return this.$message.warning('请选择添加内容')
      }
      for (let item of list) {
        let index = this.curSoucesList.findIndex(items => {
          return items.id == item.value
        })
        if (index > -1) {
          continue
        }
        this.curSoucesList.push({
          ...this.dataList.find(items => items.id == item.value),
          action: 'add'
        })
      }
      if (this.type == 'audio') { // 音频添加
        this.$refs.group.update(this.curSoucesList)
        this.detailAddDialog = false
        return
      }
      if (this.type == 'e-book') { // 电子书添加
        await this.$refs.ebook.getRelation(this.curSoucesList)
        this.detailAddDialog = false
        return
      }
      services.add({ // 视读和资源添加
        type: this.type,
        product_id: this.detailData.id,
        constitute: this.curSoucesList,
        resource_type: this.$refs.resource.type,
      }).then(res => {
        this.getList()
        this.detailAddDialog = false
      })
    },
    uncheckedAll(e) {
      if (!this.singleElection) {
        this.$refs.ids.forEach(item => item.checked = false)
        e.target.checked = true
      }
    },
    saveAudioOK() { //保存
      // this.getAudio()
      this.$refs.audio.getAudio()
    },
		clear(){
			document.getElementById("text").value=""
		},
		clear2(){
			document.getElementById("text2").value=""
		},
  },
  watch: {
    detailData() {
      this.check()
    }
  }
};
</script>

<template lang="pug">
.div
	ContentDetail(
		:infoData="infoData"
		:infoDialog.sync="infoDialog"
		:mediaType="mediaType"
		v-if="infoDialog"
	)
	Group(
		:item='currentItem'
		:detailData="detailData"
		:groupDialog.sync="groupDialog"
		v-if="groupDialog"
		ref="group"
		:onlyShow="readOnly"
		@open="openResources"
		@detail="detail"
		@del="del"
		@save="saveAudioOK"
	)
	//- 纸质书弹框
	Book(
		:item='currentItem'
		:detailData="detailData"
		:optional="optional"
		:bookDialog.sync="bookDialog"
		v-if="bookDialog"
		:readOnly="readOnly"
		@saveok="saveOk"
	)
	//- 添加资源弹框
	el-dialog.restBody2(
		:center="false"
		:visible.sync="detailAddDialog"
		width="1200px"
		top="50px"
		append-to-body
		)
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(label="添加" name="detail")
		el-form.addBookForm
			.serachWrap
				form#detailSearchForm
					span.group-inline
						input.form-control( placeholder="输入名称"  name="name" id="text")
						span.clear(@click="clear()") x
					span.group-inline
						input.form-control( placeholder="输入标签" name="tag" id="text2")
						span.clear2(@click="clear2()") x
					span.group-inline
						TimePick(:inputsName="['start_time','end_time']")
					span.group-inline
						el-button(@click="query" type="primary" icon="el-icon-search" plain) 搜索
						el-button(@click="addSelection" type="primary" plain) 添加选中
			table.table(width="100%")
				thead
					tr
						th(width=80)
							input(v-if="singleElection" type="checkbox" @click="checkAll($event,'addBookForm')")
							span(v-text="singleElection?'全选':'选择'")
						th 名称
						th 标签
						th 类型
						th 创建时间
				tbody(v-if="dataList.length")
					tr(v-for="item,index in dataList")
						td
							input(type="checkbox" :data-type="item.status" @click="uncheckedAll" :value="item.id" ref="ids" :checked="isChecked(item.id)" name="ids")
						td {{item.name}}
						td {{item.tag}}
						td {{item.type_name}}
						td {{item.create_time}}
			.pageWrap(v-if="page")
				el-pagination( :small="false" background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.num"
					:page-sizes="[10, 50, 100]"
					:page-size="page.offset"
					layout="total, sizes,prev, pager, next, jumper"
					:total="page.total"
				)
		div(slot="footer" class="dialog-footer")
			el-button(type="info"  @click="detailAddDialog = false") 取消
			el-button(type="primary"  @click="addSelection") 确定

	//- tabs
	el-tabs.release-tab(type="border-card" :value="type" @tab-click="handleClick")
		el-tab-pane( label="纸质书籍" name="book")
			Tab(dataType="book" :defaultList="defaultBList" :detailData="detailData" :isLabelHide="true" @detail='detail' @del='del' ref="book" :onlyShow="readOnly")
			el-button(v-if="isShowBtn&&!readOnly" type="primary" @click="addBook()" size="small") 新增
		el-tab-pane( label="电子书" name="e-book" )
			EBook(@open="openResources" :defaultData="defaultEList" :detailData="detailData" ref="ebook" :readOnly="readOnly")
		el-tab-pane( label="听读" name="audio" )
			Audio(:detailData="detailData" :defaultData="defaultAList" @detail='detail' @del='del' ref="audio" :readOnly="readOnly")
			el-button(type="primary" @click="addVideo()" size="small" v-if="!readOnly") 新增组
		el-tab-pane( label="视读" name="video" )
			Tab(dataType="video" :defaultList="defaultVList" :detailData="detailData" @detail='detail' @del='del' ref="video" :onlyShow="readOnly")
			el-button(type="primary" @click="openResources('5')" size="small" v-if="!readOnly") 新增
		el-tab-pane( label="资源" name="resource" )
			Tab(dataType="resource" :defaultList="defaultRList" :detailData="detailData" @detail='detail' @del='del' :onlyShow="readOnly" :isShow="true" ref="resource")
			el-button(type="primary" @click="openResources('14')" size="small" v-if="!readOnly") 新增
</template>


<style lang="stylus" scoped>
  body .table th,
  body .table td
    padding 0
	.clear
		position absolute
		top 130px
		left 155px
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
		top 130px
		left 320px
		color #d9d9d9
		border-radius 50%
		background #efefef
		width 20px
		height 20px
		line-height 20px
		text-align center
		cursor pointer
</style>
