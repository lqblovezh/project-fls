<script>
import formSerialize from 'form-serialize'
import * as commonServices from "services/common"
import {getTask} from 'services/common'
import * as myServices from "services/x-publish/series"
import Resource from './resource'
export default {
	props:['detailData','infoData', 'readOnly','detailDialog'],
	created() {
		if (this.detailData) {
			this.getDetail();
		}
		this.getSerList()
		this.getColList()
	},
	components:{Resource},
	data(){
		return{
			information:this.infoData,
			previewImgUrl: null, // 图片预览
			imgUrl: null, // 图片上传后的真实url
			file: null, // 图书文件 //主文件用file
			isIndeterminate:true,
			checkAll:false,
			checkedSeries:[],
			types:null,  //详情类别
			series:null,  //详情栏目
		}
	},
	watch:{
		checkedSeries(){
			this.$emit('checkedSer')
		},
	},
	methods:{
		getDetail() {
			myServices.detail({
				id: this.detailData.id
			}).then(res => {
				this.information = res.data
				this.checkedSeries = res.data.columns.split(',')
			})
		},
		getSerList(){
			myServices.seriesList({type:"1"}).then(res=>{
				this.types=res.data
			})
		},
		getColList(){
			myServices.seriesList({type:"2"}).then(res=>{
				this.series=res.data
			})
		},
		 previewImg(e) {
			 //预览图
			 var node = e.target
			 var file = node.files[0]
			 this.imgFile = file
			 this.previewImgUrl = URL.createObjectURL(file)
		 },
		 async submitInfo() { // 保存扩展信息
			 let flag = this.$refs.detailForm.valiAll()
			 if (!flag) return //log("验证失败")
			 let fenmian = this.$refs.cover.files[0]
			 let loading = this.$loading({
				 text: "正在上传",
				 background: "rgba(0, 0, 0, 0.8)"
			 })
			 let data = {
				 ...this.information,
				 ...this.types,
				 ...this.series,
				 columns:this.checkedSeries.join(','),
			 }
			 if (fenmian) { //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
				 await getTask(fenmian).then((res) => {
					 data.img = res.data.path
				 })
			 }
			 await myServices.save(data).then(res => {
				 //上传信息
				 if (!this.detailData.id) {
					 this.information = res.data
				 }
				 loading.close()
				 this.$message.success('操作成功!')
				 this.$emit('saveok', res.data)
			 }).catch(err => {
				 loading.close()
				 this.$message.error(err.message || '错误!');
			 })
		 },
	},
}
</script>
<template lang="pug">
.div
	VaForm( ref="detailForm" )
		form.detailForm( ref="detailForm")
			fieldset(:disabled="readOnly")
				.group
					.label *套系名称:
					input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" v-model="information.name" :disabled="readOnly")
				.group
					.label *套系ID:
					input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" v-model="information.link_id" :disabled="readOnly")
				.group
					.label *套系简介:
					input.form-control( v-va="{ type:'required' }"  type="text" maxlength="20" v-model="information.abs" :disabled="readOnly")
				.group
					.label *套系作者:
					input.form-control( v-va="{ type:'required' }"   type="text" maxlength="20" v-model="information.author" :disabled="readOnly")
				.group
					.label *套系类别:
					el-select(v-model="information.category_name" maxlength="20" :disabled="readOnly")
						el-option(v-for="item in types"
						:key="item.id"
						:label="item.name"
						:value="item.name")
				.group
					.label *类别编号:
					input.form-control( v-va="{ type:'required' }"  type="text" maxlength="20" v-model="information.category_code" :disabled="readOnly")
				.group
					.label *栏目一:
					el-checkbox-group(v-model="checkedSeries" :disabled="readOnly" :min="1" :max="100")
						el-checkbox(v-for="item in series" :label="item.name" :key="item.id") {{item.name}}
				.group
					.label 封面:
					img(:src="previewImgUrl || information.img_src")
				.group
					.label 设置封面：
					label
						el-button(type="primary" @click="$refs.cover.click()" plain v-if="!readOnly") 修改
						input.hide(type="file" ref="cover" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
		.btn(v-if="!readOnly")
			el-button(type="info" @click=" $emit('close')") 取消
			el-button(@click="submitInfo('detailForm')" type="primary") 确定
</template>

<style lang="stylus" scoped>
>>> .el-checkbox-group
	display inline-block
>>> .el-checkbox__label
	line-height 35px
.btn
	float right
.group>.label>.typeId
	margin 0 15px
.grid-content
  width 300px
  margin-right 30px
.iconRotate
  i
    color red
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  max-width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.th-name
  height initial
.el-textarea
	width 720px
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
.group>.label>span
	margin 0 15px
.group>.label>.types
	margin-left 38px
</style>
