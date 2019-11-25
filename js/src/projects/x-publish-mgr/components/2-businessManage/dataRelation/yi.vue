<script>
import formSerialize from "form-serialize"
import Menu from "@/components/common/Menu"
import Top from "@/components/common/Top"

import {
  getTask
} from 'services/common'
import VaForm from '@/components/common/VaForm'
import * as dataServices from 'services/x-publish/data'
import stylePug from './style.jade'
import {
  publicMixin
} from '@/util/mixins'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      page: null,
      query: null,
      styleFile: null,
      path: 'dataRelation',
      activeName: "yi",
      timeValue: null,
      detailVisible: false,
      previewImgUrl: null, //图片预览
      previewFileUrl: null, //文件预览
      detailDate: {
        id: '',
        simp: '',
        img: null, //图片上传后的真实url
        fonts: [], //文件上传后的真实url
      },
    };
  },
  computed: {
    style() {
      return stylePug({
        name: this.styleFile
      })
    },
  },
  methods: {
    async getList(pageNum = this.page && this.page.num || 1, pageOffset = this.page && this.page.offset || 10, searchQuery) { //获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery
      }
      await dataServices.listVariant(data).then(res => {
        this.page = res.page
        this.styleFile = res.data.style
        this.pageList = res.data.list
      })
    },
		clear(){
			document.getElementById("text").value=""
		},
    previewImg(e) { //详情预览图
      let node = e.target
      let file = node.files[0]
      this.previewImgUrl = URL.createObjectURL(file)
    },
    previewFile(e) { //文件预览
      this.previewFileUrl = URL.createObjectURL(e.target.files[0])
    },
    showDetaile(id, simp) { //查看详情
      this.detailDate.fonts = []
      this.detailDate.img =
        this.detailDate.id =
        this.detailDate.simp = ''
      this.previewFileUrl = null
      this.previewImgUrl = null
      if (!id) {
        this.detailVisible = true
        return
      } else {
        dataServices.detailVariant({
          id
        }).then(res => {
          this.detailDate.id = id
          this.detailDate.simp = simp
          this.detailDate.fonts =
            this.previewFileUrl = res.data.fonts
          this.detailDate.img =
            this.previewImgUrl = res.data.img
          this.detailVisible = true
        })
      }
    },
    deleteHandeler(id = []) { //删除
      if (!id.length) {
        Array.from(document.querySelectorAll("[name='checkbox']:checked")).forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！')
      }
      this.$confirm("确认删除？")
        .then(_ => {
          let {total,start,num} = this.page // 处理删除最后一页数据返回上页数据
          if((total-id.length) == start){
            this.page.num = !start?1:num-1
          }
          dataServices.deleteVariant({
            id
          }).then(res => {
            this.getList()
          })
        })
        .catch(_ => {})
    },
    async save() { //保存
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        log("验证失败")
        return
      }
      const fenmian = this.$refs.fenmian.files[0]
      const fileName = this.$refs.file.files[0]
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) { //先处理封面
          await getTask(fenmian).then(res => {
            this.detailDate.img = res.data.path
          })
        }
        if (fileName) { //再处理文件
          await getTask(fileName).then(res => {
            this.detailDate.fonts.push(res.data.path)
          })
        }
        log(this.detailDate)
        if (!this.detailDate.id) {
          await dataServices.addVariant(this.detailDate).then(res => {
            this.getList()
            loading.close()
            this.detailVisible = false
          })
        } else {
          log('test')
          await dataServices.modifyVariant(this.detailDate).then(res => {
            this.getList()
            loading.close()
            this.detailVisible = false
          })
        }
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
  },
  components: {
    Menu,
    Top,
    VaForm
  }
};
</script>

<template lang="pug">
.indexs
	Top(currentPlant='X-PUBLISH')
	Menu(curr="/dataRelation")
	.mainRight
		.maindata
			.serachWrap
				.NavList
					el-tabs(v-model="activeName" @tab-click="handleNavClick")
						el-tab-pane(label="繁简字管理" name="fan")
						el-tab-pane(label="异体字管理" name="yi")
						el-tab-pane(label="别称管理" name="bie")
				form#mainForm
					span.group-inline
						el-input(placeholder="输入简体搜索" name="simp" clearable v-model="searchQuery.simp")
					span.group-inline
						TimePick(:inputsName="['start_time','end_time']")
					span.group-inline
						el-button(type="primary" icon="el-icon-search" plain @click="seareHandeler") 搜索
						el-button(type="primary" icon="el-icon-plus" plain @click="showDetaile()") 新增
						el-button(type="primary" icon="el-icon-delete" plain @click="deleteHandeler()") 删除
			.tableWrap
				div(v-html="style")
				table.table
					thead
						tr
							th 全选
								input(type="checkbox" name='AllCheckbox' @click="selcetAll")
							th ID
							th 简体
							th 别字
							th 预览图
							th 创建时间
							th 操作
					tbody(v-if="pageList.length")
						tr(v-for="item in pageList")
							td
								input(type="checkbox" :value='item.id' name="checkbox" ref="ids")
							td(v-text='item.id')
							td(v-text='item.simp' :title="item.simp")
							td(v-html='item.xc_variant' :title="item.xc_variant")
							td
								img(:src="item.img" alt="没图" style="max-width:40px")
							td(v-text='item.create_time')
							td
								Icon(type="icon-detail" title="详情" plain size="mini" @click="showDetaile(item.id,item.simp)")
								Icon(type="icon-delete" title="删除"  plain size="mini" @click="deleteHandeler([item.id])")
			.pageWrap(v-if="page")
				el-pagination( :small="false" background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page.num"
				:page-sizes="[10, 50, 100]"
				:page-size="page.offset"
				layout="total, sizes, prev, pager, next, jumper"
				:total="page.total")
		//- 详情dialog
		el-dialog(:visible.sync="detailVisible" v-if="detailVisible")
			.header(slot="title")
				el-tabs(value="detail")
					el-tab-pane(label="详情" name="detail")
			VaForm(ref="detailForm")
				form.detailForm
					.group
						.label 简体字
						input.form-control(v-model="detailDate.simp" v-va="{ type:'required' }")
					.group
						.label 异体字图片
						img.previewImgUrl(:src="previewImgUrl"  alt="暂无图片")
						el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.fenmian.click()" plain) 上传
						input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
						input.hide(name="img" type="text" :value="detailDate.img" )
					.group
						.label 异体字文件
						input.form-control(type="text" name="" :value="previewFileUrl")
						input.hide(type="file"  ref="file" accept=".eot,.svg,.ttf,.woff" @change="previewFile")
						el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.file.click()" plain) 上传
			div(slot="footer" class="dialog-footer")
				el-button(type="info"  @click="detailVisible = false") 取消
				el-button(type="primary"  @click="save") 确定
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">

.serachWrap
  margin-bottom 15px
.addNew
  float right
.el-form-item__label
  text-align left
.el-upload-list__item-thumbnail
    height initial !important
    width initial
    max-width 70px
    max-height 70px
.previewImgUrl
  max-width 118px
  max-height 160px
.clear
	position absolute
	top 150px
	left 355px
	color #d9d9d9
	border-radius 50%
	background #efefef
	width 20px
	height 20px
	line-height 20px
	text-align center
	cursor pointer
</style>
