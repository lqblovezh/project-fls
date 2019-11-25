<script>
import formSerialize from 'form-serialize'
import Info from './info'
import * as services from 'services/x-publish/series'
import Resource from '@/components/common/Resource'
import { getTask } from 'services/common'

export default {
  props: ['type', 'detailData', 'detailDialog', 'readOnly', 'defaultData'],
  components: { Resource, Info },
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
    }
  },
  created() {
    if (this.detailData && this.detailData.id) {
      this.getDetail()
		}
		if(!this.defaultData) {
			this.getSerList()
			this.getColList()
		}
    if (this.defaultData) {
      const { column_all, columns_info, category_all } = this.defaultData.components
      this.infoData = this.defaultData.components
      this.series = column_all
      this.types = category_all
      this.checkedSeries = columns_info ? columns_info.map(item => item.id) : []
      this.currentType = columns_info[0] ? columns_info[0].id : ''
    }
  },
  methods: {
    getRrsouce() {
			if(this.defaultData){
				services
					.seriesListOnly({ product_id: this.defaultData.product_id, class_id: this.currentType })
					.then(res => {
						this.resList = res.data
					})
				return
			}
      services
        .seriesResList({ id: this.detailData.id, class_id: this.currentType })
        .then(res => {
          this.resList = res.data
        })
    },
    getDetail() {
      services
        .detail({
          id: this.detailData.id,
        })
        .then(res => {
          this.infoData = res.data
          this.checkedSeries = res.data.columns_info
            ? res.data.columns_info.map(item => item.id)
            : []
        })
    },
    getSerList() {
      services.seriesList({ type: '1' }).then(res => {
        this.types = res.data
      })
    },
    getColList() {
      services.seriesList({ type: '2' }).then(res => {
        this.series = res.data
      })
    },
    previewImg(e) {
      //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
    },
    async submitInfo() {
      // 保存扩展信息
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) return //log("验证失败")
      let fenmian = this.$refs.cover.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let data = {
        ...this.infoData,
        columns: this.checkedSeries.join(','),
      }
      if (fenmian) {
        //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
        await getTask(fenmian).then(res => {
          data.img = res.data.path
        })
      }
      await services
        .save(data)
        .then(res => {
          //上传信息
          if (!this.detailData.id) {
            this.infoData = res.data
          }
          loading.close()
          this.$message.success('操作成功!')
          this.$emit('saveok', res.data)
        })
        .catch(err => {
          loading.close()
          this.$message.error(err.message || '错误!');
        })
    },
    addSelcet(data) {
      services
        .addSerRes({
          id: this.detailData.id,
          class_id: this.currentType,
          rel_id: data.map(item => item.id),
        })
        .then(res => {
          this.getRrsouce()
          this.resourceDialog = false
        })
    },
    handleClick(tab, event) {
      if (tab.name == 'resource') {
        this.currentType = this.checkedSeries[0]
        // if (!this.detailData || !this.detailData.id || !this.currentType) {
        //   return
        // }
        this.getRrsouce()
      }
    },
    add() {
      if (!this.detailData || !this.detailData.id) {
        return this.$message.warning('请先保存资源')
      }
      if (!this.currentType) {
        return this.$message.warning('请先添加栏目')
      }
      this.resourceDialog = true
    },
    del(id) {
      this.$confirm('是否删除?')
        .then(res => {
          services
            .deleteSerRes({
              id: this.detailData.id,
              class_id: this.currentType,
              rel_id: id,
            })
            .then(res => {
              this.getRrsouce()
            })
        })
        .catch(res => {
          // 取消事件
        })
    },
  },
  computed: {
    getNav() {
      return this.series.filter(item => {
        if (this.checkedSeries.includes(item.id)) {
          return item
        }
      })
		},
		getCode() {
			let find = this.types&&this.types.find(item => item.id == this.infoData.category)
			return this.types&&find?find.code:''
		}
  },
  watch: {
    currentType(newDate, oldDate) {
      if (oldDate && newDate != oldDate) {
				// if(!this.detailData) {
				// 	console.log(newDate,oldDate)
				// 	return
				// }
        this.getRrsouce()
      }
    },
  },
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						.group
							.label *套系名称:
							input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" v-model="infoData.name" :disabled="readOnly")
						.group
							.label *套系ID:
							input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" v-model="infoData.link_id" :disabled="readOnly")
						.group
							.label *套系简介:
							textarea.form-control.form-control-textarea( v-va="{ type:'required' }" type="text" maxlength="300" v-model="infoData.abs" :disabled="readOnly")
						.group
							.label *套系作者:
							input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" v-model="infoData.author" :disabled="readOnly")
						.group
							.label *套系类别:
							el-select(v-model="infoData.category" maxlength="20" :disabled="readOnly")
								el-option(v-for="item in types"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								)
						.group
							.label *类别编号:
							span(type="text" v-text="getCode")
						.group
							.label *栏目设置:
							el-checkbox-group(v-model="checkedSeries" :disabled="readOnly" :min="1" :max="100")
								el-checkbox(v-for="item in series" :label="item.id" :key="item.id" :value="item.id") {{item.name}}
						.group
							.label 封面:
							img.img(:src="previewImgUrl || infoData.img_src")
						.group(v-if="!readOnly")
							.label 设置封面:
							label
								el-button(type="primary" @click="$refs.cover.click()" plain size="small") 上传
								input.hide(type="file" ref="cover" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
				.btns(v-if="!readOnly")
					el-button(type="info" @click="$emit('update:detailDialog',false)") 取消
					el-button(@click="submitInfo('detailForm')" type="primary") 确定
		//- 资源
		el-tab-pane( label="资源" name="resource")
			Resource(
				v-if="resourceDialog"
				:resourceDialog.sync="resourceDialog"
				:curSoucesList="[]"
				type="20-1"
				@select="addSelcet"
				:isShowType="true"
			)
			el-radio-group(v-model="currentType" size="small" style="margin-bottom: 20px;" v-if="checkedSeries&&series")
				el-radio-button(:label="item.id" :key="item.id" v-for="item in getNav") {{item.name}}
			table.table
				thead
					tr
						th 名称
						th 类型
						th 操作
				tbody
					tr(v-for="item in resList")
						td {{item.title||item.name}}
						td {{item.type_name}}
						td
							Icon(size="mini" title="删除"  @click="!readOnly&&del([item.rel_id])" type="icon-delete")
			.btns(v-if="!readOnly")
				el-button(type="primary" @click="add()" plain) 新增
</template>

<style lang="stylus" scoped>
>>> .el-checkbox__label
  line-height 35px
>>> .el-checkbox-group
  display inline-block
  width calc(100% - 150px)
>>>.el-checkbox+.el-checkbox
  line-height 35px
.form-control-textarea
  height 100px
  line-height 1.5em
  padding 15px
.btns
  text-align right
  margin-top 20px
.img
  max-width 250px
  max-height 200px
</style>
