<script>
import formSerialize from 'form-serialize'
// import TimePicks from 'projects/x-teach-mgr/components/common/TimePick'
import { getTask } from 'services/common'

export default {
  props: ['detailData', 'readOnly', 'infoDate', 'services'],
  data() {
    return {
      information: this.infoDate,
      previewImgUrl: null,
      imageCropperDialog: false,
      oldBlob: null,
      file: null,
      timePick: null,
    }
  },
  created() {
    if (this.information) {
      const {
        effective_duration_start,
        effective_duration_end,
      } = this.information
      if (effective_duration_start && effective_duration_end) {
        this.timePick = [effective_duration_start, effective_duration_end]
      }
    }
  },
  methods: {
    previewImg(e, type) {
      var node = e.target
      this.file = node.files[0]
      this.imgFile = URL.createObjectURL(this.file)
      this.$ImageSize({ file: this.file, ratio: 1.6 }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(this.file)
        },
        err => {
          if (err.status == 201) {
            this.imageCropperDialog = true
            return
          }
          this.$message.error(err.message)
        }
      )
    }, //预览图
    async submitInfo() {
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) return //log("验证失败")
      let fenmian = this.$refs.fenmian.files[0]
      // if (!this.information.effective_duration) {
      //   return this.$message.error('有效时长必填')
      // }
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let data = {
        ...this.information,
      }
      // debugger

      if (fenmian) {
        //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
        if (this.oldBlob) {
          fenmian = this.oldBlob
          fenmian.name = this.file.name
        }
        await getTask(fenmian).then(res => {
          data.img = res.data.path
        })
      }
      await this.services
        .save(data)
        .then(res => {
          //上传信息
          if (!this.detailData.id) {
            this.information = res.data
          }
          loading.close()
          this.$message.success('操作成功!')
          this.$emit('saveok', res.data)
        })
        .catch(err => {
          loading.close()
          this.$message.error(err.message || '错误!');
        })
    }, // 保存扩展信息
    preview(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
      this.imageCropperDialog = false
    },
    getTime(time) {
      if (!time) {
        time = ['', '']
      }
      console.log(1111, time)
      this.information.effective_duration_start = time[0]
      this.information.effective_duration_end = time[1]
    },
  },
}
</script>

<template lang="pug">
.div
	ImageCropper(
		v-if="imageCropperDialog"
		ref="imageCropper"
		:imageCropperDialog.sync="imageCropperDialog"
		:imgFile="imgFile"
		@preview="preview"
	)
	VaForm(ref="detailForm")
		form.detailForm
			fieldset(:disabled="readOnly")
				.group
					.label *课程名称:
					input.form-control( v-va="{ type:'required'}" placeholder="请输入课程的名称（标题）" v-model="information.name" type="text" :disabled="readOnly")
				.group
					.label *课程介绍:
					textarea.textarea( v-va="{ type:'required'}" placeholder="请简要介绍下该课程的内容" :maxlength="$config.ABS_MAX_LENGTH" v-model="information.abs" type="text" :disabled="readOnly")
					span(style="vertical-align:bottom;color:#606266;font-size:12px" v-if="!readOnly") 您还可以输入{{$config.ABS_MAX_LENGTH-(information.abs?information.abs.length:0)}}
				.group
					.label *开课时间:
					div.inline
						TimePicks(@getTime="getTime" :value="timePick")
				.group
					.label *导师:
					img.previewImgUrl(:src="information.owenr_img_src||$config.userInfo.user.picture_absolute")
				.group
					.label *课程封面:
					el-button(size="mini" type="primary" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
					input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
				.group
					.label
					img.previewImgUrl(:src="previewImgUrl||information.img_src")
					input(type="hidden" name="img" :value="information.img")
				p.imgSizeWrap
					span.imgSize 建议图片大小：250*140px
			.btns(v-if="!readOnly")
				el-button(@click="$emit('close')" type="info" ) 取消
				el-button(@click="submitInfo()" type="primary") 保存
</template>


<style lang="stylus" scoped>
.inline
  display inline-block
.btns
  text-align right
  padding 10px 0
.previewImgUrl
  max-width 200px
  max-height 180px
.form-control
  line-height 35px
  max-width 40%
  margin-right 20px
.textarea
  resize none
  max-width 40%
  height 80px !important
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
