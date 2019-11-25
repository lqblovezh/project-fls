<script>
import * as services from 'services/x-publish/qrcode'
import Resource from '@/components/common/Resource'
import { getTask } from 'services/common'
import proType from './qrcodeType'
import * as themeServices from 'services/x-publish/theme'
import Info from '../theme/info'
import PracticeInfo from './practiceDetail'
export default {
  props: [
    'type',
    'detailData',
    'detailDialog',
    'readOnly',
    'defaultData',
    'detailType',
  ],
  components: { Resource, Info, PracticeInfo },
  data() {
    return {
      infoData: this.detailData || {},
      resourceData: this.detailData,
      checkedSeries: [],
      file: null, // 图书文件 //主文件用file
      types: null, //详情类别
      series: null, //详情栏目
      previewImgUrl: null, // 图片预览
      resourceDialog: false, //添加弹框
      resList: [], //资源列表
      page: null, //资源列表分页
      currentType: null, //当前资源列表
      proType,
      infoDialog: false, //详情模态框
      practiceDialog: false, // 习题库详情
      infoDetail: {}, //详情数据
      infoValue: 'info',
    }
  },
  computed: {
    getType() {
      return this.proType.find(
        item =>
          item.value == this.detailType || item.detailType == this.detailType
      ).label
    },
    sourceType() {
      return this.proType.find(
        item =>
          item.value == this.detailType || item.detailType == this.detailType
      ).type
    },
  },
  created() {
    console.log(this.$props)
    if (this.detailData && this.detailData.id) {
      this.getDetail()
    } else {
      this.infoData.constitute = []
    }
    if (this.defaultData) {
      if (this.defaultData.info) {
        this.infoData = this.defaultData.info
      } else {
        this.infoData = this.defaultData
      }
      this.infoData.constitute = this.infoData.components
    }
  },
  methods: {
    async submitDetail() {
      //详情数据提交
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        log('验证失败')
        return
      }
      let fenmian = this.$refs.fenmian.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      try {
        if (fenmian) {
          if (this.oldBlob) {
            fenmian = this.oldBlob
          }
          await getTask(fenmian).then(res => {
            this.infoData.img = res.data.path
          })
        }
        await services
          .save({ ...this.infoData, product_type: this.detailType })
          .then(res => {
            loading.close()
            this.$emit('saveok', res.data)
          })
      } catch (error) {
        this.$message.error(error.message)
        loading.close()
      }
    },
    getDetail() {
      //获取详情数据
      services
        .detail({
          id: this.detailData.id,
        })
        .then(res => {
          this.infoData = res.data
          this.$set(this.infoData, 'constitute', this.infoData.constitutes)
        })
    },
    previewImg(e) {
      //详情预览图
      let node = e.target
      let file = node.files[0]
      this.previewImgUrl = URL.createObjectURL(file)
      return
      this.$ImageSizeCropper({
        file: file,
        autoWidth: 290,
        autoHeight: 400,
      }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(file)
        },
        data => {
          console.log(data)
          this.previewCropper(data)
        }
      )
    },
    detailTopHandle() {
      //详情置顶
      log(this.infoData.constitute)
      const ids = []
      const parent = document.querySelector('.detailForm')
      const list = parent.querySelectorAll("[name='ids']:checked")
      list.forEach(item => {
        ids.push(item.value)
      })
      if (!ids.length) {
        return this.$message.error('请确认你要置顶的内容！')
      }
      for (let i = ids.length - 1; i >= 0; i--) {
        let index = this.infoData.constitute.findIndex(
          items => items.id == ids[i]
        )
        let arry = this.infoData.constitute[index]
        this.infoData.constitute.splice(index, 1)
        this.infoData.constitute.unshift(arry)
      }
      parent.querySelectorAll("input[type='checkbox']").forEach(item => {
        item.checked = false
      })
    },
    detailRemoveHandle(id = [], type) {
      //详情移除
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
        return this.$message.error('请确认你要移除的内容！')
      }
      id.forEach(item => {
        let index = this.infoData.constitute.findIndex(
          items => items.c_id == item || items.id == item
        )
        if (index > -1) {
          this.infoData.constitute.splice(index, 1)
        }
      })
      parent.querySelectorAll("input[type='checkbox']").forEach(item => {
        item.checked = false
      })
    },
    detailSort(type, id) {
      //详情排序
      let index = this.detail.constitute.findIndex(items => items.id == id)
      let num = type == 'up' ? -1 : 1
      let currentList = this.detail.constitute
      currentList.splice(
        index,
        1,
        ...currentList.splice(index + num, 1, currentList[index])
      )
    },
    bookDetailInfo(item, type, Ptype) {
      if (type == 31) {
        this.practiceDialog = true
        this.infoDetail = item
        return
      }
      //详情内的详情&扩展属性
      if (this.defaultData) {
        this.infoDetail = item
        this.infoValue = Ptype
        this.infoDialog = true
        return
      }
      const { id, c_id } = item
      themeServices
        ._themeDetail({
          c_id,
          id,
          type,
        })
        .then(res => {
          this.infoDetail = res.data
          this.infoValue = Ptype
          this.infoDialog = true
        })
        .catch(({ payload }) => {
          this.$message.error(payload.message)
        })
    },
    detailAddHandle() {
      this.resourceDialog = true
    }, //详情添加
    addSelcet(data) {
      this.resourceDialog = false
      console.log(data)
    },
    previewCropper(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
    },
  },
  watch: {},
}
</script>

<template lang="pug">
.div
	Resource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="infoData.constitute"
		:type="sourceType"
		@select="addSelcet"
	)
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
				:isAuthor="true"
				:infoData='infoDetail'
			)
		div(slot="footer" class="dialog-footer")
			el-button(type="info" @click="infoDialog = false" ) 取消
	//- 习题库详情
	PracticeInfo(
		v-if="practiceDialog"
		:detailData ="infoDetail"
		:detailDialog.sync="practiceDialog"
		@close="practiceDialog=false"
  )
	el-tabs( value="info" )
		//- 详情
		el-tab-pane( label="产品信息" name="info")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm
						fieldset(:disabled="readOnly")
							.group
								.label *名称:
								input.form-control( v-va="{ type:'required' }" v-model="infoData.name" vali="" name="name" type="text" :disabled="readOnly")
							.group
								.label 类型:
								span( v-text="getType" )
							.group
								.label *标签:
								input.form-control( v-va="{ type:'required' }" v-model="infoData.tag" name="tag"  type="text" :disabled="readOnly")
							.group
								.label *简介:
								textarea.textarea( v-va="{ type:'required' }" :maxlength="$config.ABS_MAX_LENGTH" v-model="infoData.abs" name="abs" type="text" :disabled="readOnly")
								span(style="vertical-align:bottom;color:#606266;font-size:12px" v-if="!readOnly") 您还可以输入{{$config.ABS_MAX_LENGTH-(infoData.abs?infoData.abs.length:0)}}
							.group
								.label *价格:
								input.form-control.price( v-va="{ type:'required' }" v-model="infoData.price" name="price"  type="text" :disabled="readOnly")
							.group
								.label *设置封面:
								el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
							.group.fenmian
								.label.fenmain
								img.previewImgUrl(:src="previewImgUrl||infoData.img_src" )
								input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
							//- p.imgSizeWrap
							//- 	span.imgSize 建议图片大小：118*160px
							.group
								.label 构成:
								.btns(v-if="!readOnly")
									el-button(@click="detailTopHandle" type="primary" size="mini" plain) 置顶
									el-button(@click="detailRemoveHandle()" type="primary" size="mini" plain) 移除
									el-button(@click="detailAddHandle()" type="primary" size="mini" plain) 添加
							.group
								table.table.border(width="100%")
									thead
										tr
											th(width=55)
												input(type="checkbox" name="checkAll" @click="$checkAll($event)")
												span 全选
											th 名称
											th(v-if="sourceType!=31") 标签
											th(v-if="sourceType==31") 难易程度
											th(v-if="sourceType==31") 分值
											th 类型
											th 创建时间
											th(width=100 v-if="!readOnly") 调序
											th(width=100) 操作
									tbody
										tr(v-for="item,index in infoData.constitute")
											td
												input(type="checkbox" name="ids" :value="item.id" :data-type='item.type')
											td
												div.th-name(:title="item.name||item.question" v-html="item.name || item.question") 
											td(v-if="sourceType!=31") {{item.tag}}
											th(v-if="sourceType==31") {{item.level_name}}
											th(v-if="sourceType==31") {{item.score}}
											td {{item.type_name}}
											td {{item.create_time}}
											td(v-if="!readOnly")
												i.el-icon-sort-up.el-icon-sort(@click="detailSort('up',item.id)")
												i.el-icon-sort-down.el-icon-sort(@click="detailSort('down',item.id)" v-if="index!=infoData.constitute.length-1")
											td
												Icon(@click="bookDetailInfo(item,item.type,'info')" title="详情" type="icon-detail" size="mini" plain)
												Icon(@click="detailRemoveHandle([item.c_id||item.id],item.type)" title="移除" v-if="!readOnly" :data-id="item.c_id" type="icon-delete" size="mini" plain)
			.btns(v-if="!readOnly")
				el-button( type="info" @click="$emit('update:detailDialog', false)" ) 取消
				el-button(@click="submitDetail" type="primary" ) 确定
</template>

<style lang="stylus" scoped>
.el-icon-sort
  margin-right 20px
  cursor pointer
  extend-click()
.btns
  float right
.form-control.price
  width 300px
.previewImgUrl
  max-width 250px
  max-height 200px
</style>
