<script>
import formSerialize from 'form-serialize'
import * as services from "services/x-publish/visualReading"
import {
  getTask
} from "services/common"
export default {
  props: ['detailData', 'readOnly', 'defaultData'],
  data() {
    return {
      information: {},
      previewImgUrl: null,
      retailers: {}, // 电商信息
      xRead: {}, // x-read信息
      activeName: '1',
      metadata: [],
    };
  },
  created() {
    if (this.detailData) {
      this.information = this.detailData
      this.xRead = this.detailData['x-read'] || {}
      this.metadata = this.detailData.pro_attributes || []
    }
    if (this.defaultData) {
      this.information = this.defaultData.base || {}
      this.xRead = this.defaultData.xread || {}
      this.metadata = this.defaultData.attributes || []
    }
  },
  methods: {
    previewImg(e, type) { //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
    },
    async submitDetail() {
      const fenmian = this.$refs.fenmian.files[0]
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) {
          await getTask(fenmian).then(res => {
            this.information.img = res.data.path
          })
        }

        await services.save({
          id: this.detailData.id,
          ...this.information,
          attributes: {
            xRead: this.retailers
          },
        }).then(res => {
          log(res);
          this.$message.success('保存成功')
          loading.close()
          this.$emit('saveok', res.data)
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
  },
};
</script>

<template lang="pug">
.div
	VaForm(ref="detailForm")
		form.detailForm
			.group.line
				.label 基本信息
			.group
				.label *产品名称:
				input.form-control( v-va="{ type:'required'}" v-model="information.name" type="text" :disabled="readOnly")
			.group
				.label *内容简介:
				textarea.textarea( v-va="{ type:'required'}" :maxlength="$config.ABS_MAX_LENGTH" v-model="information.abs" type="text" :disabled="readOnly")
				span(style="vertical-align:bottom;color:#606266;font-size:12px" v-if="!readOnly") 您还可以输入{{$config.ABS_MAX_LENGTH-(information.abs?information.abs.length:0)}}
			.group
				.label *设置封面:
				el-button(size="mini" type="primary" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
				input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
			.group
				.label
				img.previewImgUrl(:src="previewImgUrl || information.img_src")
				input(type="hidden" name="img" :value="information.img")
			p.imgSizeWrap
				span.imgSize 建议图片大小：250*140px
		.info
			el-tabs.tabs-nav(v-model="activeName")
				el-tab-pane(label="x-read信息" name="1")
					form.commerceForm
						.group
							.label 作者:
							input.form-control(v-model="xRead.author" type="text" :disabled="readOnly")
						.group
							.label 标签:
							input.form-control(v-model="xRead.tag" type="text" :disabled="readOnly")
						.group
							.label 扩展属性:
							MetaData( :metadata="metadata" :isShowBtn='false' :disabled="readOnly" :readOnly="readOnly")
		// .btns
		//     el-button(@click="submitDetail('detailForm')" type="primary" size="small") 保存
</template>


<style lang="stylus" scoped>
.btns
  text-align center
  padding 10px 0
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  width 250px
.imgSize
	line-height 150px
	margin-left 20px
	font-size 14px
	color #333
.form-control
  line-height 35px
  max-width 40%
  margin-right 20px
.textarea
  height 80px !important
.line
  font-size 16px
  border-bottom 1px solid #ddd
  >div
    text-align left
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
</style>
