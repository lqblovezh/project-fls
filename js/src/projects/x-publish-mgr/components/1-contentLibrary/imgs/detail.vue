<script>
import mulu from './mulu.json'
import { recursionTree } from '@/util/math.js'
import formSerialize from 'form-serialize'
import * as services from 'services/common'
import * as myServices from 'services/x-publish/picture'
import { getIconStyle } from '@/util/mixins'

export default {
  props: ['type', 'detailData', 'detailDialog', 'currGroup'],
  mixins: [getIconStyle],
  created() {
    if (this.detailData.id) {
      log('查询元数据, 目录 , 数据本地化')
      // log(mulu.data)  // 导入json ,似乎帮你自动转js了处理了
      //  递归处理 数据
      myServices
        .detailPicture({
          id: this.detailData.id,
        })
        .then(res => {
          log(res)
          this.detailDataOwn = res.data
          this.metadata = res.data.attributes
        })
      // var res = recursionTree(mulu.data , "parent_id" , "0")
      // this.ml = res
    } else {
      log('进入新建')
      this.metadata = this.detailDataOwn.attributes
    }
  },
  data() {
    return {
      detailDataOwn: {
        img_status: true,
        attributes: [],
      },
      metadata: [
        //扩展属性
      ],
      ml: null, //目录
      defaultProps: {
        //目录显示的字段
        children: 'children',
        label: 'name',
      },
      currMulu: null, // 当前点击的目录
      previewImgUrl: null, // 详情图片本地预览
      previewOtherImgUrl: null, // 详情图片外链预览
      detailSrc: null, //图片放大预览
      detailImgDialog: false,
      imgUrl: null, // 图片上传后的真实url
      fileMsg: {
        // 外链图片信息
        // format:'',
      },
      imgFile: null,
    }
  },
  computed: {
    detailType() {
      if (this.detailDataOwn.img_status) {
        return 'wailian'
      }
      return 'bendi'
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addMetadata() {
      //新增扩展属性
      this.metadata.push({
        key: '',
        name: '',
        value: '',
      })
    },
    delMetadata(index) {
      //删除扩展属性
      this.metadata.splice(index, 1)
    },
    async submitDetail(formName) {
      //详情提交
      var flag = this.$refs.detailFormVali.valiAll()
      if (!flag) return //验证失败
      var fileMsg = null
      var progress = this.$progress()
      if (this.detailType === 'wailian') {
        //如果是外链
        log('外链') // 判断外联是否是新填写的 // 外链不用判断修改时是否改变
        var url = this.$refs.otherImgInput.value
        if (url.trim() == '') {
          this.$message.error('请输入外链链接!')
          return
        }
        this.detailDataOwn.preview = url
        fileMsg = this.fileMsg // 外链的文件信息
        this.detailDataOwn.size = 0
      } else {
        // 如果是上传
        log('上传')
        if (this.imgFile) {
          // 先处理封面
          if (this.oldBlob) {
            this.imgFile = this.oldBlob
          }
          await services
            .getTask(
              this.imgFile,
              {
                is_chunk: true,
                size: 1024 * 1024,
              },
              num => {
                progress.percentage = num
              }
            )
            .then(res => {
              this.detailDataOwn.preview = res.data.path
            })
        } else {
          delete this.detailDataOwn.preview
        }
      }
      var data = {
        //上传的数据
        ...this.detailDataOwn,
        ...fileMsg, //如果是外链, 则fileMsg为null  不会覆盖
      }
      if (!data.preview && !data.preview_path) {
        progress.close()
        return this.$message.error('图片不能为空!')
      }
      if (this.detailDataOwn.id) {
        myServices.modifyPicture(data).then(res => {
          progress.close()
          this.$emit('detailBack')
        })
      } else {
        myServices.addPicture(data).then(res => {
          progress.close()
          this.$emit('detailBack')
        })
      }
    },
    submitMetadata() {
      // 提交扩展属性
      var flag = true
      for (var i = 0; i < this.metadata.length; i++) {
        if (
          this.metadata[i].key.trim() === '' ||
          this.metadata[i].value.trim() === ''
        ) {
          flag = false
        }
      }
      if (!flag) {
        this.$message.error('扩展属性不能为空!')
        return
      }
      if (this.detailDataOwn.id) {
        //修改
        log('修改', this.detailDataOwn)
        this.detailDataOwn.attributes = this.a
        myServices.modifyPicture({
          id: this.detailDataOwn.id,
          attributes: this.metadata,
        })
      } else {
        //新增
        myServices.addPicture({
          attributes: this.metadata,
        })
      }

      this.$emit('detailBack')
    },
    previewImg(e) {
      //本地
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.detailDataOwn.size = file.size
      this.detailDataOwn.format = file.name.substr(
        file.name.lastIndexOf('.') + 1
      )
      this.$ImageSizeCropper({
        file: file,
        autoWidth: 354,
        autoHeight: 480,
      }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(file)
        },
        data => {
          this.previewCropper(data)
        }
      )
    },
    showOtherImg() {
      // 外链
      this.previewOtherImgUrl = this.$refs.otherImgInput.value
      var url = this.previewOtherImgUrl
      this.detailDataOwn.preview = this.previewOtherImgUrl
      this.fileMsg.format = url.substr(url.lastIndexOf('.') + 1)
    },
    openDetailImgDialog() {
      //图片放大预览
      this.detailSrc =
        this.detailData.preview_path || this.detailDataOwn.preview
      this.detailImgDialog = true
    },
  },
}
</script>

<template lang="pug">
.div
	el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name="xq")
			.div
				VaForm( ref="detailFormVali"  )
					form.detailForm( ref="detailForm"  )
						fieldset(:disabled="detailReadOnly")
							.group
								.label *名称:
								input.form-control( v-va="{ type:'required' }" type="text" v-model="detailDataOwn.name"  )
							TypeMsg(:detailDataOwn="detailDataOwn" name="图片")
							// .group
							//   .label 作者:
							//   input.form-control(  name="author" v-model="detailDataOwn.author"    )
							.group
								.label 标签:
								input.form-control(  name="tag" type="text"  v-model="detailDataOwn.tag")
							.group
								.label 简介:
								textarea.textarea( name="abs" v-model="detailDataOwn.abs")
							.group
								.label 详情:
								span
									span
										input(type="radio" name="method" :value="false"  v-model="detailDataOwn.img_status" )
										|本地
									span
										input(type="radio" name="method"  :value="true"   v-model="detailDataOwn.img_status" )
										|外链
							.group(v-if="detailType == 'wailian'")
								.label
								span
									input.form-control( :value="previewOtherImgUrl ||  detailDataOwn.preview"  @input="showOtherImg" ref="otherImgInput" v-va="{type:'required'}" placeholder="请输入链接")
									//- input.form-control( ref="otherImgInput" placeholder="请输入链接"   :value="previewOtherImgUrl || detailDataOwn.preview")
									//- span.confirmBtn
									//-   el-button(type="primary" size="mini" plain  @click="showOtherImg") 确定
							.group.detailmain(v-show="detailType == 'bendi'")
								.label
								span.wrap
									img.previewImgUrl(:src="previewImgUrl || detailData.preview_path || detailDataOwn.preview" @click="openDetailImgDialog()")
									span.msg
										.type 格式:
											span.val(v-text="detailDataOwn.format")
											input(type="hidden" name="format" :value="detailDataOwn.format")
										.size 大小:
											span.val(v-text="((detailDataOwn.size||0) / 1024).toFixed(2) +'KB' ")
										el-button(size="mini" v-if="detailType == 'bendi' && detailDataOwn" type="primary" @click="$refs.fenmian.click()") 导入
							.group.detailmain(v-show="detailType == 'wailian'")
								.label
								span.wrap
									img.previewImgUrl(:src="detailData.preview_path || detailDataOwn.preview " @click="openDetailImgDialog()")
									span.msg
										.type 格式:
											span.val( v-text="fileMsg.format||detailDataOwn.format" )
							p.imgSizeWrap
								span.imgSize 建议图片大小：118*160px
							//- 隐藏inputs
							.hide
								input(type="file"  ref="fenmian"  accept="image/jpeg,image/jpg,image/png" @change="previewImg")
				.btns
					el-button(type="info" @click=" $emit('update:detailDialog', false)") 取消
					el-button(@click="submitDetail('detailForm')" type="primary" v-if="!detailReadOnly") 确定
		//- 扩展属性
		el-tab-pane( label="扩展属性"  name="data" )
			MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" :readOnly="detailReadOnly")
	.myDialogWrap(v-if="detailImgDialog")
		.content
			.imgWrap
				img(:src="detailSrc")
				span.closeBtn(@click="detailImgDialog = false")
</template>


<style lang="stylus" scoped>
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  width 250px
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
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc(100% - 300px)
    display inline-block
    min-height 500px
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
