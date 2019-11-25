<script>
import VaForm from '@/components/common/VaForm'
import * as articlesServies from "services/x-publish/articles";
import {
  switchCase
} from 'babel-types'
import {
  getTask
} from 'services/common'
import * as themeServices from 'services/x-publish/theme'
import formSerialize from "form-serialize"
import Knowledge from './knowledge'
import Info from './info'

export default {
  props: ['type', 'detailData', 'detailDialog', 'readOnly','isNewVideo'],
  data() {
    return {
			Knowledge: {}, //知识点
			VideoDetail:{},
      detail: {
        type: '混合主题',
        constitute: [],
      }, //详情
      page: null, //分页数据
      attributes: [], //扩展属性
      previewImgUrl: null, //图片预览
      imgUrl: null, //图片上传后的真实url
      detailAddDialog: false, //添加模态框
      infoDialog: false, //详情模态框
      infoData: {}, //详情数据
      dataList: {}, //图书所有列表
      searchValue: null,
      infoValue: 'info',
      themeType: { //主题类型
        value: '',
        list: ['混合主题', '阅读主题', '视频主题', '音频主题'],
      },
      contentType: [{name: "数字图书",value: 'book'},
        {name: "3D内容",value: '3d'},
        {name: "音频",value: 'audio'},
        {name: "视频",value: 'video'},
        // {name: "图书产品",value: 'product'},
        // {name:"融合发布产品",value:'release'},
        {name: "AR和VR内容",value: 'ar'}
      ], //内容属性
      currentType: 'book',
      isShowAuthor: false,
      chocesArray: [],
    };
  },
  created() {
    if (this.detailData.id) {
      switch (this.type) {
        case 'info':
        case 'data':
          this.getDetail()
        default:
          this.getDetail()
          break
      }
    } else {
      log("进入新建")
    }
  },
  mounted() {
    this.$nextTick(() => {
      Array.from(document.querySelectorAll('input[type=text]')).forEach((item) => {
        item.autocomplete = 'off'
      })
    })
  },
  methods: {
     getDetail() { //获取详情数据
      ;(!this.isNewVideo?themeServices.detailTheme:articlesServies.detailResource)({
        id: this.detailData.id
      }).then(res => {
        this.detail = res.data
        this.previewImgUrl = res.data.img_src||res.data.封面
        this.imgUrl = res.data.path
        this.attributes = res.data.attributes
        this.detail.img = res.data.path
        // this.detail.constitute = res.data.constitute||res.data.resource
        this.$set(this.detail,'constitute',res.data.constitute||res.data.resource)
        this.chocesArray = [...res.data.constitute]
      })
    },
    handleClick(tab, event) { //头部点击处理
      console.log(tab.name);
    },
    addattributes() { //新增扩展属性
      this.attributes.push({
        name: '',
        value: ''
      })
    },
    delattributes(index) { //删除扩展属性
      this.attributes.splice(index, 1)
		},
    async submitDetail() { 
			
			//详情数据提交
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        log("验证失败")
        return
      }
      let fenmian = this.$refs.fenmian.files[0]
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) { //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
          await getTask(fenmian).then((res) => {
            this.detail.封面 = res.data.path
					})
        }
				this.detail.attributes = this.attributes
				if(this.isNewVideo==true){
          this.$emit('addVideo',this.detail,this.detail.封面)
        this.$nextTick(() => { //以服务的方式调用的 Loading 需要异步关闭
          loading.close()
          this.$emit('update:detailDialog', false)
        })
				return
				}
        if (this.detail.id) {
          await themeServices.modifyTheme(this.detail).then(res => {
            this.$emit('updateList')
          })
        } else {
          await themeServices.addTheme(this.detail).then(res => {
            this.$emit('updateList')
          })
        }
        this.$nextTick(() => { //以服务的方式调用的 Loading 需要异步关闭
          loading.close()
          this.$emit('update:detailDialog', false)
        })
      } catch ({
        payload
      }) {
        loading.close()
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
		previewImg(e) { //详情预览图
			console.log(e)
      let node = e.target;
      let file = node.files[0];
      this.previewImgUrl = URL.createObjectURL(file);
    },
    detailTopHandle() { //详情置顶
      log(this.detail.constitute)
      const ids = []
      const parent = document.querySelector('.detailForm')
      // const list = parent.querySelectorAll("[name='ids']:checked")
      list.forEach(item => {
        ids.push(item.value)
      })
      if (!ids.length) {
        return this.$message.error('请确认你要置顶的内容！');
      }
      for (let i = ids.length - 1; i >= 0; i--) {
        let index = this.detail.constitute.findIndex(items => items.id == ids[i])
        let arry = this.detail.constitute[index]
        this.detail.constitute.splice(index, 1)
        this.detail.constitute.unshift(arry)
      }
      parent.querySelectorAll("input[type='checkbox']").forEach((item) => {
        item.checked = false
      })
    },
    detailRemoveHandle(id = [], type) { //详情移除
      const data = {}
      const parent = this.$refs.detailForm.$el
      const list = parent.querySelectorAll("[name='ids']:checked")
      if (!id.length) {
        list.forEach(item => {
          data[item.value] = item.getAttribute('data-type')
          id.push(item.value)
        })
      } else {
        data[id] = type
      }
      if (!id.length) {
        return this.$message.error('请确认你要移除的内容！');
      }
      id.forEach(item => {
        let index = this.detail.constitute.findIndex(items => items.c_id == item || items.id == item)
        let index_choce = this.chocesArray.findIndex(items => items.c_id == item || items.id == item)
        if (index > -1) {
          console.log(this.detail.constitute);
          this.detail.constitute.splice(index, 1)
        }
        if(index_choce>-1) {
          this.chocesArray.splice(index, 1)
        }
      })
      parent.querySelectorAll("input[type='checkbox']").forEach((item) => {
        item.checked = false
      })
    },
    async detailAddHandle() { //详情添加
      log(this.detail.constitute)
      await this.getAddList()
      this.detailAddDialog = true
    },
    getAddList(pageNum = 1, pageOffset = 10, query) {
      const data = {
        pageNum,
        pageOffset,
        ...query,
        type: this.currentType || this.contentType[0].value,
      }
      themeServices._themeAdd(data).then(res => {
        this.dataList = res.data
        this.page = res.page
      })
    },
    detailSort(type, id) { //详情排序
      let index = this.detail.constitute.findIndex(items => items.id == id)
      let num = type == 'up' ? -1 : 1
      let currentList = this.detail.constitute
      currentList.splice(index, 1, ...currentList.splice(index + num, 1, currentList[index]))
    },
    checkAll(e, name) { //全选
      const parent = document.querySelector('.' + name)
      parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
        if (name == 'addBookForm') {
          let index = this.chocesArray.findIndex(items => items.id == item.value || items.b_id == item.value)
          if (e.target.checked) {
            if (index == -1) {
              this.chocesArray.push({
                ...this.dataList.find(items => items.id == item.value),
                action: 'add'
              })
            }
          } else {
            this.chocesArray.splice(index, 1)
          }
        }
        item.checked = e.target.checked
      })
    },
    singeCheck(e, item) {
      let index = this.chocesArray.findIndex(items => items.id == item.id || items.b_id == item.id)
      if (e.target.checked) {
        if (index == -1) {
          this.chocesArray.push(item)
        }
      } else {
        this.chocesArray.splice(index, 1)
      }
    },
    bookDetailInfo(item, type, Ptype) { //详情内的详情&扩展属性
      log(type == '1')
      this.isShowAuthor = type != '1'
      const {
        id,
        c_id,
      } = item
      themeServices._themeDetail({
        c_id,
        id,
        type,
      }).then(res => {
        this.infoData = res.data
        this.infoValue = Ptype
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
    query() { //条件查询
      let query = formSerialize(document.querySelector("#detailSearchForm"), {
        hash: true
      })
      this.getAddList(1, this.page.offset, query)
    },
    addSelection() { //添加选中
      this.detail.constitute = [...this.chocesArray]
      // for (let item of list) {
      //   let index = this.detail.constitute.findIndex(items => {
      //     return items.id == item.value
      //   })
      //   if (index > -1) {
      //     continue
      //   }
      //   console.log(this.detail.constitute);
      //   this.detail.constitute.push({
      //     ...this.dataList.find(items => items.id == item.value),
      //     action: 'add'
      //   })
      // }
      this.detailAddDialog = false
    },
    isChecked(id) { //选中状态
      if (this.chocesArray.find(item => item.id === id || item.b_id === id)) {
        return true
      }
      return false
    },
    handleSizeChange(offset) { // size变化回调
      let query = formSerialize(document.querySelector("#mainForm"), {
        hash: true
      }); // 分页带参数
      this.getAddList(1, offset, query);
    },
    handleCurrentChange(page) { // 点击分页回调
      let query = formSerialize(document.querySelector("#mainForm"), {
        hash: true
      }); // 分页带参数
      this.getAddList(page, this.page.offset, query)
    },
    infoHandleClick(tab) {
      this.infoValue = tab.name
    },
		clear(){
			document.getElementById("text").value=""
		},
		clear2(){
			document.getElementById("text2").value=""
		},
  },
  components: {
    VaForm,
    Knowledge,
    Info
  },
  watch: {
    currentType(type) {
      this.getAddList()
    }
  }
};
</script>

<template lang="pug">
.div
	//- 详情
	el-dialog(
		:visible.sync="infoDialog"
		width="1000px"
		top="50px"
		append-to-body
		)
		.header(slot="title")
			Info(
				:type="infoValue"
				:infoDialog="infoDialog"
				:isAuthor="isShowAuthor"
				:infoData='infoData'
				@infoClick='infoHandleClick'
			)
		div(slot="footer" class="dialog-footer")
			el-button(type="info" @click="infoDialog = false" ) 取消

	//- 添加
	el-dialog(
		:center="false"
		:visible.sync="detailAddDialog"
		width="1000px"
	top="50px"
		append-to-body
		)
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(label="添加" name="detail")
		el-form.addBookForm
			span.group-inline(style="margin:20px;margin-top:0")
				el-radio-group(v-model="currentType")
					el-radio-button(v-for="item in contentType"  :key="item.id" :label="item.value") {{item.name}}
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
						th
							input(type="checkbox" @click="checkAll($event,'addBookForm')")
							span 全选
						th 名称
						th 标签
						th 类型
						th 创建时间
				tbody(v-if="dataList.length")
					tr(v-for="item,index in dataList")
						td
							input(type="checkbox" :data-type="item.status" :value="item.id" @click="singeCheck($event,item)" :checked="isChecked(item.id)" name="ids")
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
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name="info")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm(v-if="isNewVideo!=true")
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required' }" v-model="detail.name" vali="" name="name" type="text" :disabled="readOnly")
						//- .group
						//- 	.label 类型:
						//- 	el-select(v-if="themeType" name="theme_type" v-model="detail.type" placeholder="选择类型" :disabled="readOnly")
						//- 		el-option(
						//- 			v-for="(item,index) in themeType.list"
						//- 			:key="index"
						//- 			:label="item"
						//- 			:value="item"
						//- 		)
						.group
							.label *标签:
							input.form-control( v-va="{ type:'required' }" v-model="detail.tag" name="tag"  type="text" :disabled="readOnly")
						.group
							.label *简介:
							textarea.textarea( v-va="{ type:'required' }" :maxlength="$config.ABS_MAX_LENGTH" v-model="detail.abs" name="abs" type="text" :disabled="readOnly")
							span(style="vertical-align:bottom;color:#606266;font-size:12px") 您还可以输入{{$config.ABS_MAX_LENGTH-(detail.abs?detail.abs.length:0)}}
						.group
							.label *设置封面:
							el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
						.group.fenmian
							.label.fenmain
							img.previewImgUrl(:src="previewImgUrl"  alt="暂无图片" v-if="previewImgUrl")
							input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
							input.hide(name="img" type="text" :value="imgUrl" )
						p.imgSizeWrap
							span.imgSize 建议图片大小：118*160px
						.group
							.label 主题构成:
							.btn-right(v-if="!readOnly")
								el-button(@click="detailTopHandle" type="primary" size="mini" plain) 置顶
								el-button(@click="detailRemoveHandle()" type="primary" size="mini" plain) 移除
								el-button(@click="detailAddHandle()" type="primary" size="mini" plain) 添加
						.group
							table.table.border(width="100%")
								thead
									tr
										th(width=55)
											input(type="checkbox" name="checkAll" @click="checkAll($event,'detailForm')")
											span 全选
										th 名称
										th 标签
										th 类型
										th 创建时间
										th(width=100 v-if="!readOnly") 调序
										th(width=100) 操作
								tbody
									tr(v-for="item,index in detail.constitute")
										td
											input(type="checkbox" name="ids" :value="item.id" :data-type='item.type')
										td
											div.th-name(:title="item.name") {{item.name}}
										td {{item.tag}}
										td {{item.type_name}}
										td {{item.create_time}}
										td(v-if="!readOnly")
											i.el-icon-sort-up.el-icon-sort(@click="detailSort('up',item.id)")
											i.el-icon-sort-down.el-icon-sort(@click="detailSort('down',item.id)" v-if="index!=detail.constitute.length-1")
										td
											Icon(@click="bookDetailInfo(item,item.type,'info')" title="详情" type="icon-detail" size="mini" plain)
											Icon(@click="bookDetailInfo(item,item.type,'data')" title="扩展属性" type="icon-data" size="mini" plain)
											Icon(@click="detailRemoveHandle([item.c_id||item.id],item.type)" title="移除" v-if="!readOnly" :data-id="item.c_id" type="icon-delete" size="mini" plain)
					form.detailForm(v-if="isNewVideo==true")
						.group
							.label *标题:
							input.form-control( v-va="{ type:'required' }"  v-model="detail.标题" name="name" type="text" :disabled="readOnly")
						.group
							.label 专辑演播者:
							input.form-control(v-model="detail.专辑演播者" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 专辑责任者:
							input.form-control( v-model="detail.专辑责任者" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 专辑简介:
							input.form-control( v-model="detail.专辑简介" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 专业类别:
							input.form-control( v-model="detail.专业类别" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 专业类别编号:
							input.form-control( v-model="detail.专业类别编号" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 内容原作者:
							input.form-control( v-model="detail.内容原作者" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 出版时间:
							input.form-control( v-model="detail.出版时间" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 关联资源:
							input.form-control( v-model="detail.关联资源" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 节目数:
							input.form-control( v-model="detail.节目数" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 品类维度:
							input.form-control( v-model="detail.品类维度" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 品类维度编号:
							input.form-control( v-model="detail.品类维度编号" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 节目内容来源:
							input.form-control( v-model="detail.节目内容来源" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 价格:
							input.form-control( v-model="detail.价格" name="tag"  type="text" :disabled="readOnly")
						.group
							.label 设置封面:
							el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
						.group.fenmian
							.label.fenmain
							img.previewImgUrl(:src="previewImgUrl"  alt="暂无图片" v-if="previewImgUrl")
							input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
							input.hide(name="img" type="text" :value="imgUrl" )
						p.imgSizeWrap
							span.imgSize 建议图片大小：118*160px
						.group
							.label 主题构成:
							.btn-right(v-if="!readOnly")
								el-button(@click="detailTopHandle" type="primary" size="mini" plain) 置顶
								el-button(@click="detailRemoveHandle()" type="primary" size="mini" plain) 移除
								el-button(@click="detailAddHandle()" type="primary" size="mini" plain) 添加
						.group
							table.table.border(width="100%")
								thead
									tr
										th(width=55)
											input(type="checkbox" name="checkAll" @click="checkAll($event,'detailForm')")
											span 全选
										th 名称
										th 标签
										th 类型
										th 创建时间
										th(width=100 v-if="!readOnly") 调序
										th(width=100) 操作
								tbody
									tr(v-for="item,index in detail.constitute")
										td
											input(type="checkbox" name="ids" :value="item.id" :data-type='item.type')
										td
											div.th-name(:title="item.name") {{item.name}}
										td {{item.tag}}
										td {{item.type_name}}
										td {{item.create_time}}
										td(v-if="!readOnly")
											i.el-icon-sort-up.el-icon-sort(@click="detailSort('up',item.id)")
											i.el-icon-sort-down.el-icon-sort(@click="detailSort('down',item.id)" v-if="index!=detail.constitute.length-1")
										td
											Icon(@click="bookDetailInfo(item,item.type,'info')" title="详情" type="icon-detail" size="mini" plain)
											Icon(@click="bookDetailInfo(item,item.type,'data')" title="扩展属性" type="icon-data" size="mini" plain)
											Icon(@click="detailRemoveHandle([item.c_id||item.id],item.type)" title="移除" v-if="!readOnly" :data-id="item.c_id" type="icon-delete" size="mini" plain)            
			.btns(v-if="!readOnly")
				el-button( type="info" @click="$emit('update:detailDialog', false)" ) 取消
				el-button(@click="submitDetail" type="primary" ) 确定
		//- 扩展属性
		el-tab-pane( label="扩展属性" name="data" )
			MetaData( :metadata="attributes" :isShowBtn='false' :readOnly="readOnly")
			.btns(v-if="!readOnly")
				el-button(@click="$emit('update:detailDialog', false)" type="info" ) 取消
				el-button(@click="submitDetail"  type="primary" ) 确定
		//- 知识点
		el-tab-pane( label="知识点" name="Knowledge")
			Knowledge(:detailData="detailData" @saveok="$emit('updateList')" :readOnly="readOnly")
</template>


<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.serachWrap
  margin 0
  padding-top 0
  // input
  //   height 32px
  //   line-height 32px
.el-range-editor
  width 230px
.el-icon-sort
  margin-right 20px
  cursor pointer
  extend-click()
.btn-right
  display inline-block
  float right
.btns
  text-align right
.fenmian
  height 180px
  img
    max-height 200px
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
.previewImgUrl
  /* max-width 118px
  max-height 160px */
	height 180px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
select.form-control
  width 200px
	.clear
		position absolute
		top 174px
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
		top 174px
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
